const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation/user-validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* Create new user */
router.post('/register', async (req, res) => {
  try {
    const validation = registerValidation(req.body);
    const {value, error} = validation;
    if (error) return res.status(400).send(error.details[0].message);

    const salt = await bcrypt.genSaltSync(12);
    const hash = await bcrypt.hashSync(req.body.password, salt);

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('This email address is reserved for already existing account');

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });
    const savedUser = await user.save();
    res.send(savedUser);

  } catch (e) {
    res.status(400).send(e);
  }
});

/* Login */
router.post('/login', async (req, res) => {
  const validation = loginValidation(req.body);
  const {value, error} = validation;
  if (error) return res.status(400).send(error.details[0].message);

  const account = await User.findOne({email: req.body.email});
  if (!account) return res.status(400).send('Login credential don\'t match an account in system (ac)');

  const correctPassword = await bcrypt.compare(req.body.password, account.password);
  if (!correctPassword) return res.status(400).send('Login credential don\'t match an account in system (pw)');

  const jwToken = jwt.sign({_id: account._id}, process.env.JWT_SECRET);
  res.header('auth-token', jwToken).send(jwToken);
});

module.exports = router;

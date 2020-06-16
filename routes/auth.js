const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  //Validate user information
  const validation = registerValidation(req.body);
  const {value, error} = validation;
  if (error) return res.status(400).send(error.details[0].message);

  /* Password hashing with bcrypt */
  const salt = await bcrypt.genSaltSync(12);
  const hash = await bcrypt.hashSync(req.body.password, salt);

  //Check for email duplicates
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send('This email address is reserved for already existing account');

  //res.send(validation);
  //Create user instance
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash
  });

  //Save user to database
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (e) {
    res.status(400).send(e);
  }

});

router.post('/login', async (req, res) => {
  const validation = loginValidation(req.body);
  const {value, error} = validation;
  if (error) return res.status(400).send(error.details[0].message);

  const account = await User.findOne({email: req.body.email});
  if (!account) return res.status(400).send('Login credential don\'t match an account in system (ac)');

  const correctPassword = await bcrypt.compare(req.body.password, account.password);
  if(!correctPassword) return res.status(400).send('Login credential don\'t match an account in system (pw)');

  const jwToken = jwt.sign({_id: account._id }, process.env.JWT_SECRET);
  res.header('auth-token', jwToken).send(jwToken);


});


module.exports = router;

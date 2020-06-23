const router = require('express').Router();
const tokenVerification = require('./protectedRoutes');
const {albumValidation} = require('./../validation/album-validation');
const Album = require('../model/Album');
const User = require('../model/User');

router.get('/', tokenVerification, (req, res) => {
  res.json({
    album: {
      picture: 'pic',
      url: 'no'
    }
  });
});


router.post('/new', tokenVerification, async (req, res) => {
  const albumExist = await Album.findOne({title: req.body.title});
  if (albumExist) return res.status(400).send('Name already exist');

  const account = await User.findOne({_id: req.user._id});
  if (!account) return res.status(400).send('Error your account is corrupted. Please contact admins!');

  const validation = albumValidation(req.body);
  const {value, error} = validation;
  if (error) return res.status(400).send(error.details[0].message);
  res.send(account);

  const album = new Album({
    title: req.body.title,
    author: req.user._id,
  });

  try {
    const savedAlbum = await album.save();
    res.send(savedAlbum);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

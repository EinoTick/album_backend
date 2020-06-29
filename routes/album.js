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
  const validation = albumValidation(req.body);
  const {value, error} = validation;
  if (error) return res.status(400).send(error.details[0].message);

  const albumExist = await Album.findOne({name: req.body.name});
  if (albumExist) return res.status(400).send('Name already exist');

  const account = await User.findOne({_id: req.user._id});
  if (!account) return res.status(400).send('Error, please contact admins!');

  const album = new Album({
    name: req.body.name,
    author: req.user._id,
  });

  try {
    const savedAlbum = await album.save();
    res.send(savedAlbum);
  } catch (e) {
    res.status(400).send(e);
  }
});


router.get('/all', tokenVerification, async (req, res) => {
  res.send('Get all albums')
});


module.exports = router;

const router = require('express').Router();
const tokenVerification = require('./protectedRoutes');
const {pictureValidation} = require('./../validation/picture-validation');
const User = require('../model/User');
const Picture = require('../model/Picture');
const Album = require('../model/Album');

/* Get all pictures */
router.get('/all', tokenVerification, async (req, res) => {
  try {
    const pictures = await Picture.find().populate('album');
    res.send(pictures);
  } catch (e) {
    res.send(e);
  }
});

/* Get pictures related to a specific album */
router.get('/album/:albumId', tokenVerification, async (req, res) => {
  const albumId = req.params.albumId;
  try {
    const currentAlbum = await Album.findOne({ _id: albumId });
    if (!currentAlbum) return res.status(400).send("Could not find the album");

    const pictures = await Picture.find({ album: currentAlbum });
    if (!pictures) return res.status(400).send('Album is empty');
    res.send(pictures);

  } catch (e) {
    res.send(e);
  }
});

/* Add new picture */
router.post('/new', tokenVerification, async (req, res) => {
  try {
    const validation = pictureValidation(req.body);
    const {value, error} = validation;
    if (error) return res.status(400).send(error.details[0].message);

    const pictureExist = await Picture.findOne({title: req.body.title});
    if (pictureExist) return res.status(400).send('Name already exist');

    const account = await User.findOne({_id: req.user._id});
    if (!account) return res.status(400).send('Error, please contact admins!');

    const album = await Album.findOne({_id: req.body.albumId});
    if (!album) return res.status(400).send('Could not find the album!');

    const picture = new Picture({
      title: req.body.title,
      pictureUrl: req.body.pictureUrl,
      album: album
    });
    const savedPicture = await picture.save();
    res.send(savedPicture);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

const router = require('express').Router();
const tokenVerification = require('./protectedRoutes');
const {albumValidation} = require('./../validation/album-validation');
const Album = require('../model/Album');
const User = require('../model/User');


router.get('/all', tokenVerification, async (req, res) => {
  try {
    const album = await Album.find().populate('pictures');
    res.send(album);
  } catch (e) {
    res.send(e);
  }
});

//5ef9c8d8e5eabf2788fa47c2 <-- test1 id
router.get('/find/:albumId', tokenVerification, async (req, res) => {
  const albumId = req.params.albumId;
  try {
    const albumExist = await Album.findOne({_id: albumId});
    if (!albumExist) return res.send('Could not find the album!');
    res.send(albumExist);
  } catch (e) {
    return res.status(400).send('Incorrect parameter format');
  }
});

//#ToDo: lisää try catch kaikkiin
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


module.exports = router;

const mongoose = require('mongoose');


const PictureSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  date: {
    type: Date,
    default: Date.now
  },
  pictureUrl:  {
    type: String,
    required: true,
    min: 6,
    max: 255
  }

});

const AlbumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  pictures: [PictureSchema]
});

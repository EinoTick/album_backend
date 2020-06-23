const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
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

const albumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
  //pictures: [PictureSchema]
});


module.exports = mongoose.model('Album', albumSchema);

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

module.exports = mongoose.model('Picture', pictureSchema);

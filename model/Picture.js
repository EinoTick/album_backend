const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    max: 1000
  },
  album: [{
    type: Schema.Types.ObjectId,
    ref: 'Album'
  }]
});

module.exports = mongoose.model('Picture', pictureSchema);

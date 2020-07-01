const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = Schema({
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
  },
  pictures: [{
    type: Schema.Types.ObjectId,
    ref: 'Picture'
  }]
});

//pictures: [PictureSchema]
module.exports = mongoose.model('Album', albumSchema);

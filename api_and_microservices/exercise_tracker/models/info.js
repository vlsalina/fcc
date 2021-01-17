var mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  question: { type: String, required: true }
}, { collection: 'collection3' });

const Mode = mongoose.model('Info', infoSchema);

module.exports = Mode;





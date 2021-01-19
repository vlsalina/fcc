var mongoose = require('mongoose');

const info_schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  question: { type: String, required: true }
}, { collection: 'collection3' });

const Model = mongoose.model('Info', info_schema);

module.exports = Model;





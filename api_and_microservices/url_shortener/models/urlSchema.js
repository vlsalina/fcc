const mongoose = require('mongoose');

const urlschema = new mongoose.Schema({
  original: { type: String, required: true },
  short: { type: String, required: true }
}, { collection: 'collection2' });

const URL = mongoose.model('URL', urlschema);

module.exports = URL;

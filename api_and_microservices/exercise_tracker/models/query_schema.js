var mongoose = require('mongoose');

const query_schema = new mongoose.Schema({
  from: { type: Date },
  to: { type: Date },
  limit: { type: Number }
}, { collection: 'temporary data' });

const Model = mongoose.model('Query', query_schema);

module.exports = Model;


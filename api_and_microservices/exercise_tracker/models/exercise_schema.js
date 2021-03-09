var mongoose = require('mongoose');

const exercise_schema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true }
}, { collection: 'exercise_data' });

const Model = mongoose.model('Exercise', exercise_schema);

module.exports = Model;


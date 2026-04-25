const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  title: { type: String, required: true },
  data: { type: Object, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Timetable', timetableSchema);

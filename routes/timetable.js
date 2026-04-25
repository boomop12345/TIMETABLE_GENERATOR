const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Timetable = require('../models/Timetable');

// @route   POST api/timetable
// @desc    Save a timetable
// @access  Private
router.post('/', [
  auth,
  body('title', 'Title is required').not().isEmpty().trim(),
  body('data', 'Data is required').not().isEmpty()
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, data } = req.body;

  try {
    const newTimetable = new Timetable({
      title,
      data,
      createdBy: req.user.id,
      role: req.user.role
    });

    const timetable = await newTimetable.save();
    res.status(201).json(timetable);
  } catch (err) {
    console.error(err);
  }
});

// @route   GET api/timetable
// @desc    Get all timetables
// @access  Private
router.get('/', auth, async (req, res, next) => {
  try {
    const timetables = await Timetable.find().sort({ createdAt: -1 });
    res.json(timetables);
  } catch (err) {
    console.error(err);
  }
});

// @route   GET api/timetable/me
// @desc    Get current user's timetables
// @access  Private
router.get('/me', auth, async (req, res, next) => {
  try {
    const timetables = await Timetable.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(timetables);
  } catch (err) {
    console.error(err);
  }
});

// @route   PUT api/timetable/:id
// @desc    Update a timetable
// @access  Private
router.put('/:id', [
  auth,
  body('title', 'Title is required').optional().not().isEmpty().trim(),
  body('data', 'Data is required').optional().not().isEmpty()
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let timetable = await Timetable.findById(req.params.id);
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    // Check ownership or admin
    if (timetable.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const { title, data } = req.body;
    if (title) timetable.title = title;
    if (data) timetable.data = data;

    await timetable.save();
    res.json(timetable);
  } catch (err) {
    console.error(err);
  }
});

// @route   DELETE api/timetable/:id
// @desc    Delete a timetable
// @access  Private
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const timetable = await Timetable.findById(req.params.id);

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    // Check ownership or admin
    if (timetable.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await timetable.deleteOne();
    res.json({ message: 'Timetable removed' });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;

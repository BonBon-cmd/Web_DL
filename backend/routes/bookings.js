const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');
const { protect, restrictTo } = require('../middleware/auth');

router.route('/')
  .get(protect, getAllBookings)
  .post(protect, createBooking);

router.route('/:id')
  .get(protect, getBooking)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

module.exports = router;

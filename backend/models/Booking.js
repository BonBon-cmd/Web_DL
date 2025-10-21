const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - tour
 *         - user
 *         - bookingDate
 *         - numberOfGuests
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated booking ID
 *         tour:
 *           type: string
 *           description: Tour ID
 *         user:
 *           type: string
 *           description: User ID
 *         bookingDate:
 *           type: string
 *           format: date
 *         numberOfGuests:
 *           type: number
 *         totalPrice:
 *           type: number
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled, completed]
 *         paymentStatus:
 *           type: string
 *           enum: [unpaid, paid, refunded]
 *         specialRequests:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a tour']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user']
  },
  bookingDate: {
    type: Date,
    required: [true, 'Please provide a booking date']
  },
  numberOfGuests: {
    type: Number,
    required: [true, 'Please provide number of guests'],
    min: 1
  },
  totalPrice: {
    type: Number,
    required: [true, 'Booking must have a price']
  },
  voucherApplied: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher',
    default: null
  },
  originalPrice: {
    type: Number,
    default: null
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  finalPrice: {
    type: Number,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  },
  specialRequests: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Populate tour and user when querying
bookingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tour',
    select: 'title duration price location'
  }).populate({
    path: 'user',
    select: 'name email phone'
  });
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);

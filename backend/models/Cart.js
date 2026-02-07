const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated cart ID
 *         user:
 *           type: string
 *           description: User ID (one cart per user)
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               tour:
 *                 type: string
 *                 description: Tour ID
 *               bookingDate:
 *                 type: string
 *                 format: date
 *               numberOfGuests:
 *                 type: number
 *                 minimum: 1
 *               price:
 *                 type: number
 *               addedAt:
 *                 type: string
 *                 format: date-time
 *         totalAmount:
 *           type: number
 *           description: Total cart amount
 *         lastUpdated:
 *           type: string
 *           format: date-time
 */

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Cart must belong to a user'],
    unique: true
  },
  items: [{
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Cart item must have a tour']
    },
    bookingDate: {
      type: Date,
      required: [true, 'Please provide a booking date']
    },
    numberOfGuests: {
      type: Number,
      required: [true, 'Please provide number of guests'],
      min: [1, 'Number of guests must be at least 1']
    },
    price: {
      type: Number,
      required: [true, 'Please provide price']
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalAmount: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Populate tour in items when querying
cartSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'items.tour',
    select: 'title price duration location images'
  });
  next();
});

// Update lastUpdated before saving
cartSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

// Calculate total amount before saving
cartSchema.pre('save', function(next) {
  this.calculateTotal();
  next();
});

/**
 * Calculate total amount of cart
 */
cartSchema.methods.calculateTotal = function() {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + (item.price * item.numberOfGuests);
  }, 0);
  return this.totalAmount;
};

/**
 * Add item to cart
 * @param {ObjectId} tourId - Tour ID
 * @param {Date} bookingDate - Booking date
 * @param {Number} numberOfGuests - Number of guests
 * @param {Number} price - Price per guest
 */
cartSchema.methods.addItem = async function(tourId, bookingDate, numberOfGuests, price) {
  // Check if item already exists
  const existingItemIndex = this.items.findIndex(
    item => item.tour.toString() === tourId.toString()
  );

  if (existingItemIndex > -1) {
    // Update existing item
    this.items[existingItemIndex].bookingDate = bookingDate;
    this.items[existingItemIndex].numberOfGuests = numberOfGuests;
    this.items[existingItemIndex].price = price;
    this.items[existingItemIndex].addedAt = Date.now();
  } else {
    // Add new item
    this.items.push({
      tour: tourId,
      bookingDate,
      numberOfGuests,
      price,
      addedAt: Date.now()
    });
  }

  return await this.save();
};

/**
 * Remove item from cart
 * @param {ObjectId} tourId - Tour ID to remove
 */
cartSchema.methods.removeItem = async function(tourId) {
  this.items = this.items.filter(
    item => item.tour.toString() !== tourId.toString()
  );
  return await this.save();
};

/**
 * Clear all items from cart
 */
cartSchema.methods.clearCart = async function() {
  this.items = [];
  this.totalAmount = 0;
  return await this.save();
};

module.exports = mongoose.model('Cart', cartSchema);

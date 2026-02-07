const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - tour
 *         - bookingDate
 *         - numberOfGuests
 *         - price
 *       properties:
 *         tour:
 *           type: string
 *           description: Tour ID
 *         bookingDate:
 *           type: string
 *           format: date
 *           description: Booking date for the tour
 *         numberOfGuests:
 *           type: number
 *           minimum: 1
 *           description: Number of guests
 *         price:
 *           type: number
 *           description: Price per guest
 *         addedAt:
 *           type: string
 *           format: date-time
 *           description: When item was added to cart
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
 *             $ref: '#/components/schemas/CartItem'
 *         totalItems:
 *           type: number
 *           description: Total number of items in cart
 *         totalPrice:
 *           type: number
 *           description: Total price of all items
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Cart must belong to a user']
  },
  items: [{
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Item must have a tour']
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
      required: [true, 'Item must have a price']
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalItems: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for faster queries
cartSchema.index({ user: 1 }, { unique: true }); // Declare unique index explicitly

// Virtual field for item count
cartSchema.virtual('itemCount').get(function() {
  return this.items.length;
});

// Populate tours in items when querying
cartSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'items.tour',
    select: 'title price duration location images'
  });
  next();
});

// Update timestamps before save
cartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

/**
 * Method to add item to cart
 * @param {ObjectId} tourId - Tour ID to add
 * @param {Date} bookingDate - Booking date
 * @param {Number} numberOfGuests - Number of guests
 * @returns {Promise<Cart>} Updated cart
 */
cartSchema.methods.addItem = async function(tourId, bookingDate, numberOfGuests) {
  // Get tour to get the price
  const Tour = mongoose.model('Tour');
  const tour = await Tour.findById(tourId);
  
  if (!tour) {
    throw new Error('Tour not found');
  }

  // Check if item already exists
  const bookingDateStr = new Date(bookingDate).toDateString();
  const existingItemIndex = this.items.findIndex(item => {
    return item.tour.toString() === tourId.toString() && 
           new Date(item.bookingDate).toDateString() === bookingDateStr;
  });

  if (existingItemIndex > -1) {
    // Update existing item
    this.items[existingItemIndex].numberOfGuests = numberOfGuests;
    this.items[existingItemIndex].price = tour.price;
  } else {
    // Add new item
    this.items.push({
      tour: tourId,
      bookingDate,
      numberOfGuests,
      price: tour.price
    });
  }

  // Recalculate totals
  this.calculateTotal();
  
  return await this.save();
};

/**
 * Method to remove item from cart
 * @param {ObjectId} tourId - Tour ID to remove
 * @returns {Promise<Cart>} Updated cart
 */
cartSchema.methods.removeItem = async function(tourId) {
  this.items = this.items.filter(
    item => item.tour.toString() !== tourId.toString()
  );
  
  this.calculateTotal();
  
  return await this.save();
};

/**
 * Method to update item in cart
 * @param {ObjectId} tourId - Tour ID to update
 * @param {Object} data - Updated data (numberOfGuests, bookingDate)
 * @returns {Promise<Cart>} Updated cart
 */
cartSchema.methods.updateItem = async function(tourId, data) {
  const itemIndex = this.items.findIndex(
    item => item.tour.toString() === tourId.toString()
  );

  if (itemIndex === -1) {
    throw new Error('Item not found in cart');
  }

  if (data.numberOfGuests) {
    this.items[itemIndex].numberOfGuests = data.numberOfGuests;
  }
  
  if (data.bookingDate) {
    this.items[itemIndex].bookingDate = data.bookingDate;
  }

  this.calculateTotal();
  
  return await this.save();
};

/**
 * Method to clear all items from cart
 * @returns {Promise<Cart>} Updated cart
 */
cartSchema.methods.clearCart = async function() {
  this.items = [];
  this.totalItems = 0;
  this.totalPrice = 0;
  
  return await this.save();
};

/**
 * Method to calculate total items and price
 */
cartSchema.methods.calculateTotal = function() {
  this.totalItems = this.items.length;
  this.totalPrice = this.items.reduce((total, item) => {
    return total + (item.price * item.numberOfGuests);
  }, 0);
};

module.exports = mongoose.model('Cart', cartSchema);

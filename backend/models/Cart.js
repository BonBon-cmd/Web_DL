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
 *           description: User ID
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               tour:
 *                 type: string
 *                 description: Tour ID
 *               startDate:
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
    required: [true, 'Cart must belong to a user'],
    unique: true
  },
  items: [{
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Please provide a tour']
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide a start date']
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
  totalItems: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for faster queries
cartSchema.index({ user: 1 });

// Virtual field to get total
cartSchema.virtual('itemCount').get(function() {
  return this.items.length;
});

// Pre-save middleware to automatically update totalItems and totalPrice
cartSchema.pre('save', function(next) {
  this.totalItems = this.items.length;
  this.totalPrice = this.items.reduce(function(sum, item) {
    return sum + (item.price * item.numberOfGuests);
  }, 0);
  next();
});

// Method to add item to cart
cartSchema.methods.addItem = async function(tourId, startDate, numberOfGuests, price) {
  // Check if tour already exists in cart with same start date
  const existingItemIndex = this.items.findIndex(function(item) {
    return item.tour.toString() === tourId.toString() && 
           item.startDate.getTime() === new Date(startDate).getTime();
  });

  if (existingItemIndex > -1) {
    // Update existing item
    this.items[existingItemIndex].numberOfGuests += numberOfGuests;
  } else {
    // Add new item
    this.items.push({
      tour: tourId,
      startDate: startDate,
      numberOfGuests: numberOfGuests,
      price: price,
      addedAt: Date.now()
    });
  }

  return await this.save();
};

// Method to remove item from cart
cartSchema.methods.removeItem = async function(tourId, startDate) {
  this.items = this.items.filter(function(item) {
    return !(item.tour.toString() === tourId.toString() && 
             item.startDate.getTime() === new Date(startDate).getTime());
  });

  return await this.save();
};

// Method to update quantity of guests
cartSchema.methods.updateQuantity = async function(tourId, startDate, numberOfGuests) {
  const item = this.items.find(function(item) {
    return item.tour.toString() === tourId.toString() && 
           item.startDate.getTime() === new Date(startDate).getTime();
  });

  if (!item) {
    throw new Error('Item not found in cart');
  }

  if (numberOfGuests < 1) {
    throw new Error('Number of guests must be at least 1');
  }

  item.numberOfGuests = numberOfGuests;
  return await this.save();
};

// Method to clear cart
cartSchema.methods.clearCart = async function() {
  this.items = [];
  return await this.save();
};

// Method to calculate total
cartSchema.methods.calculateTotal = function() {
  return this.items.reduce(function(sum, item) {
    return sum + (item.price * item.numberOfGuests);
  }, 0);
};

module.exports = mongoose.model('Cart', cartSchema);

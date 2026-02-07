const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistItem:
 *       type: object
 *       required:
 *         - tour
 *       properties:
 *         tour:
 *           type: string
 *           description: Tour ID
 *         addedAt:
 *           type: string
 *           format: date-time
 *           description: When tour was added to wishlist
 *         note:
 *           type: string
 *           description: Personal note about the tour
 *     Wishlist:
 *       type: object
 *       required:
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated wishlist ID
 *         user:
 *           type: string
 *           description: User ID (one wishlist per user)
 *         tours:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WishlistItem'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Wishlist must belong to a user']
  },
  tours: [{
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Wishlist item must have a tour']
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    note: {
      type: String,
      trim: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to prevent duplicate tours in same wishlist
wishlistSchema.index({ user: 1, 'tours.tour': 1 }, { unique: true, sparse: true });

// Index for faster queries (user is already unique via compound index)
wishlistSchema.index({ user: 1 }, { unique: true });

// Populate tours when querying
wishlistSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tours.tour',
    select: 'title price duration location images ratingsAverage'
  });
  next();
});

// Update timestamps before save
wishlistSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

/**
 * Method to add tour to wishlist
 * @param {ObjectId} tourId - Tour ID to add
 * @param {String} note - Optional note about the tour
 * @returns {Promise<Wishlist>} Updated wishlist
 */
wishlistSchema.methods.addTour = async function(tourId, note = '') {
  // Check if tour already exists in wishlist
  const tourExists = this.tours.some(
    item => item.tour.toString() === tourId.toString()
  );

  if (tourExists) {
    throw new Error('Tour already in wishlist');
  }

  // Verify tour exists
  const Tour = mongoose.model('Tour');
  const tour = await Tour.findById(tourId);
  
  if (!tour) {
    throw new Error('Tour not found');
  }

  // Add tour to wishlist
  this.tours.push({
    tour: tourId,
    note: note,
    addedAt: Date.now()
  });

  return await this.save();
};

/**
 * Method to remove tour from wishlist
 * @param {ObjectId} tourId - Tour ID to remove
 * @returns {Promise<Wishlist>} Updated wishlist
 */
wishlistSchema.methods.removeTour = async function(tourId) {
  const initialLength = this.tours.length;
  
  this.tours = this.tours.filter(
    item => item.tour.toString() !== tourId.toString()
  );

  if (this.tours.length === initialLength) {
    throw new Error('Tour not found in wishlist');
  }

  return await this.save();
};

/**
 * Method to check if tour is in wishlist
 * @param {ObjectId} tourId - Tour ID to check
 * @returns {Boolean} True if tour is in wishlist
 */
wishlistSchema.methods.isTourInWishlist = function(tourId) {
  return this.tours.some(
    item => item.tour.toString() === tourId.toString()
  );
};

module.exports = mongoose.model('Wishlist', wishlistSchema);

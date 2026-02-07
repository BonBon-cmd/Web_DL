const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       required:
 *         - user
 *         - tour
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated wishlist ID
 *         user:
 *           type: string
 *           description: User ID
 *         tour:
 *           type: string
 *           description: Tour ID
 *         note:
 *           type: string
 *           description: Personal note about the tour
 *         createdAt:
 *           type: string
 *           format: date-time
 */

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Wishlist item must belong to a user']
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: [true, 'Wishlist item must have a tour']
  },
  note: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound unique index to prevent duplicates
wishlistSchema.index({ user: 1, tour: 1 }, { unique: true });

// Populate tour with essential fields
wishlistSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tour',
    select: 'title price images location duration ratingsAverage'
  });
  next();
});

/**
 * Check if tour is in user's wishlist
 * @param {ObjectId} userId - User ID
 * @param {ObjectId} tourId - Tour ID
 * @returns {Boolean} - True if tour is in wishlist
 */
wishlistSchema.statics.isInWishlist = async function(userId, tourId) {
  const wishlistItem = await this.findOne({ user: userId, tour: tourId });
  return !!wishlistItem;
};

module.exports = mongoose.model('Wishlist', wishlistSchema);

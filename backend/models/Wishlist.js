const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
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
 *           description: User ID
 *         tours:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               tour:
 *                 type: string
 *                 description: Tour ID
 *               addedAt:
 *                 type: string
 *                 format: date-time
 *               notes:
 *                 type: string
 *                 description: Personal notes about the tour
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
    required: [true, 'Wishlist must belong to a user'],
    unique: true
  },
  tours: [{
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Please provide a tour']
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      trim: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
wishlistSchema.index({ user: 1 });

// Compound index for user and tour (unique)
wishlistSchema.index({ 'user': 1, 'tours.tour': 1 });

// Pre-find middleware to populate tours with detailed information
wishlistSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tours.tour',
    select: 'title description price duration images location ratingsAverage ratingsQuantity featured'
  });
  next();
});

// Method to add tour to wishlist
wishlistSchema.methods.addTour = async function(tourId, notes) {
  // Check if tour already exists in wishlist
  const existingTour = this.tours.find(function(item) {
    return item.tour.toString() === tourId.toString();
  });

  if (existingTour) {
    throw new Error('Tour already exists in wishlist');
  }

  this.tours.push({
    tour: tourId,
    addedAt: Date.now(),
    notes: notes || ''
  });

  return await this.save();
};

// Method to remove tour from wishlist
wishlistSchema.methods.removeTour = async function(tourId) {
  const initialLength = this.tours.length;
  
  this.tours = this.tours.filter(function(item) {
    return item.tour.toString() !== tourId.toString();
  });

  if (this.tours.length === initialLength) {
    throw new Error('Tour not found in wishlist');
  }

  return await this.save();
};

// Method to check if tour is in wishlist
wishlistSchema.methods.isTourInWishlist = function(tourId) {
  return this.tours.some(function(item) {
    return item.tour.toString() === tourId.toString();
  });
};

// Static method to get popular tours (most wishlisted)
wishlistSchema.statics.getPopularTours = async function(limit) {
  limit = limit || 10;
  
  return await this.aggregate([
    { $unwind: '$tours' },
    {
      $group: {
        _id: '$tours.tour',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: 'tours',
        localField: '_id',
        foreignField: '_id',
        as: 'tourDetails'
      }
    },
    { $unwind: '$tourDetails' },
    {
      $project: {
        _id: 0,
        tour: '$tourDetails',
        wishlistCount: '$count'
      }
    }
  ]);
};

module.exports = mongoose.model('Wishlist', wishlistSchema);

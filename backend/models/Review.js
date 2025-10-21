const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - tour
 *         - user
 *         - rating
 *         - comment
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated review ID
 *         tour:
 *           type: string
 *           description: Tour ID
 *         user:
 *           type: string
 *           description: User ID
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *         comment:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

const reviewSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Please provide a comment'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate reviews from same user for same tour
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// Populate user when querying
reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name avatar'
  });
  next();
});

// Calculate average rating for tour
reviewSchema.statics.calcAverageRatings = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await mongoose.model('Tour').findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: Math.round(stats[0].avgRating * 10) / 10
    });
  } else {
    await mongoose.model('Tour').findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 0
    });
  }
};

// Update tour ratings after save
reviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.tour);
});

// Update tour ratings after delete
reviewSchema.post(/^findOneAnd/, async function(doc) {
  if (doc) {
    await doc.constructor.calcAverageRatings(doc.tour);
  }
});

module.exports = mongoose.model('Review', reviewSchema);

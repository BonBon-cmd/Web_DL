const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Tour:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - duration
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated tour ID
 *         title:
 *           type: string
 *           description: Tour title
 *         description:
 *           type: string
 *           description: Tour description
 *         price:
 *           type: number
 *           description: Tour price
 *         duration:
 *           type: number
 *           description: Tour duration in days
 *         maxGroupSize:
 *           type: number
 *           description: Maximum group size
 *         difficulty:
 *           type: string
 *           enum: [easy, medium, difficult]
 *         ratingsAverage:
 *           type: number
 *           description: Average rating
 *         ratingsQuantity:
 *           type: number
 *           description: Number of ratings
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Tour images
 *         startDates:
 *           type: array
 *           items:
 *             type: string
 *             format: date
 *         location:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *             country:
 *               type: string
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *         featured:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 */

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A tour must have a title'],
    trim: true,
    maxlength: [100, 'Tour title must be less than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'A tour must have a description'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
    default: 10
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'difficult'],
    default: 'medium'
  },
  ratingsAverage: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  images: [{
    type: String
  }],
  startDates: [{
    type: Date
  }],
  location: {
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    address: String,
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate for reviews
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

module.exports = mongoose.model('Tour', tourSchema);

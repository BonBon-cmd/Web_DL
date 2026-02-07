const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - user
 *         - type
 *         - title
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated notification ID
 *         user:
 *           type: string
 *           description: User ID (recipient)
 *         type:
 *           type: string
 *           enum: [booking, payment, review, promotion, system]
 *         title:
 *           type: string
 *           maxLength: 200
 *         message:
 *           type: string
 *         relatedId:
 *           type: string
 *           description: Related object ID (booking, payment, etc.)
 *         relatedModel:
 *           type: string
 *           description: Related model name
 *         isRead:
 *           type: boolean
 *           default: false
 *         priority:
 *           type: string
 *           enum: [low, normal, high, urgent]
 *           default: normal
 *         expiresAt:
 *           type: string
 *           format: date-time
 *           description: Notification expiration date
 *         createdAt:
 *           type: string
 *           format: date-time
 */

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Notification must belong to a user']
  },
  type: {
    type: String,
    required: [true, 'Please provide notification type'],
    enum: {
      values: ['booking', 'payment', 'review', 'promotion', 'system'],
      message: 'Type must be one of: booking, payment, review, promotion, system'
    }
  },
  title: {
    type: String,
    required: [true, 'Please provide notification title'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Please provide notification message']
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId
  },
  relatedModel: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'normal', 'high', 'urgent'],
      message: 'Priority must be one of: low, normal, high, urgent'
    },
    default: 'normal'
  },
  expiresAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for faster queries
notificationSchema.index({ user: 1 });
notificationSchema.index({ isRead: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ expiresAt: 1 });

// Remove expired notifications when querying
notificationSchema.pre(/^find/, function(next) {
  this.where({
    $or: [
      { expiresAt: null },
      { expiresAt: { $gt: new Date() } }
    ]
  });
  next();
});

// Sort by createdAt (most recent first)
// Note: Priority field sorts alphabetically. For custom priority order,
// handle sorting in application code or use a numeric priority field.
notificationSchema.pre(/^find/, function(next) {
  this.sort({ createdAt: -1 });
  next();
});

/**
 * Mark notification as read
 */
notificationSchema.methods.markAsRead = async function() {
  this.isRead = true;
  return await this.save();
};

/**
 * Get unread notification count for user
 * @param {ObjectId} userId - User ID
 * @returns {Number} - Count of unread notifications
 */
notificationSchema.statics.getUnreadCount = async function(userId) {
  return await this.countDocuments({
    user: userId,
    isRead: false,
    $or: [
      { expiresAt: null },
      { expiresAt: { $gt: new Date() } }
    ]
  });
};

module.exports = mongoose.model('Notification', notificationSchema);

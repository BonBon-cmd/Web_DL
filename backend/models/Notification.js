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
 *           description: User ID who receives the notification
 *         type:
 *           type: string
 *           enum: [booking, payment, review, promotion, system, reminder]
 *           description: Type of notification
 *         title:
 *           type: string
 *           maxLength: 200
 *           description: Notification title
 *         message:
 *           type: string
 *           description: Notification message
 *         relatedId:
 *           type: string
 *           description: ID of related object (booking, payment, etc.)
 *         relatedModel:
 *           type: string
 *           enum: [Booking, Payment, Tour, Review]
 *           description: Model type of related object
 *         isRead:
 *           type: boolean
 *           description: Whether notification has been read
 *         readAt:
 *           type: string
 *           format: date-time
 *           description: When notification was read
 *         priority:
 *           type: string
 *           enum: [low, normal, high, urgent]
 *           description: Notification priority level
 *         actionUrl:
 *           type: string
 *           description: URL to view related content
 *         expiresAt:
 *           type: string
 *           format: date-time
 *           description: When notification expires
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
    enum: ['booking', 'payment', 'review', 'promotion', 'system', 'reminder']
  },
  title: {
    type: String,
    required: [true, 'Please provide notification title'],
    maxlength: [200, 'Title cannot exceed 200 characters'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please provide notification message'],
    trim: true
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'relatedModel'
  },
  relatedModel: {
    type: String,
    enum: ['Booking', 'Payment', 'Tour', 'Review']
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  actionUrl: {
    type: String,
    trim: true
  },
  expiresAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for efficient queries
notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ user: 1, type: 1 });
notificationSchema.index({ expiresAt: 1 });

/**
 * Method to mark notification as read
 * @returns {Promise<Notification>} Updated notification
 */
notificationSchema.methods.markAsRead = async function() {
  if (!this.isRead) {
    this.isRead = true;
    this.readAt = Date.now();
    return await this.save();
  }
  return this;
};

/**
 * Method to check if notification has expired
 * @returns {Boolean} True if notification has expired
 */
notificationSchema.methods.isExpired = function() {
  if (!this.expiresAt) {
    return false;
  }
  return new Date() > this.expiresAt;
};

/**
 * Static method to create a notification
 * @param {ObjectId} userId - User ID to send notification to
 * @param {String} type - Notification type
 * @param {String} title - Notification title
 * @param {String} message - Notification message
 * @param {Object} options - Additional options (relatedId, relatedModel, priority, actionUrl, expiresAt)
 * @returns {Promise<Notification>} Created notification
 */
notificationSchema.statics.createNotification = async function(userId, type, title, message, options = {}) {
  const notification = await this.create({
    user: userId,
    type,
    title,
    message,
    relatedId: options.relatedId,
    relatedModel: options.relatedModel,
    priority: options.priority || 'normal',
    actionUrl: options.actionUrl,
    expiresAt: options.expiresAt
  });

  return notification;
};

/**
 * Static method to get unread notification count for a user
 * @param {ObjectId} userId - User ID
 * @returns {Promise<Number>} Count of unread notifications
 */
notificationSchema.statics.getUnreadCount = async function(userId) {
  return await this.countDocuments({
    user: userId,
    isRead: false,
    $or: [
      { expiresAt: { $exists: false } },
      { expiresAt: { $gt: Date.now() } }
    ]
  });
};

/**
 * Static method to mark all notifications as read for a user
 * @param {ObjectId} userId - User ID
 * @returns {Promise<Object>} Update result
 */
notificationSchema.statics.markAllAsRead = async function(userId) {
  return await this.updateMany(
    { user: userId, isRead: false },
    { isRead: true, readAt: Date.now() }
  );
};

module.exports = mongoose.model('Notification', notificationSchema);

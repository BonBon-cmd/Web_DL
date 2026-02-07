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
 *           description: User ID
 *         type:
 *           type: string
 *           enum: [booking, payment, promotion, review, system, tour_update]
 *           description: Notification type
 *         title:
 *           type: string
 *           maxLength: 200
 *           description: Notification title
 *         message:
 *           type: string
 *           description: Notification message
 *         relatedEntity:
 *           type: object
 *           properties:
 *             entityType:
 *               type: string
 *               enum: [Booking, Payment, Tour, Review, Voucher]
 *             entityId:
 *               type: string
 *         isRead:
 *           type: boolean
 *           default: false
 *         readAt:
 *           type: string
 *           format: date-time
 *         priority:
 *           type: string
 *           enum: [low, normal, high, urgent]
 *           default: normal
 *         expiresAt:
 *           type: string
 *           format: date-time
 *           description: Notification auto-deletion time
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
      values: ['booking', 'payment', 'promotion', 'review', 'system', 'tour_update'],
      message: 'Invalid notification type'
    }
  },
  title: {
    type: String,
    required: [true, 'Please provide notification title'],
    trim: true,
    maxlength: [200, 'Title must be less than 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Please provide notification message'],
    trim: true
  },
  relatedEntity: {
    entityType: {
      type: String,
      enum: ['Booking', 'Payment', 'Tour', 'Review', 'Voucher']
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId
    }
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
    enum: {
      values: ['low', 'normal', 'high', 'urgent'],
      message: 'Invalid priority level'
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
}, {
  timestamps: true
});

// Indexes for faster queries
notificationSchema.index({ user: 1 });
notificationSchema.index({ isRead: 1 });
notificationSchema.index({ createdAt: -1 });

// Compound index for user and isRead
notificationSchema.index({ user: 1, isRead: 1 });

// TTL index for automatic deletion of expired notifications
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Method to mark notification as read
notificationSchema.methods.markAsRead = async function() {
  if (this.isRead) {
    return this;
  }
  
  this.isRead = true;
  this.readAt = Date.now();
  return await this.save();
};

// Static method to mark all notifications as read for a user
notificationSchema.statics.markAllAsRead = async function(userId) {
  return await this.updateMany(
    { user: userId, isRead: false },
    { 
      $set: { 
        isRead: true, 
        readAt: Date.now() 
      } 
    }
  );
};

// Static method to delete old notifications
notificationSchema.statics.deleteOldNotifications = async function(daysOld) {
  daysOld = daysOld || 30;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);
  
  return await this.deleteMany({
    createdAt: { $lt: cutoffDate },
    isRead: true
  });
};

// Static method to create notification
notificationSchema.statics.createNotification = async function(data) {
  const notification = await this.create({
    user: data.user,
    type: data.type,
    title: data.title,
    message: data.message,
    relatedEntity: data.relatedEntity,
    priority: data.priority || 'normal',
    expiresAt: data.expiresAt
  });
  
  return notification;
};

// Static method to get unread count for a user
notificationSchema.statics.getUnreadCount = async function(userId) {
  return await this.countDocuments({
    user: userId,
    isRead: false
  });
};

module.exports = mongoose.model('Notification', notificationSchema);

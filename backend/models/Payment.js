const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - booking
 *         - user
 *         - amount
 *         - paymentMethod
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated payment ID
 *         booking:
 *           type: string
 *           description: Booking ID
 *         user:
 *           type: string
 *           description: User ID
 *         amount:
 *           type: number
 *           description: Payment amount
 *         paymentMethod:
 *           type: string
 *           enum: [credit_card, debit_card, bank_transfer, momo, zalopay, vnpay, paypal, cash]
 *         paymentStatus:
 *           type: string
 *           enum: [pending, processing, completed, failed, refunded, cancelled]
 *         transactionId:
 *           type: string
 *           description: External transaction ID from payment gateway
 *         paymentGateway:
 *           type: string
 *           description: Payment gateway used
 *         paymentDate:
 *           type: string
 *           format: date-time
 *         paidAt:
 *           type: string
 *           format: date-time
 *         refundAmount:
 *           type: number
 *         refundDate:
 *           type: string
 *           format: date-time
 *         refundedAt:
 *           type: string
 *           format: date-time
 *         refundReason:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Payment must belong to a booking']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Payment must belong to a user']
  },
  amount: {
    type: Number,
    required: [true, 'Please provide payment amount'],
    min: 0
  },
  currency: {
    type: String,
    default: 'VND',
    enum: ['VND', 'USD', 'EUR']
  },
  paymentMethod: {
    type: String,
    required: [true, 'Please provide payment method'],
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'momo', 'zalopay', 'vnpay', 'paypal', 'cash']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    sparse: true
  },
  paymentGateway: {
    type: String,
    enum: ['momo', 'zalopay', 'vnpay', 'paypal', 'stripe', 'manual']
  },
  paymentDate: {
    type: Date
  },
  paidAt: {
    type: Date
  },
  paymentDetails: {
    cardLastFour: String,
    cardType: String,
    bankName: String,
    accountNumber: String
  },
  refundAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  refundDate: {
    type: Date
  },
  refundedAt: {
    type: Date
  },
  refundReason: {
    type: String,
    trim: true
  },
  refundStatus: {
    type: String,
    enum: ['none', 'requested', 'processing', 'completed', 'rejected'],
    default: 'none'
  },
  notes: {
    type: String,
    trim: true
  },
  ipAddress: String,
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for faster queries
paymentSchema.index({ booking: 1 });
paymentSchema.index({ user: 1 });
paymentSchema.index({ paymentStatus: 1 });
paymentSchema.index({ transactionId: 1 }, { unique: true, sparse: true });
paymentSchema.index({ createdAt: -1 });

// Populate booking and user when querying
paymentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'booking',
    select: 'bookingDate numberOfGuests totalPrice status'
  }).populate({
    path: 'user',
    select: 'name email phone'
  });
  next();
});

// Method to process refund
paymentSchema.methods.processRefund = async function(amount, reason) {
  if (this.paymentStatus !== 'completed') {
    throw new Error('Can only refund completed payments');
  }
  
  if (amount > this.amount) {
    throw new Error('Refund amount cannot exceed payment amount');
  }
  
  this.refundAmount = amount;
  this.refundDate = new Date();
  this.refundedAt = new Date();
  this.refundReason = reason;
  this.refundStatus = 'processing';
  
  if (amount === this.amount) {
    this.paymentStatus = 'refunded';
  }
  
  return await this.save();
};

// Method to mark payment as completed
paymentSchema.methods.markAsCompleted = async function(transactionId) {
  this.paymentStatus = 'completed';
  this.paymentDate = new Date();
  this.paidAt = new Date();
  if (transactionId) {
    this.transactionId = transactionId;
  }
  return await this.save();
};

// Static method to get payment statistics
paymentSchema.statics.getPaymentStats = async function(startDate, endDate) {
  return await this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
        paymentStatus: 'completed'
      }
    },
    {
      $group: {
        _id: '$paymentMethod',
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 },
        avgAmount: { $avg: '$amount' }
      }
    },
    {
      $sort: { totalAmount: -1 }
    }
  ]);
};

module.exports = mongoose.model('Payment', paymentSchema);
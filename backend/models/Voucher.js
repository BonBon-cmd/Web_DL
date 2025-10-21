const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please provide voucher code'],
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: [true, 'Please provide discount type']
  },
  discountValue: {
    type: Number,
    required: [true, 'Please provide discount value'],
    min: 0
  },
  minPurchase: {
    type: Number,
    default: 0,
    min: 0
  },
  maxDiscount: {
    type: Number,
    default: null
  },
  usageLimit: {
    type: Number,
    default: null
  },
  usedCount: {
    type: Number,
    default: 0
  },
  validFrom: {
    type: Date,
    required: [true, 'Please provide valid from date']
  },
  validTo: {
    type: Date,
    required: [true, 'Please provide valid to date']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicableTours: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for faster queries
voucherSchema.index({ code: 1 });
voucherSchema.index({ isActive: 1, validFrom: 1, validTo: 1 });

// Method to check if voucher is valid
voucherSchema.methods.isValid = function() {
  const now = new Date();
  
  if (!this.isActive) return { valid: false, message: 'Voucher is not active' };
  if (now < this.validFrom) return { valid: false, message: 'Voucher is not yet valid' };
  if (now > this.validTo) return { valid: false, message: 'Voucher has expired' };
  if (this.usageLimit && this.usedCount >= this.usageLimit) {
    return { valid: false, message: 'Voucher usage limit reached' };
  }
  
  return { valid: true };
};

// Method to calculate discount
voucherSchema.methods.calculateDiscount = function(totalPrice) {
  if (totalPrice < this.minPurchase) {
    return {
      applicable: false,
      message: `Minimum purchase amount is ${this.minPurchase}`,
      discount: 0
    };
  }
  
  let discount = 0;
  
  if (this.discountType === 'percentage') {
    discount = (totalPrice * this.discountValue) / 100;
    if (this.maxDiscount && discount > this.maxDiscount) {
      discount = this.maxDiscount;
    }
  } else {
    discount = this.discountValue;
  }
  
  return {
    applicable: true,
    discount: discount,
    finalPrice: totalPrice - discount
  };
};

module.exports = mongoose.model('Voucher', voucherSchema);

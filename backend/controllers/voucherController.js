const Voucher = require('../models/Voucher');
const Booking = require('../models/Booking');

// @desc    Get all vouchers
// @route   GET /api/vouchers
// @access  Private/Admin
exports.getVouchers = async (req, res) => {
  try {
    const { active, search } = req.query;
    
    let query = {};
    
    // Filter by active status
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    
    // Search by code or description
    if (search) {
      query.$or = [
        { code: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const vouchers = await Voucher.find(query)
      .populate('createdBy', 'name email')
      .populate('applicableTours', 'title')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: vouchers.length,
      data: vouchers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single voucher
// @route   GET /api/vouchers/:id
// @access  Private/Admin
exports.getVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('applicableTours', 'title');
    
    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Voucher not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: voucher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Validate and apply voucher
// @route   POST /api/vouchers/validate
// @access  Private (requires login)
exports.validateVoucher = async (req, res) => {
  try {
    const { code, totalPrice, tourId } = req.body;
    
    const voucher = await Voucher.findOne({ code: code.toUpperCase() });
    
    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Invalid voucher code'
      });
    }
    
    // Check if user has already used this voucher
    const existingBookingWithVoucher = await Booking.findOne({
      user: req.user.id,
      voucherApplied: voucher._id
    });

    if (existingBookingWithVoucher) {
      return res.status(400).json({
        success: false,
        message: 'You have already used this voucher'
      });
    }
    
    // Check if voucher is valid
    const validityCheck = voucher.isValid();
    if (!validityCheck.valid) {
      return res.status(400).json({
        success: false,
        message: validityCheck.message
      });
    }
    
    // Check if voucher applies to specific tours
    if (voucher.applicableTours.length > 0 && tourId) {
      const isTourApplicable = voucher.applicableTours.some(
        tour => tour.toString() === tourId
      );
      
      if (!isTourApplicable) {
        return res.status(400).json({
          success: false,
          message: 'Voucher is not applicable to this tour'
        });
      }
    }
    
    // Calculate discount
    const discountResult = voucher.calculateDiscount(totalPrice);
    
    if (!discountResult.applicable) {
      return res.status(400).json({
        success: false,
        message: discountResult.message
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        voucherId: voucher._id,
        code: voucher.code,
        description: voucher.description,
        discountType: voucher.discountType,
        discountValue: voucher.discountValue,
        discount: discountResult.discount,
        originalPrice: totalPrice,
        finalPrice: discountResult.finalPrice
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create voucher
// @route   POST /api/vouchers
// @access  Private/Admin
exports.createVoucher = async (req, res) => {
  try {
    // Add createdBy field
    req.body.createdBy = req.user.id;
    
    const voucher = await Voucher.create(req.body);
    
    res.status(201).json({
      success: true,
      data: voucher
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update voucher
// @route   PUT /api/vouchers/:id
// @access  Private/Admin
exports.updateVoucher = async (req, res) => {
  try {
    let voucher = await Voucher.findById(req.params.id);
    
    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Voucher not found'
      });
    }
    
    voucher = await Voucher.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: voucher
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete voucher
// @route   DELETE /api/vouchers/:id
// @access  Private/Admin
exports.deleteVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    
    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Voucher not found'
      });
    }
    
    await voucher.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Voucher deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Increment voucher usage
// @route   PUT /api/vouchers/:id/use
// @access  Private
exports.useVoucher = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    
    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Voucher not found'
      });
    }
    
    voucher.usedCount += 1;
    await voucher.save();
    
    res.status(200).json({
      success: true,
      data: voucher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

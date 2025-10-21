const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const User = require('../models/User');
const Voucher = require('../models/Voucher');

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings (Admin) or user's bookings (User)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings
 */
exports.getAllBookings = async (req, res) => {
  try {
    let query = {};

    // If user is not admin, only show their bookings
    if (req.user.role !== 'admin') {
      query.user = req.user.id;
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const bookings = await Booking.find(query)
      .sort('-createdAt')
      .limit(limit)
      .skip(startIndex);

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking data
 *       404:
 *         description: Booking not found
 */
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 */
exports.createBooking = async (req, res) => {
  try {
    const { tour, bookingDate, numberOfGuests, specialRequests, userId, userEmail, status, paymentStatus, voucherCode } = req.body;

    // Get tour details
    const tourDetails = await Tour.findById(tour);
    if (!tourDetails) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    // Check if group size exceeds max
    if (numberOfGuests > tourDetails.maxGroupSize) {
      return res.status(400).json({
        success: false,
        message: `Maximum group size is ${tourDetails.maxGroupSize}`
      });
    }

    // Calculate original price
    const originalPrice = tourDetails.price * numberOfGuests;
    let totalPrice = originalPrice;
    let voucherApplied = null;
    let discountAmount = 0;

    // Apply voucher if provided
    if (voucherCode) {
      const voucher = await Voucher.findOne({ code: voucherCode.toUpperCase() });
      
      if (!voucher) {
        return res.status(400).json({
          success: false,
          message: 'Invalid voucher code'
        });
      }

      // Validate voucher
      const validation = voucher.isValid();
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          message: validation.message
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

      // Check if voucher is applicable to this tour
      if (voucher.applicableTours && voucher.applicableTours.length > 0) {
        const isTourApplicable = voucher.applicableTours.some(
          applicableTour => applicableTour.toString() === tour.toString()
        );
        if (!isTourApplicable) {
          return res.status(400).json({
            success: false,
            message: 'This voucher is not applicable to this tour'
          });
        }
      }

      // Check minimum purchase requirement
      if (voucher.minPurchase && originalPrice < voucher.minPurchase) {
        return res.status(400).json({
          success: false,
          message: `Minimum purchase amount is ${voucher.minPurchase.toLocaleString()} VND`
        });
      }

      // Calculate discount
      const discountResult = voucher.calculateDiscount(originalPrice);
      if (discountResult.applicable) {
        discountAmount = discountResult.discount;
        totalPrice = discountResult.finalPrice;
        voucherApplied = voucher._id;

        // Increment voucher usage count
        voucher.usedCount += 1;
        await voucher.save();
      }
    }

    // Determine booking user
    let bookingUserId = req.user.id;

    // Admin can create booking for any user
    if (req.user.role === 'admin') {
      if (userId) {
        bookingUserId = userId;
      } else if (userEmail) {
        // Find user by email
        const user = await User.findOne({ email: userEmail });
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User with this email not found. Please register first.'
          });
        }
        bookingUserId = user._id;
      }
    }

    // Create booking data
    const bookingData = {
      tour,
      user: bookingUserId,
      bookingDate,
      numberOfGuests,
      totalPrice,
      specialRequests
    };

    // Add voucher information if applied
    if (voucherApplied) {
      bookingData.voucherApplied = voucherApplied;
      bookingData.originalPrice = originalPrice;
      bookingData.discountAmount = discountAmount;
      bookingData.finalPrice = totalPrice;
    }

    // Admin can set status and payment status
    if (req.user.role === 'admin') {
      if (status) bookingData.status = status;
      if (paymentStatus) bookingData.paymentStatus = paymentStatus;
    }

    // Create booking
    const booking = await Booking.create(bookingData);

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Update booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 */
exports.updateBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 */
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this booking'
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

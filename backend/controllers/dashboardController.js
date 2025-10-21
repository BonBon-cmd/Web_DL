const Booking = require('../models/Booking');
const Tour = require('../models/Tour');
const User = require('../models/User');

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics (Admin only)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
exports.getDashboardStats = async (req, res) => {
  try {
    // Total counts
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalTours = await Tour.countDocuments();
    const totalBookings = await Booking.countDocuments();

    // Revenue statistics
    const revenueStats = await Booking.aggregate([
      {
        $match: { paymentStatus: 'paid' }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
          averageBookingValue: { $avg: '$totalPrice' }
        }
      }
    ]);

    // Bookings by status
    const bookingsByStatus = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Monthly bookings trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyBookings = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          revenue: { $sum: '$totalPrice' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Top tours by bookings
    const topTours = await Booking.aggregate([
      {
        $group: {
          _id: '$tour',
          bookingCount: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' }
        }
      },
      {
        $sort: { bookingCount: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: 'tours',
          localField: '_id',
          foreignField: '_id',
          as: 'tourDetails'
        }
      },
      {
        $unwind: '$tourDetails'
      },
      {
        $project: {
          tourTitle: '$tourDetails.title',
          bookingCount: 1,
          totalRevenue: 1
        }
      }
    ]);

    // Recent bookings
    const recentBookings = await Booking.find()
      .sort('-createdAt')
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalTours,
          totalBookings,
          totalRevenue: revenueStats[0]?.totalRevenue || 0,
          averageBookingValue: revenueStats[0]?.averageBookingValue || 0
        },
        bookingsByStatus,
        monthlyBookings,
        topTours,
        recentBookings
      }
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
 * /api/dashboard/revenue:
 *   get:
 *     summary: Get revenue statistics (Admin only)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Revenue statistics
 */
exports.getRevenueStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    }

    const revenueByPeriod = await Booking.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          ...dateFilter
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          dailyRevenue: { $sum: '$totalPrice' },
          bookingCount: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: revenueByPeriod
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

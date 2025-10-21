const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getRevenueStats
} = require('../controllers/dashboardController');
const { protect, restrictTo } = require('../middleware/auth');

router.get('/stats', protect, restrictTo('admin'), getDashboardStats);
router.get('/revenue', protect, restrictTo('admin'), getRevenueStats);

module.exports = router;

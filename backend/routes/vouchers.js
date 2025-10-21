const express = require('express');
const router = express.Router();
const {
  getVouchers,
  getVoucher,
  validateVoucher,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  useVoucher
} = require('../controllers/voucherController');

const { protect, restrictTo } = require('../middleware/auth');

// Protected routes (User - require login)
router.post('/validate', protect, validateVoucher);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin'));

router.route('/')
  .get(getVouchers)
  .post(createVoucher);

router.route('/:id')
  .get(getVoucher)
  .put(updateVoucher)
  .delete(deleteVoucher);

router.put('/:id/use', useVoucher);

module.exports = router;

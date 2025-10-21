const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadAvatar,
  changePassword
} = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);
router.put('/password', protect, changePassword);

module.exports = router;

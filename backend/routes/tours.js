const express = require('express');
const router = express.Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  uploadTourImages
} = require('../controllers/tourController');
const { protect, restrictTo } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin'), createTour);

router.route('/:id')
  .get(getTour)
  .put(protect, restrictTo('admin'), updateTour)
  .delete(protect, restrictTo('admin'), deleteTour);

router.post('/:id/upload-images', 
  protect, 
  restrictTo('admin'), 
  upload.array('images', 5),
  uploadTourImages
);

module.exports = router;

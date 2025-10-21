const Tour = require('../models/Tour');

/**
 * @swagger
 * /api/tours:
 *   get:
 *     summary: Get all tours with search, sort, and pagination
 *     tags: [Tours]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., -price, duration)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title and description
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *         description: Filter by difficulty
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *     responses:
 *       200:
 *         description: List of tours
 */
exports.getAllTours = async (req, res) => {
  try {
    // Build query
    let query = {};

    // Search
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Filter by difficulty
    if (req.query.difficulty) {
      query.difficulty = req.query.difficulty;
    }

    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // Filter by featured
    if (req.query.featured) {
      query.featured = req.query.featured === 'true';
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Sort
    let sort = '-createdAt';
    if (req.query.sort) {
      sort = req.query.sort.split(',').join(' ');
    }

    // Execute query
    const tours = await Tour.find(query)
      .sort(sort)
      .limit(limit)
      .skip(startIndex)
      .populate('reviews');

    // Get total count
    const total = await Tour.countDocuments(query);

    res.status(200).json({
      success: true,
      count: tours.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: tours
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
 * /api/tours/{id}:
 *   get:
 *     summary: Get tour by ID
 *     tags: [Tours]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tour data
 *       404:
 *         description: Tour not found
 */
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate('reviews');

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.status(200).json({
      success: true,
      data: tour
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
 * /api/tours:
 *   post:
 *     summary: Create a new tour (Admin only)
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tour'
 *     responses:
 *       201:
 *         description: Tour created successfully
 *       401:
 *         description: Not authorized
 */
exports.createTour = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const tour = await Tour.create(req.body);

    res.status(201).json({
      success: true,
      data: tour
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
 * /api/tours/{id}:
 *   put:
 *     summary: Update tour (Admin only)
 *     tags: [Tours]
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
 *             $ref: '#/components/schemas/Tour'
 *     responses:
 *       200:
 *         description: Tour updated successfully
 *       404:
 *         description: Tour not found
 */
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.status(200).json({
      success: true,
      data: tour
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
 * /api/tours/{id}:
 *   delete:
 *     summary: Delete tour (Admin only)
 *     tags: [Tours]
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
 *         description: Tour deleted successfully
 *       404:
 *         description: Tour not found
 */
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tour deleted successfully'
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
 * /api/tours/{id}/upload-images:
 *   post:
 *     summary: Upload tour images (Admin only)
 *     tags: [Tours]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 */
exports.uploadTourImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one image'
      });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      { $push: { images: { $each: imageUrls } } },
      { new: true }
    );

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.status(200).json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

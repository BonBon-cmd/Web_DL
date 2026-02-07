const mongoose = require('mongoose');
const slugify = require('slugify');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated category ID
 *         name:
 *           type: string
 *           description: Category name
 *         slug:
 *           type: string
 *           description: URL-friendly slug (auto-generated)
 *         description:
 *           type: string
 *           description: Category description
 *         image:
 *           type: string
 *           description: Category image URL
 *         icon:
 *           type: string
 *           description: Icon class name (e.g., fa-mountain)
 *         parentCategory:
 *           type: string
 *           description: Parent category ID for hierarchical structure
 *         order:
 *           type: number
 *           default: 0
 *           description: Display order
 *         isActive:
 *           type: boolean
 *           default: true
 *         tourCount:
 *           type: number
 *           default: 0
 *           description: Number of tours in this category
 *         metadata:
 *           type: object
 *           properties:
 *             metaTitle:
 *               type: string
 *             metaDescription:
 *               type: string
 *             metaKeywords:
 *               type: array
 *               items:
 *                 type: string
 *         createdBy:
 *           type: string
 *           description: User ID who created the category
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide category name'],
    unique: true,
    trim: true,
    maxlength: [100, 'Category name must be less than 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tourCount: {
    type: Number,
    default: 0,
    min: 0
  },
  metadata: {
    metaTitle: {
      type: String,
      trim: true
    },
    metaDescription: {
      type: String,
      trim: true
    },
    metaKeywords: [{
      type: String,
      trim: true
    }]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for faster queries
categorySchema.index({ slug: 1 });
categorySchema.index({ isActive: 1 });
categorySchema.index({ order: 1 });
categorySchema.index({ parentCategory: 1 });

// Virtual populate for subcategories
categorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parentCategory'
});

// Pre-save middleware to automatically create slug from name
categorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  next();
});

// Pre-save middleware to validate parentCategory (prevent circular reference)
categorySchema.pre('save', async function(next) {
  if (this.parentCategory) {
    // Check if parent exists
    const parent = await this.constructor.findById(this.parentCategory);
    if (!parent) {
      throw new Error('Parent category does not exist');
    }
    
    // Check for circular reference
    if (this.parentCategory.toString() === this._id.toString()) {
      throw new Error('Category cannot be its own parent');
    }
    
    // Check if parent is a descendant of this category
    let currentParent = parent;
    while (currentParent.parentCategory) {
      if (currentParent.parentCategory.toString() === this._id.toString()) {
        throw new Error('Circular reference detected in category hierarchy');
      }
      currentParent = await this.constructor.findById(currentParent.parentCategory);
      if (!currentParent) break;
    }
  }
  next();
});

// Method to update tour count
categorySchema.methods.updateTourCount = async function() {
  const Tour = mongoose.model('Tour');
  const count = await Tour.countDocuments({ category: this._id });
  this.tourCount = count;
  return await this.save();
};

// Static method to get active categories
categorySchema.statics.getActiveCategories = async function() {
  return await this.find({ isActive: true })
    .sort({ order: 1, name: 1 })
    .select('name slug description image icon tourCount parentCategory');
};

// Static method to get category tree
categorySchema.statics.getCategoryTree = async function() {
  const categories = await this.find({ isActive: true })
    .sort({ order: 1, name: 1 })
    .lean();
  
  // Build tree structure
  const categoryMap = {};
  const tree = [];
  
  // Create map of all categories
  categories.forEach(function(category) {
    categoryMap[category._id.toString()] = {
      ...category,
      children: []
    };
  });
  
  // Build tree
  categories.forEach(function(category) {
    const categoryNode = categoryMap[category._id.toString()];
    if (category.parentCategory) {
      const parent = categoryMap[category.parentCategory.toString()];
      if (parent) {
        parent.children.push(categoryNode);
      } else {
        tree.push(categoryNode);
      }
    } else {
      tree.push(categoryNode);
    }
  });
  
  return tree;
};

// Static method to get top categories by tour count
categorySchema.statics.getTopCategories = async function(limit) {
  limit = limit || 10;
  
  return await this.find({ isActive: true })
    .sort({ tourCount: -1, name: 1 })
    .limit(limit)
    .select('name slug description image icon tourCount');
};

module.exports = mongoose.model('Category', categorySchema);

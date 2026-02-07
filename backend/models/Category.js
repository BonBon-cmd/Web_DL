const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated category ID
 *         name:
 *           type: string
 *           description: Category name
 *         slug:
 *           type: string
 *           description: URL-friendly category name
 *         description:
 *           type: string
 *           description: Category description
 *         icon:
 *           type: string
 *           description: Category icon or image URL
 *         parent:
 *           type: string
 *           description: Parent category ID (for hierarchical structure)
 *         level:
 *           type: number
 *           description: Level in category tree (0 = root)
 *         order:
 *           type: number
 *           description: Display order
 *         isActive:
 *           type: boolean
 *           description: Whether category is active
 *         metadata:
 *           type: object
 *           description: Additional metadata (SEO, etc.)
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
    maxlength: [100, 'Category name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide category description'],
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  level: {
    type: Number,
    default: 0,
    min: 0
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metadata: {
    type: Object,
    default: {}
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
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for efficient queries
categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ parent: 1, order: 1 });
categorySchema.index({ isActive: 1 });

// Virtual field for children categories
categorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

// Pre-save hook to generate slug and calculate level
categorySchema.pre('save', async function(next) {
  // Generate slug from name if not provided or name changed
  if (this.isModified('name')) {
    // Simple slug generation without external dependencies
    // Note: For full Vietnamese character support, consider adding a transliteration library
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  // Calculate level based on parent
  if (this.isModified('parent')) {
    if (!this.parent) {
      this.level = 0;
    } else {
      const parent = await this.constructor.findById(this.parent);
      if (!parent) {
        // Invalid parent - reject the operation
        return next(new Error('Parent category not found'));
      }
      this.level = parent.level + 1;
    }
  }

  // Update timestamp
  this.updatedAt = Date.now();
  
  next();
});

/**
 * Method to get all ancestor categories
 * @returns {Promise<Array>} Array of ancestor categories
 */
categorySchema.methods.getAncestors = async function() {
  const ancestors = [];
  let currentCategory = this;

  while (currentCategory.parent) {
    const parent = await this.constructor.findById(currentCategory.parent);
    if (!parent) break;
    ancestors.unshift(parent);
    currentCategory = parent;
  }

  return ancestors;
};

/**
 * Method to get all descendant categories
 * @returns {Promise<Array>} Array of descendant categories
 */
categorySchema.methods.getDescendants = async function() {
  const descendants = [];
  
  const findChildren = async (categoryId) => {
    const children = await this.constructor.find({ parent: categoryId });
    
    for (const child of children) {
      descendants.push(child);
      await findChildren(child._id);
    }
  };

  await findChildren(this._id);
  
  return descendants;
};

/**
 * Method to check if category has children
 * @returns {Promise<Boolean>} True if category has children
 */
categorySchema.methods.hasChildren = async function() {
  const count = await this.constructor.countDocuments({ parent: this._id });
  return count > 0;
};

/**
 * Static method to get all root categories (level 0)
 * @returns {Promise<Array>} Array of root categories
 */
categorySchema.statics.getRootCategories = async function() {
  return await this.find({ parent: null, isActive: true })
    .sort({ order: 1, name: 1 });
};

/**
 * Static method to get category tree structure
 * @param {ObjectId} parentId - Parent category ID (optional, null for root)
 * @param {Number} maxDepth - Maximum depth to retrieve (optional)
 * @returns {Promise<Array>} Array of categories with nested children
 */
categorySchema.statics.getCategoryTree = async function(parentId = null, maxDepth = 3) {
  const buildTree = async (parent, depth = 0) => {
    if (depth >= maxDepth) {
      return [];
    }

    const categories = await this.find({ 
      parent: parent,
      isActive: true 
    }).sort({ order: 1, name: 1 });

    const tree = [];
    
    for (const category of categories) {
      const categoryObj = category.toObject();
      categoryObj.children = await buildTree(category._id, depth + 1);
      tree.push(categoryObj);
    }

    return tree;
  };

  return await buildTree(parentId);
};

/**
 * Static method to get category path (breadcrumb)
 * @param {ObjectId} categoryId - Category ID
 * @returns {Promise<Array>} Array of categories from root to target
 */
categorySchema.statics.getCategoryPath = async function(categoryId) {
  const category = await this.findById(categoryId);
  if (!category) {
    return [];
  }

  const path = [category];
  let current = category;

  while (current.parent) {
    const parent = await this.findById(current.parent);
    if (!parent) break;
    path.unshift(parent);
    current = parent;
  }

  return path;
};

module.exports = mongoose.model('Category', categorySchema);

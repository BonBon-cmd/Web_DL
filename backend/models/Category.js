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
 *           maxLength: 100
 *           description: Category name
 *         slug:
 *           type: string
 *           description: URL-friendly slug (auto-generated)
 *         description:
 *           type: string
 *         icon:
 *           type: string
 *           description: Icon or emoji for category
 *         image:
 *           type: string
 *           description: Category image URL
 *         parent:
 *           type: string
 *           description: Parent category ID (null for root)
 *         level:
 *           type: number
 *           description: Hierarchy level (0 for root)
 *         order:
 *           type: number
 *           description: Display order
 *         isActive:
 *           type: boolean
 *           default: true
 *         tourCount:
 *           type: number
 *           description: Number of tours in category
 *         createdAt:
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
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true
  },
  icon: {
    type: String
  },
  image: {
    type: String
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  level: {
    type: Number,
    default: 0
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
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for faster queries
categorySchema.index({ parent: 1 });
categorySchema.index({ isActive: 1 });
categorySchema.index({ order: 1 });

// Virtual populate for children categories
categorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

// Generate slug from name before saving
categorySchema.pre('save', async function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  
  // Calculate level based on parent
  if (this.isModified('parent')) {
    if (this.parent) {
      const parentCategory = await mongoose.model('Category').findById(this.parent);
      if (parentCategory) {
        this.level = parentCategory.level + 1;
      } else {
        this.level = 0;
      }
    } else {
      this.level = 0;
    }
  }
  
  next();
});

// Cascade delete children categories when using deleteOne
categorySchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  // Delete all child categories
  await mongoose.model('Category').deleteMany({ parent: this._id });
  next();
});

/**
 * Get parent path from root to current category
 * @returns {Array} - Array of parent categories
 */
categorySchema.methods.getParentPath = async function() {
  const path = [];
  let current = this;

  while (current.parent) {
    const parent = await mongoose.model('Category').findById(current.parent);
    if (!parent) break;
    path.unshift(parent);
    current = parent;
  }

  return path;
};

/**
 * Get all root categories (parent = null)
 * @returns {Array} - Array of root categories
 */
categorySchema.statics.getRootCategories = async function() {
  return await this.find({ parent: null, isActive: true })
    .sort({ order: 1 })
    .exec();
};

/**
 * Get complete category tree
 * @returns {Array} - Hierarchical category tree
 */
categorySchema.statics.getCategoryTree = async function() {
  const categories = await this.find({ isActive: true })
    .sort({ level: 1, order: 1 })
    .exec();

  const buildTree = (parentId = null) => {
    return categories
      .filter(cat => {
        const catParent = cat.parent ? cat.parent.toString() : null;
        return catParent === parentId;
      })
      .map(cat => ({
        ...cat.toObject(),
        children: buildTree(cat._id.toString())
      }));
  };

  return buildTree(null);
};

module.exports = mongoose.model('Category', categorySchema);

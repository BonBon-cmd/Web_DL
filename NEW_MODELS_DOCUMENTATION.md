# New E-Commerce Models Documentation

## Overview
This document describes the 5 new models created for the Web_DL tour booking e-commerce system. These models enhance the system with cart functionality, wishlist, notifications, categorization, and improved payment tracking.

## Models Created/Updated

### 1. Payment Model (Updated)
**File**: `backend/models/Payment.js`

#### Updates Made:
- Added `paidAt` field to track when payment was completed (in addition to `paymentDate`)
- Added `refundedAt` field to track when refund was processed (in addition to `refundDate`)
- Updated `markAsCompleted()` method to set both `paymentDate` and `paidAt`
- Updated `processRefund()` method to set both `refundDate` and `refundedAt`
- Fixed duplicate index warnings by properly declaring unique indexes

#### Key Features:
- Comprehensive payment tracking with multiple payment methods and gateways
- Support for Vietnamese payment methods (VNPay, Momo, ZaloPay)
- Full refund management system
- Payment statistics aggregation
- Automatic population of booking and user data

---

### 2. Cart Model (New)
**File**: `backend/models/Cart.js`

#### Schema Overview:
```javascript
{
  user: ObjectId (ref: User, unique),
  items: [{
    tour: ObjectId (ref: Tour),
    bookingDate: Date,
    numberOfGuests: Number (min: 1),
    price: Number,
    addedAt: Date
  }],
  totalItems: Number,
  totalPrice: Number,
  updatedAt: Date
}
```

#### Key Features:
- One cart per user (enforced by unique index)
- Automatic tour population in items
- Virtual field `itemCount` for quick item counting
- Automatic timestamp updates

#### Methods:
- `addItem(tourId, bookingDate, numberOfGuests)` - Adds or updates item in cart
- `removeItem(tourId)` - Removes item from cart
- `updateItem(tourId, data)` - Updates item details
- `clearCart()` - Empties the cart
- `calculateTotal()` - Recalculates totals (called automatically)

#### Usage Example:
```javascript
const cart = await Cart.findOne({ user: userId });
await cart.addItem(tourId, new Date('2024-06-15'), 2);
await cart.removeItem(tourId);
await cart.clearCart();
```

---

### 3. Wishlist Model (New)
**File**: `backend/models/Wishlist.js`

#### Schema Overview:
```javascript
{
  user: ObjectId (ref: User, unique),
  tours: [{
    tour: ObjectId (ref: Tour),
    addedAt: Date,
    note: String (optional personal note)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### Key Features:
- One wishlist per user
- Personal notes for each tour
- Compound index prevents duplicate tours
- Automatic tour population with ratings

#### Methods:
- `addTour(tourId, note)` - Adds tour to wishlist with optional note
- `removeTour(tourId)` - Removes tour from wishlist
- `isTourInWishlist(tourId)` - Checks if tour is in wishlist

#### Usage Example:
```javascript
const wishlist = await Wishlist.findOne({ user: userId });
await wishlist.addTour(tourId, 'Want to visit for anniversary');
const isInList = wishlist.isTourInWishlist(tourId);
await wishlist.removeTour(tourId);
```

---

### 4. Notification Model (New)
**File**: `backend/models/Notification.js`

#### Schema Overview:
```javascript
{
  user: ObjectId (ref: User),
  type: String (enum: booking, payment, review, promotion, system, reminder),
  title: String (max: 200),
  message: String,
  relatedId: ObjectId (dynamic ref),
  relatedModel: String (enum: Booking, Payment, Tour, Review),
  isRead: Boolean,
  readAt: Date,
  priority: String (enum: low, normal, high, urgent),
  actionUrl: String,
  expiresAt: Date,
  createdAt: Date
}
```

#### Key Features:
- Multiple notification types for different events
- Priority levels (low, normal, high, urgent)
- Dynamic references to related objects
- Expiration support
- Optimized indexes for queries

#### Instance Methods:
- `markAsRead()` - Marks notification as read
- `isExpired()` - Checks if notification has expired

#### Static Methods:
- `createNotification(userId, type, title, message, options)` - Creates a new notification
- `getUnreadCount(userId)` - Gets count of unread notifications
- `markAllAsRead(userId)` - Marks all user's notifications as read

#### Usage Example:
```javascript
// Create a booking notification
await Notification.createNotification(
  userId,
  'booking',
  'Booking Confirmed',
  'Your tour booking has been confirmed',
  {
    relatedId: bookingId,
    relatedModel: 'Booking',
    priority: 'high',
    actionUrl: '/bookings/' + bookingId
  }
);

// Check unread count
const unreadCount = await Notification.getUnreadCount(userId);

// Mark as read
const notification = await Notification.findById(notificationId);
await notification.markAsRead();
```

---

### 5. Category Model (New)
**File**: `backend/models/Category.js`

#### Schema Overview:
```javascript
{
  name: String (unique),
  slug: String (unique, auto-generated),
  description: String,
  icon: String,
  parent: ObjectId (ref: Category, for hierarchy),
  level: Number (auto-calculated, 0 = root),
  order: Number (for sorting),
  isActive: Boolean,
  metadata: Object (for SEO, etc.),
  createdAt: Date,
  updatedAt: Date
}
```

#### Key Features:
- Hierarchical structure (parent-child relationships)
- Automatic slug generation from name
- Automatic level calculation
- Virtual field for children
- Multiple indexes for performance

#### Instance Methods:
- `getAncestors()` - Gets all parent categories up to root
- `getDescendants()` - Gets all child categories recursively
- `hasChildren()` - Checks if category has children

#### Static Methods:
- `getRootCategories()` - Gets all root level categories
- `getCategoryTree(parentId, maxDepth)` - Gets nested category tree
- `getCategoryPath(categoryId)` - Gets breadcrumb path from root to category

#### Usage Example:
```javascript
// Create root category
const adventure = await Category.create({
  name: 'Adventure Tours',
  description: 'Exciting adventure experiences',
  icon: 'adventure-icon.png'
});

// Create child category
const hiking = await Category.create({
  name: 'Hiking',
  description: 'Mountain and trail hiking tours',
  parent: adventure._id
});

// Get category tree
const tree = await Category.getCategoryTree(null, 3);

// Get ancestors
const ancestors = await hiking.getAncestors();
// Returns: [adventure]

// Get breadcrumb path
const path = await Category.getCategoryPath(hiking._id);
// Returns: [adventure, hiking]
```

---

## Indexes Summary

### Payment
- `{ booking: 1 }`
- `{ user: 1 }`
- `{ paymentStatus: 1 }`
- `{ transactionId: 1 }` (unique, sparse)
- `{ createdAt: -1 }`

### Cart
- `{ user: 1 }` (unique)

### Wishlist
- `{ user: 1 }` (unique)
- `{ user: 1, 'tours.tour': 1 }` (compound, unique, sparse)

### Notification
- `{ user: 1, isRead: 1, createdAt: -1 }`
- `{ user: 1, type: 1 }`
- `{ expiresAt: 1 }`

### Category
- `{ slug: 1 }` (unique)
- `{ parent: 1, order: 1 }`
- `{ isActive: 1 }`

---

## Integration Notes

### With Existing Models:
- **Payment** → references `Booking` and `User`
- **Cart** → references `User` and `Tour`
- **Wishlist** → references `User` and `Tour`
- **Notification** → references `User` and dynamically references `Booking`, `Payment`, `Tour`, or `Review`
- **Category** → can be associated with `Tour` (requires Tour model update)

### Pre-hooks:
All models use `pre(/^find/)` hooks to automatically populate referenced documents:
- Payment populates booking and user
- Cart populates tours in items
- Wishlist populates tours
- Category can populate children via virtual

### Validation:
All models include appropriate validation:
- Required fields are enforced
- Enums constrain values to valid options
- Min/max constraints on numeric fields
- String length limits where appropriate
- Unique constraints where needed

---

## Best Practices

### 1. Cart Management
```javascript
// Always use methods to modify cart
await cart.addItem(tourId, bookingDate, guests);
// Don't manually modify cart.items array
```

### 2. Notifications
```javascript
// Use static method to create notifications
await Notification.createNotification(userId, type, title, message, options);
// This ensures consistent notification creation
```

### 3. Categories
```javascript
// Use getCategoryTree() for navigation menus
const tree = await Category.getCategoryTree(null, 2);

// Use getCategoryPath() for breadcrumbs
const path = await Category.getCategoryPath(categoryId);
```

### 4. Wishlist
```javascript
// Check before adding to avoid errors
if (!wishlist.isTourInWishlist(tourId)) {
  await wishlist.addTour(tourId, note);
}
```

---

## Next Steps

### Recommended Controller Development:
1. **CartController** - Manage cart operations
2. **WishlistController** - Manage wishlist operations
3. **NotificationController** - Fetch and manage notifications
4. **CategoryController** - Manage categories and get category trees

### Frontend Integration:
1. Add cart icon with item count in navbar
2. Add wishlist heart icon on tour cards
3. Add notification bell with unread count
4. Add category navigation menu
5. Add category filters on tour listing page

### Additional Features to Consider:
1. Cart expiration (auto-clear after X days)
2. Notification email/push integration
3. Category image galleries
4. Wishlist sharing functionality
5. Cart persistence across sessions

---

## Testing Checklist

- [x] All models load without errors
- [x] All methods are defined
- [x] All static methods are defined
- [x] Indexes are properly declared
- [x] No duplicate index warnings (except pre-existing ones)
- [x] Swagger documentation is complete
- [ ] Integration tests with database
- [ ] API endpoint tests
- [ ] Frontend integration tests

---

## Conclusion

All 5 models have been successfully created/updated with:
- ✅ Complete Swagger/JSDoc documentation
- ✅ Appropriate validation
- ✅ Performance indexes
- ✅ Useful instance and static methods
- ✅ Compatibility with existing models
- ✅ Following project code style

The models are ready for integration into controllers and API endpoints.

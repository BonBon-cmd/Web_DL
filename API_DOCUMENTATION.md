# API Documentation - Travel Booking System

## Base URL
```
http://localhost:5000/api
```

## Authentication

Hầu hết các endpoints yêu cầu JWT token trong header:

```http
Authorization: Bearer <your_jwt_token>
```

Token được trả về khi đăng nhập hoặc đăng ký thành công.

---

## Auth Endpoints

### 1. Register User

**POST** `/auth/register`

Đăng ký người dùng mới.

**Request Body:**
```json
{
  "name": "Nguyen Van A",
  "email": "nguyenvana@example.com",
  "password": "123456",
  "phone": "0123456789"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "role": "user"
  }
}
```

---

### 2. Login User

**POST** `/auth/login`

Đăng nhập.

**Request Body:**
```json
{
  "email": "nguyenvana@example.com",
  "password": "123456"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "role": "user"
  }
}
```

---

### 3. Get Current User

**GET** `/auth/me`

Lấy thông tin user hiện tại.

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "role": "user",
    "phone": "0123456789",
    "avatar": "default-avatar.jpg",
    "createdAt": "2025-10-20T10:00:00.000Z"
  }
}
```

---

## Tour Endpoints

### 1. Get All Tours

**GET** `/tours`

Lấy danh sách tours với search, filter, sort, pagination.

**Query Parameters:**
- `page` (number): Số trang (default: 1)
- `limit` (number): Số items per page (default: 10)
- `search` (string): Tìm kiếm trong title và description
- `difficulty` (string): easy | medium | difficult
- `minPrice` (number): Giá tối thiểu
- `maxPrice` (number): Giá tối đa
- `sort` (string): Trường sắp xếp (ví dụ: price, -price, -createdAt)
- `featured` (boolean): Lọc tours nổi bật

**Example:**
```
GET /tours?search=beach&difficulty=easy&minPrice=100&maxPrice=500&sort=-price&page=1&limit=10
```

**Response Success (200):**
```json
{
  "success": true,
  "count": 10,
  "total": 25,
  "page": 1,
  "pages": 3,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "title": "Ha Long Bay Adventure",
      "description": "Explore the stunning Ha Long Bay...",
      "price": 299,
      "duration": 3,
      "maxGroupSize": 15,
      "difficulty": "easy",
      "ratingsAverage": 4.5,
      "ratingsQuantity": 23,
      "images": ["/uploads/image1.jpg"],
      "location": {
        "city": "Ha Long",
        "country": "Vietnam",
        "address": "Ha Long Bay, Quang Ninh"
      },
      "featured": true,
      "createdAt": "2025-10-15T10:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Tour by ID

**GET** `/tours/:id`

Lấy chi tiết một tour.

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "title": "Ha Long Bay Adventure",
    "description": "Full description...",
    "price": 299,
    "duration": 3,
    "maxGroupSize": 15,
    "difficulty": "easy",
    "ratingsAverage": 4.5,
    "ratingsQuantity": 23,
    "images": ["/uploads/image1.jpg", "/uploads/image2.jpg"],
    "startDates": ["2025-11-01T00:00:00.000Z"],
    "location": {
      "city": "Ha Long",
      "country": "Vietnam",
      "address": "Ha Long Bay, Quang Ninh",
      "coordinates": [107.0, 20.9]
    },
    "featured": true,
    "reviews": [
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
        "user": {
          "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
          "name": "User Name",
          "avatar": "avatar.jpg"
        },
        "rating": 5,
        "comment": "Amazing experience!",
        "createdAt": "2025-10-18T10:00:00.000Z"
      }
    ],
    "createdAt": "2025-10-15T10:00:00.000Z"
  }
}
```

---

### 3. Create Tour (Admin Only)

**POST** `/tours`

Tạo tour mới.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "title": "Sapa Trekking",
  "description": "Trek through beautiful mountains...",
  "price": 450,
  "duration": 4,
  "maxGroupSize": 12,
  "difficulty": "medium",
  "location": {
    "city": "Sapa",
    "country": "Vietnam",
    "address": "Sapa Town, Lao Cai"
  }
}
```

**Response Success (201):**
```json
{
  "success": true,
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j4",
    "title": "Sapa Trekking",
    ...
  }
}
```

---

### 4. Update Tour (Admin Only)

**PUT** `/tours/:id`

Cập nhật tour.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:** (partial update supported)
```json
{
  "price": 399,
  "maxGroupSize": 15
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    ...updated tour
  }
}
```

---

### 5. Delete Tour (Admin Only)

**DELETE** `/tours/:id`

Xóa tour.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Tour deleted successfully"
}
```

---

### 6. Upload Tour Images (Admin Only)

**POST** `/tours/:id/upload-images`

Upload ảnh cho tour (tối đa 5 ảnh).

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Form Data:**
```
images: [file1, file2, file3]
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    ...tour with updated images array
  }
}
```

---

## Booking Endpoints

### 1. Get Bookings

**GET** `/bookings`

Lấy danh sách bookings:
- User: Chỉ bookings của mình
- Admin: Tất cả bookings

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number)
- `limit` (number)
- `status` (string): pending | confirmed | cancelled | completed

**Response Success (200):**
```json
{
  "success": true,
  "count": 5,
  "total": 5,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j5",
      "tour": {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
        "title": "Ha Long Bay Adventure",
        "duration": 3,
        "price": 299,
        "location": {
          "city": "Ha Long"
        }
      },
      "user": {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j6",
        "name": "User Name",
        "email": "user@example.com",
        "phone": "0123456789"
      },
      "bookingDate": "2025-11-01T00:00:00.000Z",
      "numberOfGuests": 2,
      "totalPrice": 598,
      "status": "confirmed",
      "paymentStatus": "paid",
      "specialRequests": "Vegetarian meals please",
      "createdAt": "2025-10-20T10:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Booking by ID

**GET** `/bookings/:id`

Lấy chi tiết booking.

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    ...booking details
  }
}
```

---

### 3. Create Booking

**POST** `/bookings`

Tạo booking mới.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "tour": "65f1a2b3c4d5e6f7g8h9i0j1",
  "bookingDate": "2025-11-01",
  "numberOfGuests": 2,
  "specialRequests": "Need vegetarian meals"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "data": {
    ...created booking
  }
}
```

---

### 4. Update Booking

**PUT** `/bookings/:id`

Cập nhật booking (owner hoặc admin).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "confirmed",
  "paymentStatus": "paid"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    ...updated booking
  }
}
```

---

### 5. Delete Booking

**DELETE** `/bookings/:id`

Xóa/Hủy booking (owner hoặc admin).

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Booking deleted successfully"
}
```

---

## Review Endpoints

### 1. Get Reviews

**GET** `/reviews`

Lấy danh sách reviews.

**Query Parameters:**
- `tour` (string): Tour ID để lọc reviews theo tour

**Example:**
```
GET /reviews?tour=65f1a2b3c4d5e6f7g8h9i0j1
```

**Response Success (200):**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j7",
      "tour": "65f1a2b3c4d5e6f7g8h9i0j1",
      "user": {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j8",
        "name": "User Name",
        "avatar": "avatar.jpg"
      },
      "rating": 5,
      "comment": "Amazing tour! Highly recommended.",
      "createdAt": "2025-10-18T10:00:00.000Z"
    }
  ]
}
```

---

### 2. Create Review

**POST** `/reviews`

Tạo review mới (1 user chỉ review 1 lần cho 1 tour).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "tour": "65f1a2b3c4d5e6f7g8h9i0j1",
  "rating": 5,
  "comment": "Amazing experience! The guide was excellent."
}
```

**Response Success (201):**
```json
{
  "success": true,
  "data": {
    ...created review
  }
}
```

---

### 3. Update Review

**PUT** `/reviews/:id`

Cập nhật review (owner hoặc admin).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Updated comment"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    ...updated review
  }
}
```

---

### 4. Delete Review

**DELETE** `/reviews/:id`

Xóa review (owner hoặc admin).

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

---

## Dashboard Endpoints (Admin Only)

### 1. Get Dashboard Statistics

**GET** `/dashboard/stats`

Lấy tất cả thống kê cho dashboard.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 150,
      "totalTours": 45,
      "totalBookings": 320,
      "totalRevenue": 95400,
      "averageBookingValue": 298.13
    },
    "bookingsByStatus": [
      { "_id": "pending", "count": 45 },
      { "_id": "confirmed", "count": 200 },
      { "_id": "completed", "count": 60 },
      { "_id": "cancelled", "count": 15 }
    ],
    "monthlyBookings": [
      {
        "_id": { "year": 2025, "month": 9 },
        "count": 45,
        "revenue": 13450
      },
      {
        "_id": { "year": 2025, "month": 10 },
        "count": 67,
        "revenue": 19980
      }
    ],
    "topTours": [
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
        "tourTitle": "Ha Long Bay Adventure",
        "bookingCount": 89,
        "totalRevenue": 26611
      }
    ],
    "recentBookings": [
      ...10 most recent bookings
    ]
  }
}
```

---

### 2. Get Revenue Statistics

**GET** `/dashboard/revenue`

Lấy thống kê doanh thu theo thời gian.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `startDate` (date): YYYY-MM-DD
- `endDate` (date): YYYY-MM-DD

**Example:**
```
GET /dashboard/revenue?startDate=2025-10-01&endDate=2025-10-31
```

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": {
        "year": 2025,
        "month": 10,
        "day": 20
      },
      "dailyRevenue": 2985,
      "bookingCount": 10
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "You do not have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Notes

- Tất cả dates sử dụng ISO 8601 format
- Pagination default: page=1, limit=10
- Sort: prefix `-` để sort descending (ví dụ: `-price`)
- File upload chỉ chấp nhận: jpg, jpeg, png, gif (max 5MB)
- JWT token expires sau 7 ngày (default)

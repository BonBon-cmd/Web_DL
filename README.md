# 🌍 Travel Booking System - Hệ thống đặt tour du lịch

Hệ thống web quản lý và đặt tour du lịch với đầy đủ tính năng Authentication, Authorization, CRUD, Search/Sort/Pagination, Upload file và Dashboard thống kê.

## 📋 Mục lục

- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cài đặt](#cài-đặt)
- [Sử dụng](#sử-dụng)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)

## ✨ Tính năng

### Chức năng chính

#### 1. Authentication & Authorization
- ✅ Đăng ký/Đăng nhập người dùng
- ✅ JWT Token authentication
- ✅ Role-based access control (Admin/User)
- ✅ Protected routes với middleware

#### 2. Quản lý Tours (CRUD)
- ✅ Admin: Tạo, sửa, xóa tours
- ✅ User: Xem danh sách và chi tiết tours
- ✅ Upload nhiều ảnh cho tours
- ✅ Tìm kiếm tours theo tên, mô tả
- ✅ Lọc theo độ khó, giá
- ✅ Sắp xếp theo giá, đánh giá, ngày tạo
- ✅ Phân trang (pagination)

#### 3. Quản lý Bookings
- ✅ User: Đặt tour, xem bookings của mình
- ✅ Admin: Xem tất cả bookings, cập nhật trạng thái
- ✅ Quản lý thanh toán (paid/unpaid/refunded)
- ✅ Tự động tính tổng tiền
- ✅ Ghi chú yêu cầu đặc biệt

#### 4. Hệ thống Reviews
- ✅ User: Viết đánh giá và rating (1-5 sao)
- ✅ Tự động cập nhật rating trung bình của tour
- ✅ Hiển thị reviews theo tour
- ✅ Chỉ cho phép 1 review/user/tour

#### 5. Dashboard Thống kê (Admin)
- ✅ Tổng quan: Users, Tours, Bookings, Doanh thu
- ✅ Biểu đồ bookings theo tháng
- ✅ Top 5 tours phổ biến
- ✅ Thống kê theo trạng thái booking
- ✅ Danh sách bookings gần đây
- ✅ Báo cáo doanh thu theo thời gian

#### 6. Upload Files
- ✅ Upload nhiều ảnh cho tours
- ✅ Validation file type và size
- ✅ Lưu trữ file trên server

## 🛠 Công nghệ sử dụng

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: MongoDB với Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Express Validator
- **CORS**: cors middleware
- **Environment Variables**: dotenv

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: React Icons
- **Notifications**: React Toastify
- **JWT Decode**: jwt-decode
- **Styling**: Custom CSS

### Development Tools
- **Package Manager**: npm
- **Dev Server**: Nodemon (Backend), Vite (Frontend)
- **Version Control**: Git

## 📁 Cấu trúc dự án

```
Demo_web/
├── backend/
│   ├── config/
│   │   ├── database.js          # Kết nối MongoDB
│   │   └── swagger.js           # Cấu hình Swagger
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── tourController.js    # CRUD Tours
│   │   ├── bookingController.js # CRUD Bookings
│   │   ├── reviewController.js  # CRUD Reviews
│   │   └── dashboardController.js # Statistics
│   ├── middleware/
│   │   ├── auth.js              # JWT & Role verification
│   │   ├── upload.js            # File upload config
│   │   └── error.js             # Error handler
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Tour.js              # Tour schema
│   │   ├── Booking.js           # Booking schema
│   │   └── Review.js            # Review schema
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── tours.js             # Tour routes
│   │   ├── bookings.js          # Booking routes
│   │   ├── reviews.js           # Review routes
│   │   └── dashboard.js         # Dashboard routes
│   ├── uploads/                 # Uploaded files
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TourCard.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth state management
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Tours.jsx
│   │   │   ├── TourDetail.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Tours.jsx
│   │   │       └── Bookings.jsx
│   │   ├── services/
│   │   │   └── api.js           # API calls
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🚀 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 16.x
- MongoDB >= 5.x (Local hoặc MongoDB Atlas)
- npm hoặc yarn

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd Demo_web
```

### Bước 2: Cài đặt Backend

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel_booking
JWT_SECRET=your_jwt_secret_key_change_this_in_production_123456789
JWT_EXPIRE=7d
NODE_ENV=development
```

**Lưu ý**: 
- Thay `MONGODB_URI` bằng connection string của bạn (local hoặc MongoDB Atlas)
- Thay `JWT_SECRET` bằng secret key mạnh hơn trong production

### Bước 3: Cài đặt Frontend

```bash
cd ../frontend
npm install
```

### Bước 4: Khởi động MongoDB

Nếu dùng MongoDB local:

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

Hoặc sử dụng MongoDB Atlas (Cloud):
1. Tạo cluster tại https://www.mongodb.com/cloud/atlas
2. Lấy connection string và cập nhật vào `.env`

## 🎯 Sử dụng

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend chạy tại: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend chạy tại: http://localhost:3000

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📚 API Documentation

API Documentation được tạo tự động bằng Swagger/OpenAPI và có thể truy cập tại:

**URL**: http://localhost:5000/api-docs

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Đăng ký user mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại (Protected)

#### Tours
- `GET /api/tours` - Lấy danh sách tours (có search, filter, sort, pagination)
- `GET /api/tours/:id` - Lấy chi tiết tour
- `POST /api/tours` - Tạo tour mới (Admin only)
- `PUT /api/tours/:id` - Cập nhật tour (Admin only)
- `DELETE /api/tours/:id` - Xóa tour (Admin only)
- `POST /api/tours/:id/upload-images` - Upload ảnh cho tour (Admin only)

#### Bookings
- `GET /api/bookings` - Lấy bookings (User: của mình, Admin: tất cả)
- `GET /api/bookings/:id` - Lấy chi tiết booking
- `POST /api/bookings` - Tạo booking mới (Protected)
- `PUT /api/bookings/:id` - Cập nhật booking (Protected)
- `DELETE /api/bookings/:id` - Xóa booking (Protected)

#### Reviews
- `GET /api/reviews` - Lấy danh sách reviews
- `POST /api/reviews` - Tạo review (Protected)
- `PUT /api/reviews/:id` - Cập nhật review (Protected)
- `DELETE /api/reviews/:id` - Xóa review (Protected)

#### Dashboard (Admin only)
- `GET /api/dashboard/stats` - Lấy thống kê tổng quan
- `GET /api/dashboard/revenue` - Lấy thống kê doanh thu

### Authentication Header

Các protected routes yêu cầu JWT token trong header:

```
Authorization: Bearer <your_jwt_token>
```

## 🗄 Database Schema

### User Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  phone: String,
  avatar: String,
  createdAt: Date
}
```

### Tour Collection
```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required),
  duration: Number (required),
  maxGroupSize: Number (required),
  difficulty: String (enum: ['easy', 'medium', 'difficult']),
  ratingsAverage: Number (0-5),
  ratingsQuantity: Number,
  images: [String],
  startDates: [Date],
  location: {
    city: String (required),
    country: String (required),
    address: String,
    coordinates: [Number]
  },
  featured: Boolean,
  createdBy: ObjectId (ref: User),
  createdAt: Date
}
```

### Booking Collection
```javascript
{
  tour: ObjectId (ref: Tour, required),
  user: ObjectId (ref: User, required),
  bookingDate: Date (required),
  numberOfGuests: Number (required),
  totalPrice: Number (required),
  status: String (enum: ['pending', 'confirmed', 'cancelled', 'completed']),
  paymentStatus: String (enum: ['unpaid', 'paid', 'refunded']),
  specialRequests: String,
  createdAt: Date
}
```

### Review Collection
```javascript
{
  tour: ObjectId (ref: Tour, required),
  user: ObjectId (ref: User, required),
  rating: Number (1-5, required),
  comment: String (required),
  createdAt: Date
}
```

### Relationships
- User (1) → (N) Bookings
- Tour (1) → (N) Bookings
- Tour (1) → (N) Reviews
- User (1) → (N) Reviews
- User (1) → (N) Tours (createdBy)

## 👥 Tài khoản mẫu

### Admin Account
Bạn cần tạo admin account thủ công trong MongoDB:

```javascript
{
  name: "Admin",
  email: "admin@example.com",
  password: "$2a$10$...", // Hash của "admin123"
  role: "admin"
}
```

Hoặc đăng ký qua API rồi update role trong database.

### User Account
Đăng ký thông qua form đăng ký trên website.

## 🎨 Features Highlights

### Search & Filter
- Tìm kiếm theo tên, mô tả tour
- Lọc theo độ khó (easy/medium/difficult)
- Lọc theo khoảng giá (min-max)
- Sắp xếp theo: mới nhất, giá, đánh giá

### Pagination
- Hiển thị số trang, trang hiện tại
- Nút Previous/Next
- Tùy chỉnh số items per page

### Dashboard Analytics
- Cards thống kê tổng quan
- Biểu đồ cột (Bar chart) cho bookings theo tháng
- Top 5 tours phổ biến
- Bookings theo trạng thái
- Recent bookings table

### File Upload
- Upload nhiều ảnh (max 5)
- Validate file type (jpg, jpeg, png, gif)
- Giới hạn size (5MB)
- Lưu trữ local trong thư mục uploads/

### Responsive Design
- Mobile-friendly
- Flexbox & Grid layout
- Media queries cho các màn hình khác nhau

## 🔒 Security Features

- Password hashing với bcrypt
- JWT token authentication
- Role-based authorization
- Protected API routes
- Input validation
- CORS configuration
- SQL Injection prevention (NoSQL)

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Giải pháp**: Kiểm tra MongoDB đã chạy chưa, hoặc sử dụng MongoDB Atlas

### Port Already in Use
```bash
Error: listen EADDRINUSE: address already in use :::5000
```
**Giải pháp**: Thay đổi PORT trong `.env` hoặc kill process đang dùng port đó

### CORS Error
```bash
Access to XMLHttpRequest has been blocked by CORS policy
```
**Giải pháp**: Kiểm tra cấu hình CORS trong `server.js`

## 📝 Báo cáo tiểu luận

Báo cáo tiểu luận nên bao gồm:

1. **Giới thiệu**
   - Mô tả đề tài
   - Mục đích, ý nghĩa
   - Phạm vi thực hiện

2. **Phân tích yêu cầu**
   - Use case diagram
   - Functional requirements
   - Non-functional requirements

3. **Thiết kế hệ thống**
   - Kiến trúc hệ thống (3-tier architecture)
   - Database design (ERD)
   - API design
   - UI/UX design

4. **Công nghệ sử dụng**
   - Giới thiệu các công nghệ
   - Lý do lựa chọn
   - So sánh với các giải pháp khác

5. **Triển khai**
   - Chi tiết implementation
   - Code samples quan trọng
   - Screenshots

6. **Testing**
   - Test cases
   - Test results
   - Bug reports & fixes

7. **Kết luận**
   - Đánh giá kết quả
   - Hạn chế
   - Hướng phát triển

## 🚀 Hướng phát triển

- [ ] Payment integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Real-time chat support
- [ ] Mobile app (React Native)
- [ ] Social media login
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Export reports (PDF, Excel)
- [ ] Booking calendar view
- [ ] Tour recommendations (AI)

## 📄 License

MIT License - Copyright (c) 2025

## 👨‍💻 Author

**Your Name**
- Email: 2212362@dlu.edu.vn
- GitHub: [@BonBon-cmd](https://github.com/BonBon-cmd)

## 🙏 Acknowledgments

- Express.js Documentation
- React Documentation
- MongoDB Documentation
- Swagger/OpenAPI Specification
- Stack Overflow Community

---

**Lưu ý**: Đây là project học tập. Không sử dụng trực tiếp trong production mà không có proper security audit và testing.

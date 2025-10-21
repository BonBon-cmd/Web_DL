# HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY PROJECT

## 📋 Yêu cầu hệ thống

- **Node.js**: Version 16.x trở lên
- **MongoDB**: Version 5.x trở lên (Local hoặc MongoDB Atlas)
- **npm**: Version 7.x trở lên (đi kèm với Node.js)
- **Git**: Để clone project

### Kiểm tra version đã cài

```bash
node --version
npm --version
mongod --version
git --version
```

---

## 🚀 BƯỚC 1: Cài đặt MongoDB

### Option A: MongoDB Local (Windows)

1. Download MongoDB Community Server từ: https://www.mongodb.com/try/download/community
2. Chạy installer và làm theo hướng dẫn
3. Chọn "Complete" installation
4. Tick "Install MongoDB as a Service"
5. Sau khi cài xong, MongoDB sẽ tự động chạy

**Kiểm tra MongoDB đang chạy:**
```bash
# Windows
net start MongoDB

# Hoặc kiểm tra service trong Task Manager -> Services -> MongoDB
```

**MongoDB Compass** (GUI tool):
- Tự động cài kèm MongoDB
- Mở và connect tới `mongodb://localhost:27017`

### Option B: MongoDB Atlas (Cloud - Miễn phí)

1. Đăng ký tài khoản tại: https://www.mongodb.com/cloud/atlas/register
2. Tạo cluster miễn phí (M0 Free Tier)
3. Tạo Database User (username + password)
4. Whitelist IP Address (0.0.0.0/0 cho development)
5. Lấy Connection String:
   - Click "Connect" -> "Connect your application"
   - Copy connection string
   - Thay `<password>` bằng password của database user

**Connection String mẫu:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/travel_booking?retryWrites=true&w=majority
```

---

## 🚀 BƯỚC 2: Clone và Setup Project

### 1. Clone Repository

```bash
# Nếu có Git repository
git clone <your-repository-url>
cd Demo_web

# Hoặc giải nén file ZIP vào thư mục Demo_web
```

### 2. Cài đặt Backend

```bash
cd backend
npm install
```

**Thời gian cài đặt**: 2-5 phút tùy tốc độ internet

### 3. Cấu hình Backend (.env)

Tạo file `.env` trong thư mục `backend`:

```bash
# Windows
notepad .env

# Hoặc dùng VS Code
code .env
```

**Nội dung file .env:**

**Nếu dùng MongoDB Local:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel_booking
JWT_SECRET=travel_booking_secret_key_2025_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Nếu dùng MongoDB Atlas:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/travel_booking?retryWrites=true&w=majority
JWT_SECRET=travel_booking_secret_key_2025_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

**⚠️ Lưu ý:**
- Thay `username:password` bằng credentials thật của bạn
- JWT_SECRET nên là chuỗi random, phức tạp trong production

### 4. Tạo thư mục uploads

```bash
# Trong thư mục backend
mkdir uploads
```

### 5. Cài đặt Frontend

```bash
cd ../frontend
npm install
```

**Thời gian cài đặt**: 2-5 phút

---

## 🎯 BƯỚC 3: Chạy Project

### Option A: Chạy riêng Backend và Frontend

#### Terminal 1 - Backend:

```bash
cd backend
npm run dev
```

**Kết quả mong đợi:**
```
Server is running on port 5000
MongoDB Connected: localhost
API Documentation available at http://localhost:5000/api-docs
```

#### Terminal 2 - Frontend:

```bash
cd frontend
npm run dev
```

**Kết quả mong đợi:**
```
  VITE v5.0.8  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Option B: Chạy cả 2 trong 1 terminal (PowerShell)

```powershell
# Tạo 2 background jobs
Start-Job -ScriptBlock { cd backend; npm run dev }
Start-Job -ScriptBlock { cd frontend; npm run dev }

# Xem logs
Get-Job | Receive-Job
```

---

## 🌐 BƯỚC 4: Truy cập ứng dụng

### Frontend (User Interface)
- **URL**: http://localhost:3000
- Đăng ký tài khoản mới
- Đăng nhập
- Browse tours, đặt booking

### Backend API Documentation (Swagger)
- **URL**: http://localhost:5000/api-docs
- Interactive API testing
- Xem tất cả endpoints

### MongoDB
- **Local**: mongodb://localhost:27017
- **Compass**: Mở MongoDB Compass và connect
- **Database name**: travel_booking

---

## 👤 BƯỚC 5: Tạo Admin Account

### Cách 1: Qua MongoDB Compass (Đơn giản nhất)

1. Mở MongoDB Compass
2. Connect tới database của bạn
3. Chọn database `travel_booking`
4. Chọn collection `users`
5. Click "Insert Document"
6. Paste đoạn này:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
  "role": "admin",
  "phone": "0123456789",
  "avatar": "default-avatar.jpg",
  "createdAt": { "$date": "2025-10-20T00:00:00.000Z" }
}
```

**Login credentials:**
- Email: `admin@example.com`
- Password: `admin123`

### Cách 2: Qua API

1. Đăng ký user bình thường qua website
2. Vào MongoDB và đổi field `role` từ `user` thành `admin`

### Cách 3: Qua MongoDB Shell

```bash
# Mở MongoDB shell
mongosh

# Chọn database
use travel_booking

# Insert admin user
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
  role: "admin",
  phone: "0123456789",
  avatar: "default-avatar.jpg",
  createdAt: new Date()
})
```

---

## 🎨 BƯỚC 6: Test chức năng

### 1. Đăng nhập Admin

- URL: http://localhost:3000/login
- Email: `admin@example.com`
- Password: `admin123`
- Sau khi login, bạn sẽ thấy menu Admin (Dashboard, Quản lý Tours, Quản lý Bookings)

### 2. Tạo Tours mẫu

**Via Admin Panel:**
1. Login as admin
2. Vào "Quản lý Tours"
3. Click "Tạo Tour mới"
4. Nhập thông tin:
   - Tên: Ha Long Bay Adventure
   - Mô tả: Explore the stunning Ha Long Bay with crystal clear waters...
   - Giá: 299
   - Thời gian: 3 ngày
   - Số người tối đa: 15
   - Độ khó: Easy
   - Thành phố: Ha Long
   - Quốc gia: Vietnam
5. Click "Tạo mới"

**Via API (Swagger):**
1. Truy cập http://localhost:5000/api-docs
2. Login để lấy token (POST /api/auth/login)
3. Click "Authorize" và paste token
4. POST /api/tours với body:

```json
{
  "title": "Ha Long Bay Adventure",
  "description": "Explore the stunning Ha Long Bay with crystal clear waters and limestone islands",
  "price": 299,
  "duration": 3,
  "maxGroupSize": 15,
  "difficulty": "easy",
  "location": {
    "city": "Ha Long",
    "country": "Vietnam",
    "address": "Ha Long Bay, Quang Ninh Province"
  }
}
```

### 3. Test User Flow

1. Đăng xuất admin
2. Đăng ký user mới (Register)
3. Login với user account
4. Browse tours tại /tours
5. Click vào tour để xem detail
6. Click "Đặt tour ngay"
7. Điền thông tin và đặt
8. Xem bookings của mình tại "Bookings của tôi"

### 4. Test Admin Dashboard

1. Login as admin
2. Vào Dashboard
3. Xem statistics:
   - Tổng users, tours, bookings
   - Charts
   - Top tours
   - Recent bookings

---

## 🐛 Troubleshooting

### Lỗi: "Cannot connect to MongoDB"

**Giải pháp:**
```bash
# Windows - Start MongoDB service
net start MongoDB

# Hoặc check Task Manager -> Services -> MongoDB Server
```

### Lỗi: "Port 5000 already in use"

**Giải pháp 1:** Kill process đang dùng port 5000
```powershell
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

**Giải pháp 2:** Đổi port trong `.env`
```env
PORT=5001
```

### Lỗi: "Port 3000 already in use"

**Giải pháp:** Vite sẽ tự động suggest port khác (3001, 3002...)
- Chấp nhận port mới
- Hoặc kill process đang dùng port 3000

### Lỗi: "Module not found"

**Giải pháp:**
```bash
# Xóa node_modules và cài lại
rm -rf node_modules
npm install

# Hoặc Windows
rmdir /s node_modules
npm install
```

### Lỗi: "CORS error"

**Kiểm tra:**
- Backend có chạy không?
- Frontend đang proxy đúng không? (check `vite.config.js`)

### Lỗi: "Invalid token"

**Giải pháp:**
- Clear localStorage trong browser (F12 -> Application -> Local Storage -> Clear)
- Đăng nhập lại

---

## 📦 Production Build

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build

# Preview build
npm run preview
```

Build files sẽ ở trong `frontend/dist/`

---

## 🎓 Học thêm

### Video tutorials được đề xuất:
- Node.js & Express: https://www.youtube.com/watch?v=Oe421EPjeBE
- React: https://react.dev/learn
- MongoDB: https://university.mongodb.com/

### Documentation:
- Express.js: https://expressjs.com/
- React: https://react.dev/
- MongoDB: https://www.mongodb.com/docs/
- Mongoose: https://mongoosejs.com/

---

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Check logs trong terminal
2. Check MongoDB connection
3. Check file .env configuration
4. Xem API Documentation tại http://localhost:5000/api-docs
5. Google error message
6. Hỏi trên Stack Overflow với tag [express], [react], [mongodb]

---

**Good luck! 🚀**

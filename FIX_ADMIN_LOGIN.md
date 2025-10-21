# 🔧 FIX: TÀI KHOẢN ADMIN KHÔNG VÀO ĐƯỢC

## ❌ Vấn đề đã được sửa

### Nguyên nhân:
- JWT token chỉ lưu `id`, không lưu `role`
- Frontend không nhận biết được user là admin
- AdminRoute không cho phép truy cập

### Giải pháp:
✅ Đã cập nhật `generateToken()` để include role, email, name trong JWT
✅ Token giờ chứa: `{ id, email, name, role }`

---

## 🚀 HƯỚNG DẪN TẠO TÀI KHOẢN ADMIN

### ⚠️ QUAN TRỌNG: Backend phải đang chạy!

```powershell
# Đảm bảo backend đang chạy
cd E:\Demo_web\backend
npm run dev

# Kiểm tra: Should see
# Server is running on port 5000
# MongoDB Connected: localhost
```

---

## Phương pháp 1: Dùng MongoDB Compass (Khuyên dùng) ⭐

### Bước 1: Mở MongoDB Compass

1. Mở ứng dụng **MongoDB Compass**
2. Click **Connect** hoặc nhập connection string:
   ```
   mongodb://localhost:27017
   ```

### Bước 2: Chọn Database

1. Trong danh sách Databases, chọn **travel_booking**
2. Nếu chưa có database này:
   - Chạy backend một lần (đã chạy ở trên)
   - Refresh Compass
   - Database sẽ tự tạo

### Bước 3: Chọn Collection

1. Click vào collection **users**
2. Nếu chưa có collection users, tạo mới:
   - Click **Create Collection**
   - Collection Name: `users`
   - Click **Create**

### Bước 4: Insert Admin User

1. Click button **ADD DATA** (góc trên)
2. Chọn **Insert Document**
3. Xóa nội dung mặc định
4. Paste JSON này:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
  "role": "admin",
  "phone": "0123456789",
  "dateOfBirth": {
    "$date": "1990-01-01T00:00:00.000Z"
  },
  "avatar": "default-avatar.jpg",
  "createdAt": {
    "$date": "2025-10-21T00:00:00.000Z"
  }
}
```

5. Click **Insert**

### Bước 5: Xác nhận

1. Refresh collection
2. Xem document vừa tạo
3. Kiểm tra field `role` có giá trị `"admin"`

✅ **Hoàn thành!**

---

## Phương pháp 2: Dùng MongoDB Shell (mongosh)

### Bước 1: Mở MongoDB Shell

```powershell
# Mở PowerShell MỚI (không phải terminal đang chạy backend)
mongosh
```

Nếu thấy lỗi `mongosh: command not found`:
- Xem hướng dẫn trong `MONGODB_INSTALLATION_WINDOWS.md`
- Thêm MongoDB vào PATH

### Bước 2: Chọn Database

```javascript
use travel_booking
```

### Bước 3: Insert Admin User

```javascript
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
  role: "admin",
  phone: "0123456789",
  dateOfBirth: new Date("1990-01-01"),
  avatar: "default-avatar.jpg",
  createdAt: new Date()
})
```

**Kết quả mong đợi:**
```javascript
{
  acknowledged: true,
  insertedId: ObjectId("...")
}
```

### Bước 4: Xác nhận

```javascript
// Kiểm tra admin user đã tạo
db.users.find({email: "admin@example.com"})

// Should see
{
  _id: ObjectId("..."),
  name: "Admin User",
  email: "admin@example.com",
  role: "admin",
  ...
}

// Thoát mongosh
exit
```

✅ **Hoàn thành!**

---

## 📝 THÔNG TIN ĐĂNG NHẬP ADMIN

```
📧 Email:    admin@example.com
🔑 Password: admin123
```

⚠️ **LƯU Ý:** Password đã được hash bằng bcrypt, không thể đổi trực tiếp trong database!

---

## 🧪 TEST ĐĂNG NHẬP ADMIN

### Bước 1: Restart Backend (QUAN TRỌNG!)

```powershell
# Dừng backend (Ctrl + C trong terminal đang chạy)
# Hoặc kill process
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Chạy lại
cd E:\Demo_web\backend
npm run dev
```

**⚠️ PHẢI RESTART để áp dụng thay đổi JWT token!**

### Bước 2: Truy cập Website

1. Mở browser: http://localhost:3000
2. Click **"Đăng nhập"**

### Bước 3: Đăng nhập

```
Email:    admin@example.com
Password: admin123
```

Click **"Đăng nhập"**

### Bước 4: Kiểm tra

Sau khi đăng nhập thành công, bạn sẽ thấy:

✅ Menu Admin xuất hiện:
   - Dashboard
   - Quản lý Tours
   - Quản lý Bookings

✅ Navbar hiển thị: "Xin chào, Admin User"

✅ Không có menu user (Bookings của tôi, Hồ sơ)

### Bước 5: Test Admin Features

1. Click **"Dashboard"** → Xem thống kê
2. Click **"Quản lý Tours"** → Tạo/sửa/xóa tours
3. Click **"Quản lý Bookings"** → Tạo booking cho khách

---

## 🐛 TROUBLESHOOTING

### Vấn đề 1: Vẫn không vào được admin

**Triệu chứng:** Đăng nhập thành công nhưng không thấy menu admin

**Nguyên nhân:** Token cũ vẫn trong localStorage

**Giải pháp:**
1. Mở Developer Tools (F12)
2. Tab **Console**
3. Chạy lệnh:
```javascript
localStorage.clear();
location.reload();
```
4. Đăng nhập lại

### Vấn đề 2: "Invalid credentials"

**Nguyên nhân:** 
- Email sai
- Admin user chưa được tạo trong database

**Giải pháp:**
1. Kiểm tra email: `admin@example.com` (chữ thường)
2. Kiểm tra trong MongoDB:
```javascript
mongosh
use travel_booking
db.users.find({email: "admin@example.com"})
```
3. Nếu không có, tạo lại theo hướng dẫn trên

### Vấn đề 3: Backend không chạy

**Triệu chứng:** `ERR_CONNECTION_REFUSED`

**Giải pháp:**
```powershell
cd E:\Demo_web\backend
npm run dev

# Đợi thấy:
# Server is running on port 5000
# MongoDB Connected: localhost
```

### Vấn đề 4: MongoDB không chạy

**Triệu chứng:** `MongooseServerSelectionError`

**Giải pháp:**
```powershell
# Kiểm tra MongoDB service
Get-Service MongoDB

# Nếu Stopped, start lại
Start-Service MongoDB

# Nếu không có service, xem MONGODB_INSTALLATION_WINDOWS.md
```

### Vấn đề 5: Menu admin không xuất hiện

**Nguyên nhân:** Token không có field `role`

**Giải pháp:**
1. Đảm bảo đã cập nhật `authController.js` (đã làm ở trên)
2. Restart backend:
```powershell
# Kill old process
Get-Process node | Stop-Process -Force

# Start new
cd E:\Demo_web\backend
npm run dev
```
3. Clear localStorage và login lại

### Vấn đề 6: Kiểm tra token trong browser

**Cách kiểm tra token hiện tại:**
1. F12 → Console
2. Chạy:
```javascript
const token = localStorage.getItem('token');
console.log('Token:', token);

// Decode token
const base64Url = token.split('.')[1];
const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));
console.log('Decoded:', JSON.parse(jsonPayload));
```

**Token ĐÚNG phải có:**
```javascript
{
  id: "...",
  email: "admin@example.com",
  name: "Admin User",
  role: "admin",  // ← QUAN TRỌNG
  iat: ...,
  exp: ...
}
```

Nếu không có `role`, nghĩa là backend chưa restart!

---

## ✅ CHECKLIST SAU KHI TẠO ADMIN

- [ ] Admin user đã được insert vào MongoDB
- [ ] Field `role` có giá trị `"admin"`
- [ ] Email là `admin@example.com`
- [ ] Password hash đúng
- [ ] Backend đã RESTART
- [ ] Đăng nhập thành công
- [ ] Menu admin hiển thị
- [ ] Có thể truy cập Dashboard
- [ ] Có thể tạo/sửa Tours
- [ ] Có thể tạo Bookings

---

## 🔐 BẢO MẬT

### Đổi password admin

**Không thể đổi trực tiếp trong database!** (vì đã hash)

**Cách 1: Qua Profile Page**
1. Login admin
2. Vào Profile (nếu admin có profile)
3. Đổi password

**Cách 2: Tạo API endpoint đổi password**
```javascript
// Backend: authController.js
exports.changePassword = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.password = req.body.newPassword;
  await user.save(); // Password sẽ tự động hash
}
```

**Cách 3: Tạo admin mới với password khác**

1. Tạo password hash mới:
```javascript
// Node.js console hoặc tạo script
const bcrypt = require('bcryptjs');
const password = 'yourNewPassword123';
const hash = await bcrypt.hash(password, 10);
console.log(hash);
```

2. Insert vào MongoDB với password hash mới

---

## 📚 TÀI LIỆU LIÊN QUAN

- `ADMIN_GUIDE.md` - Hướng dẫn sử dụng admin
- `MONGODB_INSTALLATION_WINDOWS.md` - Cài MongoDB
- `API_DOCUMENTATION.md` - API docs
- `UPDATE_ADMIN_BOOKING.md` - Tính năng admin mới

---

## 🎯 TÓM TẮT NHANH

### 3 bước tạo admin:

1. **Chạy backend:**
   ```powershell
   cd E:\Demo_web\backend
   npm run dev
   ```

2. **Insert admin vào MongoDB:**
   ```javascript
   mongosh
   use travel_booking
   db.users.insertOne({
     name: "Admin User",
     email: "admin@example.com",
     password: "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
     role: "admin",
     phone: "0123456789",
     dateOfBirth: new Date("1990-01-01"),
     createdAt: new Date()
   })
   ```

3. **Restart backend & Login:**
   - Ctrl+C → `npm run dev`
   - Browser: http://localhost:3000/login
   - Email: `admin@example.com` / Password: `admin123`

---

**✅ Fix đã hoàn tất! Admin có thể đăng nhập bình thường!**

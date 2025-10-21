# 🔑 TẠO TÀI KHOẢN ADMIN

## ✅ FIX ĐÃ HOÀN THÀNH

Backend đã được cập nhật để JWT token bao gồm `role` field.
Bây giờ cần tạo admin user trong MongoDB.

---

## 📋 CÁCH TẠO ADMIN - DÙNG MONGODB COMPASS

### ⚠️ PHƯƠNG PHÁP NÀY DỄ NHẤT!

### Bước 1: Mở MongoDB Compass

1. Tìm và mở ứng dụng **MongoDB Compass** trong Windows
2. Nếu chưa cài, download tại: https://www.mongodb.com/try/download/compass

### Bước 2: Connect

1. Connection String: `mongodb://localhost:27017`
2. Click **Connect**

### Bước 3: Chọn Database

1. Trong danh sách **Databases**, tìm và click **travel_booking**
2. Nếu chưa có database này, đợi backend chạy một lúc sẽ tự tạo

### Bước 4: Chọn/Tạo Collection

1. Click vào collection **users**
2. Nếu chưa có:
   - Click **Create Collection**
   - Tên: `users`
   - Click **Create**

### Bước 5: Insert Admin User

1. Click button **ADD DATA** (góc trên bên phải)
2. Chọn **Insert Document**
3. **XÓA HẾT** nội dung hiện tại
4. **COPY VÀ PASTE** đoạn JSON này:

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

### Bước 6: Xác nhận

1. Trong collection `users`, bạn sẽ thấy document vừa tạo
2. Kiểm tra:
   - ✅ `email`: "admin@example.com"
   - ✅ `role`: "admin"
   - ✅ `password`: "$2a$10$5Yg..." (password đã hash)

---

## 🎯 ĐĂNG NHẬP ADMIN

### Thông tin đăng nhập:

```
Email:    admin@example.com
Password: admin123
```

### Các bước:

1. Mở browser: **http://localhost:3000**
2. Click **"Đăng nhập"**
3. Nhập:
   - Email: `admin@example.com`
   - Password: `admin123`
4. Click **"Đăng nhập"**

### Sau khi đăng nhập thành công:

✅ Menu admin sẽ xuất hiện:
   - Dashboard
   - Quản lý Tours
   - Quản lý Bookings

✅ Navbar hiển thị: "Xin chào, Admin User"

✅ KHÔNG có menu user (Bookings của tôi, Hồ sơ)

---

## 🐛 NẾU VẪN KHÔNG VÀO ĐƯỢC

### Bước 1: Clear Browser Cache

1. Mở Developer Tools (F12)
2. Tab **Console**
3. Chạy lệnh:
```javascript
localStorage.clear();
location.reload();
```

### Bước 2: Đăng nhập lại

- Email: `admin@example.com`
- Password: `admin123`

### Bước 3: Kiểm tra token

1. F12 → Console
2. Chạy:
```javascript
const token = localStorage.getItem('token');
const parts = token.split('.');
const payload = JSON.parse(atob(parts[1]));
console.log('Token payload:', payload);
```

3. Kiểm tra output phải có:
```javascript
{
  id: "...",
  email: "admin@example.com",
  name: "Admin User",
  role: "admin",  // ← PHẢI CÓ!
  iat: ...,
  exp: ...
}
```

Nếu không có `role`, backend chưa được restart!

---

## 📝 CHECKLIST

- [ ] Backend đang chạy (http://localhost:5000)
- [ ] Frontend đang chạy (http://localhost:3000)
- [ ] MongoDB Compass connected
- [ ] Admin user đã insert vào database
- [ ] Field `role` = "admin"
- [ ] Clear localStorage
- [ ] Đăng nhập với admin@example.com / admin123
- [ ] Menu admin hiển thị

---

## 💡 GỢI Ý

Nếu bạn KHÔNG có MongoDB Compass:

1. Download tại: https://www.mongodb.com/try/download/compass
2. Cài đặt bình thường
3. Mở và connect: `mongodb://localhost:27017`
4. Làm theo hướng dẫn trên

MongoDB Compass là GUI tool rất dễ dùng, khuyên dùng cho người mới!

---

**✅ Sau khi tạo admin xong, bạn có thể:**
- Tạo/sửa/xóa Tours
- Quản lý Bookings
- Tạo booking cho khách hàng
- Xem Dashboard thống kê

**🎉 Chúc bạn thành công!**

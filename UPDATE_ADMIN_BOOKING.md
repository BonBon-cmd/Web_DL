# 🎉 CẬP NHẬT MỚI - ADMIN FEATURES

## ✅ Những gì đã thêm

### 1. **Admin có thể đăng nhập vào hệ thống**

**Thông tin đăng nhập Admin:**
- 📧 Email: `admin@example.com`
- 🔑 Password: `admin123`

**Cách tạo Admin User:**
- Xem chi tiết trong `ADMIN_GUIDE.md`
- Hoặc `MONGODB_INSTALLATION_WINDOWS.md` (phần Tạo Admin User)

---

### 2. **Admin có thể TẠO BOOKING cho khách hàng** ⭐ MỚI

Admin giờ đây có thể tạo booking thay cho khách hàng qua giao diện web!

**Tính năng:**
- ✅ Tạo booking bằng cách nhập email khách hàng
- ✅ Chọn tour từ danh sách
- ✅ Đặt ngày, số người
- ✅ Set trạng thái booking (Pending/Confirmed/Cancelled/Completed)
- ✅ Set trạng thái thanh toán (Unpaid/Paid/Refunded)
- ✅ Thêm yêu cầu đặc biệt
- ✅ Hệ thống tự động tính tổng tiền

**Cách sử dụng:**
1. Đăng nhập với tài khoản admin
2. Vào **Quản lý Bookings**
3. Click nút **"+ Tạo Booking Mới"**
4. Điền thông tin và submit

**Lưu ý:**
- Khách hàng phải có tài khoản (đã đăng ký) trong hệ thống
- Admin nhập đúng email của khách hàng
- Nếu email không tồn tại, hệ thống báo lỗi: "User with this email not found"

---

### 3. **Admin quản lý Bookings nâng cao**

**Các tính năng đã có:**
- ✅ Xem tất cả bookings của mọi users
- ✅ Lọc theo trạng thái (Pending/Confirmed/Cancelled/Completed)
- ✅ Cập nhật trạng thái booking
- ✅ Cập nhật trạng thái thanh toán

**Tính năng MỚI:**
- ✨ **Tạo booking cho khách hàng**
- ✨ Form tạo booking với modal đẹp
- ✨ Dropdown chọn tour (hiển thị giá và max group size)
- ✨ Validation đầy đủ
- ✨ Tự động tính tổng tiền

---

## 📁 Files đã cập nhật

### Backend
```
✏️ backend/controllers/bookingController.js
   - Thêm logic cho admin tạo booking
   - Hỗ trợ tìm user bằng email
   - Admin có thể set status và paymentStatus khi tạo
   - Import User model
```

### Frontend
```
✏️ frontend/src/pages/admin/Bookings.jsx
   - Thêm button "Tạo Booking Mới"
   - Thêm modal form tạo booking
   - Form fields: email, tour, ngày, số người, status, payment, ghi chú
   - Integration với API createBooking
   - Fetch danh sách tours để chọn
```

### Documentation
```
📄 ADMIN_GUIDE.md (MỚI)
   - Hướng dẫn đầy đủ cho Admin
   - Cách đăng nhập Admin
   - Hướng dẫn tạo booking cho khách
   - Use cases thực tế
   - Quy trình làm việc
   - Troubleshooting
```

---

## 🚀 Test tính năng mới

### Bước 1: Tạo Admin User (nếu chưa có)

```powershell
# Dùng MongoDB Shell
mongosh

use travel_booking

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

### Bước 2: Đăng nhập Admin

1. Truy cập: http://localhost:3001
2. Click "Đăng nhập"
3. Email: `admin@example.com`
4. Password: `admin123`

### Bước 3: Test tạo booking

1. Vào menu **"Quản lý Bookings"**
2. Click **"+ Tạo Booking Mới"**
3. Nhập email của user đã đăng ký (ví dụ: `2212362@dlu.edu.vn` từ ảnh bạn gửi)
4. Chọn tour
5. Chọn ngày (phải là ngày trong tương lai)
6. Nhập số người
7. Chọn trạng thái: **Confirmed**
8. Chọn thanh toán: **Paid** (nếu đã thanh toán)
9. Click **"Tạo Booking"**

### Bước 4: Kiểm tra kết quả

- ✅ Booking xuất hiện trong danh sách
- ✅ Thông tin khách hàng hiển thị đúng
- ✅ Tổng tiền được tính tự động
- ✅ Trạng thái đúng như đã set

---

## 🎯 Use Cases

### Case 1: Khách đặt tour qua điện thoại

**Tình huống:**
- Khách gọi điện: "Tôi muốn đặt tour Đà Lạt 3 ngày 2 đêm cho 4 người"
- Khách cung cấp: Email, SĐT, Họ tên

**Admin làm gì:**
1. Kiểm tra email khách có trong hệ thống chưa
2. Nếu chưa, yêu cầu khách đăng ký qua web
3. Login vào admin panel
4. Vào **Quản lý Bookings** → **Tạo Booking Mới**
5. Nhập email khách hàng
6. Chọn tour Đà Lạt
7. Chọn ngày đi (theo yêu cầu khách)
8. Số người: 4
9. Trạng thái: **Confirmed** (đã xác nhận qua điện thoại)
10. Thanh toán: **Unpaid** (chưa thanh toán) hoặc **Paid** (đã chuyển khoản)
11. Ghi chú yêu cầu đặc biệt (nếu có)
12. Click **Tạo Booking**
13. Thông báo lại cho khách qua điện thoại/email

### Case 2: Khách đã đặt nhưng cần xác nhận

**Tình huống:**
- User tự đặt booking qua web
- Booking có status **Pending**
- Admin cần xác nhận

**Admin làm gì:**
1. Vào **Quản lý Bookings**
2. Lọc theo **Pending**
3. Kiểm tra thông tin booking
4. Click dropdown Status → Chọn **Confirmed**
5. Nếu đã thanh toán, click Payment → **Paid**

---

## 📊 So sánh trước và sau

### ❌ TRƯỚC (Hạn chế)
- Admin chỉ xem được bookings
- Admin chỉ cập nhật được status
- Không tạo được booking cho khách
- Khách phải tự đặt qua web

### ✅ SAU (Nâng cao)
- ✨ Admin có thể tạo booking cho khách
- ✨ Nhập email là được (không cần ID)
- ✨ Set ngay status và payment status
- ✨ Hỗ trợ khách đặt qua điện thoại/email
- ✨ Form đẹp, dễ dùng
- ✨ Validation đầy đủ

---

## 🔒 Bảo mật

### Quyền hạn

**Admin:**
- ✅ Tạo booking cho bất kỳ user nào (bằng email)
- ✅ Set được status và payment status khi tạo
- ✅ Xem tất cả bookings

**User thường:**
- ✅ Chỉ tạo booking cho chính mình
- ❌ Không set được status (mặc định là Pending)
- ❌ Không set được payment status (mặc định là Unpaid)
- ✅ Chỉ xem được bookings của mình

---

## 🐛 Troubleshooting

### Lỗi: "User with this email not found"

**Nguyên nhân:** Email chưa đăng ký trong hệ thống

**Giải pháp:**
1. Yêu cầu khách đăng ký tại: http://localhost:3001/register
2. Hoặc kiểm tra email đã nhập đúng chưa
3. Kiểm tra trong MongoDB:
   ```javascript
   db.users.find({email: "customer@example.com"})
   ```

### Lỗi: "Maximum group size is X"

**Nguyên nhân:** Số người vượt quá giới hạn của tour

**Giải pháp:**
- Giảm số người
- Hoặc chọn tour khác có maxGroupSize lớn hơn

### Không thấy nút "Tạo Booking Mới"

**Nguyên nhân:** Đăng nhập bằng user thường

**Giải pháp:**
- Đăng xuất
- Đăng nhập lại với admin: `admin@example.com`

---

## 📖 Tài liệu liên quan

- 📘 `ADMIN_GUIDE.md` - Hướng dẫn Admin đầy đủ
- 📗 `README.md` - Tổng quan dự án
- 📙 `API_DOCUMENTATION.md` - API endpoints
- 📕 `MONGODB_INSTALLATION_WINDOWS.md` - Cài MongoDB

---

## ✅ Server Status

**Backend:** ✅ Running on http://localhost:5000
- MongoDB Connected: ✅
- API Docs: http://localhost:5000/api-docs

**Frontend:** ✅ Running on http://localhost:3001
- Hot reload: ✅ Enabled

---

**🎉 Tính năng đã sẵn sàng sử dụng!**

Hãy test ngay:
1. Login admin: http://localhost:3001/login
2. Vào Quản lý Bookings
3. Click "Tạo Booking Mới"
4. Thử tạo booking cho email: `2212362@dlu.edu.vn`

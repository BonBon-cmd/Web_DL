# 📚 HƯỚNG DẪN SỬ DỤNG ADMIN

## 🔐 Đăng nhập Admin

### Bước 1: Tạo tài khoản Admin

Có 2 cách để tạo tài khoản Admin:

#### Cách 1: Dùng MongoDB Compass (Khuyên dùng)

1. Mở **MongoDB Compass**
2. Connect tới: `mongodb://localhost:27017`
3. Chọn database: **travel_booking**
4. Chọn collection: **users**
5. Click **ADD DATA** → **Insert Document**
6. Paste JSON này:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
  "role": "admin",
  "phone": "0123456789",
  "dateOfBirth": {"$date": "1990-01-01T00:00:00.000Z"},
  "avatar": "default-avatar.jpg",
  "createdAt": {"$date": "2025-10-20T00:00:00.000Z"}
}
```

7. Click **Insert**

**Thông tin đăng nhập:**
- 📧 Email: `admin@example.com`
- 🔑 Password: `admin123`

#### Cách 2: Dùng MongoDB Shell

```powershell
# Mở PowerShell
mongosh

# Trong MongoDB shell:
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

# Kiểm tra
db.users.find({email: "admin@example.com"})
```

### Bước 2: Đăng nhập vào Website

1. Truy cập: http://localhost:3001
2. Click **"Đăng nhập"** ở góc phải navbar
3. Nhập:
   - Email: `admin@example.com`
   - Password: `admin123`
4. Click **"Đăng nhập"**

### Bước 3: Xác nhận đăng nhập thành công

Sau khi đăng nhập, bạn sẽ thấy:
- Menu Admin với các mục: **Dashboard**, **Quản lý Tours**, **Quản lý Bookings**
- Không có menu "Bookings của tôi" (chỉ dành cho user)

---

## 🎛️ Các tính năng Admin

### 1️⃣ Dashboard - Tổng quan hệ thống

**Đường dẫn:** `/admin/dashboard`

**Các thống kê:**
- 📊 Tổng số Tours
- 📊 Tổng số Bookings
- 📊 Tổng doanh thu
- 📊 Số người dùng

**Biểu đồ:**
- 📈 Revenue Chart (Doanh thu theo tháng)
- 📊 Bookings Chart (Bookings theo trạng thái)
- 🏆 Top Tours (Tours được đặt nhiều nhất)

---

### 2️⃣ Quản lý Tours

**Đường dẫn:** `/admin/tours`

#### Xem danh sách Tours
- Hiển thị tất cả tours trong hệ thống
- Các thông tin: Tiêu đề, Địa điểm, Giá, Thời lượng, Số người tối đa

#### Tạo Tour mới
1. Click nút **"+ Tạo Tour"**
2. Điền thông tin:
   - **Tiêu đề*** (bắt buộc)
   - **Mô tả*** (bắt buộc)
   - **Giá*** (USD)
   - **Thời lượng*** (số ngày)
   - **Số người tối đa*** 
   - **Địa điểm:**
     - Thành phố
     - Quốc gia
     - Địa chỉ cụ thể
   - **Upload ảnh** (nhiều ảnh)
   - **Featured** (Tour nổi bật)
3. Click **"Tạo Tour"**

#### Chỉnh sửa Tour
1. Click vào tour cần sửa
2. Cập nhật thông tin
3. Click **"Cập nhật"**

#### Xóa Tour
1. Click nút **"Xóa"** ở tour cần xóa
2. Xác nhận xóa

---

### 3️⃣ Quản lý Bookings ⭐ MỚI

**Đường dẫn:** `/admin/bookings`

#### Xem danh sách Bookings
- Hiển thị tất cả bookings (của tất cả users)
- Thông tin hiển thị:
  - ID Booking
  - Thông tin khách hàng (Tên, Email, SĐT)
  - Tour đã đặt
  - Ngày đặt tour
  - Số người
  - Tổng tiền
  - Trạng thái
  - Trạng thái thanh toán
  - Yêu cầu đặc biệt

#### Lọc Bookings
- Click dropdown **"Lọc theo trạng thái"**
- Chọn:
  - **Tất cả**: Hiển thị tất cả
  - **Pending**: Chờ xác nhận
  - **Confirmed**: Đã xác nhận
  - **Cancelled**: Đã hủy
  - **Completed**: Đã hoàn thành

#### Cập nhật trạng thái Booking
1. Tìm booking cần cập nhật
2. Click vào dropdown **Trạng thái**
3. Chọn trạng thái mới:
   - **Pending** (Chờ xác nhận)
   - **Confirmed** (Đã xác nhận)
   - **Cancelled** (Đã hủy)
   - **Completed** (Đã hoàn thành)
4. Hệ thống tự động lưu

#### Cập nhật trạng thái Thanh toán
1. Tìm booking cần cập nhật
2. Click vào dropdown **Thanh toán**
3. Chọn:
   - **Unpaid** (Chưa thanh toán)
   - **Paid** (Đã thanh toán)
   - **Refunded** (Đã hoàn tiền)
4. Hệ thống tự động lưu

#### ⭐ Tạo Booking cho Khách hàng (MỚI)

Admin có thể tạo booking thay cho khách hàng:

1. Click nút **"+ Tạo Booking Mới"**

2. Điền thông tin:
   - **Email khách hàng*** 
     - Nhập email của khách đã đăng ký
     - Nếu chưa có tài khoản, khách cần đăng ký trước
   
   - **Tour***
     - Chọn tour từ dropdown
     - Hiển thị giá và số người tối đa
   
   - **Ngày đặt tour***
     - Chọn ngày (không được chọn ngày quá khứ)
   
   - **Số người***
     - Nhập số người tham gia
     - Không vượt quá maxGroupSize của tour
   
   - **Trạng thái**
     - Pending (mặc định)
     - Confirmed
     - Cancelled
     - Completed
   
   - **Thanh toán**
     - Unpaid (mặc định)
     - Paid
     - Refunded
   
   - **Yêu cầu đặc biệt**
     - Ghi chú nếu có

3. Click **"Tạo Booking"**

4. Hệ thống sẽ:
   - ✅ Kiểm tra email khách hàng có trong hệ thống
   - ✅ Kiểm tra tour có tồn tại
   - ✅ Kiểm tra số người không vượt quá giới hạn
   - ✅ Tự động tính tổng tiền
   - ✅ Tạo booking và thông báo thành công

**Lưu ý quan trọng:**
- Khách hàng phải có tài khoản trong hệ thống (đã đăng ký)
- Admin nhập đúng email của khách hàng
- Giá sẽ được tính tự động: `Giá tour × Số người`

---

## 🎯 Use Cases - Kịch bản sử dụng

### Kịch bản 1: Khách đặt tour qua điện thoại

**Tình huống:** Khách hàng gọi điện đặt tour, không qua website

**Giải pháp:**
1. Admin hỏi thông tin khách hàng (Email, SĐT, Họ tên)
2. Kiểm tra khách có tài khoản chưa:
   - ✅ Có: Admin tạo booking trực tiếp
   - ❌ Chưa: Yêu cầu khách đăng ký hoặc admin tạo user trước

3. Admin đăng nhập vào hệ thống
4. Vào **Quản lý Bookings** → Click **"+ Tạo Booking Mới"**
5. Điền thông tin:
   - Email khách hàng
   - Tour khách muốn đặt
   - Ngày đi
   - Số người
   - Trạng thái: **Confirmed** (nếu đã xác nhận)
   - Thanh toán: **Paid** (nếu đã thanh toán) hoặc **Unpaid**
6. Ghi chú yêu cầu đặc biệt (nếu có)
7. Click **"Tạo Booking"**
8. Thông báo cho khách hàng

### Kịch bản 2: Xác nhận booking

**Tình huống:** User đã đặt booking online, admin cần xác nhận

**Giải pháp:**
1. Vào **Quản lý Bookings**
2. Lọc theo **Pending**
3. Kiểm tra thông tin booking
4. Thay đổi trạng thái thành **Confirmed**
5. Nếu đã thanh toán, cập nhật **Payment Status** → **Paid**

### Kịch bản 3: Khách yêu cầu hủy booking

**Tình huống:** Khách hàng muốn hủy booking

**Giải pháp:**
1. Vào **Quản lý Bookings**
2. Tìm booking của khách (theo email hoặc tên)
3. Thay đổi trạng thái thành **Cancelled**
4. Nếu đã thanh toán và cần hoàn tiền:
   - Cập nhật **Payment Status** → **Refunded**

### Kịch bản 4: Tour đã hoàn thành

**Tình huống:** Tour đã diễn ra xong

**Giải pháp:**
1. Vào **Quản lý Bookings**
2. Tìm các booking có ngày đã qua
3. Thay đổi trạng thái thành **Completed**

---

## 📊 Quy trình làm việc Admin

### Quy trình hàng ngày

1. **Sáng:**
   - Login vào Dashboard
   - Kiểm tra thống kê tổng quan
   - Xem bookings mới (Pending)
   - Xác nhận các bookings hợp lệ

2. **Trong ngày:**
   - Xử lý yêu cầu từ khách hàng
   - Tạo booking cho khách đặt qua điện thoại/email
   - Cập nhật trạng thái bookings
   - Cập nhật tours (giá, thông tin)

3. **Cuối ngày:**
   - Kiểm tra bookings ngày mai
   - Cập nhật các tour đã hoàn thành
   - Kiểm tra thanh toán

### Quy trình tạo tour mới

1. Thu thập thông tin tour
2. Chuẩn bị ảnh (nhiều ảnh đẹp)
3. Vào **Quản lý Tours** → **Tạo Tour**
4. Điền đầy đủ thông tin
5. Upload ảnh
6. Kiểm tra preview
7. Click **Tạo Tour**
8. Kiểm tra tour trên trang chủ

---

## 🔒 Bảo mật

### Quyền hạn Admin

✅ Admin CÓ THỂ:
- Xem tất cả tours
- Tạo/sửa/xóa tours
- Xem tất cả bookings (của mọi user)
- Tạo booking cho bất kỳ user nào
- Cập nhật trạng thái bookings
- Cập nhật trạng thái thanh toán
- Xem dashboard và thống kê

❌ Admin KHÔNG THỂ:
- Xem password của users
- Thay đổi role của users khác (cần database)
- Xóa users (cần thêm tính năng)

### Bảo vệ tài khoản Admin

⚠️ **QUAN TRỌNG:**
- Không chia sẻ password admin
- Đổi password mặc định ngay lập tức
- Sử dụng password mạnh (min 8 ký tự, có số, chữ hoa)
- Đăng xuất sau khi sử dụng
- Không để trình duyệt lưu password

### Đổi password Admin

1. Login với tài khoản admin
2. Click vào menu "Hồ sơ" (Profile)
3. Scroll xuống phần **Đổi mật khẩu**
4. Nhập:
   - Mật khẩu hiện tại: `admin123`
   - Mật khẩu mới: (password mạnh)
   - Xác nhận mật khẩu mới
5. Click **"Đổi mật khẩu"**

---

## 🐛 Troubleshooting

### Không đăng nhập được Admin

**Lỗi:** "Invalid credentials"

**Giải pháp:**
1. Kiểm tra email: `admin@example.com`
2. Kiểm tra password: `admin123`
3. Kiểm tra trong MongoDB Compass:
   ```javascript
   use travel_booking
   db.users.find({email: "admin@example.com"})
   ```
4. Xác nhận field `role` là `"admin"`

### Không thấy menu Admin

**Nguyên nhân:** Đăng nhập bằng tài khoản user

**Giải pháp:**
- Đăng xuất
- Đăng nhập lại với `admin@example.com`

### Tạo booking lỗi "User not found"

**Nguyên nhân:** Email khách hàng chưa đăng ký

**Giải pháp:**
1. Kiểm tra email trong database:
   ```javascript
   db.users.find({email: "customer@example.com"})
   ```
2. Nếu chưa có, yêu cầu khách đăng ký:
   - Truy cập http://localhost:3001/register
   - Điền thông tin đăng ký

### Upload ảnh tour thất bại

**Nguyên nhân:** File quá lớn hoặc sai format

**Giải pháp:**
- File size < 5MB
- Format: jpg, jpeg, png, gif
- Nén ảnh nếu quá lớn

---

## 📞 Hỗ trợ

### API Documentation

Xem tài liệu API đầy đủ tại:
```
http://localhost:5000/api-docs
```

### Các file hướng dẫn khác

- `README.md` - Hướng dẫn tổng quan
- `API_DOCUMENTATION.md` - Chi tiết API
- `INSTALLATION_GUIDE.md` - Hướng dẫn cài đặt
- `MONGODB_INSTALLATION_WINDOWS.md` - Cài MongoDB
- `PROFILE_FEATURE.md` - Tính năng Profile

---

## ✅ Checklist Admin

### Khi bắt đầu ca làm việc
- [ ] Login vào hệ thống
- [ ] Kiểm tra Dashboard
- [ ] Xem bookings mới (Pending)
- [ ] Kiểm tra tours có sẵn

### Khi tạo booking cho khách
- [ ] Xác nhận email khách hàng
- [ ] Chọn đúng tour
- [ ] Nhập đúng ngày
- [ ] Kiểm tra số người
- [ ] Set đúng trạng thái
- [ ] Ghi chú yêu cầu đặc biệt
- [ ] Thông báo cho khách

### Khi tạo tour mới
- [ ] Chuẩn bị ảnh chất lượng cao
- [ ] Điền đầy đủ thông tin
- [ ] Set giá chính xác
- [ ] Kiểm tra maxGroupSize
- [ ] Upload ảnh
- [ ] Preview tour
- [ ] Test booking thử

### Cuối ca làm việc
- [ ] Cập nhật các booking đã hoàn thành
- [ ] Kiểm tra thanh toán
- [ ] Đăng xuất

---

**🎉 Chúc bạn quản lý hệ thống hiệu quả!**

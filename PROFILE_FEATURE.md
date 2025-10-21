# 🎯 TÍNH NĂNG PROFILE - QUẢN LÝ THÔNG TIN CÁ NHÂN

## 📋 Mô tả

Tính năng Profile cho phép người dùng quản lý và chỉnh sửa thông tin cá nhân của mình, bao gồm:

- ✅ Xem thông tin profile
- ✅ Chỉnh sửa họ tên
- ✅ Cập nhật số điện thoại
- ✅ Cập nhật ngày sinh
- ✅ Upload/thay đổi ảnh đại diện (avatar)
- ✅ Đổi mật khẩu

---

## 🚀 Backend API

### 1. Get Profile
```
GET /api/profile
Headers: Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Nguyen Van A",
    "email": "user@example.com",
    "phone": "0123456789",
    "dateOfBirth": "1990-01-01T00:00:00.000Z",
    "avatar": "/uploads/avatar-123.jpg",
    "role": "user",
    "createdAt": "2025-10-20T00:00:00.000Z"
  }
}
```

### 2. Update Profile
```
PUT /api/profile
Headers: Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Nguyen Van B",
  "phone": "0987654321",
  "dateOfBirth": "1995-05-15"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    ...updated user data
  }
}
```

### 3. Upload Avatar
```
POST /api/profile/avatar
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
avatar: <image file>
```

**Response:**
```json
{
  "success": true,
  "data": {
    ...user data with new avatar URL
  }
}
```

### 4. Change Password
```
PUT /api/profile/password
Headers: Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## 🎨 Frontend Components

### Profile Page Location
```
frontend/src/pages/Profile.jsx
```

### Features

#### 1. **Avatar Section**
- Hiển thị ảnh đại diện hiện tại
- Cho phép chọn ảnh mới (preview trước khi upload)
- Upload và cập nhật avatar
- Avatar được lưu trong thư mục `backend/uploads/`

#### 2. **Profile Information**
- Hiển thị thông tin: Họ tên, Email, SĐT, Ngày sinh, Vai trò
- Chế độ xem (view mode) và chế độ chỉnh sửa (edit mode)
- Email không cho phép thay đổi
- Validate dữ liệu trước khi submit

#### 3. **Change Password**
- Form đổi mật khẩu bảo mật
- Yêu cầu mật khẩu hiện tại
- Validate mật khẩu mới (min 6 ký tự)
- Confirm mật khẩu mới

---

## 📝 Database Schema Update

### User Model đã được cập nhật:

```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: String (user/admin),
  phone: String,
  dateOfBirth: Date,        // ✨ NEW FIELD
  avatar: String,
  createdAt: Date
}
```

---

## 🎯 Cách sử dụng

### 1. Truy cập Profile

**Sau khi đăng nhập:**
1. Click vào menu "Hồ sơ" trên navbar
2. Hoặc truy cập: `http://localhost:3000/profile`

### 2. Chỉnh sửa thông tin

1. Click nút "Chỉnh sửa" ở phần Thông tin cá nhân
2. Cập nhật các trường: Họ tên, SĐT, Ngày sinh
3. Click "Lưu thay đổi"

### 3. Upload Avatar

1. Ở phần Ảnh đại diện, click "Choose File"
2. Chọn ảnh từ máy tính (jpg, png, gif)
3. Xem preview ảnh
4. Click "Upload Avatar"
5. Ảnh sẽ được cập nhật ngay lập tức

### 4. Đổi mật khẩu

1. Click "Đổi mật khẩu"
2. Nhập mật khẩu hiện tại
3. Nhập mật khẩu mới (tối thiểu 6 ký tự)
4. Xác nhận mật khẩu mới
5. Click "Đổi mật khẩu"

---

## 🔒 Bảo mật

### Authentication
- Tất cả API profile đều yêu cầu JWT token
- Chỉ user đã login mới truy cập được
- User chỉ xem/sửa được profile của chính mình

### Password Security
- Password được hash bằng bcrypt
- Yêu cầu mật khẩu hiện tại khi đổi mật khẩu
- Không hiển thị password trong response

### File Upload Security
- Validate file type (chỉ ảnh: jpg, jpeg, png, gif)
- Giới hạn kích thước file (max 5MB)
- File được lưu với tên unique (timestamp + random)

---

## 🎨 UI/UX Features

### Responsive Design
- Mobile-friendly
- Adaptive layout cho mọi kích thước màn hình

### User Experience
- Preview avatar trước khi upload
- Confirm dialog khi hủy chỉnh sửa
- Toast notifications cho mọi actions
- Loading states
- Error handling với messages rõ ràng

### Visual Feedback
- Avatar hiển thị dạng tròn với border màu
- Form validation với messages
- Disabled fields (email không đổi được)
- Button states (loading, disabled)

---

## 🧪 Testing

### Test Profile Page

1. **Login và truy cập Profile**
```
- Login: http://localhost:3000/login
- Navigate to Profile: http://localhost:3000/profile
```

2. **Test Update Profile**
```javascript
// Via API (Swagger)
PUT http://localhost:5000/api/profile
Headers: Authorization: Bearer <your_token>
Body: {
  "name": "New Name",
  "phone": "0123456789",
  "dateOfBirth": "1990-01-01"
}
```

3. **Test Upload Avatar**
```javascript
// Via Frontend
- Click "Choose File"
- Select an image
- Click "Upload Avatar"
- Check avatar updated in navbar
```

4. **Test Change Password**
```javascript
// Via Frontend
- Click "Đổi mật khẩu"
- Enter current password
- Enter new password
- Confirm new password
- Click "Đổi mật khẩu"
- Logout and login with new password
```

---

## 🐛 Troubleshooting

### Avatar không hiển thị

**Nguyên nhân:** Đường dẫn file không đúng

**Giải pháp:**
```javascript
// Check trong browser console
console.log('Avatar URL:', user.avatar);

// Should be: /uploads/filename.jpg
// Backend serves at: http://localhost:5000/uploads/filename.jpg
```

### Upload avatar thất bại

**Nguyên nhân:** File quá lớn hoặc sai định dạng

**Giải pháp:**
- Kiểm tra file size < 5MB
- Chỉ upload ảnh: jpg, jpeg, png, gif
- Check backend logs

### Đổi mật khẩu lỗi

**Nguyên nhân:** Mật khẩu hiện tại sai

**Giải pháp:**
- Đảm bảo nhập đúng mật khẩu hiện tại
- Mật khẩu mới phải >= 6 ký tự
- Mật khẩu mới phải khớp với confirm password

---

## 📸 Screenshots

### Profile View Mode
```
┌─────────────────────────────────────┐
│  Ảnh đại diện                       │
│  [Avatar Image] [Choose File]       │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  Thông tin cá nhân    [Chỉnh sửa]  │
│  Họ tên: Nguyen Van A               │
│  Email: user@example.com            │
│  SĐT: 0123456789                    │
│  Ngày sinh: 01/01/1990              │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  Đổi mật khẩu        [Đổi mật khẩu]│
└─────────────────────────────────────┘
```

### Profile Edit Mode
```
┌─────────────────────────────────────┐
│  Thông tin cá nhân                  │
│  Họ tên: [Input Field]              │
│  Email: user@example.com (disabled) │
│  SĐT: [Input Field]                 │
│  Ngày sinh: [Date Picker]           │
│  [Lưu thay đổi] [Hủy]               │
└─────────────────────────────────────┘
```

---

## 🚀 Next Steps / Future Enhancements

- [ ] Email verification khi đổi email
- [ ] 2FA (Two-Factor Authentication)
- [ ] Upload nhiều ảnh vào gallery
- [ ] Crop avatar trước khi upload
- [ ] Social media links
- [ ] Privacy settings
- [ ] Account deletion option
- [ ] Export personal data (GDPR)

---

## 📄 Related Files

### Backend
```
backend/
├── controllers/profileController.js    # Profile API logic
├── routes/profile.js                   # Profile routes
├── models/User.js                      # User model (updated)
└── server.js                           # Added profile routes
```

### Frontend
```
frontend/
├── src/
│   ├── pages/Profile.jsx              # Profile page component
│   ├── services/api.js                # Added profile APIs
│   ├── App.jsx                        # Added profile route
│   └── components/Navbar.jsx          # Added profile link
```

---

**✅ Profile feature is ready to use!**

Login và truy cập http://localhost:3000/profile để sử dụng!

# 📸 PROFILE AVATAR UPLOAD - HƯỚNG DẪN

## ✅ TÍNH NĂNG ĐÃ CÓ

Hệ thống **ĐÃ** hỗ trợ upload avatar và **TỰ ĐỘNG CẬP NHẬT LÊN DATABASE**!

---

## 🔄 LUỒNG HOẠT ĐỘNG

### 1. **Frontend (Profile.jsx)**

```javascript
const handleUploadAvatar = async () => {
  // Tạo FormData để upload file
  const formData = new FormData();
  formData.append('avatar', avatarFile);
  
  // Gọi API upload
  const response = await uploadAvatar(formData);
  
  // Cập nhật state với dữ liệu mới từ database
  setUser(response.data.data);
  
  // Reload page để cập nhật avatar trong navbar
  window.location.reload();
};
```

**Các bước:**
1. User chọn ảnh từ `<input type="file">`
2. Preview ảnh trước khi upload
3. Click "Upload Avatar" → Gọi API
4. **Database được cập nhật**
5. Reload page để hiển thị avatar mới

---

### 2. **Backend API (profileController.js)**

```javascript
exports.uploadAvatar = async (req, res) => {
  // 1. Middleware upload đã lưu file vào /uploads/
  const avatarUrl = `/uploads/${req.file.filename}`;
  
  // 2. CẬP NHẬT DATABASE
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: avatarUrl },  // ← Lưu đường dẫn vào DB
    { new: true }           // ← Trả về user đã update
  );
  
  // 3. Trả về user với avatar mới
  res.status(200).json({
    success: true,
    data: user  // ← User có avatar mới từ DB
  });
};
```

**Các bước backend:**
1. Nhận file từ frontend
2. Multer middleware lưu file vào `backend/uploads/`
3. **Cập nhật field `avatar` trong MongoDB**
4. Trả về user object với avatar mới

---

### 3. **Database Schema (User Model)**

```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  phone: String,
  dateOfBirth: Date,
  avatar: {
    type: String,
    default: '/uploads/default-avatar.jpg'  // ← Field lưu đường dẫn avatar
  },
  createdAt: Date
});
```

**Field avatar:**
- Type: String
- Lưu đường dẫn: `/uploads/filename.jpg`
- Default: `/uploads/default-avatar.jpg`

---

## 📁 CẤU TRÚC FILE

```
backend/
├── uploads/              ← Folder lưu ảnh upload
│   ├── avatar-123456.jpg
│   ├── avatar-789012.jpg
│   └── default-avatar.jpg
├── middleware/
│   └── upload.js         ← Multer config
├── controllers/
│   └── profileController.js  ← uploadAvatar()
└── routes/
    └── profile.js        ← POST /api/profile/avatar

frontend/
├── src/
│   ├── pages/
│   │   └── Profile.jsx   ← Upload UI
│   └── services/
│       └── api.js        ← uploadAvatar() API call
```

---

## 🔍 KIỂM TRA UPLOAD

### 1. **Trong MongoDB Compass:**

```javascript
// Tìm user vừa upload
db.users.findOne({ email: "user@example.com" })

// Kết quả:
{
  "_id": ObjectId("..."),
  "name": "Nguyen Van A",
  "email": "user@example.com",
  "avatar": "/uploads/avatar-1729512345678.jpg",  // ← ĐÃ CẬP NHẬT
  "role": "user",
  "createdAt": ISODate("2025-10-21T00:00:00.000Z")
}
```

### 2. **Check file đã lưu:**

```powershell
# Xem files trong uploads
ls E:\Demo_web\backend\uploads

# Kết quả:
avatar-1729512345678.jpg
avatar-1729512456789.jpg
default-avatar.jpg
```

### 3. **Trên website:**

1. Login → Profile
2. Click "Chọn file" → Chọn ảnh
3. Preview hiển thị ảnh
4. Click "Upload Avatar"
5. Toast: "Upload avatar thành công!"
6. Page reload → Avatar mới hiển thị

---

## 🎯 FLOW DIAGRAM

```
User chọn ảnh
     ↓
Preview ảnh (local)
     ↓
Click "Upload Avatar"
     ↓
Frontend gửi FormData
     ↓
POST /api/profile/avatar
     ↓
Multer middleware lưu file → backend/uploads/
     ↓
profileController.uploadAvatar()
     ↓
User.findByIdAndUpdate({ avatar: "/uploads/filename.jpg" })
     ↓
MongoDB cập nhật field avatar ✅
     ↓
Response { data: user_with_new_avatar }
     ↓
Frontend reload page
     ↓
Avatar mới hiển thị từ database ✅
```

---

## 📋 API ENDPOINT

### **POST /api/profile/avatar**

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

**Body (FormData):**
```javascript
{
  avatar: <FILE>  // Image file (jpg, png, etc.)
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "_id": "671234...",
    "name": "Nguyen Van A",
    "email": "user@example.com",
    "avatar": "/uploads/avatar-1729512345678.jpg",
    "role": "user",
    "phone": "0123456789",
    "dateOfBirth": "1990-01-01",
    "createdAt": "2025-10-21T00:00:00.000Z"
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Please upload an image"
}
```

---

## 🛠️ MIDDLEWARE UPLOAD (Multer)

**File: `backend/middleware/upload.js`**

```javascript
const multer = require('multer');
const path = require('path');

// Cấu hình storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // ← Lưu vào folder uploads/
  },
  filename: function (req, file, cb) {
    // Tạo tên file unique: avatar-timestamp.ext
    cb(null, 'avatar-' + Date.now() + path.extname(file.originalname));
  }
});

// File filter: chỉ cho phép ảnh
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }  // Max 5MB
});

module.exports = upload;
```

---

## ✅ XÁC NHẬN TÍNH NĂNG HOẠT ĐỘNG

### Checklist:

- ✅ **Frontend:** `handleUploadAvatar()` gọi API với FormData
- ✅ **API Route:** `POST /api/profile/avatar` với middleware `upload.single('avatar')`
- ✅ **Controller:** `uploadAvatar()` cập nhật database với `User.findByIdAndUpdate()`
- ✅ **Database:** Field `avatar` được update với đường dẫn mới
- ✅ **Response:** Trả về user object với avatar đã update
- ✅ **Frontend:** Reload page để hiển thị avatar mới

### Test thực tế:

1. Login vào hệ thống
2. Vào trang Profile
3. Upload 1 ảnh bất kỳ
4. Mở MongoDB Compass → Check collection `users` → Field `avatar` đã thay đổi ✅
5. Avatar hiển thị trên navbar và profile page ✅

---

## 🎉 KẾT LUẬN

**Hệ thống ĐÃ hoạt động đúng:**

1. ✅ User upload ảnh từ Profile page
2. ✅ Ảnh được lưu vào `backend/uploads/`
3. ✅ **Đường dẫn ảnh CẬP NHẬT LÊN DATABASE** (field `avatar`)
4. ✅ Frontend tự động reload và hiển thị ảnh mới từ database
5. ✅ Avatar hiển thị trên navbar và profile

**Không cần sửa gì thêm! Tính năng đã hoàn chỉnh! 🎊**

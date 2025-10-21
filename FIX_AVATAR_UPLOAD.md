# 🔧 FIX LỖI UPLOAD AVATAR - 500 Internal Server Error

## ❌ LỖI GẶP PHẢI

```
Request URL: http://localhost:5000/api/profile/avatar
Request Method: POST
Status Code: 500 Internal Server Error
```

---

## 🔍 NGUYÊN NHÂN

**Thư mục `uploads/` chưa tồn tại!**

Multer middleware cần folder `backend/uploads/` để lưu file, nhưng folder này chưa được tạo.

---

## ✅ CÁCH FIX

### 1. **Đã tạo thư mục uploads/**

```
backend/
├── uploads/          ← ĐÃ TẠO
│   └── .gitkeep
```

### 2. **Đã cập nhật middleware/upload.js**

**Thêm auto-create folder:**

```javascript
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);  // ← Dùng absolute path
  },
  // ... rest of code
});
```

**Lợi ích:**
- Tự động tạo folder nếu chưa có
- Dùng absolute path thay vì relative path
- Tránh lỗi khi folder bị xóa

### 3. **Đã cập nhật server.js**

**Cải thiện static file serving:**

```javascript
const path = require('path');

// Serve uploaded files with absolute path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

**Lợi ích:**
- Absolute path chính xác hơn
- Tránh lỗi path trên các OS khác nhau

---

## 🚀 KIỂM TRA

### 1. **Restart server:**

```powershell
# Trong terminal backend
taskkill /F /IM node.exe
cd E:\Demo_web\backend
node server.js
```

### 2. **Test upload:**

1. Mở http://localhost:3000
2. Login vào tài khoản
3. Vào trang Profile
4. Chọn file ảnh
5. Click "Upload Avatar"

### 3. **Expected Result:**

✅ **Success Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "...",
    "avatar": "/uploads/avatar-1729512345678.jpg",
    ...
  }
}
```

✅ **File saved:**
```
backend/uploads/avatar-1729512345678.jpg
```

✅ **Database updated:**
```javascript
// MongoDB Compass
{
  "_id": ObjectId("..."),
  "avatar": "/uploads/avatar-1729512345678.jpg"  // ← Updated
}
```

---

## 🛡️ PHÒNG TRÁNH LỖI SAU NÀY

### 1. **Giữ folder uploads trong git:**

File `.gitkeep` đã được tạo để git track folder rỗng:

```
backend/uploads/.gitkeep
```

### 2. **Thêm vào .gitignore (nhưng vẫn giữ .gitkeep):**

```gitignore
# Ignore uploaded files but keep the directory
uploads/*
!uploads/.gitkeep
```

### 3. **Auto-create trong middleware:**

Middleware đã có code tự tạo folder:

```javascript
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
```

---

## 📋 CHECKLIST

- ✅ Folder `backend/uploads/` đã tồn tại
- ✅ Middleware auto-create folder nếu bị xóa
- ✅ Server dùng absolute path cho static files
- ✅ File `.gitkeep` để track folder trong git
- ✅ Ready để test upload!

---

## 🎯 KẾT QUẢ

**Upload avatar giờ sẽ hoạt động bình thường! 🎉**

**Next steps:**
1. Restart server (đã kill và chạy lại)
2. Test upload từ Profile page
3. Kiểm tra file trong `backend/uploads/`
4. Kiểm tra database đã update field `avatar`

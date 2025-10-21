# 🖼️ IMPORT TOURS VỚI HÌNH ẢNH - HƯỚNG DẪN

## ❌ VẤN ĐỀ

Tours trong database **CHƯA CÓ HÌNH ẢNH**, dẫn đến trang web không hiển thị ảnh!

---

## ✅ GIẢI PHÁP

### Cách 1: Sử dụng Script Auto Import (KHUYẾN NGHỊ)

#### Bước 1: Tắt server backend

```powershell
taskkill /F /IM node.exe
```

#### Bước 2: Chạy script import

```powershell
cd E:\Demo_web
node import_tours_with_images.js
```

**Kết quả mong đợi:**
```
✅ MongoDB Connected
🗑️  Deleting existing tours...
✅ Existing tours deleted
📥 Importing new tours with images...
✅ 10 tours imported successfully!
📊 Total tours in database: 10
```

#### Bước 3: Khởi động lại server

```powershell
# Terminal 1 - Backend
cd E:\Demo_web\backend
node server.js

# Terminal 2 - Frontend
cd E:\Demo_web\frontend
npm run dev
```

#### Bước 4: Kiểm tra website

- Mở http://localhost:3000
- Tất cả tours giờ sẽ có hình ảnh từ Unsplash! 🎉

---

### Cách 2: Import thủ công qua MongoDB Compass

#### Bước 1: Mở MongoDB Compass

- Connect: `mongodb://localhost:27017`
- Database: `travel_booking`
- Collection: `tours`

#### Bước 2: Xóa tours cũ (nếu muốn)

Click **DELETE** trên tất cả documents hiện tại

#### Bước 3: Import file JSON

1. Click **ADD DATA** → **Import JSON or CSV file**
2. Chọn file: `E:\Demo_web\sample_tours_with_images.json`
3. Click **Import**

**Lưu ý:** File JSON cần format đúng (không có `{$date}`), hoặc dùng script import ở Cách 1.

---

## 🎨 HÌNH ẢNH ĐÃ THÊM

### 10 Tours với Unsplash Images:

1. **Đà Lạt** - https://images.unsplash.com/photo-1583417319070-4a69db38a482
2. **Hạ Long** - https://images.unsplash.com/photo-1528127269322-539801943592
3. **Phú Quốc** - https://images.unsplash.com/photo-1559628376-f3fe5f782a2e
4. **Sapa** - https://images.unsplash.com/photo-1583417319070-4a69db38a482
5. **Nha Trang** - https://images.unsplash.com/photo-1559628376-f3fe5f782a2e
6. **Hội An** - https://images.unsplash.com/photo-1528127269322-539801943592
7. **Đà Nẵng** - https://images.unsplash.com/photo-1559592413-7cec4d0cae2b
8. **Ninh Bình** - https://images.unsplash.com/photo-1583417319070-4a69db38a482
9. **Mù Cang Chải** - https://images.unsplash.com/photo-1528127269322-539801943592
10. **Côn Đảo** - https://images.unsplash.com/photo-1506929562872-bb421503ef21

---

## 🔧 CẢI TIẾN CODE

### TourCard.jsx - Đã fix:

```jsx
const getImageUrl = (image) => {
  // Fallback image nếu không có
  if (!image) return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';
  
  // Nếu là URL đầy đủ (Unsplash) thì dùng trực tiếp
  if (image.startsWith('http')) return image;
  
  // Nếu là local path thì thêm backend URL
  return `http://localhost:5000${image}`;
};

<img 
  src={getImageUrl(tour.images?.[0])} 
  alt={tour.title}
  className="card-img"
  onError={(e) => {
    // Fallback nếu ảnh load lỗi
    e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';
  }}
/>
```

**Lợi ích:**
- ✅ Hỗ trợ cả Unsplash URLs và local uploads
- ✅ Có ảnh placeholder nếu không có hình
- ✅ Auto fallback nếu ảnh load lỗi

---

## 📋 CHECKLIST

- ⬜ Tắt backend server
- ⬜ Chạy `node import_tours_with_images.js`
- ⬜ Thấy message "✅ 10 tours imported successfully!"
- ⬜ Khởi động lại backend + frontend
- ⬜ Refresh website → Tất cả tours có hình ảnh! 🎉

---

## 🎯 KẾT QUẢ SAU KHI IMPORT

### Database Structure:

```javascript
{
  "_id": ObjectId("..."),
  "title": "Khám phá Đà Lạt - Thành phố ngàn hoa",
  "description": "...",
  "price": 2500000,
  "images": [
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800",
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800"
  ],  // ← Có hình ảnh rồi!
  "featured": true,
  "location": { ... },
  ...
}
```

### Website Display:

```
┌─────────────────────────┐
│   [Hình ảnh Đà Lạt]     │ ← Hiển thị từ Unsplash
├─────────────────────────┤
│ Đà Lạt - Ngàn hoa      │
│ Trải nghiệm không...   │
│ 2.500.000₫  |  3 ngày  │
│ [Đặt tour]             │
└─────────────────────────┘
```

---

## 🚨 LƯU Ý

1. **Phải tắt server** trước khi chạy script import
2. Unsplash images cần **internet** để hiển thị
3. Script sẽ **XÓA TẤT CẢ tours cũ** và import lại
4. Nếu không muốn xóa, comment dòng `await Tour.deleteMany({})`

---

## 🎉 HOÀN TẤT!

Sau khi import, tất cả tours sẽ có hình ảnh đẹp từ Unsplash! 🖼️

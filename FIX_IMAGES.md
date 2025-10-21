# 🖼️ FIX: HÌNH ẢNH KHÔNG HIỂN THỊ

## ❌ VẤN ĐỀ
Tours hiện tại trong database chưa có hình ảnh (field `images` trống hoặc không tồn tại).

## ✅ GIẢI PHÁP - IMPORT TOURS MỚI CÓ HÌNH

### CÁCH 1: DÙNG MONGODB COMPASS (NHANH NHẤT - 30 GIÂY)

1. **Mở MongoDB Compass**
   - Connect: `mongodb://localhost:27017`
   - Database: `travel_booking`

2. **Mở MongoSH Console**
   - Ở dưới cùng cửa sổ Compass
   - Click tab **>_MONGOSH**

3. **COPY + PASTE Script**
   
   Copy script từ file `import_tours_images.js` HOẶC copy toàn bộ đoạn này:

```javascript
cd E:\Demo_web\frontend
npm run dev
```

4. **Paste vào MongoSH → Enter**

5. **Kết quả:**
```
✅ ĐÃ IMPORT THÀNH CÔNG 10 TOURS!
📊 THỐNG KÊ:
   - Tổng tours: 10
   - Featured tours: 6
   - Tours có hình: 10
```

### CÁCH 2: DÙNG TERMINAL (Nếu có mongosh)

```powershell
cd E:\Demo_web
mongosh mongodb://localhost:27017/travel_booking < import_tours_images.js
```

---

## ✅ SAU KHI IMPORT

### 1. Reload trang web
- Nhấn **Ctrl + Shift + R** (hard reload)
- Hoặc **Ctrl + F5**

### 2. Kiểm tra
- ✅ Hình ảnh tours hiển thị
- ✅ 6 featured tours có hình
- ✅ Giá VNĐ (2.500.000₫)

---

## 📊 10 TOURS VỚI HÌNH ẢNH

| Tour | Giá | Hình ảnh từ |
|------|-----|-------------|
| Đà Lạt | 2.500.000₫ | Unsplash ✅ |
| Hạ Long | 4.500.000₫ | Unsplash ✅ |
| Phú Quốc | 5.000.000₫ | Unsplash ✅ |
| Sapa | 3.800.000₫ | Unsplash ✅ |
| Nha Trang | 3.200.000₫ | Unsplash ✅ |
| Hội An | 2.800.000₫ | Unsplash ✅ |
| Đà Nẵng | 3.500.000₫ | Unsplash ✅ |
| Ninh Bình | 1.800.000₫ | Unsplash ✅ |
| Mù Cang Chải | 4.200.000₫ | Unsplash ✅ |
| Côn Đảo | 6.500.000₫ | Unsplash ✅ |

---

## 🎯 CHECKLIST

- [ ] Mở MongoDB Compass
- [ ] Mở MongoSH
- [ ] Copy script
- [ ] Paste vào MongoSH
- [ ] Nhấn Enter
- [ ] Thấy "✅ Đã import 10 tours!"
- [ ] Reload trang web (Ctrl + Shift + R)
- [ ] ✅ Hình ảnh hiển thị!

---

**⏱️ Thời gian: 30 giây**
**🎉 Sau khi làm xong, hình ảnh sẽ hiển thị ngay!**

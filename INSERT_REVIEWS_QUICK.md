# 🚀 INSERT REVIEWS - 3 BƯỚC ĐơN GIẢN

## ⚡ CÁCH NHANH NHẤT (MongoDB Compass)

### Bước 1: Mở MongoDB Compass

1. Mở **MongoDB Compass**
2. Connect: `mongodb://localhost:27017`
3. Chọn database: **travel_booking**
4. Chọn hoặc tạo collection: **reviews**

### Bước 2: Mở MongoSH Console

1. Ở dưới cùng Compass, click nút **>_MongoSH** 
2. Sẽ mở console màu đen

### Bước 3: Chạy Script

**Copy đoạn này vào console MongoSH:**

```javascript
load('E:/Demo_web/insert_reviews_simple.js')
```

**HOẶC** copy toàn bộ nội dung file `insert_reviews_simple.js` paste vào console rồi Enter.

---

## ✅ KẾT QUẢ MONG ĐỢI

```
📊 Tìm thấy:
   Tours: 10
   Users: 2

📝 Đang insert 18 reviews...
✅ ĐÃ INSERT THÀNH CÔNG 18 reviews!

📊 THỐNG KÊ:
   - Đà Lạt: 3 reviews
   - Hạ Long: 3 reviews
   - Phú Quốc: 2 reviews
   - Sapa: 3 reviews
   - Nha Trang: 3 reviews
   - Hội An: 3 reviews

⭐ RATING DISTRIBUTION:
   - 5 sao: 14
   - 4 sao: 4

✅ HOÀN THÀNH!
```

---

## 🎯 KIỂM TRA SAU KHI INSERT

### Trong MongoDB Compass:

1. Refresh collection `reviews`
2. Xem danh sách reviews
3. Kiểm tra:
   - ✅ Có 17-18 reviews
   - ✅ Mỗi review có `tour`, `user`, `rating`, `comment`
   - ✅ Rating từ 4-5 sao

### Trên Website:

1. Mở: `http://localhost:3000`
2. Click vào 1 tour bất kỳ (ví dụ: Đà Lạt)
3. Scroll xuống phần **Reviews**
4. Sẽ thấy:
   - ⭐⭐⭐⭐⭐ Rating trung bình
   - 📝 Danh sách reviews với tên user và comment
   - 📅 Ngày review

### Test API:

Mở trình duyệt: `http://localhost:5000/api/tours`

Sẽ thấy mỗi tour có:
```json
{
  "title": "Đà Lạt",
  "ratingsAverage": 4.7,
  "ratingsQuantity": 3,
  ...
}
```

---

## 🐛 TROUBLESHOOTING

### Lỗi: "Cannot find file"

**Giải pháp:** Thay vì dùng `load()`, copy toàn bộ nội dung file `insert_reviews_simple.js` paste vào MongoSH.

### Lỗi: "Duplicate key error"

**Nguyên nhân:** Đã chạy script rồi (reviews đã tồn tại)

**Giải pháp:**
```javascript
// Xóa tất cả reviews cũ
db.reviews.deleteMany({})

// Rồi chạy lại script
```

### Lỗi: "No tours found" hoặc "No users found"

**Giải pháp:** 
1. Insert users trước: `sample_users.json`
2. Import tours trước: `sample_tours.json`
3. Rồi mới insert reviews

---

## 📊 DỮ LIỆU REVIEWS

Script tự động tạo reviews cho 6 tours:

| Tour | Số Reviews | Rating TB | Comments |
|------|-----------|-----------|----------|
| Đà Lạt | 2-3 | 4.7/5 | "Không khí trong lành, phong cảnh đẹp..." |
| Hạ Long | 2-3 | 4.7/5 | "Vịnh Hạ Long đẹp như tranh vẽ..." |
| Phú Quốc | 2 | 5.0/5 | "Thiên đường biển đảo, resort 5 sao..." |
| Sapa | 2-3 | 4.7/5 | "Ruộng bậc thang tuyệt đẹp..." |
| Nha Trang | 2-3 | 4.7/5 | "Vinpearl Land sướng không tưởng..." |
| Hội An | 2-3 | 4.7/5 | "Phố cổ đẹp, đèn hoa đăng lãng mạn..." |

**Tổng:** 17-18 reviews

---

## 💡 LƯU Ý

- ✅ Mỗi user chỉ review 1 lần cho 1 tour
- ✅ Rating từ 4-5 sao (realistic)
- ✅ Comments bằng tiếng Việt chân thực
- ✅ Dates phân bổ từ tháng 1-3/2025
- ✅ Tự động tính `ratingsAverage` và `ratingsQuantity` cho tours

---

**🎉 SAU KHI CÓ REVIEWS, WEBSITE SẼ TRÔNG CHUYÊN NGHIỆP VÀ SINH ĐỘNG HƠN RẤT NHIỀU!**

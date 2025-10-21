# 📝 HƯỚNG DẪN INSERT REVIEWS VÀO MONGODB

## ⚠️ QUAN TRỌNG

Reviews cần **tour ID** và **user ID** từ database. 
Bạn cần insert users và tours TRƯỚC KHI insert reviews!

---

## 🔧 PHƯƠNG PHÁP 1: DÙNG MONGODB COMPASS (KHUYÊN DÙNG)

### Bước 1: Tạo thêm Users (để có nhiều reviews)

1. Mở MongoDB Compass → Database `travel_booking` → Collection `users`
2. Click **ADD DATA** → **Insert Document**
3. Paste từng user:

**User 2:**
```json
{
  "name": "Trần Thị B",
  "email": "tran.b@example.com",
  "password": "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
  "role": "user",
  "phone": "0912345678",
  "dateOfBirth": {"$date": "1992-03-20T00:00:00.000Z"},
  "avatar": "default-avatar.jpg",
  "createdAt": {"$date": "2025-10-21T00:00:00.000Z"}
}
```

**User 3:**
```json
{
  "name": "Lê Văn C",
  "email": "le.c@example.com",
  "password": "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
  "role": "user",
  "phone": "0923456789",
  "dateOfBirth": {"$date": "1988-07-15T00:00:00.000Z"},
  "avatar": "default-avatar.jpg",
  "createdAt": {"$date": "2025-10-21T00:00:00.000Z"}
}
```

**User 4:**
```json
{
  "name": "Phạm Thị D",
  "email": "pham.d@example.com",
  "password": "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
  "role": "user",
  "phone": "0934567890",
  "dateOfBirth": {"$date": "1994-11-08T00:00:00.000Z"},
  "avatar": "default-avatar.jpg",
  "createdAt": {"$date": "2025-10-21T00:00:00.000Z"}
}
```

### Bước 2: Lấy Tour IDs và User IDs

1. Trong Compass, collection `tours`:
   - Click vào tour "Đà Lạt" → Copy `_id` (ví dụ: `ObjectId("67...")`)
   - Làm tương tự cho các tour khác

2. Trong collection `users`:
   - Copy `_id` của từng user

### Bước 3: Insert Reviews

1. Tạo collection `reviews` (nếu chưa có):
   - Click **Create Collection** → Tên: `reviews`

2. Click **ADD DATA** → **Insert Document**

3. Paste review (thay `TOUR_ID` và `USER_ID` bằng ID thực):

**Template:**
```json
{
  "tour": {"$oid": "TOUR_ID_Ở_ĐÂY"},
  "user": {"$oid": "USER_ID_Ở_ĐÂY"},
  "rating": 5,
  "comment": "Nội dung review ở đây",
  "createdAt": {"$date": "2025-10-15T00:00:00.000Z"}
}
```

**Ví dụ cụ thể:**
```json
{
  "tour": {"$oid": "671234567890abcdef123456"},
  "user": {"$oid": "671234567890abcdef654321"},
  "rating": 5,
  "comment": "Đà Lạt thật tuyệt vời! Không khí trong lành, phong cảnh đẹp mê hồn.",
  "createdAt": {"$date": "2025-10-15T00:00:00.000Z"}
}
```

---

## 🔧 PHƯƠNG PHÁP 2: DÙNG SCRIPT (NHANH HƠN)

### Cách chạy script:

```powershell
# Mở PowerShell
cd E:\Demo_web

# Chạy script (nếu có mongosh trong PATH)
mongosh mongodb://localhost:27017/travel_booking insert_reviews.js

# Hoặc với full path
& "C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe" mongodb://localhost:27017/travel_booking insert_reviews.js
```

Script sẽ tự động:
- ✅ Lấy tour IDs và user IDs
- ✅ Tạo 4 users bổ sung
- ✅ Insert 20 reviews cho các tours
- ✅ Hiển thị thống kê

---

## 📊 MẪU REVIEWS CHO CÁC TOUR

### 🏔️ Đà Lạt (3 reviews)

**Review 1 - 5 sao:**
```
User: Nguyen Van A
Rating: 5/5
Comment: "Đà Lạt thật tuyệt vời! Không khí trong lành, phong cảnh đẹp mê hồn. Hướng dẫn viên nhiệt tình, lịch trình hợp lý. Chắc chắn sẽ quay lại!"
```

**Review 2 - 5 sao:**
```
User: Trần Thị B
Rating: 5/5
Comment: "Tour rất chuyên nghiệp, khách sạn sạch sẽ, đồ ăn ngon. Các thác nước và đồi chè rất đẹp. Xứng đáng 5 sao!"
```

**Review 3 - 4 sao:**
```
User: Lê Văn C
Rating: 4/5
Comment: "Chuyến đi tuyệt vời, chỉ có điều thời tiết hơi lạnh. Nhưng không ảnh hưởng gì, vẫn rất vui!"
```

### 🌊 Hạ Long (3 reviews)

**Review 1 - 5 sao:**
```
Rating: 5/5
Comment: "Vịnh Hạ Long đẹp như tranh vẽ! Du thuyền sang trọng, hải sản tươi ngon. Đội ngũ phục vụ tận tâm. Highly recommended!"
```

**Review 2 - 4 sao:**
```
Rating: 4/5
Comment: "Cảnh đẹp không có gì để chê. Hang Sửng Sốt thật sự choáng ngợp. Trừ điểm vì thời tiết có mây."
```

**Review 3 - 5 sao:**
```
Rating: 5/5
Comment: "Lần đầu đi Hạ Long, quá ấn tượng! Tắm biển, chèo kayak, ăn hải sản... Tất cả đều tuyệt vời!"
```

### 🏝️ Phú Quốc (2 reviews)

**Review 1 - 5 sao:**
```
Rating: 5/5
Comment: "Phú Quốc là thiên đường biển đảo! Bãi Sao đẹp ngất ngây, nước biển trong xanh. Resort 5 sao, dịch vụ hoàn hảo!"
```

**Review 2 - 5 sao:**
```
Rating: 5/5
Comment: "Trải nghiệm tuyệt vời! Lặn ngắm san hô đẹp lắm. Hải sản tươi sống giá rẻ. 4 ngày 3 đêm vẫn thấy ngắn!"
```

### ⛰️ Sapa (3 reviews)

**Review 1 - 5 sao:**
```
Rating: 5/5
Comment: "Sapa mùa lúa chín đẹp không thể tả! Ruộng bậc thang tuyệt đẹp, chinh phục Fansipan thành công. Đội ngũ hướng dẫn rất pro!"
```

**Review 2 - 4 sao:**
```
Rating: 4/5
Comment: "Tour trekking rất thú vị. Gặp được nhiều người dân tộc, văn hóa độc đáo. Hơi mệt nhưng rất đáng!"
```

**Review 3 - 5 sao:**
```
Rating: 5/5
Comment: "Cảnh đẹp xuất sắc! Chợ tình Sapa rất đặc sắc. Homestay ấm cúng, chủ nhà thân thiện. Sẽ quay lại!"
```

### 🏖️ Nha Trang (3 reviews)

**Review 1 - 5 sao:**
```
Rating: 5/5
Comment: "Nha Trang vui lắm! Vinpearl Land sướng không tưởng. Tắm biển, lặn ngắm san hô đều tuyệt. Giá cả hợp lý!"
```

**Review 2 - 4 sao:**
```
Rating: 4/5
Comment: "Bãi biển đẹp, nước trong. Đảo Hòn Mun rất đẹp. Trừ điểm vì đông khách một chút."
```

**Review 3 - 5 sao:**
```
Rating: 5/5
Comment: "Chuyến đi gia đình rất vui! Trẻ em thích Vinpearl lắm. Khách sạn view biển đẹp. Nhất định sẽ quay lại!"
```

### 🏮 Hội An (3 reviews)

**Review 1 - 5 sao:**
```
Rating: 5/5
Comment: "Hội An phố cổ rất đẹp! Ban đêm thả đèn hoa đăng lãng mạn lắm. Món ăn đặc sản cao lầu, bánh mì ngon tuyệt!"
```

**Review 2 - 5 sao:**
```
Rating: 5/5
Comment: "Kiến trúc cổ kính, văn hóa đặc sắc. Chùa Cầu, hội quán đều đẹp. Tour guide giải thích rất hay!"
```

**Review 3 - 4 sao:**
```
Rating: 4/5
Comment: "Phố cổ đẹp, nhưng hơi đông khách. Đồ ăn ngon, giá hợp lý. Chụp hình rất đẹp!"
```

---

## ✅ SAU KHI INSERT REVIEWS

### Kiểm tra trong Compass:

```javascript
// Đếm reviews
db.reviews.countDocuments()
// → Nên có khoảng 17-20 reviews

// Xem reviews theo rating
db.reviews.countDocuments({ rating: 5 })
db.reviews.countDocuments({ rating: 4 })

// Xem reviews cho một tour
db.reviews.find({ tour: ObjectId("TOUR_ID") })

// Tính trung bình rating
db.reviews.aggregate([
  {
    $group: {
      _id: "$tour",
      avgRating: { $avg: "$rating" },
      count: { $sum: 1 }
    }
  }
])
```

### Kiểm tra trên website:

1. Truy cập tour detail: `http://localhost:3000/tours/TOUR_ID`
2. Scroll xuống phần Reviews
3. Xem danh sách reviews với:
   - ⭐ Rating (1-5 sao)
   - 👤 Tên người review
   - 💬 Nội dung review
   - 📅 Ngày review

### Tours sẽ tự động cập nhật:
- `ratingsAverage`: Trung bình rating (ví dụ: 4.7/5)
- `ratingsQuantity`: Số lượng reviews (ví dụ: 3)

---

## 📊 THỐNG KÊ DỰ KIẾN

Sau khi insert reviews:

| Tour | Số reviews | Rating TB | Đánh giá |
|------|-----------|-----------|----------|
| Đà Lạt | 3 | 4.7/5 | ⭐⭐⭐⭐⭐ |
| Hạ Long | 3 | 4.7/5 | ⭐⭐⭐⭐⭐ |
| Phú Quốc | 2 | 5.0/5 | ⭐⭐⭐⭐⭐ |
| Sapa | 3 | 4.7/5 | ⭐⭐⭐⭐⭐ |
| Nha Trang | 3 | 4.7/5 | ⭐⭐⭐⭐⭐ |
| Hội An | 3 | 4.7/5 | ⭐⭐⭐⭐⭐ |

**Tổng cộng:** ~17-20 reviews

---

## 🐛 TROUBLESHOOTING

### Lỗi: "Duplicate key error"

**Nguyên nhân:** User đã review tour này rồi

**Giải pháp:** Mỗi user chỉ review 1 lần cho 1 tour

### Lỗi: "ObjectId is not valid"

**Nguyên nhân:** Tour ID hoặc User ID sai

**Giải pháp:**
1. Kiểm tra lại ID trong Compass
2. Copy chính xác ObjectId
3. Format đúng: `{"$oid": "671234..."}`

### Reviews không hiển thị trên website

**Kiểm tra:**
1. Collection `reviews` có data chưa?
2. Tour ID và User ID có đúng không?
3. Backend có chạy không?
4. Check API: `http://localhost:5000/api/tours/TOUR_ID`

---

## 🎯 CHECKLIST

- [ ] Đã insert users (admin + ít nhất 2-3 users)
- [ ] Đã insert tours (ít nhất 6 tours)
- [ ] Đã tạo collection `reviews`
- [ ] Đã lấy đúng tour IDs và user IDs
- [ ] Insert reviews thành công
- [ ] Reviews hiển thị trên tour detail page
- [ ] Rating average tự động cập nhật
- [ ] Số lượng reviews hiển thị đúng

---

**✅ Files hỗ trợ:**
- `insert_reviews.js` - Script tự động (nếu có mongosh)
- `INSERT_REVIEWS_GUIDE.md` - Hướng dẫn này

**🎉 Sau khi có reviews, website sẽ sinh động và chuyên nghiệp hơn nhiều!**

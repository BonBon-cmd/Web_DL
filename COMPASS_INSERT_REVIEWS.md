# 📋 HƯỚNG DẪN INSERT REVIEWS BẰNG MONGODB COMPASS

## ✅ CÁCH ĐƠN GIẢN NHẤT - COPY/PASTE

### BƯỚC 1️⃣: Mở MongoDB Compass

1. Mở ứng dụng **MongoDB Compass**
2. Connect tới: `mongodb://localhost:27017`
3. Chọn database: **travel_booking**

### BƯỚC 2️⃣: Kiểm tra Users và Tours

**2.1. Kiểm tra Users:**
- Click collection **users**
- Đảm bảo có ít nhất 2 users
- Nếu chưa có → Import từ `sample_users.json`

**2.2. Kiểm tra Tours:**
- Click collection **tours**  
- Đảm bảo có ít nhất 6-10 tours
- Nếu chưa có → Import từ `sample_tours.json`

### BƯỚC 3️⃣: Mở MongoSH Console

1. Ở **dưới cùng** cửa sổ Compass, tìm tab **>_MONGOSH**
2. Click vào sẽ mở console màu đen

### BƯỚC 4️⃣: Copy Script và Chạy

**COPY TOÀN BỘ ĐOẠN CODE DƯỚI ĐÂY:**

```javascript
// ===== SCRIPT INSERT REVIEWS =====
const tours = db.tours.find().toArray();
const users = db.users.find().toArray();

print("📊 Tours: " + tours.length + " | Users: " + users.length);

const dalat = tours.find(t => t.title && t.title.includes("Đà Lạt"));
const halong = tours.find(t => t.title && t.title.includes("Hạ Long"));
const phuquoc = tours.find(t => t.title && t.title.includes("Phú Quốc"));
const sapa = tours.find(t => t.title && t.title.includes("Sapa"));
const nhatrang = tours.find(t => t.title && t.title.includes("Nha Trang"));
const hoian = tours.find(t => t.title && t.title.includes("Hội An"));

const reviews = [];

if (dalat && users[0]) reviews.push({tour: dalat._id, user: users[0]._id, rating: 5, comment: "Đà Lạt thật tuyệt vời! Không khí trong lành, phong cảnh đẹp mê hồn. Hướng dẫn viên nhiệt tình, lịch trình hợp lý. Chắc chắn sẽ quay lại!", createdAt: new Date("2025-01-15")});

if (dalat && users[1]) reviews.push({tour: dalat._id, user: users[1]._id, rating: 5, comment: "Tour rất chuyên nghiệp, khách sạn sạch sẽ, đồ ăn ngon. Các thác nước và đồi chè rất đẹp. Xứng đáng 5 sao!", createdAt: new Date("2025-02-10")});

if (halong && users[0]) reviews.push({tour: halong._id, user: users[0]._id, rating: 5, comment: "Vịnh Hạ Long đẹp như tranh vẽ! Du thuyền sang trọng, hải sản tươi ngon. Đội ngũ phục vụ tận tâm. Highly recommended!", createdAt: new Date("2025-01-20")});

if (halong && users[1]) reviews.push({tour: halong._id, user: users[1]._id, rating: 4, comment: "Cảnh đẹp không có gì để chê. Hang Sửng Sốt thật sự choáng ngợp. Trừ điểm vì thời tiết có mây.", createdAt: new Date("2025-02-15")});

if (phuquoc && users[0]) reviews.push({tour: phuquoc._id, user: users[0]._id, rating: 5, comment: "Phú Quốc là thiên đường biển đảo! Bãi Sao đẹp ngất ngây, nước biển trong xanh. Resort 5 sao, dịch vụ hoàn hảo!", createdAt: new Date("2025-01-25")});

if (phuquoc && users[1]) reviews.push({tour: phuquoc._id, user: users[1]._id, rating: 5, comment: "Trải nghiệm tuyệt vời! Lặn ngắm san hô đẹp lắm. Hải sản tươi sống giá rẻ. 4 ngày 3 đêm vẫn thấy ngắn!", createdAt: new Date("2025-02-20")});

if (sapa && users[0]) reviews.push({tour: sapa._id, user: users[0]._id, rating: 5, comment: "Sapa mùa lúa chín đẹp không thể tả! Ruộng bậc thang tuyệt đẹp, chinh phục Fansipan thành công. Đội ngũ hướng dẫn rất pro!", createdAt: new Date("2025-02-01")});

if (sapa && users[1]) reviews.push({tour: sapa._id, user: users[1]._id, rating: 4, comment: "Tour trekking rất thú vị. Gặp được nhiều người dân tộc, văn hóa độc đáo. Hơi mệt nhưng rất đáng!", createdAt: new Date("2025-03-01")});

if (nhatrang && users[0]) reviews.push({tour: nhatrang._id, user: users[0]._id, rating: 5, comment: "Nha Trang vui lắm! Vinpearl Land sướng không tưởng. Tắm biển, lặn ngắm san hô đều tuyệt. Giá cả hợp lý!", createdAt: new Date("2025-02-05")});

if (nhatrang && users[1]) reviews.push({tour: nhatrang._id, user: users[1]._id, rating: 4, comment: "Bãi biển đẹp, nước trong. Đảo Hòn Mun rất đẹp. Trừ điểm vì đông khách một chút.", createdAt: new Date("2025-03-05")});

if (hoian && users[0]) reviews.push({tour: hoian._id, user: users[0]._id, rating: 5, comment: "Hội An phố cổ rất đẹp! Ban đêm thả đèn hoa đăng lãng mạn lắm. Món ăn đặc sản cao lầu, bánh mì ngon tuyệt!", createdAt: new Date("2025-02-08")});

if (hoian && users[1]) reviews.push({tour: hoian._id, user: users[1]._id, rating: 5, comment: "Kiến trúc cổ kính, văn hóa đặc sắc. Chùa Cầu, hội quán đều đẹp. Tour guide giải thích rất hay!", createdAt: new Date("2025-03-08")});

const result = db.reviews.insertMany(reviews);
print("✅ ĐÃ INSERT " + result.insertedIds.length + " REVIEWS!");
```

**SAU ĐÓ:**
1. Paste vào console MongoSH
2. Nhấn **Enter**
3. Đợi vài giây

### ✅ KẾT QUẢ

Sẽ thấy:
```
📊 Tours: 10 | Users: 2
✅ ĐÃ INSERT 12 REVIEWS!
```

---

## 🔍 KIỂM TRA SAU KHI INSERT

### 1. Trong MongoDB Compass:

1. Click vào collection **reviews**
2. Click nút **Refresh** (mũi tên tròn)
3. Sẽ thấy 12 reviews với đầy đủ:
   - `tour` (ObjectId)
   - `user` (ObjectId)
   - `rating` (4 hoặc 5)
   - `comment` (text tiếng Việt)
   - `createdAt` (date)

### 2. Kiểm tra Tours đã có Ratings:

Chạy query này trong MongoSH:
```javascript
db.tours.find({}, {title: 1, ratingsAverage: 1, ratingsQuantity: 1})
```

Sẽ thấy mỗi tour có:
- `ratingsAverage`: 4.5 - 5.0
- `ratingsQuantity`: 1-2

### 3. Trên Website:

1. Mở: `http://localhost:3000`
2. Click vào tour **Đà Lạt** (hoặc tour nào có review)
3. Scroll xuống phần **Reviews**
4. Sẽ thấy reviews hiển thị với:
   - ⭐ Rating
   - 👤 Tên user
   - 💬 Comment
   - 📅 Ngày

---

## 📊 THỐNG KÊ REVIEWS

| Tour | Reviews | Rating TB |
|------|---------|-----------|
| Đà Lạt | 2 | 5.0 ⭐⭐⭐⭐⭐ |
| Hạ Long | 2 | 4.5 ⭐⭐⭐⭐ |
| Phú Quốc | 2 | 5.0 ⭐⭐⭐⭐⭐ |
| Sapa | 2 | 4.5 ⭐⭐⭐⭐ |
| Nha Trang | 2 | 4.5 ⭐⭐⭐⭐ |
| Hội An | 2 | 5.0 ⭐⭐⭐⭐⭐ |

**Tổng: 12 reviews**

---

## 🐛 NẾU GẶP LỖI

### "Duplicate key error"

Nghĩa là đã insert rồi. Muốn chạy lại:

```javascript
db.reviews.deleteMany({})
// Rồi chạy lại script insert
```

### "Cannot read property '_id' of undefined"

Nghĩa là thiếu users hoặc tours. Kiểm tra:

```javascript
db.users.countDocuments()  // Phải >= 2
db.tours.countDocuments()  // Phải >= 6
```

Nếu thiếu → Import từ `sample_users.json` và `sample_tours.json`

---

## 🎯 NEXT STEPS

Sau khi có reviews:

1. ✅ Homepage sẽ hiển thị rating cho tours
2. ✅ Tour detail page có section reviews
3. ✅ Users có thể xem reviews trước khi book
4. ✅ Dashboard admin có thống kê reviews

---

**🎉 CHÚC MỪNG! WEBSITE BÂY GIỜ ĐÃ CÓ REVIEWS, TRÔNG CHUYÊN NGHIỆP VÀ UY TÍN HƠN NHIỀU!**

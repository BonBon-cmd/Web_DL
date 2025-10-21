# 🖼️ HƯỚNG DẪN CÁP NHẬT TOURS VỚI HÌNH ẢNH VÀ GIÁ VNĐ

## ✅ ĐÃ CẬP NHẬT

### 1. Hiển thị giá VNĐ
- ✅ **TourCard.jsx** - Hiển thị giá theo format VNĐ (ví dụ: 2.500.000₫)
- ✅ **TourDetail.jsx** - Hiển thị giá VNĐ trong trang chi tiết và booking

### 2. Tours mới với hình ảnh
- ✅ File **sample_tours_with_images.json** - 10 tours với link hình ảnh từ Unsplash

---

## 🚀 IMPORT TOURS MỚI VÀO MONGODB

### Cách 1: Dùng MongoDB Compass (KHUYÊN DÙNG)

1. **Mở MongoDB Compass**
   - Connect: `mongodb://localhost:27017`
   - Database: `travel_booking`
   - Collection: `tours`

2. **Xóa tours cũ (nếu có)**
   ```javascript
   // Trong MongoSH
   db.tours.deleteMany({})
   ```

3. **Import file JSON**
   - Click **ADD DATA** → **Import JSON or CSV file**
   - Chọn file: `sample_tours_with_images.json`
   - Click **Import**
   - Đợi vài giây → ✅ Hoàn thành!

### Cách 2: Dùng MongoSH Console

1. Mở MongoSH trong Compass (tab dưới cùng)
2. Copy script dưới đây và paste vào:

```javascript
// Xóa tours cũ
db.tours.deleteMany({});

// Insert tours mới với hình ảnh
db.tours.insertMany([
  {
    "title": "Khám phá Đà Lạt - Thành phố ngàn hoa",
    "description": "Trải nghiệm không khí trong lành của Đà Lạt với những đồi thông bát ngát, thác nước hùng vĩ và những vườn hoa rực rỡ. Tour bao gồm tham quan Thung lũng Tình yêu, Hồ Tuyền Lâm, thác Datanla, vườn hoa thành phố và các điểm check-in hot như Crazy House, ga Đà Lạt cổ kính.",
    "price": 2500000,
    "duration": 3,
    "maxGroupSize": 15,
    "difficulty": "easy",
    "location": {
      "city": "Đà Lạt",
      "country": "Việt Nam",
      "address": "Lâm Đồng",
      "coordinates": [108.4419, 11.9404]
    },
    "images": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800"
    ],
    "featured": true,
    "ratingsAverage": 4.8,
    "ratingsQuantity": 0,
    "startDates": [
      new Date("2025-11-01"),
      new Date("2025-11-15"),
      new Date("2025-12-01")
    ],
    "createdAt": new Date()
  },
  {
    "title": "Du thuyền Vịnh Hạ Long - Di sản thế giới",
    "description": "Khám phá vẻ đẹp huyền ảo của Vịnh Hạ Long với hàng nghìn hòn đảo đá vôi. Tour du thuyền 2 ngày 1 đêm bao gồm tham quan Hang Sửng Sốt, làng chài Cửa Vạn, chèo kayak, tắm biển và thưởng thức hải sản tươi sống trên du thuyền 5 sao.",
    "price": 4500000,
    "duration": 2,
    "maxGroupSize": 20,
    "difficulty": "easy",
    "location": {
      "city": "Hạ Long",
      "country": "Việt Nam",
      "address": "Quảng Ninh",
      "coordinates": [107.0431, 20.9101]
    },
    "images": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800"
    ],
    "featured": true,
    "ratingsAverage": 4.9,
    "ratingsQuantity": 0,
    "startDates": [
      new Date("2025-11-05"),
      new Date("2025-11-20")
    ],
    "createdAt": new Date()
  },
  {
    "title": "Phú Quốc - Thiên đường biển đảo",
    "description": "Nghỉ dưỡng tại đảo ngọc Phú Quốc với bãi biển cát trắng, nước biển trong xanh. Tour bao gồm lặn ngắm san hô, tham quan VinWonders, Safari, chợ đêm Phú Quốc, câu cá, tham quan làng chài và thưởng thức hải sản tươi sống.",
    "price": 5000000,
    "duration": 4,
    "maxGroupSize": 12,
    "difficulty": "easy",
    "location": {
      "city": "Phú Quốc",
      "country": "Việt Nam",
      "address": "Kiên Giang",
      "coordinates": [103.9860, 10.2895]
    },
    "images": [
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"
    ],
    "featured": true,
    "ratingsAverage": 4.7,
    "ratingsQuantity": 0,
    "startDates": [
      new Date("2025-11-10"),
      new Date("2025-12-05")
    ],
    "createdAt": new Date()
  },
  {
    "title": "Sapa - Chinh phục Fansipan",
    "description": "Khám phá vẻ đẹp hùng vĩ của Sapa với ruộng bậc thang, bản làng dân tộc và đỉnh Fansipan - nóc nhà Đông Dương. Tour bao gồm trekking qua các bản làng H'Mông, Dao đỏ, cáp treo Fansipan, thác Bạc, Cầu Mây Rồng và chợ tình Sapa.",
    "price": 3800000,
    "duration": 3,
    "maxGroupSize": 10,
    "difficulty": "medium",
    "location": {
      "city": "Sapa",
      "country": "Việt Nam",
      "address": "Lào Cai",
      "coordinates": [103.8450, 22.3364]
    },
    "images": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800"
    ],
    "featured": true,
    "ratingsAverage": 4.6,
    "ratingsQuantity": 0,
    "startDates": [
      new Date("2025-11-08"),
      new Date("2025-11-22")
    ],
    "createdAt": new Date()
  },
  {
    "title": "Nha Trang - Biển xanh cát trắng",
    "description": "Tận hưởng kỳ nghỉ tại Nha Trang với bãi biển đẹp nhất Việt Nam. Tour bao gồm tham quan VinWonders, tắm bùn khoáng, lặn ngắm san hô tại Hòn Mun, đảo Khỉ, thưởng thức hải sản tươi sống và khám phá cuộc sống về đêm sôi động.",
    "price": 3200000,
    "duration": 3,
    "maxGroupSize": 20,
    "difficulty": "easy",
    "location": {
      "city": "Nha Trang",
      "country": "Việt Nam",
      "address": "Khánh Hòa",
      "coordinates": [109.1899, 12.2388]
    },
    "images": [
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"
    ],
    "featured": true,
    "ratingsAverage": 4.5,
    "ratingsQuantity": 0,
    "startDates": [
      new Date("2025-11-12"),
      new Date("2025-12-10")
    ],
    "createdAt": new Date()
  },
  {
    "title": "Hội An - Phố cổ đèn lồng",
    "description": "Khám phá phố cổ Hội An với kiến trúc cổ kính, đèn lồng rực rỡ và ẩm thực đặc sắc. Tour bao gồm tham quan Chùa Cầu, Hội quán Phúc Kiến, làng gốm Thanh Hà, rừng dừa Bảy Mẫu và trải nghiệm thả đèn hoa đăng trên sông Hoài.",
    "price": 2800000,
    "duration": 2,
    "maxGroupSize": 15,
    "difficulty": "easy",
    "location": {
      "city": "Hội An",
      "country": "Việt Nam",
      "address": "Quảng Nam",
      "coordinates": [108.3380, 15.8801]
    },
    "images": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800"
    ],
    "featured": true,
    "ratingsAverage": 4.8,
    "ratingsQuantity": 0,
    "startDates": [
      new Date("2025-11-03"),
      new Date("2025-11-17")
    ],
    "createdAt": new Date()
  },
  {
    "title": "Đà Nẵng - Thành phố đáng sống",
    "description": "Khám phá Đà Nẵng với cầu Rồng, Bà Nà Hills, bãi biển Mỹ Khê và núi Ngũ Hành Sơn. Tour bao gồm cáp treo lên Bà Nà, tham quan Cầu Vàng, Làng Pháp, chùa Linh Ứng và thưởng thức ẩm thực đường phố Đà Nẵng.",
    "price": 3500000,
    "duration": 3,
    "maxGroupSize": 18,
    "difficulty": "easy",
    "location": {
      "city": "Đà Nẵng",
      "country": "Việt Nam",
      "address": "Đà Nẵng",
      "coordinates": [108.2022, 16.0544]
    },
    "images": [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800"
    ],
    "featured": false,
    "ratingsAverage": 4.6,
    "ratingsQuantity": 0,
    "startDates": [
      new Date("2025-11-07"),
      new Date("2025-11-21")
    ],
    "createdAt": new Date()
  },
  {
    "title": "Ninh Bình - Vịnh Hạ Long trên cạn",
    "description": "Khám phá Ninh Bình với quần thể danh thắng Tràng An, Tam Cốc - Bích Động, Hang Múa. Tour bao gồm đi thuyền xuyên qua các hang động, leo núi Múa ngắm toàn cảnh, tham quan chùa Bái Đính và Khu du lịch Tràng An.",
    "price": 1800000,
    "duration": 2,
    "maxGroupSize": 25,
    "difficulty": "easy",
    "location": {
      "city": "Ninh Bình",
      "country": "Việt Nam",
      "address": "Ninh Bình",
      "coordinates": [105.9750, 20.2506]
    },
    "images": [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800",
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800"
    ],
    "featured": false,
    "ratingsAverage": 4.7,
    "ratingsQuantity": 0,
    "startDates": [
      new Date("2025-11-04"),
      new Date("2025-11-18")
    ],
    "createdAt": new Date()
  },
  {
    "title": "Mù Cang Chải - Mùa lúa chín vàng",
    "description": "Khám phá vẻ đẹp hùng vĩ của ruộng bậc thang Mù Cang Chải trong mùa lúa chín. Tour bao gồm tham quan Khau Phạ - đèo hiểm trở bậc nhất Việt Nam, La Pán Tẩn, Chế Cu Nha và chụp ảnh ruộng bậc thang tuyệt đẹp.",
    "price": 4200000,
    "duration": 4,
    "maxGroupSize": 12,
    "difficulty": "medium",
    "location": {
      "city": "Mù Cang Chải",
      "country": "Việt Nam",
      "address": "Yên Bái",
      "coordinates": [104.0667, 21.8333]
    },
    "images": [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800"
    ],
    "featured": false,
    "ratingsAverage": 4.9,
    "ratingsQuantity": 0,
    "startDates": [
      new Date("2025-09-15"),
      new Date("2025-10-01")
    ],
    "createdAt": new Date()
  },
  {
    "title": "Côn Đảo - Hòn đảo huyền thoại",
    "description": "Khám phá vẻ đẹp hoang sơ của Côn Đảo với biển xanh ngắt, bãi cát trắng mịn. Tour bao gồm lặn ngắm san hô, tham quan nhà tù Côn Đảo, Bảo tàng, Mũi Cá Mập, tắm biển Đầm Trầu và thưởng thức hải sản tươi sống.",
    "price": 6500000,
    "duration": 3,
    "maxGroupSize": 10,
    "difficulty": "easy",
    "location": {
      "city": "Côn Đảo",
      "country": "Việt Nam",
      "address": "Bà Rịa - Vũng Tàu",
      "coordinates": [106.6100, 8.6833]
    },
    "images": [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800",
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800"
    ],
    "featured": false,
    "ratingsAverage": 4.8,
    "ratingsQuantity": 0,
    "startDates": [
      new Date("2025-11-25"),
      new Date("2025-12-15")
    ],
    "createdAt": new Date()
  }
]);

print("✅ Đã import " + db.tours.countDocuments() + " tours!");
```

3. Nhấn Enter → ✅ Hoàn thành!

---

## 🎨 CẬP NHẬT ĐÃ THỰC HIỆN

### Frontend - Hiển thị giá VNĐ

**File: `frontend/src/components/TourCard.jsx`**
```javascript
// TRƯỚC:
${tour.price}

// SAU:
{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tour.price)}
// Hiển thị: 2.500.000₫
```

**File: `frontend/src/pages/TourDetail.jsx`**
```javascript
// Giá tour và tổng tiền booking đều hiển thị VNĐ
{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tour.price)}
```

### Tours có hình ảnh

**Mỗi tour có 2 hình ảnh từ Unsplash:**
- Hình chính (hiển thị trong card)
- Hình phụ (gallery)

**Link hình mẫu:**
```
https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800
```

---

## ✅ KIỂM TRA SAU KHI IMPORT

### 1. Trong MongoDB Compass

```javascript
// Đếm tours
db.tours.countDocuments()
// → Phải có 10 tours

// Kiểm tra tours có hình
db.tours.find({ images: { $exists: true, $ne: [] } }).count()
// → Phải có 10 tours (tất cả có hình)

// Xem một tour
db.tours.findOne({ title: /Đà Lạt/ })
```

### 2. Trên Website

1. Mở: `http://localhost:3000`
2. Sẽ thấy:
   - ✅ Giá tour hiển thị VNĐ (ví dụ: **2.500.000₫**)
   - ✅ Hình ảnh tours đẹp từ Unsplash
   - ✅ 6 featured tours ở trang chủ
   - ✅ 3 hot deals (giá rẻ nhất)

3. Click vào 1 tour:
   - ✅ Hình ảnh lớn ở đầu trang
   - ✅ Giá VNĐ trong card booking
   - ✅ Tổng tiền booking tính theo VNĐ

---

## 🎯 DANH SÁCH 10 TOURS

| # | Tour | Giá VNĐ | Duration | Featured |
|---|------|---------|----------|----------|
| 1 | Đà Lạt - Thành phố ngàn hoa | 2.500.000₫ | 3 ngày | ✅ |
| 2 | Vịnh Hạ Long - Di sản thế giới | 4.500.000₫ | 2 ngày | ✅ |
| 3 | Phú Quốc - Thiên đường biển đảo | 5.000.000₫ | 4 ngày | ✅ |
| 4 | Sapa - Chinh phục Fansipan | 3.800.000₫ | 3 ngày | ✅ |
| 5 | Nha Trang - Biển xanh cát trắng | 3.200.000₫ | 3 ngày | ✅ |
| 6 | Hội An - Phố cổ đèn lồng | 2.800.000₫ | 2 ngày | ✅ |
| 7 | Đà Nẵng - Thành phố đáng sống | 3.500.000₫ | 3 ngày | ❌ |
| 8 | Ninh Bình - Vịnh Hạ Long trên cạn | 1.800.000₫ | 2 ngày | ❌ |
| 9 | Mù Cang Chải - Mùa lúa chín | 4.200.000₫ | 4 ngày | ❌ |
| 10 | Côn Đảo - Hòn đảo huyền thoại | 6.500.000₫ | 3 ngày | ❌ |

**Featured tours (6):** Hiển thị ở trang chủ
**Hot deals (3):** Giá rẻ nhất - Ninh Bình, Đà Lạt, Hội An

---

## 🐛 TROUBLESHOOTING

### Hình ảnh không hiển thị

**Nguyên nhân:** Link Unsplash bị chặn hoặc lỗi CORS

**Giải pháp:**
1. Kiểm tra internet
2. Thử link hình: https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800
3. Nếu vẫn lỗi → Có thể thay bằng link hình khác hoặc upload hình vào folder `backend/uploads`

### Giá không hiển thị VNĐ

**Kiểm tra:**
1. Frontend đã reload chưa? (Ctrl + F5)
2. Code đã update chưa? Check file `TourCard.jsx`

---

## 📝 NOTES

- ✅ Tất cả giá đã chuyển sang VNĐ
- ✅ Format số chuẩn Việt Nam (2.500.000₫)
- ✅ Hình ảnh chất lượng cao từ Unsplash
- ✅ Mỗi tour có 2 hình (main + gallery)
- ✅ 6 featured tours cho homepage
- ✅ Price range: 1.8M - 6.5M VNĐ

**🎉 WEBSITE BÂY GIỜ TRÔNG CHUYÊN NGHIỆP VÀ BẮT MẮT HƠN NHIỀU!**

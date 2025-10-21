# 📊 HƯỚNG DẪN CẬP NHẬT DỮ LIỆU LÊN MONGODB

## 🎯 Mục đích

Insert dữ liệu mẫu vào MongoDB bao gồm:
- ✅ 2 Users (1 Admin + 1 User thường)
- ✅ 10 Tours (6 Featured + 4 Regular)
- ✅ Dữ liệu Việt Nam (Đà Lạt, Hạ Long, Phú Quốc, Sapa, v.v.)

---

## 🔧 PHƯƠNG PHÁP 1: DÙNG MONGODB COMPASS (DỄ NHẤT!) ⭐

### Bước 1: Mở MongoDB Compass

1. Mở ứng dụng **MongoDB Compass**
2. Connect: `mongodb://localhost:27017`

### Bước 2: Chọn Database

1. Click vào database: **travel_booking**
2. Nếu chưa có, backend sẽ tự tạo khi chạy

### Bước 3: Insert Users

#### 3.1. Insert Admin User

1. Click collection **users**
2. Click **ADD DATA** → **Insert Document**
3. Paste JSON này:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
  "role": "admin",
  "phone": "0123456789",
  "dateOfBirth": {
    "$date": "1990-01-01T00:00:00.000Z"
  },
  "avatar": "default-avatar.jpg",
  "createdAt": {
    "$date": "2025-10-21T00:00:00.000Z"
  }
}
```

4. Click **Insert**

#### 3.2. Insert User Thường

1. Click **ADD DATA** → **Insert Document** lần nữa
2. Paste JSON này:

```json
{
  "name": "Nguyen Van A",
  "email": "user@example.com",
  "password": "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
  "role": "user",
  "phone": "0987654321",
  "dateOfBirth": {
    "$date": "1995-05-15T00:00:00.000Z"
  },
  "avatar": "default-avatar.jpg",
  "createdAt": {
    "$date": "2025-10-21T00:00:00.000Z"
  }
}
```

3. Click **Insert**

### Bước 4: Insert Tours

#### 4.1. Tạo collection tours (nếu chưa có)

1. Click **Create Collection**
2. Tên: `tours`
3. Click **Create**

#### 4.2. Insert tours từng cái một

Click **ADD DATA** → **Insert Document** và paste từng tour:

**Tour 1: Đà Lạt (Featured)**
```json
{
  "title": "Khám phá Đà Lạt - Thành phố ngàn hoa",
  "description": "Trải nghiệm không khí trong lành, khám phá những thác nước hùng vĩ, thưởng thức café đặc sản và chiêm ngưỡng vẻ đẹp thơ mộng của Đà Lạt.",
  "price": 2500000,
  "duration": 3,
  "maxGroupSize": 15,
  "difficulty": "easy",
  "featured": true,
  "location": {
    "city": "Đà Lạt",
    "country": "Việt Nam",
    "address": "Lâm Đồng, Việt Nam"
  },
  "images": ["dalat1.jpg", "dalat2.jpg"],
  "createdAt": {
    "$date": "2025-10-21T00:00:00.000Z"
  }
}
```

**Tour 2: Hạ Long (Featured)**
```json
{
  "title": "Tour Hạ Long - Kỳ quan thiên nhiên thế giới",
  "description": "Du thuyền sang trọng trên vịnh Hạ Long, khám phá hang động kỳ vĩ, tắm biển tại bãi tắm đẹp và thưởng thức hải sản tươi ngon.",
  "price": 3500000,
  "duration": 2,
  "maxGroupSize": 20,
  "difficulty": "easy",
  "featured": true,
  "location": {
    "city": "Hạ Long",
    "country": "Việt Nam",
    "address": "Quảng Ninh, Việt Nam"
  },
  "images": ["halong1.jpg", "halong2.jpg"],
  "createdAt": {
    "$date": "2025-10-21T00:00:00.000Z"
  }
}
```

**Tour 3: Phú Quốc (Featured)**
```json
{
  "title": "Phú Quốc - Đảo ngọc thiên đường",
  "description": "Tận hưởng bãi biển xanh ngắt, lặn ngắm san hô, khám phá vườn tiêu, làng chài và thưởng thức hải sản tươi sống.",
  "price": 4500000,
  "duration": 4,
  "maxGroupSize": 12,
  "difficulty": "easy",
  "featured": true,
  "location": {
    "city": "Phú Quốc",
    "country": "Việt Nam",
    "address": "Kiên Giang, Việt Nam"
  },
  "images": ["phuquoc1.jpg", "phuquoc2.jpg"],
  "createdAt": {
    "$date": "2025-10-21T00:00:00.000Z"
  }
}
```

**Tour 4: Sapa (Featured)**
```json
{
  "title": "Sapa - Tây Bắc hùng vĩ",
  "description": "Chinh phục đỉnh Fansipan, khám phá ruộng bậc thang tuyệt đẹp, tìm hiểu văn hóa dân tộc thiểu số và trải nghiệm chợ tình Sapa.",
  "price": 3000000,
  "duration": 3,
  "maxGroupSize": 18,
  "difficulty": "moderate",
  "featured": true,
  "location": {
    "city": "Sapa",
    "country": "Việt Nam",
    "address": "Lào Cai, Việt Nam"
  },
  "images": ["sapa1.jpg", "sapa2.jpg"],
  "createdAt": {
    "$date": "2025-10-21T00:00:00.000Z"
  }
}
```

**Tour 5: Nha Trang (Featured)**
```json
{
  "title": "Nha Trang - Thành phố biển xinh đẹp",
  "description": "Tắm biển, lặn biển ngắm san hô, tham quan Vinpearl Land, đảo Hòn Mun và thưởng thức hải sản tươi ngon.",
  "price": 2800000,
  "duration": 3,
  "maxGroupSize": 25,
  "difficulty": "easy",
  "featured": true,
  "location": {
    "city": "Nha Trang",
    "country": "Việt Nam",
    "address": "Khánh Hòa, Việt Nam"
  },
  "images": ["nhatrang1.jpg", "nhatrang2.jpg"],
  "createdAt": {
    "$date": "2025-10-21T00:00:00.000Z"
  }
}
```

**Tour 6: Hội An (Featured)**
```json
{
  "title": "Hội An - Phố cổ đèn lồng",
  "description": "Khám phá phố cổ, tham quan hội quán, chùa cầu, thả đèn hoa đăng và thưởng thức ẩm thực đặc sắc Hội An.",
  "price": 2200000,
  "duration": 2,
  "maxGroupSize": 20,
  "difficulty": "easy",
  "featured": true,
  "location": {
    "city": "Hội An",
    "country": "Việt Nam",
    "address": "Quảng Nam, Việt Nam"
  },
  "images": ["hoian1.jpg", "hoian2.jpg"],
  "createdAt": {
    "$date": "2025-10-21T00:00:00.000Z"
  }
}
```

**Tour 7: Đà Nẵng**
```json
{
  "title": "Đà Nẵng - Thành phố đáng sống",
  "description": "Tham quan Bà Nà Hills, cầu Vàng, bãi biển Mỹ Khê, núi Sơn Trà và thưởng thức hải sản tươi ngon.",
  "price": 2600000,
  "duration": 3,
  "maxGroupSize": 22,
  "difficulty": "easy",
  "featured": false,
  "location": {
    "city": "Đà Nẵng",
    "country": "Việt Nam",
    "address": "Đà Nẵng, Việt Nam"
  },
  "images": ["danang1.jpg", "danang2.jpg"],
  "createdAt": {
    "$date": "2025-10-21T00:00:00.000Z"
  }
}
```

**Tour 8: Ninh Bình**
```json
{
  "title": "Ninh Bình - Vịnh Hạ Long trên cạn",
  "description": "Du thuyền trên sông qua hang động Tam Cốc, tham quan Bái Đính, Tràng An và thưởng thức dê núi đặc sản.",
  "price": 1800000,
  "duration": 2,
  "maxGroupSize": 16,
  "difficulty": "easy",
  "featured": false,
  "location": {
    "city": "Ninh Bình",
    "country": "Việt Nam",
    "address": "Ninh Bình, Việt Nam"
  },
  "images": ["ninhbinh1.jpg", "ninhbinh2.jpg"],
  "createdAt": {
    "$date": "2025-10-21T00:00:00.000Z"
  }
}
```

**Tour 9: Mù Cang Chải**
```json
{
  "title": "Mù Cang Chải - Mùa lúa chín vàng",
  "description": "Chiêm ngưỡng ruộng bậc thang đẹp nhất Việt Nam, khám phá văn hóa dân tộc H'Mông và trekking khám phá thiên nhiên.",
  "price": 3200000,
  "duration": 3,
  "maxGroupSize": 12,
  "difficulty": "hard",
  "featured": false,
  "location": {
    "city": "Mù Cang Chải",
    "country": "Việt Nam",
    "address": "Yên Bái, Việt Nam"
  },
  "images": ["mucangchai1.jpg", "mucangchai2.jpg"],
  "createdAt": {
    "$date": "2025-10-21T00:00:00.000Z"
  }
}
```

**Tour 10: Côn Đảo**
```json
{
  "title": "Côn Đảo - Thiên đường biển đảo",
  "description": "Lặn biển ngắm san hô, tham quan di tích lịch sử, tắm biển tại bãi Đầm Trầu và thưởng thức hải sản tươi sống.",
  "price": 5000000,
  "duration": 3,
  "maxGroupSize": 10,
  "difficulty": "moderate",
  "featured": false,
  "location": {
    "city": "Côn Đảo",
    "country": "Việt Nam",
    "address": "Bà Rịa - Vũng Tàu, Việt Nam"
  },
  "images": ["condao1.jpg", "condao2.jpg"],
  "createdAt": {
    "$date": "2025-10-21T00:00:00.000Z"
  }
}
```

---

## 🔧 PHƯƠNG PHÁP 2: DÙNG FILE SCRIPT (NHANH HƠN)

### Bước 1: Tìm MongoDB Shell

MongoDB Shell có thể ở:
```
C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe
```

### Bước 2: Chạy script

```powershell
# Mở PowerShell
cd E:\Demo_web

# Chạy script (thay đổi path mongosh nếu cần)
& "C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe" mongodb://localhost:27017/travel_booking insert_sample_data.js
```

Hoặc:

```powershell
# Nếu mongosh đã có trong PATH
mongosh mongodb://localhost:27017/travel_booking insert_sample_data.js
```

---

## ✅ XÁC NHẬN DỮ LIỆU ĐÃ INSERT

### Trong MongoDB Compass:

1. Refresh database **travel_booking**
2. Kiểm tra collection **users**: Phải có 2 documents
3. Kiểm tra collection **tours**: Phải có 10 documents

### Hoặc qua backend API:

```
http://localhost:5000/api/tours
→ Phải trả về 10 tours

http://localhost:5000/api/tours?featured=true
→ Phải trả về 6 featured tours
```

---

## 🎯 TEST DỮ LIỆU

### 1. Đăng nhập Admin

```
URL: http://localhost:3000/login
Email: admin@example.com
Password: admin123
```

Sau khi login:
- ✅ Thấy menu Admin
- ✅ Vào Dashboard → Thấy thống kê: 10 tours
- ✅ Vào Quản lý Tours → Thấy 10 tours

### 2. Đăng nhập User

```
URL: http://localhost:3000/login
Email: user@example.com
Password: admin123
```

Sau khi login:
- ✅ Thấy menu User (Bookings của tôi, Hồ sơ)
- ✅ Có thể đặt tour

### 3. Xem trang chủ

```
URL: http://localhost:3000
```

- ✅ Phần "Tours Nổi Bật": Hiển thị 6 tours (featured: true)
- ✅ Phần "Tours HOT": Hiển thị 3 tours giá rẻ nhất
  - Ninh Bình (1,800,000 đ)
  - Hội An (2,200,000 đ)
  - Đà Lạt (2,500,000 đ)

### 4. Xem tất cả tours

```
URL: http://localhost:3000/tours
```

- ✅ Hiển thị cả 10 tours
- ✅ Search, filter, sort hoạt động

---

## 📊 CHI TIẾT DỮ LIỆU ĐÃ INSERT

### Users (2)

| Email | Password | Role | Tên |
|-------|----------|------|-----|
| admin@example.com | admin123 | admin | Admin User |
| user@example.com | admin123 | user | Nguyen Van A |

### Tours (10)

| Tên Tour | Giá | Ngày | Featured | Độ khó |
|----------|-----|------|----------|--------|
| Đà Lạt | 2,500,000 đ | 3 | ✅ | Easy |
| Hạ Long | 3,500,000 đ | 2 | ✅ | Easy |
| Phú Quốc | 4,500,000 đ | 4 | ✅ | Easy |
| Sapa | 3,000,000 đ | 3 | ✅ | Moderate |
| Nha Trang | 2,800,000 đ | 3 | ✅ | Easy |
| Hội An | 2,200,000 đ | 2 | ✅ | Easy |
| Đà Nẵng | 2,600,000 đ | 3 | ❌ | Easy |
| Ninh Bình | 1,800,000 đ | 2 | ❌ | Easy |
| Mù Cang Chải | 3,200,000 đ | 3 | ❌ | Hard |
| Côn Đảo | 5,000,000 đ | 3 | ❌ | Moderate |

**Tours HOT (giá rẻ nhất):**
1. Ninh Bình - 1,800,000 đ
2. Hội An - 2,200,000 đ
3. Đà Lạt - 2,500,000 đ

**Featured Tours (6):**
Đà Lạt, Hạ Long, Phú Quốc, Sapa, Nha Trang, Hội An

---

## 🐛 TROUBLESHOOTING

### Lỗi: Duplicate key error

**Nguyên nhân:** Email đã tồn tại

**Giải pháp:**
```javascript
// Xóa users cũ trước
db.users.deleteMany({})

// Insert lại
```

### Lỗi: Collection not found

**Nguyên nhân:** Collection chưa được tạo

**Giải pháp:**
- Trong Compass: Create Collection → Tên: `users` hoặc `tours`
- Hoặc backend sẽ tự tạo khi insert

### Kiểm tra dữ liệu trong Compass

```javascript
// Đếm users
db.users.countDocuments()
// → Phải = 2

// Đếm tours
db.tours.countDocuments()
// → Phải = 10

// Đếm featured tours
db.tours.countDocuments({ featured: true })
// → Phải = 6

// Xem tour rẻ nhất
db.tours.find().sort({ price: 1 }).limit(3)
// → Ninh Bình, Hội An, Đà Lạt
```

---

## ✅ CHECKLIST

- [ ] MongoDB Compass đã mở và connected
- [ ] Database `travel_booking` đã tồn tại
- [ ] Collection `users` có 2 documents
- [ ] Collection `tours` có 10 documents
- [ ] Đăng nhập admin thành công
- [ ] Đăng nhập user thành công
- [ ] Trang chủ hiển thị Featured Tours (6)
- [ ] Trang chủ hiển thị Tours HOT (3)
- [ ] Admin có thể tạo/sửa/xóa tours
- [ ] User có thể đặt booking

---

**🎉 SAU KHI INSERT DỮ LIỆU:**

1. Refresh trang chủ: http://localhost:3000
2. Xem Tours Nổi Bật (6 tours)
3. Xem Tours HOT (3 tours giá rẻ)
4. Đăng nhập admin và test tất cả tính năng
5. Đăng nhập user và test đặt tour

**Website giờ đã có đầy đủ dữ liệu để demo!** 🚀

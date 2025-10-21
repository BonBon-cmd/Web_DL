// =====================================================
// SCRIPT INSERT REVIEWS VÀO MONGODB
// =====================================================
// LƯU Ý: Cần chạy SAU KHI đã insert users và tours!
// Reviews cần tour ID và user ID từ database

// =====================================================
// BƯỚC 1: LẤY IDs TỪ DATABASE
// =====================================================

// Lấy tour IDs
const tours = db.tours.find().toArray();
const dalat = tours.find(t => t.title.includes("Đà Lạt"))?._id;
const halong = tours.find(t => t.title.includes("Hạ Long"))?._id;
const phuquoc = tours.find(t => t.title.includes("Phú Quốc"))?._id;
const sapa = tours.find(t => t.title.includes("Sapa"))?._id;
const nhatrang = tours.find(t => t.title.includes("Nha Trang"))?._id;
const hoian = tours.find(t => t.title.includes("Hội An"))?._id;

// Lấy user IDs
const users = db.users.find().toArray();
const adminUser = users.find(u => u.role === "admin")?._id;
const regularUser = users.find(u => u.role === "user")?._id;

// =====================================================
// BƯỚC 2: TẠO USERS BỔ SUNG (để có nhiều reviews)
// =====================================================

db.users.insertMany([
  {
    name: "Trần Thị B",
    email: "tran.b@example.com",
    password: "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
    role: "user",
    phone: "0912345678",
    dateOfBirth: new Date("1992-03-20"),
    avatar: "default-avatar.jpg",
    createdAt: new Date()
  },
  {
    name: "Lê Văn C",
    email: "le.c@example.com",
    password: "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
    role: "user",
    phone: "0923456789",
    dateOfBirth: new Date("1988-07-15"),
    avatar: "default-avatar.jpg",
    createdAt: new Date()
  },
  {
    name: "Phạm Thị D",
    email: "pham.d@example.com",
    password: "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
    role: "user",
    phone: "0934567890",
    dateOfBirth: new Date("1994-11-08"),
    avatar: "default-avatar.jpg",
    createdAt: new Date()
  },
  {
    name: "Hoàng Văn E",
    email: "hoang.e@example.com",
    password: "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS",
    role: "user",
    phone: "0945678901",
    dateOfBirth: new Date("1991-05-25"),
    avatar: "default-avatar.jpg",
    createdAt: new Date()
  }
]);

print("✅ Đã tạo 4 users bổ sung");

// Lấy lại tất cả users
const allUsers = db.users.find({ role: "user" }).toArray();
const user1 = allUsers[0]?._id;
const user2 = allUsers[1]?._id;
const user3 = allUsers[2]?._id;
const user4 = allUsers[3]?._id;

// =====================================================
// BƯỚC 3: INSERT REVIEWS
// =====================================================

// Reviews cho tour Đà Lạt
if (dalat && user1) {
  db.reviews.insertMany([
    {
      tour: dalat,
      user: user1,
      rating: 5,
      comment: "Đà Lạt thật tuyệt vời! Không khí trong lành, phong cảnh đẹp mê hồn. Hướng dẫn viên nhiệt tình, lịch trình hợp lý. Chắc chắn sẽ quay lại!",
      createdAt: new Date("2025-10-15")
    },
    {
      tour: dalat,
      user: user2,
      rating: 5,
      comment: "Tour rất chuyên nghiệp, khách sạn sạch sẽ, đồ ăn ngon. Các thác nước và đồi chè rất đẹp. Xứng đáng 5 sao!",
      createdAt: new Date("2025-10-16")
    },
    {
      tour: dalat,
      user: user3,
      rating: 4,
      comment: "Chuyến đi tuyệt vời, chỉ có điều thời tiết hơi lạnh. Nhưng không ảnh hưởng gì, vẫn rất vui!",
      createdAt: new Date("2025-10-18")
    }
  ]);
  print("✅ Đã tạo 3 reviews cho Đà Lạt");
}

// Reviews cho tour Hạ Long
if (halong && user2) {
  db.reviews.insertMany([
    {
      tour: halong,
      user: user2,
      rating: 5,
      comment: "Vịnh Hạ Long đẹp như tranh vẽ! Du thuyền sang trọng, hải sản tươi ngon. Đội ngũ phục vụ tận tâm. Highly recommended!",
      createdAt: new Date("2025-10-12")
    },
    {
      tour: halong,
      user: user3,
      rating: 4,
      comment: "Cảnh đẹp không có gì để chê. Hang Sửng Sốt thật sự choáng ngợp. Trừ điểm vì thời tiết có mây.",
      createdAt: new Date("2025-10-14")
    },
    {
      tour: halong,
      user: user4,
      rating: 5,
      comment: "Lần đầu đi Hạ Long, quá ấn tượng! Tắm biển, chèo kayak, ăn hải sản... Tất cả đều tuyệt vời!",
      createdAt: new Date("2025-10-17")
    }
  ]);
  print("✅ Đã tạo 3 reviews cho Hạ Long");
}

// Reviews cho tour Phú Quốc
if (phuquoc && user1) {
  db.reviews.insertMany([
    {
      tour: phuquoc,
      user: user1,
      rating: 5,
      comment: "Phú Quốc là thiên đường biển đảo! Bãi Sao đẹp ngất ngây, nước biển trong xanh. Resort 5 sao, dịch vụ hoàn hảo!",
      createdAt: new Date("2025-10-10")
    },
    {
      tour: phuquoc,
      user: user4,
      rating: 5,
      comment: "Trải nghiệm tuyệt vời! Lặn ngắm san hô đẹp lắm. Hải sản tươi sống giá rẻ. 4 ngày 3 đêm vẫn thấy ngắn!",
      createdAt: new Date("2025-10-19")
    }
  ]);
  print("✅ Đã tạo 2 reviews cho Phú Quốc");
}

// Reviews cho tour Sapa
if (sapa && user3) {
  db.reviews.insertMany([
    {
      tour: sapa,
      user: user3,
      rating: 5,
      comment: "Sapa mùa lúa chín đẹp không thể tả! Ruộng bậc thang tuyệt đẹp, chinh phục Fansipan thành công. Đội ngũ hướng dẫn rất pro!",
      createdAt: new Date("2025-10-08")
    },
    {
      tour: sapa,
      user: user1,
      rating: 4,
      comment: "Tour trekking rất thú vị. Gặp được nhiều người dân tộc, văn hóa độc đáo. Hơi mệt nhưng rất đáng!",
      createdAt: new Date("2025-10-11")
    },
    {
      tour: sapa,
      user: user2,
      rating: 5,
      comment: "Cảnh đẹp xuất sắc! Chợ tình Sapa rất đặc sắc. Homestay ấm cúng, chủ nhà thân thiện. Sẽ quay lại!",
      createdAt: new Date("2025-10-13")
    }
  ]);
  print("✅ Đã tạo 3 reviews cho Sapa");
}

// Reviews cho tour Nha Trang
if (nhatrang && user4) {
  db.reviews.insertMany([
    {
      tour: nhatrang,
      user: user4,
      rating: 5,
      comment: "Nha Trang vui lắm! Vinpearl Land sướng không tưởng. Tắm biển, lặn ngắm san hô đều tuyệt. Giá cả hợp lý!",
      createdAt: new Date("2025-10-09")
    },
    {
      tour: nhatrang,
      user: user2,
      rating: 4,
      comment: "Bãi biển đẹp, nước trong. Đảo Hòn Mun rất đẹp. Trừ điểm vì đông khách một chút.",
      createdAt: new Date("2025-10-12")
    },
    {
      tour: nhatrang,
      user: user3,
      rating: 5,
      comment: "Chuyến đi gia đình rất vui! Trẻ em thích Vinpearl lắm. Khách sạn view biển đẹp. Nhất định sẽ quay lại!",
      createdAt: new Date("2025-10-15")
    }
  ]);
  print("✅ Đã tạo 3 reviews cho Nha Trang");
}

// Reviews cho tour Hội An
if (hoian && user1) {
  db.reviews.insertMany([
    {
      tour: hoian,
      user: user1,
      rating: 5,
      comment: "Hội An phố cổ rất đẹp! Ban đêm thả đèn hoa đăng lãng mạn lắm. Món ăn đặc sản cao lầu, bánh mì ngon tuyệt!",
      createdAt: new Date("2025-10-07")
    },
    {
      tour: hoian,
      user: user3,
      rating: 5,
      comment: "Kiến trúc cổ kính, văn hóa đặc sắc. Chùa Cầu, hội quán đều đẹp. Tour guide giải thích rất hay!",
      createdAt: new Date("2025-10-10")
    },
    {
      tour: hoian,
      user: user4,
      rating: 4,
      comment: "Phố cổ đẹp, nhưng hơi đông khách. Đồ ăn ngon, giá hợp lý. Chụp hình rất đẹp!",
      createdAt: new Date("2025-10-14")
    }
  ]);
  print("✅ Đã tạo 3 reviews cho Hội An");
}

// =====================================================
// BƯỚC 4: THỐNG KÊ
// =====================================================

print("\n==========================================");
print("📊 THỐNG KÊ SAU KHI INSERT REVIEWS:");
print("==========================================");

const totalReviews = db.reviews.countDocuments();
print("✅ Tổng số reviews: " + totalReviews);

// Đếm reviews theo rating
print("\n📈 Phân bố theo rating:");
for (let i = 5; i >= 1; i--) {
  const count = db.reviews.countDocuments({ rating: i });
  print(i + " sao: " + count + " reviews");
}

// Review trung bình cho mỗi tour
print("\n⭐ Đánh giá trung bình cho mỗi tour:");
const tourStats = db.reviews.aggregate([
  {
    $group: {
      _id: "$tour",
      avgRating: { $avg: "$rating" },
      count: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "tours",
      localField: "_id",
      foreignField: "_id",
      as: "tourInfo"
    }
  }
]).toArray();

tourStats.forEach(stat => {
  if (stat.tourInfo && stat.tourInfo[0]) {
    print("  " + stat.tourInfo[0].title + ": " + 
          stat.avgRating.toFixed(1) + "/5 (" + stat.count + " reviews)");
  }
});

print("\n==========================================");
print("✅ HOÀN THÀNH! Reviews đã được insert.");
print("==========================================");
print("\nLƯU Ý:");
print("- Reviews sẽ tự động cập nhật ratingsAverage và ratingsQuantity cho tours");
print("- Mỗi user chỉ review 1 lần cho mỗi tour (unique constraint)");
print("- Refresh trang web để thấy reviews hiển thị!");

// Script để insert dữ liệu mẫu vào MongoDB
// Chạy script này trong MongoDB Compass hoặc mongosh

// 1. TẠO ADMIN USER
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS", // admin123
  role: "admin",
  phone: "0123456789",
  dateOfBirth: new Date("1990-01-01"),
  avatar: "default-avatar.jpg",
  createdAt: new Date()
});

// 2. TẠO USER THƯỜNG (để test)
db.users.insertOne({
  name: "Nguyen Van A",
  email: "user@example.com",
  password: "$2a$10$5YgZ8vqXz4qP7yU9xN2QZeX8j1jK5QwE7xH2nZ9fG8hW3kL6pM4mS", // admin123
  role: "user",
  phone: "0987654321",
  dateOfBirth: new Date("1995-05-15"),
  avatar: "default-avatar.jpg",
  createdAt: new Date()
});

// 3. TẠO TOURS MẪU
db.tours.insertMany([
  {
    title: "Khám phá Đà Lạt - Thành phố ngàn hoa",
    description: "Trải nghiệm không khí trong lành, khám phá những thác nước hùng vĩ, thưởng thức café đặc sản và chiêm ngưỡng vẻ đẹp thơ mộng của Đà Lạt.",
    price: 2500000,
    duration: 3,
    maxGroupSize: 15,
    difficulty: "easy",
    featured: true,
    location: {
      city: "Đà Lạt",
      country: "Việt Nam",
      address: "Lâm Đồng, Việt Nam"
    },
    images: ["dalat1.jpg", "dalat2.jpg"],
    createdAt: new Date()
  },
  {
    title: "Tour Hạ Long - Kỳ quan thiên nhiên thế giới",
    description: "Du thuyền sang trọng trên vịnh Hạ Long, khám phá hang động kỳ vĩ, tắm biển tại bãi tắm đẹp và thưởng thức hải sản tươi ngon.",
    price: 3500000,
    duration: 2,
    maxGroupSize: 20,
    difficulty: "easy",
    featured: true,
    location: {
      city: "Hạ Long",
      country: "Việt Nam",
      address: "Quảng Ninh, Việt Nam"
    },
    images: ["halong1.jpg", "halong2.jpg"],
    createdAt: new Date()
  },
  {
    title: "Phú Quốc - Đảo ngọc thiên đường",
    description: "Tận hưởng bãi biển xanh ngắt, lặn ngắm san hô, khám phá vườn tiêu, làng chài và thưởng thức hải sản tươi sống.",
    price: 4500000,
    duration: 4,
    maxGroupSize: 12,
    difficulty: "easy",
    featured: true,
    location: {
      city: "Phú Quốc",
      country: "Việt Nam",
      address: "Kiên Giang, Việt Nam"
    },
    images: ["phuquoc1.jpg", "phuquoc2.jpg"],
    createdAt: new Date()
  },
  {
    title: "Sapa - Tây Bắc hùng vĩ",
    description: "Chinh phục đỉnh Fansipan, khám phá ruộng bậc thang tuyệt đẹp, tìm hiểu văn hóa dân tộc thiểu số và trải nghiệm chợ tình Sapa.",
    price: 3000000,
    duration: 3,
    maxGroupSize: 18,
    difficulty: "moderate",
    featured: true,
    location: {
      city: "Sapa",
      country: "Việt Nam",
      address: "Lào Cai, Việt Nam"
    },
    images: ["sapa1.jpg", "sapa2.jpg"],
    createdAt: new Date()
  },
  {
    title: "Nha Trang - Thành phố biển xinh đẹp",
    description: "Tắm biển, lặn biển ngắm san hô, tham quan Vinpearl Land, đảo Hòn Mun và thưởng thức hải sản tươi ngon.",
    price: 2800000,
    duration: 3,
    maxGroupSize: 25,
    difficulty: "easy",
    featured: true,
    location: {
      city: "Nha Trang",
      country: "Việt Nam",
      address: "Khánh Hòa, Việt Nam"
    },
    images: ["nhatrang1.jpg", "nhatrang2.jpg"],
    createdAt: new Date()
  },
  {
    title: "Hội An - Phố cổ đèn lồng",
    description: "Khám phá phố cổ, tham quan hội quán, chùa cầu, thả đèn hoa đăng và thưởng thức ẩm thực đặc sắc Hội An.",
    price: 2200000,
    duration: 2,
    maxGroupSize: 20,
    difficulty: "easy",
    featured: true,
    location: {
      city: "Hội An",
      country: "Việt Nam",
      address: "Quảng Nam, Việt Nam"
    },
    images: ["hoian1.jpg", "hoian2.jpg"],
    createdAt: new Date()
  },
  {
    title: "Đà Nẵng - Thành phố đáng sống",
    description: "Tham quan Bà Nà Hills, cầu Vàng, bãi biển Mỹ Khê, núi Sơn Trà và thưởng thức hải sản tươi ngon.",
    price: 2600000,
    duration: 3,
    maxGroupSize: 22,
    difficulty: "easy",
    featured: false,
    location: {
      city: "Đà Nẵng",
      country: "Việt Nam",
      address: "Đà Nẵng, Việt Nam"
    },
    images: ["danang1.jpg", "danang2.jpg"],
    createdAt: new Date()
  },
  {
    title: "Ninh Bình - Vịnh Hạ Long trên cạn",
    description: "Du thuyền trên sông qua hang động Tam Cốc, tham quan Bái Đính, Tràng An và thưởng thức dê núi đặc sản.",
    price: 1800000,
    duration: 2,
    maxGroupSize: 16,
    difficulty: "easy",
    featured: false,
    location: {
      city: "Ninh Bình",
      country: "Việt Nam",
      address: "Ninh Bình, Việt Nam"
    },
    images: ["ninhbinh1.jpg", "ninhbinh2.jpg"],
    createdAt: new Date()
  },
  {
    title: "Mù Cang Chải - Mùa lúa chín vàng",
    description: "Chiêm ngưỡng ruộng bậc thang đẹp nhất Việt Nam, khám phá văn hóa dân tộc H'Mông và trekking khám phá thiên nhiên.",
    price: 3200000,
    duration: 3,
    maxGroupSize: 12,
    difficulty: "hard",
    featured: false,
    location: {
      city: "Mù Cang Chải",
      country: "Việt Nam",
      address: "Yên Bái, Việt Nam"
    },
    images: ["mucangchai1.jpg", "mucangchai2.jpg"],
    createdAt: new Date()
  },
  {
    title: "Côn Đảo - Thiên đường biển đảo",
    description: "Lặn biển ngắm san hô, tham quan di tích lịch sử, tắm biển tại bãi Đầm Trầu và thưởng thức hải sản tươi sống.",
    price: 5000000,
    duration: 3,
    maxGroupSize: 10,
    difficulty: "moderate",
    featured: false,
    location: {
      city: "Côn Đảo",
      country: "Việt Nam",
      address: "Bà Rịa - Vũng Tàu, Việt Nam"
    },
    images: ["condao1.jpg", "condao2.jpg"],
    createdAt: new Date()
  }
]);

print("✅ Đã insert thành công:");
print("- 2 users (1 admin, 1 user thường)");
print("- 10 tours (6 featured, 4 regular)");
print("\nThông tin đăng nhập:");
print("Admin: admin@example.com / admin123");
print("User: user@example.com / admin123");

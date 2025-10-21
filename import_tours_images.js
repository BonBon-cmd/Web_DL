// =====================================================
// SCRIPT IMPORT TOURS MỚI CÓ HÌNH ẢNH - MONGODB
// =====================================================
// Chạy trong MongoSH của MongoDB Compass
// Hoặc: mongosh mongodb://localhost:27017/travel_booking < import_tours_images.js

// Xóa tours cũ
print("🗑️  Đang xóa tours cũ...");
db.tours.deleteMany({});
print("✅ Đã xóa tours cũ!");

// Insert tours mới với hình ảnh
print("\n📥 Đang import tours mới...");

const tours = [
  {
    title: "Khám phá Đà Lạt - Thành phố ngàn hoa",
    description: "Trải nghiệm không khí trong lành của Đà Lạt với những đồi thông bát ngát, thác nước hùng vĩ và những vườn hoa rực rỡ. Tour bao gồm tham quan Thung lũng Tình yêu, Hồ Tuyền Lâm, thác Datanla, vườn hoa thành phố và các điểm check-in hot như Crazy House, ga Đà Lạt cổ kính.",
    price: 2500000,
    duration: 3,
    maxGroupSize: 15,
    difficulty: "easy",
    location: {
      city: "Đà Lạt",
      country: "Việt Nam",
      address: "Lâm Đồng",
      coordinates: [108.4419, 11.9404]
    },
    images: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800"
    ],
    featured: true,
    ratingsAverage: 4.8,
    ratingsQuantity: 0,
    startDates: [
      new Date("2025-11-01"),
      new Date("2025-11-15"),
      new Date("2025-12-01")
    ],
    createdAt: new Date()
  },
  {
    title: "Du thuyền Vịnh Hạ Long - Di sản thế giới",
    description: "Khám phá vẻ đẹp huyền ảo của Vịnh Hạ Long với hàng nghìn hòn đảo đá vôi. Tour du thuyền 2 ngày 1 đêm bao gồm tham quan Hang Sửng Sốt, làng chài Cửa Vạn, chèo kayak, tắm biển và thưởng thức hải sản tươi sống trên du thuyền 5 sao.",
    price: 4500000,
    duration: 2,
    maxGroupSize: 20,
    difficulty: "easy",
    location: {
      city: "Hạ Long",
      country: "Việt Nam",
      address: "Quảng Ninh",
      coordinates: [107.0431, 20.9101]
    },
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800"
    ],
    featured: true,
    ratingsAverage: 4.9,
    ratingsQuantity: 0,
    startDates: [
      new Date("2025-11-05"),
      new Date("2025-11-20")
    ],
    createdAt: new Date()
  },
  {
    title: "Phú Quốc - Thiên đường biển đảo",
    description: "Nghỉ dưỡng tại đảo ngọc Phú Quốc với bãi biển cát trắng, nước biển trong xanh. Tour bao gồm lặn ngắm san hô, tham quan VinWonders, Safari, chợ đêm Phú Quốc, câu cá, tham quan làng chài và thưởng thức hải sản tươi sống.",
    price: 5000000,
    duration: 4,
    maxGroupSize: 12,
    difficulty: "easy",
    location: {
      city: "Phú Quốc",
      country: "Việt Nam",
      address: "Kiên Giang",
      coordinates: [103.9860, 10.2895]
    },
    images: [
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"
    ],
    featured: true,
    ratingsAverage: 4.7,
    ratingsQuantity: 0,
    startDates: [
      new Date("2025-11-10"),
      new Date("2025-12-05")
    ],
    createdAt: new Date()
  },
  {
    title: "Sapa - Chinh phục Fansipan",
    description: "Khám phá vẻ đẹp hùng vĩ của Sapa với ruộng bậc thang, bản làng dân tộc và đỉnh Fansipan - nóc nhà Đông Dương. Tour bao gồm trekking qua các bản làng H'Mông, Dao đỏ, cáp treo Fansipan, thác Bạc, Cầu Mây Rồng và chợ tình Sapa.",
    price: 3800000,
    duration: 3,
    maxGroupSize: 10,
    difficulty: "medium",
    location: {
      city: "Sapa",
      country: "Việt Nam",
      address: "Lào Cai",
      coordinates: [103.8450, 22.3364]
    },
    images: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800"
    ],
    featured: true,
    ratingsAverage: 4.6,
    ratingsQuantity: 0,
    startDates: [
      new Date("2025-11-08"),
      new Date("2025-11-22")
    ],
    createdAt: new Date()
  },
  {
    title: "Nha Trang - Biển xanh cát trắng",
    description: "Tận hưởng kỳ nghỉ tại Nha Trang với bãi biển đẹp nhất Việt Nam. Tour bao gồm tham quan VinWonders, tắm bùn khoáng, lặn ngắm san hô tại Hòn Mun, đảo Khỉ, thưởng thức hải sản tươi sống và khám phá cuộc sống về đêm sôi động.",
    price: 3200000,
    duration: 3,
    maxGroupSize: 20,
    difficulty: "easy",
    location: {
      city: "Nha Trang",
      country: "Việt Nam",
      address: "Khánh Hòa",
      coordinates: [109.1899, 12.2388]
    },
    images: [
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"
    ],
    featured: true,
    ratingsAverage: 4.5,
    ratingsQuantity: 0,
    startDates: [
      new Date("2025-11-12"),
      new Date("2025-12-10")
    ],
    createdAt: new Date()
  },
  {
    title: "Hội An - Phố cổ đèn lồng",
    description: "Khám phá phố cổ Hội An với kiến trúc cổ kính, đèn lồng rực rỡ và ẩm thực đặc sắc. Tour bao gồm tham quan Chùa Cầu, Hội quán Phúc Kiến, làng gốm Thanh Hà, rừng dừa Bảy Mẫu và trải nghiệm thả đèn hoa đăng trên sông Hoài.",
    price: 2800000,
    duration: 2,
    maxGroupSize: 15,
    difficulty: "easy",
    location: {
      city: "Hội An",
      country: "Việt Nam",
      address: "Quảng Nam",
      coordinates: [108.3380, 15.8801]
    },
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800"
    ],
    featured: true,
    ratingsAverage: 4.8,
    ratingsQuantity: 0,
    startDates: [
      new Date("2025-11-03"),
      new Date("2025-11-17")
    ],
    createdAt: new Date()
  },
  {
    title: "Đà Nẵng - Thành phố đáng sống",
    description: "Khám phá Đà Nẵng với cầu Rồng, Bà Nà Hills, bãi biển Mỹ Khê và núi Ngũ Hành Sơn. Tour bao gồm cáp treo lên Bà Nà, tham quan Cầu Vàng, Làng Pháp, chùa Linh Ứng và thưởng thức ẩm thực đường phố Đà Nẵng.",
    price: 3500000,
    duration: 3,
    maxGroupSize: 18,
    difficulty: "easy",
    location: {
      city: "Đà Nẵng",
      country: "Việt Nam",
      address: "Đà Nẵng",
      coordinates: [108.2022, 16.0544]
    },
    images: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800",
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800"
    ],
    featured: false,
    ratingsAverage: 4.6,
    ratingsQuantity: 0,
    startDates: [
      new Date("2025-11-07"),
      new Date("2025-11-21")
    ],
    createdAt: new Date()
  },
  {
    title: "Ninh Bình - Vịnh Hạ Long trên cạn",
    description: "Khám phá Ninh Bình với quần thể danh thắng Tràng An, Tam Cốc - Bích Động, Hang Múa. Tour bao gồm đi thuyền xuyên qua các hang động, leo núi Múa ngắm toàn cảnh, tham quan chùa Bái Đính và Khu du lịch Tràng An.",
    price: 1800000,
    duration: 2,
    maxGroupSize: 25,
    difficulty: "easy",
    location: {
      city: "Ninh Bình",
      country: "Việt Nam",
      address: "Ninh Bình",
      coordinates: [105.9750, 20.2506]
    },
    images: [
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800",
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800"
    ],
    featured: false,
    ratingsAverage: 4.7,
    ratingsQuantity: 0,
    startDates: [
      new Date("2025-11-04"),
      new Date("2025-11-18")
    ],
    createdAt: new Date()
  },
  {
    title: "Mù Cang Chải - Mùa lúa chín vàng",
    description: "Khám phá vẻ đẹp hùng vĩ của ruộng bậc thang Mù Cang Chải trong mùa lúa chín. Tour bao gồm tham quan Khau Phạ - đèo hiểm trở bậc nhất Việt Nam, La Pán Tẩn, Chế Cu Nha và chụp ảnh ruộng bậc thang tuyệt đẹp.",
    price: 4200000,
    duration: 4,
    maxGroupSize: 12,
    difficulty: "medium",
    location: {
      city: "Mù Cang Chải",
      country: "Việt Nam",
      address: "Yên Bái",
      coordinates: [104.0667, 21.8333]
    },
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800",
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800"
    ],
    featured: false,
    ratingsAverage: 4.9,
    ratingsQuantity: 0,
    startDates: [
      new Date("2025-09-15"),
      new Date("2025-10-01")
    ],
    createdAt: new Date()
  },
  {
    title: "Côn Đảo - Hòn đảo huyền thoại",
    description: "Khám phá vẻ đẹp hoang sơ của Côn Đảo với biển xanh ngắt, bãi cát trắng mịn. Tour bao gồm lặn ngắm san hô, tham quan nhà tù Côn Đảo, Bảo tàng, Mũi Cá Mập, tắm biển Đầm Trầu và thưởng thức hải sản tươi sống.",
    price: 6500000,
    duration: 3,
    maxGroupSize: 10,
    difficulty: "easy",
    location: {
      city: "Côn Đảo",
      country: "Việt Nam",
      address: "Bà Rịa - Vũng Tàu",
      coordinates: [106.6100, 8.6833]
    },
    images: [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800",
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800"
    ],
    featured: false,
    ratingsAverage: 4.8,
    ratingsQuantity: 0,
    startDates: [
      new Date("2025-11-25"),
      new Date("2025-12-15")
    ],
    createdAt: new Date()
  }
];

const result = db.tours.insertMany(tours);

print("\n✅ ĐÃ IMPORT THÀNH CÔNG " + Object.keys(result.insertedIds).length + " TOURS!");
print("\n📊 THỐNG KÊ:");
print("   - Tổng tours: " + db.tours.countDocuments());
print("   - Featured tours: " + db.tours.countDocuments({ featured: true }));
print("   - Tours có hình: " + db.tours.countDocuments({ images: { $exists: true, $ne: [] } }));

print("\n🎉 HOÀN THÀNH! Reload trang web để xem hình ảnh.");

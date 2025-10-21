// =====================================================
// SCRIPT INSERT REVIEWS NHANH - MONGODB COMPASS
// =====================================================
// Cách dùng:
// 1. Mở MongoDB Compass
// 2. Connect: mongodb://localhost:27017
// 3. Database: travel_booking
// 4. Collection: Chọn "reviews" (hoặc tạo mới)
// 5. Click "_MongoSH" ở dưới
// 6. Copy toàn bộ script này paste vào
// 7. Enter để chạy
// =====================================================

// Lấy tour IDs và user IDs
const tours = db.tours.find().toArray();
const users = db.users.find().toArray();

print("📊 Tìm thấy:");
print("   Tours: " + tours.length);
print("   Users: " + users.length);

if (tours.length === 0) {
  print("❌ ERROR: Không có tours! Hãy insert tours trước.");
  throw new Error("No tours found");
}

if (users.length === 0) {
  print("❌ ERROR: Không có users! Hãy insert users trước.");
  throw new Error("No users found");
}

// Tìm tours cụ thể
const dalat = tours.find(t => t.title && t.title.includes("Đà Lạt"));
const halong = tours.find(t => t.title && t.title.includes("Hạ Long"));
const phuquoc = tours.find(t => t.title && t.title.includes("Phú Quốc"));
const sapa = tours.find(t => t.title && t.title.includes("Sapa"));
const nhatrang = tours.find(t => t.title && t.title.includes("Nha Trang"));
const hoian = tours.find(t => t.title && t.title.includes("Hội An"));

// Tạo reviews
const reviews = [];

// === ĐÀ LẠT REVIEWS ===
if (dalat && users[0]) {
  reviews.push({
    tour: dalat._id,
    user: users[0]._id,
    rating: 5,
    comment: "Đà Lạt thật tuyệt vời! Không khí trong lành, phong cảnh đẹp mê hồn. Hướng dẫn viên nhiệt tình, lịch trình hợp lý. Chắc chắn sẽ quay lại!",
    createdAt: new Date("2025-01-15")
  });
}

if (dalat && users[1]) {
  reviews.push({
    tour: dalat._id,
    user: users[1]._id,
    rating: 5,
    comment: "Tour rất chuyên nghiệp, khách sạn sạch sẽ, đồ ăn ngon. Các thác nước và đồi chè rất đẹp. Xứng đáng 5 sao!",
    createdAt: new Date("2025-02-10")
  });
}

if (dalat && users.length > 2) {
  reviews.push({
    tour: dalat._id,
    user: users[2]._id,
    rating: 4,
    comment: "Chuyến đi tuyệt vời, chỉ có điều thời tiết hơi lạnh. Nhưng không ảnh hưởng gì, vẫn rất vui!",
    createdAt: new Date("2025-03-05")
  });
}

// === HẠ LONG REVIEWS ===
if (halong && users[0]) {
  reviews.push({
    tour: halong._id,
    user: users[0]._id,
    rating: 5,
    comment: "Vịnh Hạ Long đẹp như tranh vẽ! Du thuyền sang trọng, hải sản tươi ngon. Đội ngũ phục vụ tận tâm. Highly recommended!",
    createdAt: new Date("2025-01-20")
  });
}

if (halong && users[1]) {
  reviews.push({
    tour: halong._id,
    user: users[1]._id,
    rating: 4,
    comment: "Cảnh đẹp không có gì để chê. Hang Sửng Sốt thật sự choáng ngợp. Trừ điểm vì thời tiết có mây.",
    createdAt: new Date("2025-02-15")
  });
}

if (halong && users.length > 2) {
  reviews.push({
    tour: halong._id,
    user: users[2]._id,
    rating: 5,
    comment: "Lần đầu đi Hạ Long, quá ấn tượng! Tắm biển, chèo kayak, ăn hải sản... Tất cả đều tuyệt vời!",
    createdAt: new Date("2025-03-10")
  });
}

// === PHÚ QUỐC REVIEWS ===
if (phuquoc && users[0]) {
  reviews.push({
    tour: phuquoc._id,
    user: users[0]._id,
    rating: 5,
    comment: "Phú Quốc là thiên đường biển đảo! Bãi Sao đẹp ngất ngây, nước biển trong xanh. Resort 5 sao, dịch vụ hoàn hảo!",
    createdAt: new Date("2025-01-25")
  });
}

if (phuquoc && users[1]) {
  reviews.push({
    tour: phuquoc._id,
    user: users[1]._id,
    rating: 5,
    comment: "Trải nghiệm tuyệt vời! Lặn ngắm san hô đẹp lắm. Hải sản tươi sống giá rẻ. 4 ngày 3 đêm vẫn thấy ngắn!",
    createdAt: new Date("2025-02-20")
  });
}

// === SAPA REVIEWS ===
if (sapa && users[0]) {
  reviews.push({
    tour: sapa._id,
    user: users[0]._id,
    rating: 5,
    comment: "Sapa mùa lúa chín đẹp không thể tả! Ruộng bậc thang tuyệt đẹp, chinh phục Fansipan thành công. Đội ngũ hướng dẫn rất pro!",
    createdAt: new Date("2025-02-01")
  });
}

if (sapa && users[1]) {
  reviews.push({
    tour: sapa._id,
    user: users[1]._id,
    rating: 4,
    comment: "Tour trekking rất thú vị. Gặp được nhiều người dân tộc, văn hóa độc đáo. Hơi mệt nhưng rất đáng!",
    createdAt: new Date("2025-03-01")
  });
}

if (sapa && users.length > 2) {
  reviews.push({
    tour: sapa._id,
    user: users[2]._id,
    rating: 5,
    comment: "Cảnh đẹp xuất sắc! Chợ tình Sapa rất đặc sắc. Homestay ấm cúng, chủ nhà thân thiện. Sẽ quay lại!",
    createdAt: new Date("2025-03-15")
  });
}

// === NHA TRANG REVIEWS ===
if (nhatrang && users[0]) {
  reviews.push({
    tour: nhatrang._id,
    user: users[0]._id,
    rating: 5,
    comment: "Nha Trang vui lắm! Vinpearl Land sướng không tưởng. Tắm biển, lặn ngắm san hô đều tuyệt. Giá cả hợp lý!",
    createdAt: new Date("2025-02-05")
  });
}

if (nhatrang && users[1]) {
  reviews.push({
    tour: nhatrang._id,
    user: users[1]._id,
    rating: 4,
    comment: "Bãi biển đẹp, nước trong. Đảo Hòn Mun rất đẹp. Trừ điểm vì đông khách một chút.",
    createdAt: new Date("2025-03-05")
  });
}

if (nhatrang && users.length > 2) {
  reviews.push({
    tour: nhatrang._id,
    user: users[2]._id,
    rating: 5,
    comment: "Chuyến đi gia đình rất vui! Trẻ em thích Vinpearl lắm. Khách sạn view biển đẹp. Nhất định sẽ quay lại!",
    createdAt: new Date("2025-03-20")
  });
}

// === HỘI AN REVIEWS ===
if (hoian && users[0]) {
  reviews.push({
    tour: hoian._id,
    user: users[0]._id,
    rating: 5,
    comment: "Hội An phố cổ rất đẹp! Ban đêm thả đèn hoa đăng lãng mạn lắm. Món ăn đặc sản cao lầu, bánh mì ngon tuyệt!",
    createdAt: new Date("2025-02-08")
  });
}

if (hoian && users[1]) {
  reviews.push({
    tour: hoian._id,
    user: users[1]._id,
    rating: 5,
    comment: "Kiến trúc cổ kính, văn hóa đặc sắc. Chùa Cầu, hội quán đều đẹp. Tour guide giải thích rất hay!",
    createdAt: new Date("2025-03-08")
  });
}

if (hoian && users.length > 2) {
  reviews.push({
    tour: hoian._id,
    user: users[2]._id,
    rating: 4,
    comment: "Phố cổ đẹp, nhưng hơi đông khách. Đồ ăn ngon, giá hợp lý. Chụp hình rất đẹp!",
    createdAt: new Date("2025-03-18")
  });
}

// Insert reviews
print("\n📝 Đang insert " + reviews.length + " reviews...");

if (reviews.length === 0) {
  print("❌ Không có reviews để insert!");
} else {
  try {
    const result = db.reviews.insertMany(reviews);
    print("✅ ĐÃ INSERT THÀNH CÔNG " + result.insertedIds.length + " reviews!");
    
    // Hiển thị thống kê
    print("\n📊 THỐNG KÊ:");
    print("   - Đà Lạt: " + reviews.filter(r => dalat && r.tour.equals(dalat._id)).length + " reviews");
    print("   - Hạ Long: " + reviews.filter(r => halong && r.tour.equals(halong._id)).length + " reviews");
    print("   - Phú Quốc: " + reviews.filter(r => phuquoc && r.tour.equals(phuquoc._id)).length + " reviews");
    print("   - Sapa: " + reviews.filter(r => sapa && r.tour.equals(sapa._id)).length + " reviews");
    print("   - Nha Trang: " + reviews.filter(r => nhatrang && r.tour.equals(nhatrang._id)).length + " reviews");
    print("   - Hội An: " + reviews.filter(r => hoian && r.tour.equals(hoian._id)).length + " reviews");
    
    print("\n⭐ RATING DISTRIBUTION:");
    print("   - 5 sao: " + reviews.filter(r => r.rating === 5).length);
    print("   - 4 sao: " + reviews.filter(r => r.rating === 4).length);
    
    print("\n✅ HOÀN THÀNH! Kiểm tra collection 'reviews' trong Compass.");
    
  } catch (error) {
    print("❌ LỖI: " + error.message);
    if (error.message.includes("duplicate")) {
      print("💡 Gợi ý: Có thể user này đã review tour rồi. Mỗi user chỉ review 1 lần cho 1 tour.");
    }
  }
}

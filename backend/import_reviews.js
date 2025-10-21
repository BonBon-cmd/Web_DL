const mongoose = require('mongoose');
const Review = require('./models/Review');
const Tour = require('./models/Tour');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/travel_booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const sampleReviews = [
  // Reviews cho các tours khác nhau
  {
    rating: 5,
    comment: 'Tour tuyệt vời! Hướng dẫn viên nhiệt tình, khách sạn sạch sẽ. Cảnh đẹp lung linh, đồ ăn ngon. Sẽ quay lại chắc chắn!',
    language: 'vi'
  },
  {
    rating: 5,
    comment: 'Amazing experience! The tour guide was knowledgeable and friendly. Beautiful scenery and great food. Highly recommended!',
    language: 'en'
  },
  {
    rating: 4,
    comment: 'Chuyến đi rất đáng giá! Lịch trình hợp lý, các điểm tham quan đều đẹp. Chỉ có thời gian hơi gấp một chút.',
    language: 'vi'
  },
  {
    rating: 4,
    comment: 'Great tour overall. Well organized and professional service. Only minor issue was the tight schedule.',
    language: 'en'
  },
  {
    rating: 5,
    comment: 'Trải nghiệm tuyệt vời nhất từng có! Mọi thứ đều hoàn hảo từ khách sạn, đồ ăn đến lịch trình. Cảm ơn team!',
    language: 'vi'
  },
  {
    rating: 3,
    comment: 'Tour ổn, giá cả hợp lý. Tuy nhiên dịch vụ còn cần cải thiện một số điểm nhỏ.',
    language: 'vi'
  },
  {
    rating: 5,
    comment: 'Perfect vacation! Everything exceeded my expectations. The guide was excellent and the places we visited were breathtaking.',
    language: 'en'
  },
  {
    rating: 4,
    comment: 'Chuyến đi đáng nhớ với gia đình. Con trẻ rất thích các hoạt động. Hy vọng có thêm nhiều điểm vui chơi cho trẻ em.',
    language: 'vi'
  },
  {
    rating: 5,
    comment: 'Absolutely wonderful! Best money I have spent on a vacation. The tour was well-paced and very enjoyable.',
    language: 'en'
  },
  {
    rating: 4,
    comment: 'Tour rất tốt, phong cảnh đẹp. Thức ăn ngon miệng. Tuy nhiên xe di chuyển hơi lâu.',
    language: 'vi'
  },
  {
    rating: 5,
    comment: 'Fantastic tour! Great value for money. The accommodation was comfortable and the food was delicious.',
    language: 'en'
  },
  {
    rating: 5,
    comment: 'Một trải nghiệm không thể quên! Mọi người rất thân thiện, nhiệt tình. Sẽ giới thiệu cho bạn bè.',
    language: 'vi'
  },
  {
    rating: 4,
    comment: 'Good tour with professional service. The itinerary was well-planned. Would recommend to friends.',
    language: 'en'
  },
  {
    rating: 5,
    comment: 'Tuyệt vời từ A đến Z! Không có gì để chê. Cảm ơn đã mang đến kỳ nghỉ tuyệt vời cho gia đình tôi.',
    language: 'vi'
  },
  {
    rating: 3,
    comment: 'Average tour. Nothing special but nothing bad either. Price is fair.',
    language: 'en'
  },
  {
    rating: 5,
    comment: 'Excellent tour! The guide was amazing and very informative. Loved every moment of it!',
    language: 'en'
  },
  {
    rating: 4,
    comment: 'Chuyến đi vui vẻ, nhóm bạn đi cùng rất hòa đồng. Khách sạn tốt, phục vụ chu đáo.',
    language: 'vi'
  },
  {
    rating: 5,
    comment: 'Best tour ever! Everything was perfect. Will definitely book again for my next vacation.',
    language: 'en'
  },
  {
    rating: 4,
    comment: 'Tour tốt, giá hợp lý. Các điểm tham quan đều đẹp và thú vị. Đáng để trải nghiệm một lần.',
    language: 'vi'
  },
  {
    rating: 5,
    comment: 'Wonderful experience from start to finish. Highly professional and well organized. Thank you!',
    language: 'en'
  }
];

// Thêm nhiều comments đa dạng hơn
const additionalComments = {
  vi: [
    'Cảnh đẹp tuyệt vời, đồ ăn ngon! Nhưng thời tiết hơi nóng.',
    'Chuyến đi rất thú vị, học hỏi được nhiều điều về văn hóa địa phương.',
    'Hướng dẫn viên rất am hiểu, giải thích chi tiết. Rất hài lòng!',
    'Khách sạn sang trọng, view đẹp. Tuy nhiên giá hơi cao so với dịch vụ.',
    'Tour phù hợp cho gia đình, nhiều hoạt động vui chơi. Con nhỏ rất thích!',
    'Lịch trình hợp lý, không quá gấp rút. Có thời gian tận hưởng từng địa điểm.',
    'Phương tiện di chuyển thoải mái, sạch sẽ. Lái xe rất chuyên nghiệp.',
    'Đồ ăn đa dạng, ngon miệng. Phục vụ chu đáo, nhiệt tình.',
    'Trải nghiệm tuyệt vời! Sẽ giới thiệu cho bạn bè và người thân.',
    'Giá cả phải chăng, chất lượng tốt. Đáng đồng tiền bát gạo!'
  ],
  en: [
    'Beautiful scenery and delicious food! Weather was a bit hot though.',
    'Very interesting trip, learned a lot about local culture.',
    'Tour guide was very knowledgeable and explained everything in detail. Very satisfied!',
    'Luxurious hotel with beautiful view. However, price is a bit high for the service.',
    'Perfect for families, lots of fun activities. Kids loved it!',
    'Well-paced itinerary, not too rushed. Had time to enjoy each location.',
    'Comfortable and clean transportation. Driver was very professional.',
    'Diverse and delicious food. Service was attentive and friendly.',
    'Wonderful experience! Will recommend to friends and family.',
    'Great value for money, good quality. Worth every penny!'
  ]
};

const importReviews = async () => {
  try {
    // Xóa tất cả reviews cũ
    await Review.deleteMany({});
    console.log('Đã xóa reviews cũ');

    // Lấy tất cả tours và users
    const tours = await Tour.find();
    const users = await User.find({ role: 'user' });

    if (tours.length === 0) {
      console.log('Không có tours trong database');
      return;
    }

    if (users.length === 0) {
      console.log('Không có users trong database');
      return;
    }

    console.log(`Tìm thấy ${tours.length} tours và ${users.length} users`);

    let reviewCount = 0;

    // Tạo reviews cho mỗi tour
    for (const tour of tours) {
      // Random số lượng reviews cho mỗi tour (3-8 reviews)
      const numReviews = Math.min(Math.floor(Math.random() * 6) + 3, users.length);
      
      console.log(`Tạo ${numReviews} reviews cho tour: ${tour.title}`);

      // Shuffle users để tránh duplicate
      const shuffledUsers = [...users].sort(() => Math.random() - 0.5);

      for (let i = 0; i < numReviews; i++) {
        // Lấy user theo thứ tự từ shuffled array để tránh duplicate
        const user = shuffledUsers[i];
        
        // Random rating (70% chance là 4-5 sao, 30% là 3 sao)
        let rating;
        const rand = Math.random();
        if (rand < 0.4) {
          rating = 5;
        } else if (rand < 0.7) {
          rating = 4;
        } else {
          rating = 3;
        }

        // Random comment
        let comment;
        const useAdditionalComments = Math.random() > 0.5;
        if (useAdditionalComments) {
          const lang = Math.random() > 0.5 ? 'vi' : 'en';
          comment = additionalComments[lang][Math.floor(Math.random() * additionalComments[lang].length)];
        } else {
          const sampleReview = sampleReviews[Math.floor(Math.random() * sampleReviews.length)];
          comment = sampleReview.comment;
        }

        // Tạo review
        try {
          const review = await Review.create({
            tour: tour._id,
            user: user._id,
            rating: rating,
            comment: comment,
            createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000) // Random date trong 90 ngày qua
          });

          reviewCount++;
        } catch (error) {
          if (error.code === 11000) {
            console.log(`⚠️ Bỏ qua duplicate review: ${user.name} cho tour ${tour.title}`);
          } else {
            throw error;
          }
        }
      }
    }

    console.log(`✅ Đã tạo thành công ${reviewCount} reviews!`);
    
    // Cập nhật lại ratingsAverage và ratingsQuantity cho các tours
    console.log('Đang cập nhật ratings cho tours...');
    
    for (const tour of tours) {
      const reviews = await Review.find({ tour: tour._id });
      
      if (reviews.length > 0) {
        const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        
        await Tour.findByIdAndUpdate(tour._id, {
          ratingsAverage: Math.round(avgRating * 10) / 10, // Round to 1 decimal
          ratingsQuantity: reviews.length
        });
        
        console.log(`✅ Tour "${tour.title}": ${reviews.length} reviews, avg rating: ${avgRating.toFixed(1)}`);
      }
    }

    console.log('\n🎉 Import reviews hoàn tất!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi import reviews:', error);
    process.exit(1);
  }
};

importReviews();

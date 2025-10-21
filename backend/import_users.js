const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/travel_booking');

const sampleUsers = [
  {
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@example.com',
    password: '123456',
    phone: '0901234567',
    role: 'user'
  },
  {
    name: 'Trần Thị Bình',
    email: 'tranthibinh@example.com',
    password: '123456',
    phone: '0902345678',
    role: 'user'
  },
  {
    name: 'Lê Hoàng Cường',
    email: 'lehoangcuong@example.com',
    password: '123456',
    phone: '0903456789',
    role: 'user'
  },
  {
    name: 'Phạm Thu Dung',
    email: 'phamthudung@example.com',
    password: '123456',
    phone: '0904567890',
    role: 'user'
  },
  {
    name: 'Hoàng Minh Em',
    email: 'hoangminhem@example.com',
    password: '123456',
    phone: '0905678901',
    role: 'user'
  },
  {
    name: 'Đặng Thanh Giang',
    email: 'dangthanhgiang@example.com',
    password: '123456',
    phone: '0906789012',
    role: 'user'
  },
  {
    name: 'Võ Quỳnh Hoa',
    email: 'voquynhhoa@example.com',
    password: '123456',
    phone: '0907890123',
    role: 'user'
  },
  {
    name: 'Bùi Đức Khang',
    email: 'buiduckhang@example.com',
    password: '123456',
    phone: '0908901234',
    role: 'user'
  },
  {
    name: 'Mai Phương Linh',
    email: 'maiphuonglinh@example.com',
    password: '123456',
    phone: '0909012345',
    role: 'user'
  },
  {
    name: 'Đinh Hải Nam',
    email: 'dinhhainam@example.com',
    password: '123456',
    phone: '0909123456',
    role: 'user'
  }
];

const importUsers = async () => {
  try {
    console.log('Bắt đầu tạo users mẫu...');

    for (const userData of sampleUsers) {
      // Kiểm tra user đã tồn tại chưa
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        console.log(`⚠️ User ${userData.email} đã tồn tại, bỏ qua`);
        continue;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Tạo user
      await User.create({
        ...userData,
        password: hashedPassword
      });

      console.log(`✅ Đã tạo user: ${userData.name} (${userData.email})`);
    }

    const totalUsers = await User.countDocuments({ role: 'user' });
    console.log(`\n🎉 Hoàn tất! Tổng số users: ${totalUsers}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi tạo users:', error);
    process.exit(1);
  }
};

importUsers();

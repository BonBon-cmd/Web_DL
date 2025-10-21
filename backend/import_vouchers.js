const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Voucher = require('./models/Voucher');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

const sampleVouchers = [
  {
    code: 'SUMMER2024',
    description: 'Giảm giá mùa hè 2024 - áp dụng cho tất cả các tour',
    discountType: 'percentage',
    discountValue: 20,
    minPurchase: 1000000,
    maxDiscount: 500000,
    usageLimit: 100,
    validFrom: new Date('2024-06-01'),
    validTo: new Date('2024-08-31'),
    isActive: true
  },
  {
    code: 'WELCOME10',
    description: 'Chào mừng khách hàng mới - Giảm 10%',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 500000,
    maxDiscount: 200000,
    usageLimit: 500,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'NEWYEAR2025',
    description: 'Khuyến mãi năm mới 2025 - Giảm 300,000 VND',
    discountType: 'fixed',
    discountValue: 300000,
    minPurchase: 2000000,
    maxDiscount: null,
    usageLimit: 50,
    validFrom: new Date('2025-01-01'),
    validTo: new Date('2025-01-31'),
    isActive: true
  },
  {
    code: 'FLASH50',
    description: 'Flash Sale - Giảm ngay 50,000 VND',
    discountType: 'fixed',
    discountValue: 50000,
    minPurchase: 0,
    maxDiscount: null,
    usageLimit: 1000,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'VIP30',
    description: 'Ưu đãi khách hàng VIP - Giảm 30%',
    discountType: 'percentage',
    discountValue: 30,
    minPurchase: 5000000,
    maxDiscount: 1500000,
    usageLimit: 20,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'WEEKEND15',
    description: 'Giảm giá cuối tuần - 15% off',
    discountType: 'percentage',
    discountValue: 15,
    minPurchase: 800000,
    maxDiscount: 400000,
    usageLimit: 200,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'FAMILY25',
    description: 'Ưu đãi gia đình - Giảm 25%',
    discountType: 'percentage',
    discountValue: 25,
    minPurchase: 3000000,
    maxDiscount: 1000000,
    usageLimit: 50,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'EARLYBIRD',
    description: 'Đặt sớm giảm ngay 500,000 VND',
    discountType: 'fixed',
    discountValue: 500000,
    minPurchase: 4000000,
    maxDiscount: null,
    usageLimit: 30,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'STUDENT20',
    description: 'Ưu đãi sinh viên - Giảm 20%',
    discountType: 'percentage',
    discountValue: 20,
    minPurchase: 500000,
    maxDiscount: 300000,
    usageLimit: 150,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'MEGA50OFF',
    description: 'Mega Sale - Giảm 50% cho đơn hàng lớn',
    discountType: 'percentage',
    discountValue: 50,
    minPurchase: 10000000,
    maxDiscount: 3000000,
    usageLimit: 10,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-12-31'),
    isActive: true
  },
  {
    code: 'EXPIRED2023',
    description: 'Voucher đã hết hạn - Test',
    discountType: 'percentage',
    discountValue: 15,
    minPurchase: 500000,
    maxDiscount: 200000,
    usageLimit: 100,
    validFrom: new Date('2023-01-01'),
    validTo: new Date('2023-12-31'),
    isActive: false
  }
];

const importVouchers = async () => {
  try {
    // Get admin user to set as createdBy
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.log('⚠️  Warning: No admin user found. Creating vouchers without createdBy field.');
    }

    // Delete existing vouchers
    await Voucher.deleteMany();
    console.log('🗑️  Deleted existing vouchers');

    // Add createdBy field to all vouchers if admin exists
    const vouchersWithCreator = sampleVouchers.map(voucher => ({
      ...voucher,
      createdBy: adminUser ? adminUser._id : undefined
    }));

    // Insert new vouchers
    const createdVouchers = await Voucher.insertMany(vouchersWithCreator);
    console.log(`✅ Successfully imported ${createdVouchers.length} vouchers`);

    // Display voucher details
    console.log('\n📋 Imported Vouchers:');
    console.log('='.repeat(80));
    createdVouchers.forEach((voucher, index) => {
      console.log(`${index + 1}. ${voucher.code}`);
      console.log(`   - ${voucher.description}`);
      console.log(`   - Discount: ${voucher.discountType === 'percentage' ? voucher.discountValue + '%' : voucher.discountValue.toLocaleString() + ' VND'}`);
      console.log(`   - Min Purchase: ${voucher.minPurchase.toLocaleString()} VND`);
      console.log(`   - Usage: ${voucher.usedCount} / ${voucher.usageLimit || '∞'}`);
      console.log(`   - Valid: ${voucher.validFrom.toLocaleDateString()} - ${voucher.validTo.toLocaleDateString()}`);
      console.log(`   - Status: ${voucher.isActive ? '✅ Active' : '❌ Inactive'}`);
      console.log('-'.repeat(80));
    });

    console.log('\n🎉 Import completed successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing vouchers:', error);
    process.exit(1);
  }
};

importVouchers();

# Hướng Dẫn Tính Năng Đa Ngôn Ngữ (Multi-Language Feature)

## Tổng Quan
Website du lịch hiện đã hỗ trợ 2 ngôn ngữ:
- 🇻🇳 **Tiếng Việt** (mặc định)
- 🇬🇧 **Tiếng Anh**

## Cách Sử Dụng

### 1. Chuyển Đổi Ngôn Ngữ
- Nhấn vào nút **🇬🇧 EN** hoặc **🇻🇳 VI** ở góc phải thanh navbar
- Ngôn ngữ sẽ được lưu tự động trong trình duyệt
- Lần truy cập sau sẽ tự động hiển thị ngôn ngữ đã chọn

### 2. Các Thành Phần Đã Hỗ Trợ
✅ **Navbar** - Menu điều hướng, nút đăng nhập/đăng ký
✅ **Trang Chủ (Home)** - Tất cả sections (Hero, Featured Tours, Hot Deals, Why Choose Us, Stats, CTA)
✅ **TourCard** - Thẻ tour (ngày, đánh giá, độ khó, nút đặt tour)

### 3. Lưu Trữ Ngôn Ngữ
- Sử dụng **localStorage** để lưu lựa chọn ngôn ngữ
- Key: `language`
- Value: `vi` hoặc `en`

## Kiến Trúc Kỹ Thuật

### 1. LanguageContext (`frontend/src/context/LanguageContext.jsx`)
```javascript
// Quản lý state ngôn ngữ toàn cục
const { language, setLanguage, toggleLanguage } = useContext(LanguageContext);

// language: 'vi' | 'en'
// setLanguage(lang): Đặt ngôn ngữ cụ thể
// toggleLanguage(): Chuyển đổi giữa vi và en
```

### 2. Translations File (`frontend/src/translations.js`)
```javascript
export const translations = {
  vi: {
    navbar: { ... },
    home: { ... },
    tour: { ... },
    common: { ... }
  },
  en: {
    navbar: { ... },
    home: { ... },
    tour: { ... },
    common: { ... }
  }
};
```

### 3. Cấu Trúc Translations

#### Navbar
- `brand`: Tên thương hiệu
- `home`, `tours`, `about`, `contact`: Menu items
- `login`, `register`, `profile`, `bookings`, `admin`, `logout`: Nút hành động

#### Home
- `heroTitle`, `heroSubtitle`, `exploreTours`: Hero section
- `specialOffer`, `seeNow`: Banner ưu đãi
- `featuredToursTitle`, `featuredToursSubtitle`: Tours nổi bật
- `hotDealsTitle`, `hotDealsSubtitle`, `hotDeal`: Hot deals
- `whyChooseUs`, `qualityTitle`, `priceTitle`, `experienceTitle`: Lý do chọn
- `statsToursOrganized`, `statsHappyCustomers`, `statsDestinations`: Thống kê
- `ctaTitle`, `ctaSubtitle`, `ctaButton`: Call to action
- `welcomeBack`, `welcomeSubtitle`, `viewAllToursBtn`, `myToursBtn`: Logged in CTA

#### Tour
- `days`: "ngày" / "days"
- `reviews`: "đánh giá" / "reviews"
- `bookTour`: "Đặt tour" / "Book Tour"
- `difficulty`: 
  - `easy`: "Dễ" / "Easy"
  - `medium`: "Trung bình" / "Medium"
  - `difficult`: "Khó" / "Difficult"

#### Common
- `loading`: "Đang tải..." / "Loading..."
- `error`: "Đã xảy ra lỗi" / "An error occurred"
- `success`: "Thành công" / "Success"

## Hướng Dẫn Thêm Dịch Cho Component Mới

### Bước 1: Import Context và Translations
```javascript
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../translations';
```

### Bước 2: Sử dụng trong Component
```javascript
function MyComponent() {
  const { language } = useContext(LanguageContext);
  const t = translations[language].sectionName; // navbar, home, tour, common
  
  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
    </div>
  );
}
```

### Bước 3: Thêm Translations vào `translations.js`
```javascript
export const translations = {
  vi: {
    sectionName: {
      title: 'Tiêu đề',
      description: 'Mô tả'
    }
  },
  en: {
    sectionName: {
      title: 'Title',
      description: 'Description'
    }
  }
};
```

## Component Language Switcher

### Nút Chuyển Đổi Ngôn Ngữ
```jsx
<button onClick={toggleLanguage} className="language-btn">
  {language === 'vi' ? '🇬🇧 EN' : '🇻🇳 VI'}
</button>
```

### CSS Styles (trong `index.css`)
```css
.language-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.language-btn:hover {
  background: white;
  color: #6f42c1;
  transform: translateY(-2px);
}
```

## Xử Lý Dynamic Content

### Thay Thế Biến trong Chuỗi
```javascript
// Translation: "Chào mừng trở lại, {name}!"
const welcomeText = t.welcomeBack.replace('{name}', user.name);

// Hoặc
<h2>{t.welcomeBack.replace('{name}', user.name)}</h2>
```

### Pluralization (Số nhiều)
```javascript
// translations.js
vi: {
  tourCount: '{count} tours',
  tourCountSingle: '{count} tour'
}

// Component
const count = tours.length;
const text = count === 1 
  ? t.tourCountSingle.replace('{count}', count)
  : t.tourCount.replace('{count}', count);
```

## Best Practices

### 1. **Tổ Chức Translations**
- Nhóm theo feature/page (navbar, home, tours, etc.)
- Giữ cấu trúc đồng nhất giữa vi và en
- Sử dụng tên key có ý nghĩa (descriptive)

### 2. **Consistency**
- Luôn thêm cả vi và en cùng lúc
- Kiểm tra spelling và grammar
- Giữ tone nhất quán (formal/informal)

### 3. **Performance**
- Translations được load 1 lần khi app khởi động
- Không cần lazy loading cho 2 ngôn ngữ
- Context re-render tối ưu với useMemo nếu cần

### 4. **Testing**
- Test chuyển đổi ngôn ngữ trên mọi page
- Kiểm tra localStorage persistence
- Verify layout không bị vỡ với text dài/ngắn khác nhau

## Roadmap Tương Lai

### Phase 1 (Đã Hoàn Thành)
✅ LanguageContext setup
✅ Navbar translation
✅ Home page translation
✅ TourCard translation

### Phase 2 (Cần Làm)
⬜ Tours page (filters, search, sort)
⬜ TourDetail page (booking modal, reviews)
⬜ Login/Register pages
⬜ Profile page
⬜ MyBookings page
⬜ Admin pages

### Phase 3 (Tùy Chọn)
⬜ Thêm ngôn ngữ thứ 3 (Pháp, Trung, Nhật...)
⬜ Auto-detect browser language
⬜ Dynamic translations từ API
⬜ RTL support (Arabic, Hebrew)

## Troubleshooting

### Lỗi: Translation key not found
```javascript
// Kiểm tra key tồn tại trong translations.js
console.log(translations.vi.home.heroTitle); // Should not be undefined
```

### Lỗi: Language không được lưu
```javascript
// Kiểm tra localStorage
console.log(localStorage.getItem('language')); // Should be 'vi' or 'en'
```

### Lỗi: Component không re-render khi đổi ngôn ngữ
```javascript
// Đảm bảo component sử dụng useContext
const { language } = useContext(LanguageContext);
// Không hard-code language value
```

## Ví Dụ Code Đầy Đủ

```javascript
// MyComponent.jsx
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../translations';

function MyComponent() {
  const { language } = useContext(LanguageContext);
  const t = translations[language].home;

  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
      <button>{t.ctaButton}</button>
    </div>
  );
}

export default MyComponent;
```

## Liên Hệ & Hỗ Trợ
Nếu có vấn đề hoặc câu hỏi về tính năng đa ngôn ngữ, vui lòng liên hệ team phát triển.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: ✅ Production Ready

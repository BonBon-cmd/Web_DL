import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../translations';

const TourCard = ({ tour, onBook }) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language].tour;

  // Handle image URL - support both local uploads and external URLs
  const getImageUrl = (image) => {
    if (!image) return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';
    if (image.startsWith('http')) return image;
    return `http://localhost:5000${image}`;
  };

  // Translate difficulty
  const getDifficultyText = (difficulty) => {
    return t.difficulty[difficulty] || difficulty;
  };

  // Render rating stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} style={{ color: '#ffc107' }}>★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} style={{ color: '#ffc107' }}>⯨</span>);
      } else {
        stars.push(<span key={i} style={{ color: '#e0e0e0' }}>★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="card">
      <img 
        src={getImageUrl(tour.images?.[0])} 
        alt={tour.title}
        className="card-img"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';
        }}
      />
      <div className="card-body">
        <h3 className="card-title">{tour.title}</h3>
        <p className="card-text">
          {tour.description.substring(0, 100)}...
        </p>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tour.price)}
          </span>
          <span style={{ color: '#666' }}>
            ⏱️ {tour.duration} {t.days}
          </span>
          <span className={`badge badge-${tour.difficulty === 'easy' ? 'success' : tour.difficulty === 'medium' ? 'warning' : 'danger'}`}>
            {getDifficultyText(tour.difficulty)}
          </span>
        </div>
        
        {/* Rating Section - Improved */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          marginBottom: '1rem',
          padding: '0.75rem',
          background: 'linear-gradient(135deg, #fff9e6 0%, #fff4d6 100%)',
          borderRadius: '8px',
          border: '1px solid #ffe0a3'
        }}>
          <div style={{ 
            display: 'flex', 
            fontSize: '1.1rem',
            letterSpacing: '2px'
          }}>
            {renderStars(tour.ratingsAverage || 0)}
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            marginLeft: '0.5rem'
          }}>
            <span style={{ 
              fontWeight: 'bold', 
              color: '#f57c00',
              fontSize: '1.1rem'
            }}>
              {(tour.ratingsAverage || 0).toFixed(1)}
            </span>
            <span style={{ 
              fontSize: '0.75rem', 
              color: '#666'
            }}>
              ({tour.ratingsQuantity || 0} {t.reviews})
            </span>
          </div>
        </div>
        
        <div style={{ marginBottom: '1rem', color: '#666' }}>
          📍 {tour.location?.city}, {tour.location?.country}
        </div>
        {onBook && (
          <button onClick={() => onBook(tour)} className="btn btn-primary" style={{ width: '100%' }}>
            {t.bookTour}
          </button>
        )}
      </div>
    </div>
  );
};

export default TourCard;

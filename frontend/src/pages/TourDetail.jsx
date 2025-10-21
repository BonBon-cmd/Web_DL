import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTour, getReviews, createBooking, createReview, validateVoucher } from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../translations';

const TourDetail = () => {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);
  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    bookingDate: '',
    numberOfGuests: 1,
    specialRequests: ''
  });
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherApplied, setVoucherApplied] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [applyingVoucher, setApplyingVoucher] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: ''
  });
  
  const t = translations[language].tourDetail;
  const tTour = translations[language].tour;
  const tCommon = translations[language].common;

  // Handle image URL - support both local uploads and external URLs
  const getImageUrl = (image) => {
    if (!image) return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';
    if (image.startsWith('http')) return image;
    return `http://localhost:5000${image}`;
  };

  // Render rating stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} style={{ color: '#ffc107', fontSize: '1.2rem' }}>★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} style={{ color: '#ffc107', fontSize: '1.2rem' }}>⯨</span>);
      } else {
        stars.push(<span key={i} style={{ color: '#e0e0e0', fontSize: '1.2rem' }}>★</span>);
      }
    }
    return stars;
  };

  useEffect(() => {
    fetchTourDetails();
    fetchReviews();
  }, [id]);

  const fetchTourDetails = async () => {
    try {
      const response = await getTour(id);
      setTour(response.data.data);
    } catch (error) {
      toast.error(language === 'vi' ? 'Không thể tải thông tin tour' : 'Cannot load tour information');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await getReviews({ tour: id });
      setReviews(response.data.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      toast.error(language === 'vi' ? 'Vui lòng nhập mã voucher' : 'Please enter voucher code');
      return;
    }

    setApplyingVoucher(true);
    try {
      const totalPrice = tour.price * bookingData.numberOfGuests;
      const response = await validateVoucher({
        code: voucherCode,
        tourId: id,
        totalPrice
      });

      const { valid, discount, finalPrice } = response.data;
      
      if (valid) {
        setVoucherApplied(voucherCode);
        setDiscountAmount(discount);
        toast.success(language === 'vi' 
          ? `Áp dụng voucher thành công! Giảm ${discount.toLocaleString()} VND` 
          : `Voucher applied! Discount ${discount.toLocaleString()} VND`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || (language === 'vi' ? 'Mã voucher không hợp lệ' : 'Invalid voucher code'));
      setVoucherApplied(null);
      setDiscountAmount(0);
    } finally {
      setApplyingVoucher(false);
    }
  };

  const handleRemoveVoucher = () => {
    setVoucherCode('');
    setVoucherApplied(null);
    setDiscountAmount(0);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const bookingPayload = {
        ...bookingData,
        tour: id,
        totalPrice: tour.price * bookingData.numberOfGuests
      };

      if (voucherApplied) {
        bookingPayload.voucherCode = voucherApplied;
      }

      await createBooking(bookingPayload);
      toast.success(t.bookingSuccess);
      setShowBookingModal(false);
      setBookingData({ bookingDate: '', numberOfGuests: 1, specialRequests: '' });
      setVoucherCode('');
      setVoucherApplied(null);
      setDiscountAmount(0);
    } catch (error) {
      toast.error(error.response?.data?.message || t.bookingError);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      await createReview({ ...reviewData, tour: id });
      toast.success(t.reviewSuccess);
      setShowReviewModal(false);
      setReviewData({ rating: 5, comment: '' });
      fetchReviews();
      fetchTourDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || t.reviewError);
    }
  };

  if (loading) {
    return <div className="loading">{tCommon.loading}</div>;
  }

  if (!tour) {
    return <div className="container" style={{ padding: '2rem' }}>{language === 'vi' ? 'Tour không tồn tại' : 'Tour not found'}</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0', marginTop: '80px' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', 
        gap: '2.5rem',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr'
        }
      }}>
        <div>
          {/* Image Gallery */}
          <div style={{ 
            borderRadius: '20px', 
            overflow: 'hidden', 
            marginBottom: '2.5rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
          }}>
            <img 
              src={getImageUrl(tour.images?.[0])}
              alt={tour.title}
              style={{ 
                width: '100%', 
                height: '450px',
                objectFit: 'cover',
                display: 'block'
              }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';
              }}
            />
          </div>
          
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            marginBottom: '1.5rem',
            color: '#333',
            lineHeight: '1.3'
          }}>{tour.title}</h1>
          
          {/* Info Cards Row */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            margin: '1.5rem 0', 
            flexWrap: 'wrap' 
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              background: tour.difficulty === 'easy' 
                ? 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)'
                : tour.difficulty === 'medium'
                ? 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)'
                : 'linear-gradient(135deg, #fab1a0 0%, #ff7675 100%)',
              borderRadius: '25px',
              fontWeight: '700',
              fontSize: '0.95rem',
              color: '#333',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <span>📊</span>
              <span>{tTour.difficulty[tour.difficulty]}</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              background: 'linear-gradient(135deg, #fff9e6 0%, #fff4d6 100%)',
              borderRadius: '25px',
              border: '2px solid #ffe0a3',
              boxShadow: '0 4px 15px rgba(255, 193, 7, 0.2)'
            }}>
              <div style={{ display: 'flex', letterSpacing: '1px' }}>
                {renderStars(tour.ratingsAverage || 0)}
              </div>
              <span style={{ fontWeight: 'bold', color: '#f57c00', marginLeft: '0.25rem' }}>
                {(tour.ratingsAverage || 0).toFixed(1)}
              </span>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>
                ({tour.ratingsQuantity || 0})
              </span>
            </div>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              borderRadius: '25px',
              fontWeight: '600',
              color: '#1976d2',
              boxShadow: '0 4px 15px rgba(33, 150, 243, 0.2)'
            }}>
              <span>⏱️</span>
              <span>{tour.duration} {tTour.days}</span>
            </div>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
              borderRadius: '25px',
              fontWeight: '600',
              color: '#7b1fa2',
              boxShadow: '0 4px 15px rgba(156, 39, 176, 0.2)'
            }}>
              <span>👥</span>
              <span>{language === 'vi' ? `Tối đa ${tour.maxGroupSize}` : `Max ${tour.maxGroupSize}`}</span>
            </div>
          </div>

          {/* Location Card */}
          <div style={{ 
            margin: '2.5rem 0',
            padding: '1.8rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderRadius: '15px',
            border: '1px solid #e0e0e0',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              marginBottom: '1rem',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>📍</span>
              <span>{t.location}</span>
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#555', margin: '0.5rem 0' }}>
              <strong>{tour.location?.city}, {tour.location?.country}</strong>
            </p>
            {tour.location?.address && (
              <p style={{ color: '#666', marginTop: '0.5rem' }}>{tour.location.address}</p>
            )}
          </div>

          {/* Description Card */}
          <div style={{ 
            margin: '2.5rem 0',
            padding: '1.8rem',
            background: 'white',
            borderRadius: '15px',
            border: '1px solid #e0e0e0',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              marginBottom: '1.2rem',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>📝</span>
              <span>{t.description}</span>
            </h3>
            <p style={{ lineHeight: '1.9', color: '#555', fontSize: '1.05rem' }}>
              {tour.description}
            </p>
          </div>

          {/* Reviews Section */}
          <div style={{ margin: '2.5rem 0' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
                ⭐ {t.reviews} ({reviews.length})
              </h3>
              <button 
                onClick={() => setShowReviewModal(true)} 
                className="btn btn-primary"
                style={{
                  padding: '0.7rem 1.5rem',
                  borderRadius: '25px',
                  fontWeight: '600'
                }}
              >
                ✍️ {t.writeReview}
              </button>
            </div>
            
            {reviews.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem 1rem',
                background: '#f8f9fa',
                borderRadius: '10px',
                border: '2px dashed #dee2e6'
              }}>
                <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</p>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>{t.noReviews}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reviews.map(review => (
                  <div key={review._id} style={{ 
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    padding: '1.5rem', 
                    borderRadius: '10px', 
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                          width: '45px',
                          height: '45px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1.2rem'
                        }}>
                          {review.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong style={{ fontSize: '1.1rem', color: '#333' }}>{review.user?.name}</strong>
                          <div style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.25rem' }}>
                            {new Date(review.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'linear-gradient(135deg, #fff9e6 0%, #fff4d6 100%)',
                        borderRadius: '20px',
                        border: '1px solid #ffe0a3'
                      }}>
                        <div style={{ display: 'flex', letterSpacing: '1px' }}>
                          {renderStars(review.rating)}
                        </div>
                        <span style={{ fontWeight: 'bold', color: '#f57c00' }}>
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    <p style={{ 
                      margin: 0, 
                      color: '#555', 
                      lineHeight: '1.6',
                      fontSize: '1rem',
                      fontStyle: review.comment ? 'normal' : 'italic'
                    }}>
                      {review.comment || (language === 'vi' ? 'Không có nhận xét' : 'No comment')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div style={{ 
            position: 'sticky', 
            top: '100px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ 
              textAlign: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1.5rem',
              borderBottom: '2px solid #f0f0f0'
            }}>
              <div style={{ 
                fontSize: '2.2rem', 
                fontWeight: '800',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tour.price)}
              </div>
              <p style={{ 
                color: '#888', 
                fontSize: '0.95rem',
                margin: 0,
                fontWeight: '500'
              }}>
                {t.perPerson}
              </p>
            </div>

            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              marginBottom: '1.5rem',
              padding: '1.2rem',
              background: '#f8f9fa',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#666', fontSize: '0.95rem' }}>⏱️ {t.duration}</span>
                <span style={{ fontWeight: '600', color: '#333' }}>{tour.duration} {t.days}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#666', fontSize: '0.95rem' }}>👥 {t.maxGuests}</span>
                <span style={{ fontWeight: '600', color: '#333' }}>{tour.maxGroupSize} {language === 'vi' ? 'người' : 'people'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#666', fontSize: '0.95rem' }}>⭐ {t.rating}</span>
                <span style={{ fontWeight: '600', color: '#f57c00' }}>
                  {tour.rating ? `${tour.rating}/5` : (language === 'vi' ? 'Chưa có' : 'N/A')}
                </span>
              </div>
            </div>
              
            <button 
              onClick={() => setShowBookingModal(true)}
              style={{ 
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: 'white',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 87, 108, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 87, 108, 0.3)';
              }}
            >
              🎫 {t.bookNow}
            </button>

            <p style={{ 
              textAlign: 'center',
              marginTop: '1rem',
              marginBottom: 0,
              fontSize: '0.85rem',
              color: '#999'
            }}>
              {language === 'vi' ? '✅ Huỷ miễn phí trong 24h' : '✅ Free cancellation within 24h'}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t.bookingTitle}</h2>
              <button className="modal-close" onClick={() => setShowBookingModal(false)}>×</button>
            </div>
            <form onSubmit={handleBooking}>
              <div className="form-group">
                <label>{language === 'vi' ? 'Ngày khởi hành' : 'Departure Date'}</label>
                <input
                  type="date"
                  className="form-control"
                  value={bookingData.bookingDate}
                  onChange={(e) => setBookingData({...bookingData, bookingDate: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t.numberOfPeople}</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max={tour.maxGroupSize}
                  value={bookingData.numberOfGuests}
                  onChange={(e) => setBookingData({...bookingData, numberOfGuests: parseInt(e.target.value)})}
                  required
                />
              </div>
              <div className="form-group">
                <label>{language === 'vi' ? 'Yêu cầu đặc biệt' : 'Special Requests'}</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                />
              </div>
              
              {/* Voucher Section */}
              <div className="form-group" style={{ 
                padding: '1rem', 
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                borderRadius: '10px',
                border: '2px dashed #dee2e6'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span>🎟️</span>
                  <span>{t.voucherCode}</span>
                </label>
                {!voucherApplied ? (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t.voucherPlaceholder}
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={handleApplyVoucher}
                      disabled={applyingVoucher}
                      style={{
                        padding: '0.5rem 1.5rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: applyingVoucher ? 'not-allowed' : 'pointer',
                        opacity: applyingVoucher ? 0.6 : 1
                      }}
                    >
                      {applyingVoucher ? '...' : t.applyVoucher}
                    </button>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
                    borderRadius: '8px',
                    border: '1px solid #28a745'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>✅</span>
                      <span style={{ fontWeight: '600', color: '#155724' }}>{voucherApplied}</span>
                      <span style={{ fontSize: '0.9rem', color: '#155724' }}>
                        ({language === 'vi' ? 'Giảm' : 'Discount'} {discountAmount.toLocaleString()} VND)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveVoucher}
                      style={{
                        padding: '0.25rem 0.75rem',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      ✕ {t.remove}
                    </button>
                  </div>
                )}
              </div>

              {/* Price Summary */}
              <div style={{ 
                marginBottom: '1rem',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>{t.originalPrice}:</span>
                  <strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tour.price * bookingData.numberOfGuests)}</strong>
                </div>
                {voucherApplied && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#28a745' }}>
                    <span>{t.discount}:</span>
                    <strong>- {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discountAmount)}</strong>
                  </div>
                )}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  paddingTop: '0.5rem', 
                  borderTop: '2px solid #dee2e6',
                  fontSize: '1.1rem'
                }}>
                  <span><strong>{t.totalPrice}:</strong></span>
                  <strong style={{ color: '#667eea' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      tour.price * bookingData.numberOfGuests - discountAmount
                    )}
                  </strong>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                {t.confirmBooking}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t.writeReview}</h2>
              <button className="modal-close" onClick={() => setShowReviewModal(false)}>×</button>
            </div>
            <form onSubmit={handleReview}>
              <div className="form-group">
                <label>{t.yourRating}</label>
                <select
                  className="form-control"
                  value={reviewData.rating}
                  onChange={(e) => setReviewData({...reviewData, rating: parseInt(e.target.value)})}
                >
                  <option value="5">⭐⭐⭐⭐⭐ {language === 'vi' ? 'Tuyệt vời' : 'Excellent'}</option>
                  <option value="4">⭐⭐⭐⭐ {language === 'vi' ? 'Tốt' : 'Good'}</option>
                  <option value="3">⭐⭐⭐ {language === 'vi' ? 'Trung bình' : 'Average'}</option>
                  <option value="2">⭐⭐ {language === 'vi' ? 'Kém' : 'Poor'}</option>
                  <option value="1">⭐ {language === 'vi' ? 'Rất kém' : 'Very Poor'}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{t.yourReview}</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                {t.submitReview}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetail;

import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTours } from '../services/api';
import TourCard from '../components/TourCard';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../translations';

const Home = () => {
  const navigate = useNavigate();
  const [featuredTours, setFeaturedTours] = useState([]);
  const [hotTours, setHotTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  
  const t = translations[language].home;

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      // Fetch featured tours
      const featuredResponse = await getTours({ featured: true, limit: 6 });
      setFeaturedTours(featuredResponse.data.data);

      // Fetch all tours sorted by price (for hot deals)
      const hotResponse = await getTours({ sort: 'price', limit: 3 });
      setHotTours(hotResponse.data.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Banner with Image */}
      <section className="hero-banner" style={{
        position: 'relative',
        height: '90vh',
        minHeight: '600px',
        background: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Animated Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.6) 50%, rgba(240, 147, 251, 0.5) 100%)',
          animation: 'gradientShift 15s ease infinite',
          zIndex: 1
        }}></div>
        
        {/* Floating Particles */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 6s ease-in-out infinite',
          zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          animation: 'float 8s ease-in-out infinite 1s',
          zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '20%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.12)',
          animation: 'float 7s ease-in-out infinite 2s',
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            animation: 'fadeInUp 1s ease-out'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              padding: '0.6rem 1.5rem',
              borderRadius: '30px',
              marginBottom: '2rem',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              animation: 'slideDown 1s ease-out 0.3s both'
            }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px' }}>
                ✨ {language === 'vi' ? 'KHÁM PHÁ THẾ GIỚI' : 'EXPLORE THE WORLD'} ✨
              </span>
            </div>

            <h1 style={{ 
              fontSize: '4.5rem', 
              marginBottom: '1.5rem', 
              fontWeight: '900',
              textShadow: '0 5px 30px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)',
              letterSpacing: '2px',
              lineHeight: '1.2',
              background: 'linear-gradient(to right, #fff, #f0f0f0)',
              WebkitBackgroundClip: 'text',
              animation: 'titleGlow 2s ease-in-out infinite alternate'
            }}>
              {t.heroTitle}
            </h1>
            <p style={{ 
              fontSize: '1.9rem', 
              marginBottom: '3rem', 
              textShadow: '0 3px 15px rgba(0,0,0,0.5)',
              maxWidth: '900px',
              margin: '0 auto 3rem',
              lineHeight: '1.8',
              fontWeight: '500',
              letterSpacing: '0.5px',
              opacity: 0.95
            }}>
              {t.heroSubtitle}
            </p>
            <Link to="/tours" style={{ 
              fontSize: '1.5rem',
              padding: '1.5rem 4rem',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              fontWeight: '900',
              border: 'none',
              borderRadius: '50px',
              boxShadow: '0 15px 50px rgba(245, 87, 108, 0.7), 0 5px 15px rgba(0,0,0,0.3)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              position: 'relative',
              overflow: 'hidden',
              letterSpacing: '1px',
              animation: 'buttonPulse 2s ease-in-out infinite'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px) scale(1.1)';
              e.target.style.boxShadow = '0 25px 70px rgba(245, 87, 108, 1), 0 10px 25px rgba(0,0,0,0.4)';
              e.target.style.animation = 'none';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 15px 50px rgba(245, 87, 108, 0.7), 0 5px 15px rgba(0,0,0,0.3)';
              e.target.style.animation = 'buttonPulse 2s ease-in-out infinite';
            }}>
              <span style={{ 
                fontSize: '2rem',
                animation: 'rotate 3s linear infinite'
              }}>✨</span>
              <span>{t.exploreTours}</span>
              <span style={{ 
                fontSize: '1.8rem',
                transition: 'transform 0.3s ease',
                display: 'inline-block'
              }}>→</span>
            </Link>
          </div>
        </div>

        {/* Scroll Down Indicator - Enhanced */}
        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite',
          zIndex: 3,
          cursor: 'pointer'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            padding: '1rem',
            borderRadius: '50px',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}>
            <div style={{
              width: '30px',
              height: '50px',
              border: '3px solid white',
              borderRadius: '25px',
              position: 'relative'
            }}>
              <div style={{
                width: '6px',
                height: '10px',
                background: 'white',
                borderRadius: '3px',
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'scroll 2s infinite'
              }}></div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes gradientShift {
            0%, 100% {
              opacity: 0.8;
            }
            50% {
              opacity: 0.6;
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) scale(1);
            }
            50% {
              transform: translateY(-30px) scale(1.1);
            }
          }

          @keyframes titleGlow {
            from {
              filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
            }
            to {
              filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.8));
            }
          }

          @keyframes buttonPulse {
            0%, 100% {
              box-shadow: 0 15px 50px rgba(245, 87, 108, 0.7), 0 5px 15px rgba(0,0,0,0.3);
            }
            50% {
              box-shadow: 0 20px 60px rgba(245, 87, 108, 0.9), 0 8px 20px rgba(0,0,0,0.4);
            }
          }

          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.8;
            }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-10px);
            }
            60% {
              transform: translateX(-50%) translateY(-5px);
            }
          }

          @keyframes scroll {
            0% {
              opacity: 0;
              transform: translateX(-50%) translateY(0);
            }
            40% {
              opacity: 1;
            }
            80% {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
            100% {
              opacity: 0;
            }
          }
        `}</style>
      </section>

      {/* Special Offers Banner - With Background */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2.5rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Pattern Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>🎉</span>
            
            <h3 style={{ 
              margin: 0, 
              fontSize: '1.8rem',
              color: 'white',
              fontWeight: '900',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              letterSpacing: '0.5px'
            }}>
              {t.specialOffer}
            </h3>

            <Link to="/tours" style={{ 
              color: 'white',
              textDecoration: 'none',
              fontWeight: '800',
              padding: '0.7rem 2rem',
              borderRadius: '25px',
              border: '2px solid white',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '1.1rem',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#667eea';
              e.target.style.transform = 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            }}>
              {t.seeNow} <span style={{ fontSize: '1.3rem' }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tours Section - Enhanced */}
      <section style={{ padding: '6rem 0', background: 'white', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
          filter: 'blur(60px)'
        }}></div>

        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '0.5rem 1.5rem',
              borderRadius: '25px',
              color: 'white',
              fontWeight: '700',
              fontSize: '0.95rem',
              letterSpacing: '1px',
              marginBottom: '1rem',
              animation: 'fadeInDown 0.8s ease-out'
            }}>
              ⭐ {language === 'vi' ? 'NỔI BẬT' : 'FEATURED'}
            </div>

            <h2 style={{ 
              fontSize: '3.5rem', 
              marginBottom: '1rem',
              fontWeight: '900',
              color: '#333',
              letterSpacing: '1px',
              animation: 'fadeInUp 0.8s ease-out 0.2s both'
            }}>
              {t.featuredToursTitle}
            </h2>
            <p style={{ 
              fontSize: '1.3rem', 
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.8',
              animation: 'fadeInUp 0.8s ease-out 0.4s both'
            }}>
              {t.featuredToursSubtitle}
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-3" style={{ gap: '2rem' }}>
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div key={item} style={{
                  background: '#f8f9fa',
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}>
                  {/* Skeleton Image */}
                  <div style={{
                    width: '100%',
                    height: '250px',
                    background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite'
                  }}></div>
                  
                  {/* Skeleton Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{
                      height: '24px',
                      background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                      backgroundSize: '200% 100%',
                      borderRadius: '4px',
                      marginBottom: '1rem',
                      animation: 'shimmer 1.5s infinite'
                    }}></div>
                    <div style={{
                      height: '16px',
                      background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                      backgroundSize: '200% 100%',
                      borderRadius: '4px',
                      marginBottom: '0.5rem',
                      width: '80%',
                      animation: 'shimmer 1.5s infinite'
                    }}></div>
                    <div style={{
                      height: '16px',
                      background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
                      backgroundSize: '200% 100%',
                      borderRadius: '4px',
                      width: '60%',
                      animation: 'shimmer 1.5s infinite'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredTours.length > 0 ? (
            <div className="grid grid-3">
              {featuredTours.map((tour, index) => (
                <div 
                  key={tour._id}
                >
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: '#f8f9fa',
              borderRadius: '20px',
              animation: 'fadeIn 0.5s ease-out'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔍</div>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>
                {t.noFeaturedTours}
              </p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link 
              to="/tours" 
              style={{ 
                fontSize: '1.2rem',
                fontWeight: '800',
                padding: '1.3rem 3.5rem',
                borderRadius: '50px',
                background: 'white',
                color: '#667eea',
                textDecoration: 'none',
                display: 'inline-block',
                border: '3px solid #667eea',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.25)',
                letterSpacing: '0.5px',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-5px) scale(1.05)';
                e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#667eea';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.25)';
              }}
            >
              <span>{t.viewAllTours}</span>
              <span style={{ 
                marginLeft: '0.8rem',
                transition: 'transform 0.3s ease',
                display: 'inline-block'
              }}>→</span>
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes floatCard {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>
      </section>

      {/* Hot Deals Section - Simplified */}
      <section style={{ 
        padding: '5rem 0', 
        background: '#fafafa',
        borderTop: '1px solid #eee'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.8rem', 
              marginBottom: '0.5rem', 
              fontWeight: '800',
              color: '#333'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                🔥 {t.hotDealsTitle}
              </span>
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              {t.hotDealsSubtitle}
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div className="loading">{t.loading}</div>
            </div>
          ) : hotTours.length > 0 ? (
            <div className="grid grid-3">
              {hotTours.map(tour => (
                <div 
                  key={tour._id} 
                  style={{ 
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                  onClick={() => navigate(`/tours/${tour._id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '25px',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    zIndex: 10,
                    boxShadow: '0 5px 20px rgba(245, 87, 108, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    🔥 {t.hotDeal}
                  </div>
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              {t.noHotDeals}
            </p>
          )}
        </div>
      </section>

      {/* Why Choose Us Section - Optimized */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem',
              fontWeight: '800',
              color: '#333'
            }}>
              💎 {t.whyChooseUs}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              {language === 'vi' ? 'Những lý do khiến chúng tôi trở thành lựa chọn hàng đầu của bạn' : 'Why we are your top choice'}
            </p>
          </div>
          
          <div className="grid grid-3" style={{ gap: '2rem' }}>
            <div className="card" style={{ 
              textAlign: 'center',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              background: 'white',
              boxShadow: '0 10px 40px rgba(102, 126, 234, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-15px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}></div>
              <div className="card-body" style={{ padding: '3rem 2rem' }}>
                <div style={{ 
                  fontSize: '5rem', 
                  marginBottom: '1.5rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 5px 15px rgba(102, 126, 234, 0.3))'
                }}>
                  🏆
                </div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>{t.qualityTitle}</h3>
                <p style={{ color: '#666', lineHeight: '1.8', fontSize: '1rem' }}>
                  {t.qualityDesc}
                </p>
              </div>
            </div>

            <div className="card" style={{ 
              textAlign: 'center',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              background: 'white',
              boxShadow: '0 10px 40px rgba(245, 87, 108, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-15px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(245, 87, 108, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(245, 87, 108, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              }}></div>
              <div className="card-body" style={{ padding: '3rem 2rem' }}>
                <div style={{ 
                  fontSize: '5rem', 
                  marginBottom: '1.5rem',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 5px 15px rgba(245, 87, 108, 0.3))'
                }}>
                  💰
                </div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>{t.priceTitle}</h3>
                <p style={{ color: '#666', lineHeight: '1.8', fontSize: '1rem' }}>
                  {t.priceDesc}
                </p>
              </div>
            </div>

            <div className="card" style={{ 
              textAlign: 'center',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              background: 'white',
              boxShadow: '0 10px 40px rgba(252, 182, 159, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-15px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(252, 182, 159, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(252, 182, 159, 0.1)';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
              }}></div>
              <div className="card-body" style={{ padding: '3rem 2rem' }}>
                <div style={{ 
                  fontSize: '5rem', 
                  marginBottom: '1.5rem',
                  background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 5px 15px rgba(252, 182, 159, 0.3))'
                }}>
                  🌟
                </div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>{t.experienceTitle}</h3>
                <p style={{ color: '#666', lineHeight: '1.8', fontSize: '1rem' }}>
                  {t.experienceDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ 
        padding: '5rem 0', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          top: '-100px',
          right: '-100px',
          backdropFilter: 'blur(20px)'
        }}></div>
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          bottom: '-50px',
          left: '-50px',
          backdropFilter: 'blur(20px)'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid grid-3" style={{ textAlign: 'center', gap: '3rem' }}>
            <div style={{
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                padding: '2.5rem 2rem',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ 
                  fontSize: '3.5rem', 
                  marginBottom: '1rem',
                  fontWeight: '800',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}>1000+</div>
                <p style={{ 
                  fontSize: '1.3rem', 
                  opacity: 0.95,
                  fontWeight: '500',
                  letterSpacing: '0.5px'
                }}>{t.statsToursOrganized}</p>
              </div>
            </div>

            <div style={{
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                padding: '2.5rem 2rem',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ 
                  fontSize: '3.5rem', 
                  marginBottom: '1rem',
                  fontWeight: '800',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}>5000+</div>
                <p style={{ 
                  fontSize: '1.3rem', 
                  opacity: 0.95,
                  fontWeight: '500',
                  letterSpacing: '0.5px'
                }}>{t.statsHappyCustomers}</p>
              </div>
            </div>

            <div style={{
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                padding: '2.5rem 2rem',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ 
                  fontSize: '3.5rem', 
                  marginBottom: '1rem',
                  fontWeight: '800',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}>50+</div>
                <p style={{ 
                  fontSize: '1.3rem', 
                  opacity: 0.95,
                  fontWeight: '500',
                  letterSpacing: '0.5px'
                }}>{t.statsDestinations}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Chỉ hiển thị khi chưa login */}
      {!user && (
        <section style={{ 
          padding: '6rem 0', 
          textAlign: 'center',
          background: 'white',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid #eee'
        }}>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '1.5rem',
                animation: 'pulse 2s ease-in-out infinite'
              }}>🎉</div>
              
              <h2 style={{ 
                fontSize: '2.8rem', 
                marginBottom: '1.5rem',
                fontWeight: '800',
                lineHeight: '1.2',
                color: '#333'
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {t.ctaTitle}
                </span>
              </h2>
              
              <p style={{ 
                fontSize: '1.3rem', 
                color: '#666', 
                marginBottom: '2.5rem',
                lineHeight: '1.8'
              }}>
                {t.ctaSubtitle}
              </p>
              
              <Link 
                to="/register" 
                style={{ 
                  fontSize: '1.3rem',
                  fontWeight: '800',
                  padding: '1.2rem 3.5rem',
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(245, 87, 108, 0.4)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px) scale(1.05)';
                  e.target.style.boxShadow = '0 15px 45px rgba(245, 87, 108, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 10px 30px rgba(245, 87, 108, 0.4)';
                }}
              >
                <span>✨</span>
                <span>{t.ctaButton}</span>
                <span>→</span>
              </Link>

              {/* Trust badges */}
              <div style={{ 
                marginTop: '3rem', 
                paddingTop: '2rem', 
                borderTop: '1px solid #eee',
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap',
                fontSize: '1rem',
                color: '#666'
              }}>
                <div style={{ fontWeight: '500' }}>✓ {language === 'vi' ? 'Miễn phí đăng ký' : 'Free Registration'}</div>
                <div style={{ fontWeight: '500' }}>✓ {language === 'vi' ? 'Bảo mật tuyệt đối' : 'Secure & Safe'}</div>
                <div style={{ fontWeight: '500' }}>✓ {language === 'vi' ? 'Hỗ trợ 24/7' : '24/7 Support'}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Welcome Section - Hiển thị khi đã login */}
      {user && (
        <section style={{ 
          padding: '6rem 0', 
          textAlign: 'center',
          background: 'white',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid #eee'
        }}>
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {/* Avatar and Welcome */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '3rem'
              }}>
                <img 
                  src={user.avatar ? `http://localhost:5000${user.avatar}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=667eea&color=fff&size=120`}
                  alt="Avatar"
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '5px solid transparent',
                    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box',
                    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
                    marginBottom: '1.5rem'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=667eea&color=fff&size=120';
                  }}
                />
                
                <h2 style={{ 
                  fontSize: '2.8rem', 
                  marginBottom: '0.8rem',
                  fontWeight: '800',
                  color: '#333'
                }}>
                  👋 {t.welcomeBack.replace('{name}', user.name)}
                </h2>
                
                <p style={{ 
                  fontSize: '1.3rem', 
                  color: '#666',
                  marginBottom: '0',
                  lineHeight: '1.6'
                }}>
                  {t.welcomeSubtitle}
                </p>
              </div>

              {/* Quick Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginBottom: '3rem',
                padding: '0 2rem'
              }}>
                <div style={{
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '20px',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
                  <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                    {language === 'vi' ? 'Thành viên từ' : 'Member since'}
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '700', marginTop: '0.5rem' }}>
                    {user.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', { 
                          day: 'numeric',
                          month: 'long', 
                          year: 'numeric' 
                        })
                      : (language === 'vi' ? 'Không rõ' : 'Unknown')
                    }
                  </div>
                </div>

                <div style={{
                  padding: '2rem',
                  background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                  borderRadius: '20px',
                  color: '#333',
                  boxShadow: '0 10px 30px rgba(252, 182, 159, 0.3)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📧</div>
                  <div style={{ fontSize: '1.1rem', opacity: 0.8 }}>Email</div>
                  <div style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '600', 
                    marginTop: '0.5rem',
                    wordBreak: 'break-word'
                  }}>
                    {user.email}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                justifyContent: 'center', 
                flexWrap: 'wrap' 
              }}>
                <Link 
                  to="/tours" 
                  style={{ 
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    padding: '1.2rem 3rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '50px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-5px) scale(1.05)';
                    e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                  }}
                >
                  <span>🌍</span>
                  <span>{t.viewAllToursBtn}</span>
                </Link>
                
                <Link 
                  to="/my-bookings" 
                  style={{ 
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    padding: '1.2rem 3rem',
                    background: 'white',
                    color: '#667eea',
                    textDecoration: 'none',
                    borderRadius: '50px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    border: '2px solid #667eea',
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-5px) scale(1.05)';
                    e.target.style.background = '#667eea';
                    e.target.style.color = 'white';
                    e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.background = 'white';
                    e.target.style.color = '#667eea';
                    e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.2)';
                  }}
                >
                  <span>📅</span>
                  <span>{t.myToursBtn}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
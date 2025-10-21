import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../translations';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  const t = translations[language].navbar;
  const isHomePage = location.pathname === '/';

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 80; // Changed threshold for banner
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: (isHomePage && !scrolled) ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.98)',
      backdropFilter: (isHomePage && !scrolled) ? 'blur(5px)' : 'blur(10px)',
      boxShadow: (isHomePage && !scrolled) ? 'none' : '0 2px 20px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      padding: (isHomePage && !scrolled) ? '1.2rem 0' : '0.8rem 0'
    }}>
      <div className="container">
        <div className="navbar-content" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            color: (isHomePage && !scrolled) ? 'white' : '#667eea',
            textShadow: (isHomePage && !scrolled) ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
            transition: 'all 0.3s ease'
          }}>
            {t.brand}
          </Link>
          
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2rem',
            alignItems: 'center',
            margin: 0,
            padding: 0
          }}>
            <li>
              <Link to="/" style={{ 
                fontWeight: 'bold',
                color: (isHomePage && !scrolled) ? 'white' : '#333',
                textDecoration: 'none',
                textShadow: (isHomePage && !scrolled) ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
                transition: 'all 0.3s ease'
              }}>{t.home}</Link>
            </li>
            <li>
              <Link to="/tours" style={{ 
                fontWeight: 'bold',
                color: (isHomePage && !scrolled) ? 'white' : '#333',
                textDecoration: 'none',
                textShadow: (isHomePage && !scrolled) ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
                transition: 'all 0.3s ease'
              }}>{t.tours}</Link>
            </li>
            
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <>
                    <li>
                      <Link to="/admin/dashboard" style={{ 
                        fontWeight: 'bold',
                        color: (isHomePage && !scrolled) ? 'white' : '#333',
                        textDecoration: 'none',
                        textShadow: (isHomePage && !scrolled) ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
                        transition: 'all 0.3s ease'
                      }}>{t.dashboard}</Link>
                    </li>
                    <li>
                      <Link to="/admin/tours" style={{ 
                        fontWeight: 'bold',
                        color: (isHomePage && !scrolled) ? 'white' : '#333',
                        textDecoration: 'none',
                        textShadow: (isHomePage && !scrolled) ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
                        transition: 'all 0.3s ease'
                      }}>{t.manageTours}</Link>
                    </li>
                    <li>
                      <Link to="/admin/bookings" style={{ 
                        fontWeight: 'bold',
                        color: (isHomePage && !scrolled) ? 'white' : '#333',
                        textDecoration: 'none',
                        textShadow: (isHomePage && !scrolled) ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
                        transition: 'all 0.3s ease'
                      }}>{t.manageBookings}</Link>
                    </li>
                    <li>
                      <Link to="/admin/vouchers" style={{ 
                        fontWeight: 'bold',
                        color: (isHomePage && !scrolled) ? 'white' : '#333',
                        textDecoration: 'none',
                        textShadow: (isHomePage && !scrolled) ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
                        transition: 'all 0.3s ease'
                      }}>{t.manageVouchers}</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/my-bookings" style={{ 
                        fontWeight: 'bold',
                        color: (isHomePage && !scrolled) ? 'white' : '#333',
                        textDecoration: 'none',
                        textShadow: (isHomePage && !scrolled) ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
                        transition: 'all 0.3s ease'
                      }}>{t.myBookings}</Link>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.4rem 1rem',
                      background: (isHomePage && !scrolled)
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '25px',
                      border: (isHomePage && !scrolled)
                        ? '2px solid rgba(255, 255, 255, 0.4)'
                        : '2px solid #667eea30',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, #667eea25 0%, #764ba225 100%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = (isHomePage && !scrolled)
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)';
                    }}>
                      <img 
                        src={user.avatar ? `http://localhost:5000${user.avatar}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=667eea&color=fff&size=128`}
                        alt={`${user.name}'s avatar`}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '3px solid',
                          borderColor: user.role === 'admin' ? '#ffd700' : '#667eea',
                          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
                          transition: 'all 0.3s ease'
                        }}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=667eea&color=fff&size=128`;
                        }}
                      />
                      <span style={{ 
                        fontWeight: 'bold',
                        color: (isHomePage && !scrolled) ? 'white' : '#667eea',
                        fontSize: '0.95rem',
                        textShadow: (isHomePage && !scrolled) ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        {user.role === 'admin' && <span style={{ fontSize: '1.1rem' }}>👑</span>}
                        <span>{user.name}</span>
                      </span>
                    </div>
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    style={{ 
                      fontWeight: 'bold',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 1.2rem',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      background: 'transparent',
                      border: '2px solid #ff4757',
                      color: '#ff4757',
                      cursor: 'pointer',
                      fontSize: '0.95rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#ff4757';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(255, 71, 87, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#ff4757';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    🚪 {t.logout}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    style={{ 
                      fontWeight: 'bold',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 1.2rem',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      background: 'transparent',
                      border: (isHomePage && !scrolled) ? '2px solid white' : '2px solid #667eea',
                      color: (isHomePage && !scrolled) ? 'white' : '#667eea',
                      textDecoration: 'none',
                      textShadow: (isHomePage && !scrolled) ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      const isTransparent = isHomePage && !scrolled;
                      e.target.style.background = isTransparent ? 'white' : '#667eea';
                      e.target.style.color = isTransparent ? '#667eea' : 'white';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = isTransparent
                        ? '0 4px 12px rgba(255, 255, 255, 0.5)'
                        : '0 4px 12px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      const isTransparent = isHomePage && !scrolled;
                      e.target.style.background = 'transparent';
                      e.target.style.color = isTransparent ? 'white' : '#667eea';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    🔐 {t.login}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register"
                    style={{ 
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1.5rem',
                      borderRadius: '25px',
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      border: 'none',
                      color: 'white',
                      textDecoration: 'none',
                      boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
                      fontSize: '0.95rem',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px) scale(1.02)';
                      e.target.style.boxShadow = '0 8px 25px rgba(245, 87, 108, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 4px 15px rgba(245, 87, 108, 0.4)';
                    }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>✨</span>
                    <span>{t.register}</span>
                  </Link>
                </li>
              </>
            )}
            
            {/* Language Switcher */}
            <li>
              <button 
                onClick={toggleLanguage}
                title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
                style={{
                  fontWeight: '700',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  background: (isHomePage && !scrolled)
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: (isHomePage && !scrolled) ? '2px solid rgba(255, 255, 255, 0.5)' : 'none',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  boxShadow: (isHomePage && !scrolled)
                    ? '0 3px 10px rgba(255, 255, 255, 0.2)'
                    : '0 3px 10px rgba(102, 126, 234, 0.3)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  const isTransparent = isHomePage && !scrolled;
                  e.target.style.transform = 'translateY(-2px) scale(1.05)';
                  e.target.style.boxShadow = isTransparent
                    ? '0 6px 18px rgba(255, 255, 255, 0.4)'
                    : '0 6px 18px rgba(102, 126, 234, 0.5)';
                }}
                onMouseLeave={(e) => {
                  const isTransparent = isHomePage && !scrolled;
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = isTransparent
                    ? '0 3px 10px rgba(255, 255, 255, 0.2)'
                    : '0 3px 10px rgba(102, 126, 234, 0.3)';
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>
                  {language === 'vi' ? '🇻🇳' : '🇬🇧'}
                </span>
                <span>{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

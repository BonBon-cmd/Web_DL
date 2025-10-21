import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../translations';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  
  const t = translations[language].register;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await register(formData);
      const { token, user } = response.data;
      
      authLogin(token, user);
      toast.success(t.registerSuccess);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || t.registerError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      padding: '2rem 1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Circles */}
      <div style={{
        position: 'absolute',
        top: '-5%',
        left: '-3%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.12)',
        animation: 'float 9s ease-in-out infinite',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-8%',
        right: '-4%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        animation: 'float 11s ease-in-out infinite 3s',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '8%',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.15)',
        animation: 'float 7s ease-in-out infinite 1.5s',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '10%',
        width: '220px',
        height: '220px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.08)',
        animation: 'float 8s ease-in-out infinite 2.5s',
        zIndex: 0
      }}></div>

      <div className="auth-container" style={{
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        borderRadius: '30px',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.35), 0 0 1px rgba(255, 255, 255, 0.5) inset',
        padding: '3.5rem 3rem',
        maxWidth: '520px',
        width: '100%',
        animation: 'fadeInUp 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        position: 'relative',
        zIndex: 1,
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.2rem',
            animation: 'pulse 2s ease-in-out infinite'
          }}>✨</div>
          <h2 style={{
            fontSize: '2.3rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.7rem',
            letterSpacing: '-0.5px'
          }}>{t.title}</h2>
          <p style={{
            color: '#666',
            fontSize: '1.05rem',
            fontWeight: '500'
          }}>{language === 'vi' ? 'Bắt đầu hành trình của bạn! 🎉' : 'Start your journey! 🎉'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.6rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.7rem',
              color: '#333',
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              <span style={{ fontSize: '1.3rem' }}>👤</span>
              <span>{t.name}</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder={language === 'vi' ? 'Nguyễn Văn A' : 'John Doe'}
              required
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                fontSize: '1.05rem',
                border: '2.5px solid #e8e8e8',
                borderRadius: '15px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                outline: 'none',
                background: '#fafafa',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#f5576c';
                e.target.style.background = '#ffffff';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 5px 20px rgba(245, 87, 108, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e8e8e8';
                e.target.style.background = '#fafafa';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.6rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.7rem',
              color: '#333',
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              <span style={{ fontSize: '1.3rem' }}>📧</span>
              <span>{t.email}</span>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder={language === 'vi' ? 'example@email.com' : 'example@email.com'}
              required
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                fontSize: '1.05rem',
                border: '2.5px solid #e8e8e8',
                borderRadius: '15px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                outline: 'none',
                background: '#fafafa',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#f5576c';
                e.target.style.background = '#ffffff';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 5px 20px rgba(245, 87, 108, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e8e8e8';
                e.target.style.background = '#fafafa';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.6rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.7rem',
              color: '#333',
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              <span style={{ fontSize: '1.3rem' }}>🔒</span>
              <span>{t.password}</span>
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder={language === 'vi' ? '••••••••' : '••••••••'}
              required
              minLength="6"
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                fontSize: '1.05rem',
                border: '2.5px solid #e8e8e8',
                borderRadius: '15px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                outline: 'none',
                background: '#fafafa',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#f5576c';
                e.target.style.background = '#ffffff';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 5px 20px rgba(245, 87, 108, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e8e8e8';
                e.target.style.background = '#fafafa';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <small style={{
              display: 'block',
              marginTop: '0.5rem',
              color: '#999',
              fontSize: '0.85rem',
              paddingLeft: '0.3rem'
            }}>
              {language === 'vi' ? '⚠️ Tối thiểu 6 ký tự' : '⚠️ Minimum 6 characters'}
            </small>
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.7rem',
              color: '#333',
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              <span style={{ fontSize: '1.3rem' }}>📱</span>
              <span>{language === 'vi' ? 'Số điện thoại' : 'Phone Number'}</span>
              <span style={{ 
                fontSize: '0.75rem', 
                color: '#999', 
                fontWeight: '500',
                background: '#f0f0f0',
                padding: '0.2rem 0.6rem',
                borderRadius: '8px'
              }}>
                {language === 'vi' ? 'Tùy chọn' : 'Optional'}
              </span>
            </label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              placeholder={language === 'vi' ? '0912 345 678' : '+84 912 345 678'}
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                fontSize: '1.05rem',
                border: '2.5px solid #e8e8e8',
                borderRadius: '15px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                outline: 'none',
                background: '#fafafa',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#f5576c';
                e.target.style.background = '#ffffff';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 5px 20px rgba(245, 87, 108, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e8e8e8';
                e.target.style.background = '#fafafa';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.15rem',
              fontSize: '1.15rem',
              fontWeight: '700',
              color: 'white',
              background: loading ? 'linear-gradient(135deg, #ccc 0%, #999 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              border: 'none',
              borderRadius: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: loading ? 'none' : '0 8px 25px rgba(245, 87, 108, 0.35)',
              transform: loading ? 'scale(0.98)' : 'translateY(0)',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-3px) scale(1.02)';
                e.target.style.boxShadow = '0 12px 35px rgba(245, 87, 108, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(245, 87, 108, 0.35)';
              }
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem' }}>
                <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
                <span>{language === 'vi' ? 'Đang đăng ký...' : 'Registering...'}</span>
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem' }}>
                <span>🚀</span>
                <span>{t.registerButton}</span>
                <span>✨</span>
              </span>
            )}
          </button>
        </form>

        <div style={{
          marginTop: '2.5rem',
          paddingTop: '2rem',
          borderTop: '2px solid #f0f0f0',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: '#666',
            fontSize: '1rem',
            margin: 0,
            fontWeight: '500'
          }}>
            {t.haveAccount}{' '}
            <Link 
              to="/login"
              style={{
                color: '#f5576c',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                position: 'relative',
                paddingBottom: '2px'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#f093fb';
                e.target.style.borderBottom = '2px solid #f093fb';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#f5576c';
                e.target.style.borderBottom = 'none';
              }}
            >
              {t.loginHere} 🔐
            </Link>
          </p>
          
          {/* Trust Badges */}
          <div style={{
            marginTop: '1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.8rem'
          }}>
            <div style={{
              padding: '0.7rem',
              background: 'linear-gradient(135deg, #fff0f5 0%, #ffe8f0 100%)',
              borderRadius: '10px',
              fontSize: '0.8rem',
              color: '#f5576c',
              fontWeight: '600',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <span style={{ fontSize: '1.3rem' }}>🎁</span>
              <span>{language === 'vi' ? 'Miễn phí' : 'Free'}</span>
            </div>
            <div style={{
              padding: '0.7rem',
              background: 'linear-gradient(135deg, #fff0f5 0%, #ffe8f0 100%)',
              borderRadius: '10px',
              fontSize: '0.8rem',
              color: '#f5576c',
              fontWeight: '600',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <span style={{ fontSize: '1.3rem' }}>🔒</span>
              <span>{language === 'vi' ? 'Bảo mật' : 'Secure'}</span>
            </div>
            <div style={{
              padding: '0.7rem',
              background: 'linear-gradient(135deg, #fff0f5 0%, #ffe8f0 100%)',
              borderRadius: '10px',
              fontSize: '0.8rem',
              color: '#f5576c',
              fontWeight: '600',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <span style={{ fontSize: '1.3rem' }}>⚡</span>
              <span>{language === 'vi' ? 'Nhanh' : 'Fast'}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Register;

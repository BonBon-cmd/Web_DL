import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { getProfile, updateProfile, uploadAvatar, changePassword } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../translations';

const Profile = () => {
  const { user: authUser } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language].profile;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dateOfBirth: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data.data);
      setFormData({
        name: response.data.data.name || '',
        phone: response.data.data.phone || '',
        dateOfBirth: response.data.data.dateOfBirth ? new Date(response.data.data.dateOfBirth).toISOString().split('T')[0] : ''
      });
    } catch (error) {
      toast.error(language === 'vi' ? 'Không thể tải thông tin profile' : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(formData);
      setUser(response.data.data);
      toast.success(t.updateSuccess);
      setEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || t.updateError);
    }
  };

  const handleUploadAvatar = async () => {
    if (!avatarFile) {
      toast.warning(language === 'vi' ? 'Vui lòng chọn ảnh' : 'Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      const response = await uploadAvatar(formData);
      setUser(response.data.data);
      setAvatarFile(null);
      setAvatarPreview('');
      toast.success(t.uploadSuccess);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || t.uploadError);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(language === 'vi' ? 'Mật khẩu mới không khớp' : 'New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error(language === 'vi' ? 'Mật khẩu phải có ít nhất 6 ký tự' : 'Password must be at least 6 characters');
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      toast.success(language === 'vi' ? 'Đổi mật khẩu thành công!' : 'Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setChangingPassword(false);
    } catch (error) {
      toast.error(error.response?.data?.message || (language === 'vi' ? 'Đổi mật khẩu thất bại' : 'Password change failed'));
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <div style={{ 
          fontSize: '1.5rem', 
          color: '#667eea',
          fontWeight: '600'
        }}>
          {language === 'vi' ? '⏳ Đang tải...' : '⏳ Loading...'}
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'white',
      minHeight: '100vh',
      paddingTop: '6rem',
      paddingBottom: '4rem'
    }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{ 
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '0.5rem',
            color: '#333'
          }}>
            👤 {t.personalInfo}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>
            {language === 'vi' ? 'Quản lý thông tin cá nhân của bạn' : 'Manage your personal information'}
          </p>
        </div>

        {/* Avatar Section */}
        <div className="card" style={{ 
          padding: '3rem', 
          marginBottom: '2rem',
          borderRadius: '25px',
          border: 'none',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          background: 'white'
        }}>
          <h2 style={{ 
            marginBottom: '2rem',
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem'
          }}>
            <span style={{ fontSize: '2rem' }}>📸</span>
            {t.avatar}
          </h2>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={avatarPreview || `http://localhost:5000${user?.avatar}` || '/default-avatar.jpg'} 
                alt="Avatar"
                style={{ 
                  width: '180px', 
                  height: '180px', 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  border: '5px solid transparent',
                  background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                }}
              />
              {user?.role === 'admin' && (
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
                  border: '3px solid white'
                }}>
                  👑
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <label style={{
                display: 'block',
                marginBottom: '1rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#555'
              }}>
                {language === 'vi' ? 'Chọn ảnh mới' : 'Choose new image'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ 
                  marginBottom: '1.5rem',
                  padding: '0.8rem',
                  border: '2px dashed #667eea',
                  borderRadius: '10px',
                  width: '100%',
                  cursor: 'pointer',
                  background: '#f8f9ff'
                }}
              />
              {avatarFile && (
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={handleUploadAvatar} 
                    style={{
                      padding: '0.8rem 2rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 5px 20px rgba(102, 126, 234, 0.4)',
                      transition: 'all 0.3s ease',
                      fontSize: '1rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.4)';
                    }}
                  >
                    ✨ {t.uploadAvatar}
                  </button>
                  <button 
                    onClick={() => {
                      setAvatarFile(null);
                      setAvatarPreview('');
                    }}
                    style={{
                      padding: '0.8rem 2rem',
                      borderRadius: '12px',
                      background: '#f0f0f0',
                      color: '#666',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '1rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#e0e0e0';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#f0f0f0';
                    }}
                  >
                    ❌ {language === 'vi' ? 'Hủy' : 'Cancel'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="card" style={{ 
          padding: '3rem', 
          marginBottom: '2rem',
          borderRadius: '25px',
          border: 'none',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          background: 'white'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              margin: 0
            }}>
              <span style={{ fontSize: '2rem' }}>ℹ️</span>
              {t.personalInfo}
            </h2>
            {!editing && (
              <button 
                onClick={() => setEditing(true)} 
                style={{
                  padding: '0.8rem 2rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 5px 20px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.4)';
                }}
              >
                ✏️ {language === 'vi' ? 'Chỉnh sửa' : 'Edit'}
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label>{t.name} *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t.email}</label>
                <input
                  type="email"
                  className="form-control"
                  value={user?.email}
                  disabled
                  style={{ background: '#f0f0f0' }}
                />
                <small style={{ color: '#666' }}>{language === 'vi' ? 'Email không thể thay đổi' : 'Email cannot be changed'}</small>
              </div>

              <div className="form-group">
                <label>{t.phone}</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>{language === 'vi' ? 'Ngày sinh' : 'Date of Birth'}</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary">
                  {language === 'vi' ? 'Lưu thay đổi' : 'Save Changes'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      name: user?.name || '',
                      phone: user?.phone || '',
                      dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''
                    });
                  }}
                  className="btn btn-secondary"
                >
                  {language === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
              </div>
            </form>
          ) : (
            <div style={{
              display: 'grid',
              gap: '1.5rem'
            }}>
              <div style={{ 
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '12px',
                borderLeft: '4px solid #667eea'
              }}>
                <strong style={{ color: '#667eea' }}>{t.name}:</strong>
                <div style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>{user?.name}</div>
              </div>
              <div style={{ 
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '12px',
                borderLeft: '4px solid #667eea'
              }}>
                <strong style={{ color: '#667eea' }}>{t.email}:</strong>
                <div style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>{user?.email}</div>
              </div>
              <div style={{ 
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '12px',
                borderLeft: '4px solid #667eea'
              }}>
                <strong style={{ color: '#667eea' }}>{t.phone}:</strong>
                <div style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
                  {user?.phone || (language === 'vi' ? 'Chưa cập nhật' : 'Not updated')}
                </div>
              </div>
              <div style={{ 
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '12px',
                borderLeft: '4px solid #667eea'
              }}>
                <strong style={{ color: '#667eea' }}>{language === 'vi' ? 'Ngày sinh' : 'Date of Birth'}:</strong>
                <div style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
                  {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US') : (language === 'vi' ? 'Chưa cập nhật' : 'Not updated')}
                </div>
              </div>
              <div style={{ 
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '12px',
                borderLeft: '4px solid #667eea'
              }}>
                <strong style={{ color: '#667eea' }}>{language === 'vi' ? 'Ngày tham gia' : 'Member Since'}:</strong>
                <div style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
                  {new Date(user?.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Change Password */}
        <div className="card" style={{ 
          padding: '3rem',
          borderRadius: '25px',
          border: 'none',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          background: 'white'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              margin: 0
            }}>
              <span style={{ fontSize: '2rem' }}>🔒</span>
              {t.changePassword}
            </h2>
            {!changingPassword && (
              <button 
                onClick={() => setChangingPassword(true)} 
                style={{
                  padding: '0.8rem 2rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 5px 20px rgba(245, 87, 108, 0.4)',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 30px rgba(245, 87, 108, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 5px 20px rgba(245, 87, 108, 0.4)';
                }}
              >
                🔑 {t.changePassword}
              </button>
            )}
          </div>

          {changingPassword && (
            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label>{t.currentPassword} *</label>
                <input
                  type="password"
                  name="currentPassword"
                  className="form-control"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>{t.newPassword} *</label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                />
                <small style={{ color: '#666' }}>{language === 'vi' ? 'Tối thiểu 6 ký tự' : 'Minimum 6 characters'}</small>
              </div>

              <div className="form-group">
                <label>{t.confirmNewPassword} *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary">
                  {t.changePassword}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setChangingPassword(false);
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  className="btn btn-secondary"
                >
                  {language === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

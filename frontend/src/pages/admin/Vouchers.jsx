import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { getVouchers, createVoucher, updateVoucher, deleteVoucher } from '../../services/api';
import { LanguageContext } from '../../context/LanguageContext';

const AdminVouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState('all');
  const { language } = useContext(LanguageContext);

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    minPurchase: 0,
    maxDiscount: '',
    usageLimit: '',
    validFrom: '',
    validTo: '',
    isActive: true
  });

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const params = {};
      if (filterActive !== 'all') {
        params.active = filterActive;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await getVouchers(params);
      setVouchers(response.data.data);
    } catch (error) {
      toast.error(language === 'vi' ? 'Lỗi tải voucher' : 'Error loading vouchers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const dataToSend = {
        ...formData,
        discountValue: Number(formData.discountValue),
        minPurchase: Number(formData.minPurchase),
        maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null
      };

      if (editingVoucher) {
        await updateVoucher(editingVoucher._id, dataToSend);
        toast.success(language === 'vi' ? 'Cập nhật voucher thành công!' : 'Voucher updated successfully!');
      } else {
        await createVoucher(dataToSend);
        toast.success(language === 'vi' ? 'Tạo voucher thành công!' : 'Voucher created successfully!');
      }
      
      setShowModal(false);
      resetForm();
      fetchVouchers();
    } catch (error) {
      toast.error(error.response?.data?.message || (language === 'vi' ? 'Lỗi xử lý voucher' : 'Error processing voucher'));
    }
  };

  const handleEdit = (voucher) => {
    setEditingVoucher(voucher);
    setFormData({
      code: voucher.code,
      description: voucher.description,
      discountType: voucher.discountType,
      discountValue: voucher.discountValue,
      minPurchase: voucher.minPurchase || 0,
      maxDiscount: voucher.maxDiscount || '',
      usageLimit: voucher.usageLimit || '',
      validFrom: new Date(voucher.validFrom).toISOString().split('T')[0],
      validTo: new Date(voucher.validTo).toISOString().split('T')[0],
      isActive: voucher.isActive
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(language === 'vi' ? 'Bạn có chắc muốn xóa voucher này?' : 'Are you sure you want to delete this voucher?')) {
      try {
        await deleteVoucher(id);
        toast.success(language === 'vi' ? 'Xóa voucher thành công!' : 'Voucher deleted successfully!');
        fetchVouchers();
      } catch (error) {
        toast.error(language === 'vi' ? 'Lỗi xóa voucher' : 'Error deleting voucher');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      minPurchase: 0,
      maxDiscount: '',
      usageLimit: '',
      validFrom: '',
      validTo: '',
      isActive: true
    });
    setEditingVoucher(null);
  };

  const handleSearch = () => {
    setLoading(true);
    fetchVouchers();
  };

  const isVoucherActive = (voucher) => {
    const now = new Date();
    return voucher.isActive && 
           new Date(voucher.validFrom) <= now && 
           new Date(voucher.validTo) >= now &&
           (!voucher.usageLimit || voucher.usedCount < voucher.usageLimit);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '3rem' }}>⏳</div>
        <p>{language === 'vi' ? 'Đang tải...' : 'Loading...'}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '700' }}>
          🎟️ {language === 'vi' ? 'Quản lý Voucher' : 'Voucher Management'}
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          style={{
            padding: '0.8rem 2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem'
          }}
        >
          ➕ {language === 'vi' ? 'Tạo Voucher Mới' : 'Create New Voucher'}
        </button>
      </div>

      {/* Search and Filter */}
      <div style={{ 
        marginBottom: '2rem', 
        display: 'flex', 
        gap: '1rem', 
        flexWrap: 'wrap',
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <input
          type="text"
          placeholder={language === 'vi' ? '🔍 Tìm kiếm voucher...' : '🔍 Search vouchers...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            flex: 1,
            minWidth: '250px',
            padding: '0.8rem',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '1rem'
          }}
        />
        <select
          value={filterActive}
          onChange={(e) => {
            setFilterActive(e.target.value);
            setLoading(true);
          }}
          style={{
            padding: '0.8rem',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          <option value="all">{language === 'vi' ? 'Tất cả' : 'All'}</option>
          <option value="true">{language === 'vi' ? 'Đang hoạt động' : 'Active'}</option>
          <option value="false">{language === 'vi' ? 'Không hoạt động' : 'Inactive'}</option>
        </select>
        <button
          onClick={handleSearch}
          style={{
            padding: '0.8rem 1.5rem',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {language === 'vi' ? 'Tìm kiếm' : 'Search'}
        </button>
      </div>

      {/* Vouchers Table */}
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>
                {language === 'vi' ? 'Mã' : 'Code'}
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>
                {language === 'vi' ? 'Mô tả' : 'Description'}
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>
                {language === 'vi' ? 'Giảm giá' : 'Discount'}
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>
                {language === 'vi' ? 'Sử dụng' : 'Usage'}
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>
                {language === 'vi' ? 'Thời hạn' : 'Validity'}
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>
                {language === 'vi' ? 'Trạng thái' : 'Status'}
              </th>
              <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>
                {language === 'vi' ? 'Thao tác' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    fontWeight: '700',
                    color: '#667eea',
                    fontSize: '1.1rem',
                    fontFamily: 'monospace'
                  }}>
                    {voucher.code}
                  </span>
                </td>
                <td style={{ padding: '1rem', maxWidth: '200px' }}>
                  {voucher.description}
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: '600' }}>
                    {voucher.discountType === 'percentage' 
                      ? `${voucher.discountValue}%`
                      : `${voucher.discountValue.toLocaleString('vi-VN')}₫`
                    }
                  </div>
                  {voucher.maxDiscount && (
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                      Max: {voucher.maxDiscount.toLocaleString('vi-VN')}₫
                    </div>
                  )}
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: '600', color: '#667eea' }}>
                      {voucher.usedCount}
                    </span>
                    {voucher.usageLimit && (
                      <span style={{ color: '#666' }}> / {voucher.usageLimit}</span>
                    )}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.85rem' }}>
                    <div>{new Date(voucher.validFrom).toLocaleDateString('vi-VN')}</div>
                    <div style={{ color: '#666' }}>
                      → {new Date(voucher.validTo).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    background: isVoucherActive(voucher) ? '#d4edda' : '#f8d7da',
                    color: isVoucherActive(voucher) ? '#155724' : '#721c24'
                  }}>
                    {isVoucherActive(voucher) 
                      ? (language === 'vi' ? '✓ Hoạt động' : '✓ Active')
                      : (language === 'vi' ? '✗ Không hoạt động' : '✗ Inactive')
                    }
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <button
                    onClick={() => handleEdit(voucher)}
                    style={{
                      padding: '0.5rem 1rem',
                      marginRight: '0.5rem',
                      background: '#ffc107',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    ✏️ {language === 'vi' ? 'Sửa' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDelete(voucher._id)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    🗑️ {language === 'vi' ? 'Xóa' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {vouchers.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎟️</div>
            <p>{language === 'vi' ? 'Chưa có voucher nào' : 'No vouchers yet'}</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {editingVoucher 
                  ? (language === 'vi' ? 'Chỉnh sửa Voucher' : 'Edit Voucher')
                  : (language === 'vi' ? 'Tạo Voucher Mới' : 'Create New Voucher')
                }
              </h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>{language === 'vi' ? 'Mã Voucher' : 'Voucher Code'} *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  required
                  placeholder="VD: SUMMER2024"
                  style={{ textTransform: 'uppercase' }}
                />
              </div>

              <div className="form-group">
                <label>{language === 'vi' ? 'Mô tả' : 'Description'} *</label>
                <textarea
                  className="form-control"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows="2"
                  placeholder={language === 'vi' ? 'Mô tả về voucher' : 'Describe the voucher'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>{language === 'vi' ? 'Loại giảm giá' : 'Discount Type'} *</label>
                  <select
                    className="form-control"
                    value={formData.discountType}
                    onChange={(e) => setFormData({...formData, discountType: e.target.value})}
                    required
                  >
                    <option value="percentage">{language === 'vi' ? 'Phần trăm (%)' : 'Percentage (%)'}</option>
                    <option value="fixed">{language === 'vi' ? 'Số tiền cố định (₫)' : 'Fixed Amount (₫)'}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{language === 'vi' ? 'Giá trị giảm' : 'Discount Value'} *</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                    required
                    min="0"
                    step={formData.discountType === 'percentage' ? '1' : '1000'}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>{language === 'vi' ? 'Đơn hàng tối thiểu (₫)' : 'Min Purchase (₫)'}</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.minPurchase}
                    onChange={(e) => setFormData({...formData, minPurchase: e.target.value})}
                    min="0"
                    step="1000"
                  />
                </div>

                <div className="form-group">
                  <label>{language === 'vi' ? 'Giảm tối đa (₫)' : 'Max Discount (₫)'}</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({...formData, maxDiscount: e.target.value})}
                    min="0"
                    step="1000"
                    placeholder={language === 'vi' ? 'Không giới hạn' : 'Unlimited'}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{language === 'vi' ? 'Giới hạn sử dụng' : 'Usage Limit'}</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({...formData, usageLimit: e.target.value})}
                  min="1"
                  placeholder={language === 'vi' ? 'Không giới hạn' : 'Unlimited'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>{language === 'vi' ? 'Hiệu lực từ' : 'Valid From'} *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.validFrom}
                    onChange={(e) => setFormData({...formData, validFrom: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{language === 'vi' ? 'Hiệu lực đến' : 'Valid To'} *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.validTo}
                    onChange={(e) => setFormData({...formData, validTo: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span>{language === 'vi' ? 'Kích hoạt voucher' : 'Activate voucher'}</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  {editingVoucher 
                    ? (language === 'vi' ? '💾 Cập nhật' : '💾 Update')
                    : (language === 'vi' ? '✨ Tạo Voucher' : '✨ Create Voucher')
                  }
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                  style={{ 
                    flex: 1, 
                    background: '#6c757d',
                    color: 'white'
                  }}
                >
                  {language === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVouchers;

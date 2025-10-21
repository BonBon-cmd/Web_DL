import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getTours, createTour, updateTour, deleteTour } from '../../services/api';

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    maxGroupSize: '',
    difficulty: 'medium',
    location: {
      city: '',
      country: '',
      address: ''
    }
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await getTours({ limit: 100 });
      setTours(response.data.data);
    } catch (error) {
      toast.error('Không thể tải danh sách tours');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTour) {
        await updateTour(editingTour._id, formData);
        toast.success('Cập nhật tour thành công');
      } else {
        await createTour(formData);
        toast.success('Tạo tour mới thành công');
      }
      setShowModal(false);
      resetForm();
      fetchTours();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Thao tác thất bại');
    }
  };

  const handleEdit = (tour) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title,
      description: tour.description,
      price: tour.price,
      duration: tour.duration,
      maxGroupSize: tour.maxGroupSize,
      difficulty: tour.difficulty,
      location: tour.location || { city: '', country: '', address: '' }
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa tour này?')) {
      try {
        await deleteTour(id);
        toast.success('Xóa tour thành công');
        fetchTours();
      } catch (error) {
        toast.error('Không thể xóa tour');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      maxGroupSize: '',
      difficulty: 'medium',
      location: { city: '', country: '', address: '' }
    });
    setEditingTour(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [locationField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Quản lý Tours</h1>
        <button onClick={() => { resetForm(); setShowModal(true); }} className="btn btn-primary">
          + Tạo Tour mới
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tên Tour</th>
              <th>Địa điểm</th>
              <th>Giá</th>
              <th>Thời gian</th>
              <th>Độ khó</th>
              <th>Đánh giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tours.map(tour => (
              <tr key={tour._id}>
                <td>
                  <strong>{tour.title}</strong>
                </td>
                <td>{tour.location?.city}, {tour.location?.country}</td>
                <td>${tour.price}</td>
                <td>{tour.duration} ngày</td>
                <td>
                  <span className={`badge badge-${
                    tour.difficulty === 'easy' ? 'success' :
                    tour.difficulty === 'medium' ? 'warning' : 'danger'
                  }`}>
                    {tour.difficulty}
                  </span>
                </td>
                <td>⭐ {tour.ratingsAverage || 0} ({tour.ratingsQuantity || 0})</td>
                <td>
                  <button 
                    onClick={() => handleEdit(tour)}
                    className="btn btn-primary"
                    style={{ padding: '0.3rem 0.8rem', marginRight: '0.5rem' }}
                  >
                    Sửa
                  </button>
                  <button 
                    onClick={() => handleDelete(tour._id)}
                    className="btn btn-danger"
                    style={{ padding: '0.3rem 0.8rem' }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); resetForm(); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingTour ? 'Sửa Tour' : 'Tạo Tour mới'}</h2>
              <button className="modal-close" onClick={() => { setShowModal(false); resetForm(); }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên Tour *</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Mô tả *</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Giá ($) *</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Thời gian (ngày) *</label>
                  <input
                    type="number"
                    name="duration"
                    className="form-control"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Số người tối đa *</label>
                  <input
                    type="number"
                    name="maxGroupSize"
                    className="form-control"
                    value={formData.maxGroupSize}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Độ khó *</label>
                  <select
                    name="difficulty"
                    className="form-control"
                    value={formData.difficulty}
                    onChange={handleChange}
                  >
                    <option value="easy">Dễ</option>
                    <option value="medium">Trung bình</option>
                    <option value="difficult">Khó</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Thành phố *</label>
                  <input
                    type="text"
                    name="location.city"
                    className="form-control"
                    value={formData.location.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Quốc gia *</label>
                  <input
                    type="text"
                    name="location.country"
                    className="form-control"
                    value={formData.location.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name="location.address"
                  className="form-control"
                  value={formData.location.address}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                {editingTour ? 'Cập nhật' : 'Tạo mới'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTours;

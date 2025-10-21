import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getBookings, updateBooking, createBooking, getTours } from '../../services/api';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tours, setTours] = useState([]);
  const [newBooking, setNewBooking] = useState({
    tour: '',
    userEmail: '',
    bookingDate: '',
    numberOfGuests: 1,
    specialRequests: '',
    status: 'pending',
    paymentStatus: 'unpaid'
  });

  useEffect(() => {
    fetchBookings();
    fetchTours();
  }, [filter]);

  const fetchTours = async () => {
    try {
      const response = await getTours();
      setTours(response.data.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const params = filter ? { status: filter } : {};
      const response = await getBookings(params);
      setBookings(response.data.data);
    } catch (error) {
      toast.error('Không thể tải danh sách bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBooking(bookingId, { status: newStatus });
      toast.success('Cập nhật trạng thái thành công');
      fetchBookings();
    } catch (error) {
      toast.error('Không thể cập nhật trạng thái');
    }
  };

  const handlePaymentChange = async (bookingId, newPaymentStatus) => {
    try {
      await updateBooking(bookingId, { paymentStatus: newPaymentStatus });
      toast.success('Cập nhật thanh toán thành công');
      fetchBookings();
    } catch (error) {
      toast.error('Không thể cập nhật thanh toán');
    }
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    
    if (!newBooking.tour || !newBooking.userEmail || !newBooking.bookingDate) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      // Find user by email first (you'll need to create this endpoint)
      const bookingData = {
        tour: newBooking.tour,
        bookingDate: newBooking.bookingDate,
        numberOfGuests: parseInt(newBooking.numberOfGuests),
        specialRequests: newBooking.specialRequests,
        status: newBooking.status,
        paymentStatus: newBooking.paymentStatus,
        userEmail: newBooking.userEmail
      };

      await createBooking(bookingData);
      toast.success('Tạo booking thành công');
      setShowCreateModal(false);
      setNewBooking({
        tour: '',
        userEmail: '',
        bookingDate: '',
        numberOfGuests: 1,
        specialRequests: '',
        status: 'pending',
        paymentStatus: 'unpaid'
      });
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không thể tạo booking');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-warning',
      confirmed: 'badge-success',
      cancelled: 'badge-danger',
      completed: 'badge-info'
    };
    return badges[status] || 'badge-info';
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Quản lý Bookings</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          + Tạo Booking Mới
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ marginRight: '1rem' }}>Lọc theo trạng thái:</label>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
        >
          <option value="">Tất cả</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Khách hàng</th>
              <th>Tour</th>
              <th>Ngày đặt</th>
              <th>Số người</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thanh toán</th>
              <th>Yêu cầu đặc biệt</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td style={{ fontSize: '0.85rem', color: '#666' }}>
                  {booking._id.substring(0, 8)}...
                </td>
                <td>
                  <strong>{booking.user?.name}</strong>
                  <br />
                  <small>{booking.user?.email}</small>
                  <br />
                  <small>{booking.user?.phone}</small>
                </td>
                <td>
                  <strong>{booking.tour?.title}</strong>
                  <br />
                  <small>{booking.tour?.location?.city}</small>
                </td>
                <td>{new Date(booking.bookingDate).toLocaleDateString('vi-VN')}</td>
                <td>{booking.numberOfGuests}</td>
                <td>${booking.totalPrice}</td>
                <td>
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    className={`badge ${getStatusBadge(booking.status)}`}
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td>
                  <select
                    value={booking.paymentStatus}
                    onChange={(e) => handlePaymentChange(booking._id, e.target.value)}
                    className={`badge ${booking.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </td>
                <td style={{ maxWidth: '200px', fontSize: '0.9rem' }}>
                  {booking.specialRequests || '-'}
                </td>
                <td>
                  <small style={{ color: '#666' }}>
                    {new Date(booking.createdAt).toLocaleDateString('vi-VN')}
                  </small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <p style={{ textAlign: 'center', padding: '2rem' }}>Không có booking nào</p>
      )}

      {/* Create Booking Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '10px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Tạo Booking Mới</h2>
            <form onSubmit={handleCreateBooking}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Email khách hàng *
                </label>
                <input
                  type="email"
                  value={newBooking.userEmail}
                  onChange={(e) => setNewBooking({...newBooking, userEmail: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                  placeholder="user@example.com"
                  required
                />
                <small style={{ color: '#666' }}>Email của khách hàng đã đăng ký trong hệ thống</small>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Tour *
                </label>
                <select
                  value={newBooking.tour}
                  onChange={(e) => setNewBooking({...newBooking, tour: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                  required
                >
                  <option value="">-- Chọn tour --</option>
                  {tours.map(tour => (
                    <option key={tour._id} value={tour._id}>
                      {tour.title} - ${tour.price} (Max: {tour.maxGroupSize} người)
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Ngày đặt tour *
                </label>
                <input
                  type="date"
                  value={newBooking.bookingDate}
                  onChange={(e) => setNewBooking({...newBooking, bookingDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Số người *
                </label>
                <input
                  type="number"
                  value={newBooking.numberOfGuests}
                  onChange={(e) => setNewBooking({...newBooking, numberOfGuests: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                  min="1"
                  required
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Trạng thái
                </label>
                <select
                  value={newBooking.status}
                  onChange={(e) => setNewBooking({...newBooking, status: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Thanh toán
                </label>
                <select
                  value={newBooking.paymentStatus}
                  onChange={(e) => setNewBooking({...newBooking, paymentStatus: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Yêu cầu đặc biệt
                </label>
                <textarea
                  value={newBooking.specialRequests}
                  onChange={(e) => setNewBooking({...newBooking, specialRequests: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    minHeight: '100px'
                  }}
                  placeholder="Ghi chú về yêu cầu đặc biệt..."
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#22c55e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Tạo Booking
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;

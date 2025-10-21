import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { getBookings, deleteBooking } from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../translations';

const MyBookings = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language].myBookings;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getBookings();
      setBookings(response.data.data);
    } catch (error) {
      toast.error(language === 'vi' ? 'Không thể tải danh sách bookings' : 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t.cancelConfirm)) {
      try {
        await deleteBooking(id);
        toast.success(t.cancelSuccess);
        fetchBookings();
      } catch (error) {
        toast.error(t.cancelError);
      }
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

  const getStatusLabel = (status) => {
    const statusMap = {
      pending: t.statusPending,
      confirmed: t.statusConfirmed,
      cancelled: t.statusCancelled,
      completed: t.statusCompleted
    };
    return statusMap[status] || status;
  };

  const getPaymentLabel = (paymentStatus) => {
    return paymentStatus === 'paid' 
      ? (language === 'vi' ? 'Đã thanh toán' : 'Paid') 
      : (language === 'vi' ? 'Chưa thanh toán' : 'Unpaid');
  };

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };

  if (loading) {
    return <div className="loading">{language === 'vi' ? 'Đang tải...' : 'Loading...'}</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>{t.title}</h1>

      {bookings.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>{t.noBookings}</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>{t.tourName}</th>
                <th>{t.bookingDate}</th>
                <th>{t.numberOfPeople}</th>
                <th>{t.totalPrice}</th>
                <th>{t.status}</th>
                <th>{language === 'vi' ? 'Thanh toán' : 'Payment'}</th>
                <th>{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id}>
                  <td>
                    <strong>{booking.tour?.title}</strong>
                    <br />
                    <small>{booking.tour?.location?.city}</small>
                  </td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}</td>
                  <td>{booking.numberOfGuests}</td>
                  <td>
                    {booking.voucherApplied ? (
                      <div>
                        <div style={{ fontSize: '0.85rem', color: '#999', textDecoration: 'line-through' }}>
                          {formatVND(booking.originalPrice)}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#28a745', fontWeight: '600' }}>
                          🎟️ -{formatVND(booking.discountAmount)}
                        </div>
                        <strong style={{ color: '#667eea' }}>{formatVND(booking.finalPrice)}</strong>
                      </div>
                    ) : (
                      <strong>{formatVND(booking.totalPrice)}</strong>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(booking.status)}`}>
                      {getStatusLabel(booking.status)}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${booking.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                      {getPaymentLabel(booking.paymentStatus)}
                    </span>
                  </td>
                  <td>
                    {booking.status === 'pending' && (
                      <button 
                        onClick={() => handleDelete(booking._id)}
                        className="btn btn-danger"
                        style={{ padding: '0.3rem 0.8rem' }}
                      >
                        {language === 'vi' ? 'Hủy' : 'Cancel'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;

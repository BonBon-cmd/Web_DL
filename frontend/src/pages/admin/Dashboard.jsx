import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDashboardStats } from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUsers, FaMapMarkedAlt, FaTicketAlt, FaDollarSign } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data.data);
    } catch (error) {
      toast.error('Không thể tải thống kê');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="container dashboard">
      <h1 style={{ marginBottom: '2rem' }}>Dashboard - Thống kê tổng quan</h1>

      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>{stats?.overview?.totalUsers || 0}</h3>
            <p>Người dùng</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaMapMarkedAlt />
          </div>
          <div className="stat-info">
            <h3>{stats?.overview?.totalTours || 0}</h3>
            <p>Tours</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaTicketAlt />
          </div>
          <div className="stat-info">
            <h3>{stats?.overview?.totalBookings || 0}</h3>
            <p>Bookings</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaDollarSign />
          </div>
          <div className="stat-info">
            <h3>${stats?.overview?.totalRevenue?.toFixed(2) || 0}</h3>
            <p>Doanh thu</p>
          </div>
        </div>
      </div>

      {/* Monthly Bookings Chart */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Biểu đồ bookings theo tháng</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats?.monthlyBookings || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={(item) => `${item._id.month}/${item._id.year}`} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#667eea" name="Số bookings" />
            <Bar dataKey="revenue" fill="#764ba2" name="Doanh thu ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Tours */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Top 5 Tours phổ biến</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Tour</th>
                <th>Số bookings</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {stats?.topTours?.map((tour, index) => (
                <tr key={index}>
                  <td>{tour.tourTitle}</td>
                  <td>{tour.bookingCount}</td>
                  <td>${tour.totalRevenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bookings by Status */}
      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Bookings theo trạng thái</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {stats?.bookingsByStatus?.map((item, index) => (
            <div key={index} style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '10px', textAlign: 'center' }}>
              <h3>{item.count}</h3>
              <p style={{ textTransform: 'capitalize' }}>{item._id}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Bookings gần đây</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Tour</th>
                <th>Ngày</th>
                <th>Số người</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentBookings?.slice(0, 10).map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.user?.name}</td>
                  <td>{booking.tour?.title}</td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString('vi-VN')}</td>
                  <td>{booking.numberOfGuests}</td>
                  <td>${booking.totalPrice}</td>
                  <td>
                    <span className={`badge badge-${
                      booking.status === 'confirmed' ? 'success' :
                      booking.status === 'pending' ? 'warning' :
                      booking.status === 'cancelled' ? 'danger' : 'info'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

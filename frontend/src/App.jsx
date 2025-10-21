import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { LanguageProvider } from './context/LanguageContext';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminTours from './pages/admin/Tours';
import AdminBookings from './pages/admin/Bookings';
import AdminVouchers from './pages/admin/Vouchers';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetail />} />

          {/* Protected User Routes */}
          <Route path="/my-bookings" element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/tours" element={
            <AdminRoute>
              <AdminTours />
            </AdminRoute>
          } />
          <Route path="/admin/bookings" element={
            <AdminRoute>
              <AdminBookings />
            </AdminRoute>
          } />
          <Route path="/admin/vouchers" element={
            <AdminRoute>
              <AdminVouchers />
            </AdminRoute>
          } />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;

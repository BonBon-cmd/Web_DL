import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTours } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../translations';
import TourCard from '../components/TourCard';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    difficulty: '',
    minPrice: '',
    maxPrice: '',
    sort: '-createdAt'
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  
  const t = translations[language].tours;
  const tCommon = translations[language].common;
  const tTour = translations[language].tour;

  useEffect(() => {
    fetchTours();
  }, [filters, page]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await getTours({ ...filters, page, limit: 9 });
      setTours(response.data.data);
      setTotalPages(response.data.pages);
    } catch (error) {
      toast.error(language === 'vi' ? 'Không thể tải danh sách tours' : 'Cannot load tours list');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
    setPage(1);
  };

  const handleBook = (tour) => {
    if (!user) {
      toast.warning(language === 'vi' ? 'Vui lòng đăng nhập để đặt tour' : 'Please login to book tour');
      navigate('/login');
      return;
    }
    navigate(`/tours/${tour._id}`);
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>{t.title}</h1>

      <div className="search-bar">
        <input
          type="text"
          name="search"
          placeholder={t.searchPlaceholder}
          value={filters.search}
          onChange={handleFilterChange}
        />
        
        <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
          <option value="">{t.allDifficulties}</option>
          <option value="easy">{tTour.difficulty.easy}</option>
          <option value="medium">{tTour.difficulty.medium}</option>
          <option value="difficult">{tTour.difficulty.difficult}</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder={language === 'vi' ? 'Giá tối thiểu' : 'Min price'}
          value={filters.minPrice}
          onChange={handleFilterChange}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder={language === 'vi' ? 'Giá tối đa' : 'Max price'}
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />

        <select name="sort" value={filters.sort} onChange={handleFilterChange}>
          <option value="-createdAt">{language === 'vi' ? 'Mới nhất' : 'Newest'}</option>
          <option value="price">{t.priceAsc}</option>
          <option value="-price">{t.priceDesc}</option>
          <option value="-ratingsAverage">{t.ratingDesc}</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">{tCommon.loading}</div>
      ) : tours.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>{t.noToursFound}</p>
      ) : (
        <>
          <div className="grid grid-3">
            {tours.map(tour => (
              <TourCard key={tour._id} tour={tour} onBook={handleBook} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                {language === 'vi' ? 'Trước' : 'Previous'}
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={page === i + 1 ? 'active' : ''}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                {language === 'vi' ? 'Sau' : 'Next'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tours;

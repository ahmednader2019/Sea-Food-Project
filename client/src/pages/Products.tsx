import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTranslation } from '../hooks/useTranslation';

// Product data with categories
const allProducts = [
  { img: '150-37.webp', name: 'Longtail Tuna', category: 'freshFish' },
  { img: '150-47.webp', name: 'Tilapia', category: 'freshFish' },
  { img: '150-52.webp', name: 'Barracuda', category: 'freshFish' },
  { img: '150-57.webp', name: 'Mullet', category: 'freshFish' },
  { img: '150-62.webp', name: 'Shrimp', category: 'shellfish' },
  { img: '150-67.webp', name: 'Parrotfish', category: 'freshFish' },
  { img: '150-75.webp', name: 'Spanish Mackerel', category: 'frozenFish' },
  { img: '150-86.webp', name: 'Salmon', category: 'imported' },
  { img: '150-91.webp', name: 'Gilt-Head Bream', category: 'freshFish' },
  { img: '150-96.webp', name: 'Red Snapper', category: 'freshFish' },
  { img: '150-101.webp', name: 'Rabbitfish', category: 'freshFish' },
  { img: '150-106.webp', name: 'Indian Mackerel', category: 'frozenFish' },
  { img: '150-111.webp', name: 'Emperor Fish', category: 'freshFish' },
  { img: '150-116.webp', name: 'Grouper', category: 'freshFish' },
  { img: '150-121.webp', name: 'Sardine', category: 'frozenFish' },
  { img: '150-126.webp', name: 'Sole Fish', category: 'freshFish' },
  { img: '150-131.webp', name: 'Emperor Fish', category: 'freshFish' },
  { img: '150-136.webp', name: 'European Sea Bass', category: 'imported' },
  { img: '150-141.webp', name: 'Small Shrimp', category: 'shellfish' },
  { img: '150-146.webp', name: 'Sea Bass', category: 'freshFish' },
  { img: '150-221.webp', name: 'Threadfin Bream', category: 'freshFish' },
  { img: '150-223.webp', name: 'Crab', category: 'shellfish' },
  { img: '150-228.webp', name: 'Coral Trout', category: 'freshFish' },
  { img: '150-235.webp', name: 'Arabian Grouper', category: 'freshFish' },
  { img: '150-233.webp', name: 'Coral Trout (Soft Flesh)', category: 'freshFish' }
];

export default function Products() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Filter products based on search term and selected filter
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Filter by category
      const matchesCategory = selectedFilter === 'all' || product.category === selectedFilter;

      // Filter by search term
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedFilter]);

  const handleSearch = () => {
    // The filtering is already done by the useMemo hook
    // This function can be used for additional actions if needed
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content hero-animate">
          <h1 className="hero-title animate-fadeInDown">{t('products.hero.title')}</h1>
          <p className="hero-description animate-fadeInUp delay-200">
            {t('products.hero.description1')}<br />
            {t('products.hero.description2')}
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="search-container animate-scaleIn delay-400">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder={t('products.search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-btn" onClick={handleSearch}>
            <img src="/assets/63-62.svg" alt="search" className="search-icon" />
            <span>{t('products.search.button')}</span>
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-section scroll-animate">
        <div className="filter-buttons" data-stagger="100">
          <button
            className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            {t('products.filters.all')}
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'freshFish' ? 'active' : ''}`}
            onClick={() => handleFilterClick('freshFish')}
          >
            {t('products.filters.freshFish')}
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'frozenFish' ? 'active' : ''}`}
            onClick={() => handleFilterClick('frozenFish')}
          >
            {t('products.filters.frozenFish')}
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'shellfish' ? 'active' : ''}`}
            onClick={() => handleFilterClick('shellfish')}
          >
            {t('products.filters.shellfish')}
          </button>
          <button
            className={`filter-btn ${selectedFilter === 'imported' ? 'active' : ''}`}
            onClick={() => handleFilterClick('imported')}
          >
            {t('products.filters.imported')}
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-section">
        <div className="container-fluid px-5">
          <div className="row g-4" data-stagger="50">
            {/* Product Cards */}
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6">
                  <div className="product-card">
                    <img src={`/assets/${product.img}`} alt={product.name} className="product-img" />
                    <div className="product-name">{product.name}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer
        logoImage="/assets/63-82.webp"
        logoText="الخلجان العربية"
        copyrightIcon="/assets/63-86.svg"
      />
    </>
  );
}


import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTranslation } from '../hooks/useTranslation';

// Product data with categories (using translation keys)
const allProducts = [
  { img: '150-37.webp', nameKey: 'longtailTuna', category: 'freshFish' },
  { img: '150-47.webp', nameKey: 'tilapia', category: 'freshFish' },
  { img: '150-52.webp', nameKey: 'barracuda', category: 'freshFish' },
  { img: '150-57.webp', nameKey: 'mullet', category: 'freshFish' },
  { img: '150-62.webp', nameKey: 'shrimp', category: 'shellfish' },
  { img: '150-67.webp', nameKey: 'parrotfish', category: 'freshFish' },
  { img: '150-75.webp', nameKey: 'spanishMackerel', category: 'frozenFish' },
  { img: '150-86.webp', nameKey: 'salmon', category: 'imported' },
  { img: '150-91.webp', nameKey: 'giltHeadBream', category: 'freshFish' },
  { img: '150-96.webp', nameKey: 'redSnapper', category: 'freshFish' },
  { img: '150-101.webp', nameKey: 'rabbitfish', category: 'freshFish' },
  { img: '150-106.webp', nameKey: 'indianMackerel', category: 'frozenFish' },
  { img: '150-111.webp', nameKey: 'emperorFish', category: 'freshFish' },
  { img: '150-121.webp', nameKey: 'sardine', category: 'frozenFish' },
  { img: '150-126.webp', nameKey: 'soleFish', category: 'freshFish' },
  { img: '150-136.webp', nameKey: 'europeanSeaBass', category: 'imported' },
  { img: '150-141.webp', nameKey: 'smallShrimp', category: 'shellfish' },
  { img: '150-146.webp', nameKey: 'seaBass', category: 'freshFish' },
  { img: '150-221.webp', nameKey: 'threadfinBream', category: 'freshFish' },
  { img: '150-223.webp', nameKey: 'crab', category: 'shellfish' },
  { img: '150-228.webp', nameKey: 'coralTrout', category: 'freshFish' }
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

      // Filter by search term (search in translated product name)
      const productName = t(`products.items.${product.nameKey}`);
      const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedFilter, t]);

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
                <div key={index} className="col-lg col-md-3 col-sm-4 col-6 product-col">
                  <div className="product-card">
                    <img src={`/assets/${product.img}`} alt={t(`products.items.${product.nameKey}`)} className="product-img" />
                    <div className="product-name">{t(`products.items.${product.nameKey}`)}</div>
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
        logoImage="/assets/19-227.webp"
        logoText="الخلجان العربية"
        copyrightIcon="/assets/63-86.svg"
      />
    </>
  );
}


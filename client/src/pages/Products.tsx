import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Products() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content hero-animate">
          <h1 className="hero-title animate-fadeInDown">Discover Our Premium Seafood Selection</h1>
          <p className="hero-description animate-fadeInUp delay-200">
            Explore A Wide Variety Of Fresh And Frozen Seafood — Carefully Sourced, Processed, And Delivered With The Highest Standards Of Quality And Safety.<br />
            From Local Red Sea Treasures To Imported Favorites, We Provide The Perfect Catch For Every Taste And Need.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="search-container animate-scaleIn delay-400">
        <div className="search-wrapper">
          <input type="text" className="search-input" placeholder="search..." />
          <button className="search-btn">
            <img src="/assets/63-62.svg" alt="search" className="search-icon" />
            <span>search</span>
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-section scroll-animate">
        <div className="filter-buttons" data-stagger="100">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Fresh Fish</button>
          <button className="filter-btn">Frozen Fish</button>
          <button className="filter-btn">Shellfish</button>
          <button className="filter-btn">Imported</button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-section">
        <div className="container-fluid px-5">
          <div className="row g-4" data-stagger="50">
            {/* Product Cards */}
            {[
              { img: '150-37.webp', name: 'Longtail Tuna' },
              { img: '150-47.webp', name: 'Tilapia' },
              { img: '150-52.webp', name: 'Barracuda' },
              { img: '150-57.webp', name: 'Mullet' },
              { img: '150-62.webp', name: 'Shrimp' },
              { img: '150-67.webp', name: 'Parrotfish' },
              { img: '150-75.webp', name: 'Spanish Mackerel' },
              { img: '150-86.webp', name: 'Salmon' },
              { img: '150-91.webp', name: 'Gilt-Head Bream' },
              { img: '150-96.webp', name: 'Red Snapper' },
              { img: '150-101.webp', name: 'Rabbitfish' },
              { img: '150-106.webp', name: 'Indian Mackerel' },
              { img: '150-111.webp', name: 'Emperor Fish' },
              { img: '150-116.webp', name: 'Grouper' },
              { img: '150-121.webp', name: 'Sardine' },
              { img: '150-126.webp', name: 'Sole Fish' },
              { img: '150-131.webp', name: 'Emperor Fish' },
              { img: '150-136.webp', name: 'European Sea Bass' },
              { img: '150-141.webp', name: 'Small Shrimp' },
              { img: '150-146.webp', name: 'Sea Bass' },
              { img: '150-221.webp', name: 'Threadfin Bream' },
              { img: '150-223.webp', name: 'Crab' },
              { img: '150-228.webp', name: 'Coral Trout' },
              { img: '150-235.webp', name: 'Arabian Grouper' },
              { img: '150-233.webp', name: 'Coral Trout (Soft Flesh)' }
            ].map((product, index) => (
              <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6">
                <div className="product-card">
                  <img src={`/assets/${product.img}`} alt={product.name} className="product-img" />
                  <div className="product-name">{product.name}</div>
                </div>
              </div>
            ))}
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


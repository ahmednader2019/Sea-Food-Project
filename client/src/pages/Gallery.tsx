import Navigation from '@/components/Navigation';
import { Link } from 'wouter';

export default function Gallery() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="gallery-hero-section position-relative">
        <div className="hero-overlay"></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="gallery-hero-title mb-4 animate-fadeInUp">
                Discover The World Behind Our Seafood
              </h1>
              <p className="gallery-hero-description mb-5 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                Take A Visual Journey Through Our Facilities, Daily Operations, And Premium Seafood Products.
                <br />
                Each Photo Captures Our Dedication To Freshness, Quality, And Excellence In Every Step — From The Sea To Your Table.
              </p>
              <a href="#facilities" className="btn btn-primary btn-lg gallery-cta-btn animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                Explore Our Gallery ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Inside Our Facilities Section */}
      <section id="facilities" className="py-5 my-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-10">
              <h2 className="section-title mb-4 animate-on-scroll">Inside Our Facilities</h2>
              <p className="section-description animate-on-scroll">
                A Closer Look At Our Modern Seafood Facilities — From Cold Storage And Processing Areas To Packaging And Logistics.
                <br />
                Every Detail Reflects Our Commitment To Maintaining The Highest Standards Of Hygiene, Freshness, And Efficiency.
              </p>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-lg-4 col-md-6">
              <div className="facility-card animate-on-scroll">
                <img src="/assets/77-318.webp" alt="Frozen Department" className="facility-image" />
                <div className="facility-overlay">
                  <h3 className="facility-title">Frozen Department</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="facility-card animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                <img src="/assets/77-322.webp" alt="Refrigerated Fresh Section" className="facility-image" />
                <div className="facility-overlay">
                  <h3 className="facility-title">Refrigerated Fresh Section</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="facility-card animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                <img src="/assets/141-15.webp" alt="Refrigerated Delivery Service" className="facility-image" />
                <div className="facility-overlay">
                  <h3 className="facility-title">Refrigerated Delivery Service</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-end">
              <Link href="/about" className="gradient-link animate-on-scroll">
                Learn More About Us
                <img src="/assets/77-331.svg" alt="Arrow" className="ms-2" style={{ width: '24px', height: '24px' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Water Splash */}
      <img src="/assets/77-279.webp" alt="Water Splash" className="water-splash-decoration" />

      {/* Freshness You Can See Section */}
      <section className="py-5 my-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-10">
              <h2 className="section-title mb-4 animate-on-scroll">Freshness You Can See</h2>
              <p className="section-description animate-on-scroll">
                Explore Our Diverse Selection Of Fresh And Frozen Seafood — Carefully Handled To Preserve Its Natural Taste And Texture.
                <br />
                From Red Sea Fish To Imported Delicacies, Every Product Is A Reflection Of Our Passion For Quality.
              </p>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-lg col-md-4 col-6">
              <div className="product-gallery-item animate-on-scroll">
                <img src="/assets/77-340.webp" alt="Fresh Seafood" className="product-gallery-image" />
              </div>
            </div>
            <div className="col-lg col-md-4 col-6">
              <div className="product-gallery-item animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                <img src="/assets/77-341.webp" alt="Fresh Seafood" className="product-gallery-image" />
              </div>
            </div>
            <div className="col-lg col-md-4 col-6">
              <div className="product-gallery-item animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                <img src="/assets/77-342.webp" alt="Fresh Seafood" className="product-gallery-image" />
              </div>
            </div>
            <div className="col-lg col-md-4 col-6">
              <div className="product-gallery-item animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                <img src="/assets/77-343.webp" alt="Fresh Seafood" className="product-gallery-image" />
              </div>
            </div>
            <div className="col-lg col-md-4 col-6">
              <div className="product-gallery-item animate-on-scroll" style={{ animationDelay: '0.4s' }}>
                <img src="/assets/77-344.webp" alt="Fresh Seafood" className="product-gallery-image" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-end">
              <Link href="/products" className="gradient-link animate-on-scroll">
                Explore Our Products
                <img src="/assets/77-347.svg" alt="Arrow" className="ms-2" style={{ width: '24px', height: '24px' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-overlay"></div>
        <div className="container position-relative">
          <div className="row">
            <div className="col-lg-5 mb-4">
              <div className="footer-logo-section mb-4">
                <img src="/assets/77-283.webp" alt="Arabian Gulf Logo" className="footer-logo mb-3" />
                <p className="footer-arabic-text">الخلجان العربية</p>
              </div>
              <p className="footer-description mb-4">
                Arabian gulf is a Saudi-based seafood company committed to providing high-quality, fresh, and sustainable fish and marine products.
                <br /><br />
                With years of experience in the industry, we ensure excellence from sea to table — trusted by restaurants, hotels, and families across Saudi Arabia.
              </p>
              <div className="footer-social-icons">
                <a href="#" className="social-icon">
                  <img src="/assets/77-294.webp" alt="Instagram" />
                </a>
                <a href="#" className="social-icon">
                  <img src="/assets/77-296.webp" alt="Facebook" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <h4 className="footer-heading mb-4">Quick links</h4>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/services">Our Services</Link></li>
                <li><Link href="/about">Who Are We?</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/gallery">Gallery</Link></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <h4 className="footer-heading mb-4">Contacts</h4>
              <div className="footer-contact">
                <p className="footer-contact-label">Official address:</p>
                <p className="footer-contact-info">Toroghat Fishing Trading, 3990 AR Riyadh Rd</p>

                <p className="footer-contact-label mt-3">Contact us:</p>
                <p className="footer-contact-info">+966 59 975 4996</p>

                <p className="footer-contact-label mt-3">Email:</p>
                <p className="footer-contact-info">Ahmed@arabian-gulfs.com</p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12 text-center">
              <p className="footer-copyright">
                <img src="/assets/77-287.svg" alt="Copyright" className="me-2" style={{ width: '24px', height: '24px' }} />
                All rights reserved Arabian gulf
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


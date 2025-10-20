import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'wouter';

export default function Services() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="services-hero-section">
        <div className="services-hero-content">
          <h1 className="services-hero-title">
            We Offer A Full Range Of Seafood Services Designed To Meet The Needs Of Restaurants, Hotels, And Distributors Across Saudi Arabia And Other Countries.
          </h1>
        </div>
      </section>

      {/* Service Cards Section */}
      <div className="service-cards-section">
        <div className="container-fluid px-5">
          <div className="row g-3 justify-content-center" data-stagger="150">
            {/* Service Card 1 */}
            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <h3 className="service-card-title">Fresh Fish Supply</h3>
                <p className="service-card-description">
                  Daily catch delivered directly from local and international sources.
                </p>
              </div>
            </div>
            
            {/* Service Card 2 */}
            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <h3 className="service-card-title">Seafood Processing</h3>
                <p className="service-card-description">
                  Cleaned, cut, and packed with international hygiene standards.
                </p>
              </div>
            </div>
            
            {/* Service Card 3 */}
            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <h3 className="service-card-title">Cold Storage & Logistics</h3>
                <p className="service-card-description">
                  Maintained at ideal temperatures to preserve freshness.
                </p>
              </div>
            </div>
            
            {/* Service Card 4 */}
            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <h3 className="service-card-title">Wholesale & Distribution</h3>
                <p className="service-card-description">
                  Serving major seafood retailers and hospitality partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="why-choose-section">
        <div className="container-fluid px-5">
          <div className="row align-items-center g-4">
            {/* Left Content - Bordered Box */}
            <div className="col-lg-6 scroll-animate">
              <div className="why-choose-content-box">
                <h2 className="why-choose-title">Why Choose Our Seafood Services ?</h2>
                <p className="why-choose-text">
                  With A Commitment To Freshness, Precision, And Reliability, Our Seafood Services Are Designed To Meet The Highest Industry Standards.
                </p>
                <p className="why-choose-text">
                  From Sourcing To Packaging And Delivery, We Handle Every Step With Care — Ensuring That Every Client Receives The Best Quality Seafood, On Time And In Perfect Condition.
                </p>
                <Link href="/about" className="learn-more-btn">
                  <span className="learn-more-text">Learn More About Us</span>
                  <img src="/assets/59-22.svg" alt="arrow" className="learn-more-icon" />
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 scroll-animate delay-200">
              <img src="/assets/143-97.webp" alt="Packaged Seafood" className="why-choose-image" />
            </div>
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


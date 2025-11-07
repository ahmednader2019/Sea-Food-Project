import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { useTranslation } from '../hooks/useTranslation';

export default function Gallery() {
  const { t } = useTranslation();

  // Reinitialize scroll animations when component mounts
  useEffect(() => {
    if ((window as any).reinitializeScrollAnimations) {
      (window as any).reinitializeScrollAnimations();
    }
  }, []);

  return (
    <>
      <Navigation />
      {/* Hero Section */}
      <section className="gallery-hero-section position-relative">
        <div className="hero-overlay"></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="gallery-hero-title mb-4 animate-fadeInUp">
                {t('gallery.hero.title')}
              </h1>
              <p className="gallery-hero-description mb-5 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                {t('gallery.hero.description1')}
                <br />
                {t('gallery.hero.description2')}
              </p>``
              <a href="#facilities" className="btn btn-primary btn-lg gallery-cta-btn animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                {t('gallery.hero.cta')}
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
              <div className="scroll-animate" style={{ transitionDelay: '0ms' }}>
                <h2 className="section-title mb-4">{t('gallery.facilities.title')}</h2>
                <p className="section-description">
                  {t('gallery.facilities.description1')}
                  <br />
                  {t('gallery.facilities.description2')}
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-lg-4 col-md-6">
              <div className="facility-card scroll-animate" style={{ transitionDelay: '0ms' }}>
                <img src="/assets/77-318.webp" alt="Frozen Department" className="facility-image" />
                <div className="facility-overlay">
                  <h3 className="facility-title">{t('gallery.facilities.frozen')}</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="facility-card scroll-animate" style={{ transitionDelay: '200ms' }}>
                <img src="/assets/77-322.webp" alt="Refrigerated Fresh Section" className="facility-image" />
                <div className="facility-overlay">
                  <h3 className="facility-title">{t('gallery.facilities.refrigerated')}</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="facility-card scroll-animate" style={{ transitionDelay: '400ms' }}>
                <img src="/assets/141-15.webp" alt="Refrigerated Delivery Service" className="facility-image" />
                <div className="facility-overlay">
                  <h3 className="facility-title">{t('gallery.facilities.delivery')}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-end">
              <Link href="/about" className="gradient-link scroll-animate" style={{ transitionDelay: '600ms' }}>
                {t('gallery.facilities.learnMore')}
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
              <div className="scroll-animate" style={{ transitionDelay: '0ms' }}>
                <h2 className="section-title mb-4">{t('gallery.freshness.title')}</h2>
                <p className="section-description">
                  {t('gallery.freshness.description1')}
                  <br />
                  {t('gallery.freshness.description2')}
                </p>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-lg col-md-4 col-6">
              <div className="product-gallery-item scroll-animate" style={{ transitionDelay: '0ms' }}>
                <img src="/assets/77-340.webp" alt="Fresh Seafood" className="product-gallery-image" />
              </div>
            </div>
            <div className="col-lg col-md-4 col-6">
              <div className="product-gallery-item scroll-animate" style={{ transitionDelay: '150ms' }}>
                <img src="/assets/77-341.webp" alt="Fresh Seafood" className="product-gallery-image" />
              </div>
            </div>
            <div className="col-lg col-md-4 col-6">
              <div className="product-gallery-item scroll-animate" style={{ transitionDelay: '300ms' }}>
                <img src="/assets/77-342.webp" alt="Fresh Seafood" className="product-gallery-image" />
              </div>
            </div>
            <div className="col-lg col-md-4 col-6">
              <div className="product-gallery-item scroll-animate" style={{ transitionDelay: '450ms' }}>
                <img src="/assets/77-343.webp" alt="Fresh Seafood" className="product-gallery-image" />
              </div>
            </div>
            <div className="col-lg col-md-4 col-6">
              <div className="product-gallery-item scroll-animate" style={{ transitionDelay: '600ms' }}>
                <img src="/assets/77-344.webp" alt="Fresh Seafood" className="product-gallery-image" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-end">
              <Link href="/products" className="gradient-link scroll-animate" style={{ transitionDelay: '750ms' }}>
                {t('gallery.freshness.exploreProducts')}
                <img src="/assets/77-347.svg" alt="Arrow" className="ms-2" style={{ width: '24px', height: '24px' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
            <Footer
                    logoImage="/assets/19-227.webp"
                    logoText="الخلجان العربية"
                    copyrightIcon="/assets/29-97.svg"
            />
    </>
  );
}


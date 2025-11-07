import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { useTranslation } from '../hooks/useTranslation';
import { useEffect } from 'react';

export default function Services() {
  const { t } = useTranslation();

  // Reinitialize scroll animations when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.reinitializeScrollAnimations) {
        window.reinitializeScrollAnimations();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="services-hero-section">
        <div className="services-hero-content scroll-animate" style={{ transitionDelay: '0ms' }}>
          <h1 className="services-hero-title">
            {t('services.hero.title')}
          </h1>
        </div>
      </section>

      {/* Service Cards Section */}
      <div className="service-cards-section">
        <div className="container-fluid px-5">
          <div className="row g-3 justify-content-center">
            {/* Service Card 1 */}
            <div className="col-lg-3 col-md-6">
              <div className="services-page-card scroll-animate" style={{ transitionDelay: '0ms' }}>
                <h3 className="service-card-title">{t('services.cards.card1.title')}</h3>
                <p className="service-card-description">
                  {t('services.cards.card1.description')}
                </p>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="col-lg-3 col-md-6">
              <div className="services-page-card scroll-animate" style={{ transitionDelay: '200ms' }}>
                <h3 className="service-card-title">{t('services.cards.card2.title')}</h3>
                <p className="service-card-description">
                  {t('services.cards.card2.description')}
                </p>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="col-lg-3 col-md-6">
              <div className="services-page-card scroll-animate" style={{ transitionDelay: '400ms' }}>
                <h3 className="service-card-title">{t('services.cards.card3.title')}</h3>
                <p className="service-card-description">
                  {t('services.cards.card3.description')}
                </p>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="col-lg-3 col-md-6">
              <div className="services-page-card scroll-animate" style={{ transitionDelay: '600ms' }}>
                <h3 className="service-card-title">{t('services.cards.card4.title')}</h3>
                <p className="service-card-description">
                  {t('services.cards.card4.description')}
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
            <div className="col-lg-6">
              <div className="why-choose-content-box scroll-animate" style={{ transitionDelay: '0ms' }}>
                <h2 className="why-choose-title">{t('services.whyChoose.title')}</h2>
                <p className="why-choose-text">
                  {t('services.whyChoose.paragraph1')}
                </p>
                <p className="why-choose-text">
                  {t('services.whyChoose.paragraph2')}
                </p>
                <Link href="/about" className="learn-more-btn">
                  <span className="learn-more-text">{t('services.whyChoose.cta')}</span>
                  <img src="/assets/59-22.svg" alt="arrow" className="learn-more-icon" />
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 scroll-animate" style={{ transitionDelay: '200ms' }}>
              <img src="/assets/143-97.webp" alt="Packaged Seafood" className="why-choose-image" />
            </div>
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


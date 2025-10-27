import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { useTranslation } from '../hooks/useTranslation';

export default function About() {
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
      <section className="about-hero-section">
        <div className="about-hero-content hero-animate">
          <h1 className="about-hero-title animate-fadeInUp">
            {t('about.hero.title1')}
            <span className="text-highlight"> {t('about.hero.title2')}</span> {t('about.hero.title3')}
          </h1>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section className="vmv-section">
        <div className="container-fluid px-5">
          <div className="vmv-layout position-relative">
            {/* Background Images */}
            <img src="/assets/29-124.webp" alt="Fish" className="vmv-bg-image fish-bg" />
            <img src="/assets/29-122.webp" alt="Lemon" className="vmv-bg-image lemon-bg" />
            <img src="/assets/29-143.webp" alt="Lobster" className="vmv-bg-image lobster-bg" />
            
            {/* Our Vision - Top Left */}
            <div className="vmv-card vision-card">
              <div className="vmv-icon-circle">
                <img src="/assets/29-127.webp" alt="Vision Icon" className="vmv-icon" />
              </div>
              <h3 className="vmv-title">{t('about.vision.title')}</h3>
              <p className="vmv-description">
                {t('about.vision.description')}
              </p>
            </div>

            {/* Our Values - Top Right */}
            <div className="vmv-card values-card">
              <div className="vmv-icon-circle">
                <img src="/assets/29-139.webp" alt="Values Icon" className="vmv-icon" />
              </div>
              <h3 className="vmv-title">{t('about.values.title')}</h3>
              <div className="vmv-description">
                <p><strong>{t('about.values.quality')}</strong> {t('about.values.qualityDesc')}</p>
                <p><strong>{t('about.values.integrity')}</strong> {t('about.values.integrityDesc')}</p>
                <p><strong>{t('about.values.sustainability')}</strong> {t('about.values.sustainabilityDesc')}</p>
              </div>
            </div>

            {/* Our Mission - Bottom Center */}
            <div className="vmv-card mission-card">
              <div className="vmv-icon-circle">
                <img src="/assets/29-133.webp" alt="Mission Icon" className="vmv-icon" />
              </div>
              <h3 className="vmv-title">{t('about.mission.title')}</h3>
              <p className="vmv-description">
                {t('about.mission.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Facilities Section */}
      <section className="facilities-section">
        <div className="container-fluid px-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="scroll-animate" style={{ transitionDelay: '0ms' }}>
                <h2 className="facilities-title">{t('about.facilities.title')}</h2>
                <p className="facilities-description">
                  {t('about.facilities.paragraph1')}
                </p>
                <p className="facilities-description">
                  {t('about.facilities.paragraph2')}
                </p>
                <Link href="/products" className="explore-products-link">
                  <span className="explore-text">{t('about.facilities.cta')}</span>
                  <img src="/assets/59-29.svg" alt="arrow" className="explore-arrow" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="facilities-image-container scroll-animate" style={{ transitionDelay: '200ms' }}>
                <img src="/assets/29-148.webp" alt="Modern Facilities" className="facilities-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        logoImage="/assets/29-93.webp"
        logoText="الخلجان العربية"
        copyrightIcon="/assets/29-97.svg"
      />
    </>
  );
}


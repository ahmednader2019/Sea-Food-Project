import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useTranslation } from '../hooks/useTranslation';

export default function Home() {
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [hasShuffled, setHasShuffled] = useState(false);
  const imageGridRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Array of image sources
  const images = [
    '/assets/19-401.webp',
    '/assets/19-402.webp',
    '/assets/19-403.webp',
    '/assets/19-414.webp',
    '/assets/19-405.webp',
    '/assets/19-406.webp',
    '/assets/19-407.webp',
    '/assets/19-408.webp',
    '/assets/19-409.webp'
  ];

  // Shuffle function using Fisher-Yates algorithm
  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Initial shuffle on page load
  useEffect(() => {
    setShuffledImages(shuffleArray(images));
    setHasShuffled(true);
  }, []);

  // Shuffle when scrolling into view and continuously while in view
  useEffect(() => {
    if (!hasShuffled) return; // Wait for initial shuffle

    let intervalId: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Shuffle immediately when coming into view
          setShuffledImages(shuffleArray(images));

          // Start continuous shuffling every 2 seconds
          intervalId = setInterval(() => {
            setShuffledImages(shuffleArray(images));
          }, 2000); // Change images every 2 seconds
        } else {
          // Stop shuffling when out of view
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      },
      { threshold: 0.3 }
    );

    if (imageGridRef.current) {
      observer.observe(imageGridRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [hasShuffled]);

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
      <section className="home-hero-section">
        <video 
          src="assets/hero-video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="hero-background-video"
        ></video>
        <div className="home-hero-overlay"></div>
        <div className="container-fluid px-5">
          <div className="row align-items-center h-100">
            {/* Left Content */}
            <div className="col-lg-6">
              <div className="home-hero-content animate-fadeInUp">
                <h1 className="home-hero-title">{t('home.hero.title')}</h1>
                <p className="home-hero-description">
                  {t('home.hero.description')}
                </p>
                <a href="/products" className="btn home-hero-btn">{t('home.hero.cta')}</a>
              </div>
            </div>
            
            {/* Right Content - Floating Cards */}
            <div className="col-lg-6">
              <div className="floating-cards-container">
                <div className="floating-card card-1 animate-fadeIn delay-200">
                  <h3>{t('home.floatingCards.card1.title')}</h3>
                  <p>{t('home.floatingCards.card1.description')}</p>
                </div>

                <div className="floating-card card-2 animate-fadeIn delay-400">
                  <h3>{t('home.floatingCards.card2.title')}</h3>
                  <p>{t('home.floatingCards.card2.description')}</p>
                </div>

                <div className="floating-card card-3 animate-fadeIn delay-600">
                  <h3>{t('home.floatingCards.card3.title')}</h3>
                  <p>{t('home.floatingCards.card3.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="home-about-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 scroll-animate" style={{ transitionDelay: '0ms' }}>
              <img src="/assets/19-252.webp" alt="Fresh Seafood" className="home-about-img" />
            </div>
            <div className="col-lg-7 scroll-animate" style={{ transitionDelay: '200ms' }}>
              <h2 className="home-about-title">{t('home.about.title')}</h2>
              <div className="home-about-content">
                <p>{t('home.about.paragraph1')}</p>
                <p className="highlight-text">{t('home.about.paragraph2')}</p>
                <p>{t('home.about.paragraph3')}</p>
              </div>
              <a href="/about" className="home-learn-more">
                {t('home.about.learnMore')}
                <img src="/assets/19-262.svg" alt="arrow" className="arrow-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="home-categories-section">
        <div className="container">
          <div className="row">
            {/* Product Grid */}
            <div className="col-lg-6">
              <div className="product-grid-3x3" ref={imageGridRef}>
                {shuffledImages.map((imgSrc, index) => {
                  const delays = ['', 'delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500', 'delay-600', 'delay-700', 'delay-800'];
                  return (
                    <img
                      key={`${imgSrc}-${index}`}
                      src={imgSrc}
                      alt={`Seafood ${index + 1}`}
                      className={`product-grid-img animate-scaleIn ${delays[index]}`}
                    />
                  );
                })}
              </div>
            </div>
            
            {/* Categories List */}
            <div className="col-lg-6">
              <div className="categories-list animate-fadeIn">
                <h2 className="categories-title">{t('home.categories.title')}</h2>
                <div className="category-item">
                  <span>{t('home.categories.hamour')}</span>
                </div>
                <div className="category-item">
                  <span>{t('home.categories.shaour')}</span>
                </div>
                <div className="category-item">
                  <span>{t('home.categories.lobster')}</span>
                </div>
                <div className="category-item">
                  <span>{t('home.categories.oyster')}</span>
                </div>
                <div className="category-item">
                  <span>{t('home.categories.crab')}</span>
                </div>
                <div className="category-item">
                  <span>{t('home.categories.najil')}</span>
                </div>
                <div className="category-item">
                  <span>{t('home.categories.shrimps')}</span>
                </div>
                <div className="category-item">
                  <span>{t('home.categories.squid')}</span>
                </div>
                <div className="category-item">
                  <span>{t('home.categories.salmon')}</span>
                </div>
                <div className="category-item">
                  <span>{t('home.categories.seaBream')}</span>
                </div>
                <div className="category-item">
                  <span>{t('home.categories.seaBass')}</span>
                </div>
                <div className="category-item">
                  <span>{t('home.categories.smokedProducts')}</span>
                </div>
                <div className="category-item">
                  <span>{t('home.categories.frozenSeafoodMix')}</span>
                </div>
                <div className="category-item">
                  <span>{t('home.categories.frozenFish')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="home-stats-section">
        <div className="container">
          <p className="home-stats-intro">{t('home.stats.intro')}</p>

          <div className="home-stats-cards">
            <div className="stat-card animate-fadeInUp">
              <h3><AnimatedCounter end={100} prefix="+" /></h3>
              <p><strong>{t('home.stats.types')}</strong> {t('home.stats.typesLabel')}</p>
            </div>
            <div className="stat-card animate-fadeInUp delay-200">
              <h3><AnimatedCounter end={1200} prefix="+" /></h3>
              <p><strong>{t('home.stats.clients')}</strong> {t('home.stats.clientsLabel')}</p>
            </div>
            <div className="stat-card animate-fadeInUp delay-400">
              <h3><AnimatedCounter end={10} prefix="+" /></h3>
              <p><strong>{t('home.stats.years')}</strong> {t('home.stats.yearsLabel')}</p>
            </div>
            <div className="stat-card animate-fadeInUp delay-600">
              <h3><AnimatedCounter end={24} suffix="/7" isSpecial={true} /></h3>
              <p><strong>{t('home.stats.delivery')}</strong> {t('home.stats.deliveryLabel')}</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="home-services-section">
        <div className="container">
          <h2 className="home-services-title animate-fadeIn">{t('home.services.title')}</h2>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src="/assets/19-293.webp" alt="Our Services" className="home-services-img animate-fadeIn" />
            </div>
            <div className="col-lg-6">
              <div className="services-list">
                <div className="home-service-card scroll-animate" style={{ transitionDelay: '0ms' }}>
                  <div className="service-icon-wrapper">
                    <img src="/assets/19-297.svg" alt="Fresh Supply" className="service-icon" />
                  </div>
                  <div className="service-text">
                    <h3>{t('home.services.service1')}</h3>
                  </div>
                </div>
                <div className="home-service-card scroll-animate" style={{ transitionDelay: '200ms' }}>
                  <div className="service-icon-wrapper">
                    <img src="/assets/19-307.svg" alt="Processing" className="service-icon" />
                  </div>
                  <div className="service-text">
                    <h3>{t('home.services.service2')}</h3>
                  </div>
                </div>
                <div className="home-service-card scroll-animate" style={{ transitionDelay: '400ms' }}>
                  <div className="service-icon-wrapper">
                    <img src="/assets/19-316.svg" alt="Hotel Supply" className="service-icon" />
                  </div>
                  <div className="service-text">
                    <h3>{t('home.services.service3')}</h3>
                  </div>
                </div>
                <div className="home-service-card scroll-animate" style={{ transitionDelay: '600ms' }}>
                  <div className="service-icon-wrapper">
                    <img src="/assets/19-330.svg" alt="Cold Storage" className="service-icon" />
                  </div>
                  <div className="service-text">
                    <h3>{t('home.services.service4')}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="home-contact-section">
        <div className="container">
          <h2 className="home-contact-title scroll-animate" style={{ transitionDelay: '0ms' }}>{t('home.contact.title')}</h2>
          <div className="row">
            <div className="col-lg-6 scroll-animate" style={{ transitionDelay: '200ms' }}>
              <ContactForm />
            </div>
            <div className="col-lg-6 scroll-animate" style={{ transitionDelay: '400ms' }}>
              <img src="/assets/19-399.webp" alt="Contact" className="home-contact-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        logoImage="/assets/19-227.webp"
        logoText="الخلجان العربية"
        copyrightIcon="/assets/19-366.svg"
      />
    </>
  );
}

{/* Services Section */}
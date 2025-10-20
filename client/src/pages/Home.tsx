import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function Home() {
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [hasShuffled, setHasShuffled] = useState(false);
  const imageGridRef = useRef<HTMLDivElement>(null);

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

  // Shuffle when scrolling into view
  useEffect(() => {
    if (!hasShuffled) return; // Wait for initial shuffle

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Shuffle every time the grid comes into view
        if (entry.isIntersecting) {
          setShuffledImages(shuffleArray(images));
        }
      },
      { threshold: 0.3 }
    );

    if (imageGridRef.current) {
      observer.observe(imageGridRef.current);
    }

    return () => observer.disconnect();
  }, [hasShuffled]);

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="home-hero-section">
        <div className="home-hero-overlay"></div>
        
        <div className="container-fluid px-5">
          <div className="row align-items-center h-100">
            {/* Left Content */}
            <div className="col-lg-6">
              <div className="home-hero-content animate-fadeInUp">
                <h1 className="home-hero-title">Freshness From The Sea To Your Table</h1>
                <p className="home-hero-description">
                  Delivering Premium Seafood Across Saudi Arabia — Trusted By Restaurants, Hotels, And Families For Over 10 Years.
                </p>
                <a href="/products" className="btn home-hero-btn">Explore Our Products</a>
              </div>
            </div>
            
            {/* Right Content - Floating Cards */}
            <div className="col-lg-6">
              <div className="floating-cards-container">
                <div className="floating-card card-1 animate-fadeIn delay-200">
                  <h3>Trusted for Quality, Freshness, and Excellence.</h3>
                  <p>With a passion for quality and a commitment to excellence, we proudly serve Saudi Arabia with the freshest and most reliable marine products.</p>
                </div>
                
                <div className="floating-card card-2 animate-fadeIn delay-400">
                  <h3>Freshness from the Sea, Crafted with Passion.</h3>
                  <p>We are a Saudi seafood company dedicated to providing premium, sustainably sourced fish and marine products — trusted by restaurants, hotels, and families across the Kingdom.</p>
                </div>
                
                <div className="floating-card card-3 animate-fadeIn delay-600">
                  <h3>Sustainably Sourced. Expertly Delivered.</h3>
                  <p>For over two decades, we've been delivering the finest selection of fresh and frozen seafood across Saudi Arabia.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="home-about-section animate-fadeIn">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <img src="/assets/19-252.webp" alt="Fresh Seafood" className="home-about-img" />
            </div>
            <div className="col-lg-7">
              <h2 className="home-about-title">From the Red Sea to Your Plate – Delivering a rich selection of premium fish and seafood that cater to every taste and culinary style.</h2>
              <div className="home-about-content">
                <p>As one of Saudi Arabia's trusted seafood companies, we take pride in delivering the finest indian Mackerel (Bagha) — a local favorite known for its rich taste and high nutritional value.</p>
                <p className="highlight-text">Frozen Baagha (Mackerel) is available for export in large quantities with premium quality and international standards.</p>
                <p>Our Baagha fish is freshly sourced, expertly cleaned, and delivered daily to ensure unmatched quality and freshness. Whether for restaurants, hotels, or family kitchens, our Mackerel remains the top choice for authentic Saudi seafood lovers.</p>
              </div>
              <a href="/about" className="home-learn-more">
                Learn More About Us
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
                <h2 className="categories-title">CATEGORIES</h2>
                <div className="category-item">
                  <span>Hamour</span>
                  <span className="category-plus">+</span>
                </div>
                <div className="category-item">
                  <span>Lobsters</span>
                  <span className="category-plus">+</span>
                </div>
                <div className="category-item">
                  <span>Shrimps</span>
                  <span className="category-plus">+</span>
                </div>
                <div className="category-item">
                  <span>Crab</span>
                  <span className="category-plus">+</span>
                </div>
                <div className="category-item">
                  <span>Frozen Seafood Mix</span>
                  <span className="category-plus">+</span>
                </div>
                <div className="category-item">
                  <span>Calamari (Squid)</span>
                  <span className="category-plus">+</span>
                </div>
                <div className="category-item">
                  <span>Salmon</span>
                  <span className="category-plus">+</span>
                </div>
                <div className="category-item">
                  <span>Smoked Products</span>
                  <span className="category-plus">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="home-stats-section">
        <div className="container">
          <p className="home-stats-intro">Over The Years, We've Built A Strong Reputation In Saudi Arabia's Seafood Market Through Quality, Trust, And Consistency.<br/>Our Numbers Reflect Our Passion For Excellence And Our Commitment To Delivering The Freshest Seafood — Especially Our Famous Bagha (Indian Mackerel) — To Customers Across The Kingdom.</p>
          
          <div className="home-stats-cards">
            <div className="stat-card animate-fadeInUp">
              <h3><AnimatedCounter end={100} prefix="+" /></h3>
              <p><strong>Types</strong> Of Fresh Fish</p>
            </div>
            <div className="stat-card animate-fadeInUp delay-200">
              <h3><AnimatedCounter end={1200} prefix="+" /></h3>
              <p><strong>Clients</strong> Across Saudi Arabia</p>
            </div>
            <div className="stat-card animate-fadeInUp delay-400">
              <h3><AnimatedCounter end={10} prefix="+" /></h3>
              <p><strong>Years</strong> Of Experience</p>
            </div>
            <div className="stat-card animate-fadeInUp delay-600">
              <h3><AnimatedCounter end={24} suffix="/7" isSpecial={true} /></h3>
              <p><strong>Delivery</strong> Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="home-services-section">
        <div className="container">
          <h2 className="home-services-title animate-fadeIn">Our Services</h2>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src="/assets/19-293.webp" alt="Our Services" className="home-services-img animate-fadeIn" />
            </div>
            <div className="col-lg-6">
              <div className="services-list">
                <div className="service-card animate-fadeInUp">
                  <div className="service-icon-wrapper">
                    <img src="/assets/19-297.svg" alt="Fresh Supply" className="service-icon" />
                  </div>
                  <h3>Fresh and Frozen Seafood Supply</h3>
                </div>
                <div className="service-card animate-fadeInUp delay-200">
                  <div className="service-icon-wrapper">
                    <img src="/assets/19-307.svg" alt="Processing" className="service-icon" />
                  </div>
                  <h3>Seafood Processing & Packaging</h3>
                </div>
                <div className="service-card animate-fadeInUp delay-400">
                  <div className="service-icon-wrapper">
                    <img src="/assets/19-316.svg" alt="Hotel Supply" className="service-icon" />
                  </div>
                  <h3>Hotel & Restaurant Supply</h3>
                </div>
                <div className="service-card animate-fadeInUp delay-600">
                  <div className="service-icon-wrapper">
                    <img src="/assets/19-330.svg" alt="Cold Storage" className="service-icon" />
                  </div>
                  <h3>Cold Storage & Delivery</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="home-contact-section">
        <div className="container">
          <h2 className="home-contact-title animate-fadeIn">Looking for a reliable seafood supplier in Saudi Arabia?</h2>
          <div className="row">
            <div className="col-lg-6">
              <ContactForm className="animate-fadeInUp" />
            </div>
            <div className="col-lg-6">
              <img src="/assets/19-399.webp" alt="Contact" className="home-contact-img animate-fadeIn" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        logoImage="/assets/19-362.webp"
        logoText="الخلجان العربية"
        copyrightIcon="/assets/19-366.svg"
      />
    </>
  );
}


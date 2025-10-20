import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.nav-menu') && !target.closest('.mobile-menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/products', label: 'Products' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className="header-nav">
      <div className="container-fluid px-5 py-3">
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div className="d-flex align-items-center">
            <div className="logo-container">
              <img src="/assets/19-227.webp" alt="Arabian Gulf Logo" className="logo-img" />
              <div className="logo-text">الخلجان العربية</div>
            </div>
          </div>
          
          {/* Desktop Navigation Menu - Centered */}
          <nav className="nav-menu d-none d-lg-flex">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.path} className={`nav-item ${location === item.path ? 'active' : ''}`}>
                  <Link href={item.path} className="nav-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Language Selector */}
          <div className="language-selector">
            <span className="lang-text">English</span>
            <img src="/assets/19-242.svg" alt="dropdown" className="lang-icon" />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle d-lg-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <nav className={`mobile-nav-menu d-lg-none ${isMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.path} className={`mobile-nav-item ${location === item.path ? 'active' : ''}`}>
                <Link href={item.path} className="mobile-nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

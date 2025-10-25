import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

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
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/products', label: t('nav.products') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/contact', label: t('nav.contact') },
  ].slice();  // Create a copy to avoid mutating the original array
  
  // Reverse the order for Arabic language
  if (language === 'ar') {
    navItems.reverse();
  }

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <header className="header-nav">
      <div className="container-fluid px-5 py-3">
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div className="d-flex align-items-center">
            <a href="/">
              <div className="logo-container">
                <img src="/assets/19-227.webp" alt="Arabian Gulf Logo" className="logo-img" />
              </div>
            </a>
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
          <div className="language-selector" onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}>
            <span className="lang-text">{language === 'en' ? 'English' : 'العربية'}</span>
            <img src="/assets/19-242.svg" alt="dropdown" className="lang-icon" />
            {isLangMenuOpen && (
              <div className="language-dropdown">
                <div
                  className={`language-option ${language === 'en' ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleLanguageChange('en'); }}
                >
                  English
                </div>
                <div
                  className={`language-option ${language === 'ar' ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleLanguageChange('ar'); }}
                >
                  العربية
                </div>
              </div>
            )}
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

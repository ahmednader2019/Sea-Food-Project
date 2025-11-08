import { Link } from 'wouter';
import { useTranslation } from '../hooks/useTranslation';

interface FooterProps {
  logoImage: string;
  logoText: string;
  copyrightIcon: string;
}

export default function Footer({ logoImage, logoText, copyrightIcon }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer className="footer-section">
      <div className="footer-bg-overlay"></div>
      <div className="footer-overlay"></div>
      <div className="pt-4 container footer-container">
        <div className="row">
          <div className="col-lg-5">
            <div className="footer-logo-section">
              <div className="footer-logo-wrapper">
                <img src={logoImage} alt="Arabian Gulfs Logo" className="footer-logo-img" />
                <div className="footer-logo-text-container">
                  <div className="footer-logo-text">Arabian Gulfs</div>
                  <div className="footer-logo-text-arabic">{logoText}</div>
                </div>
              </div>
            </div>
            <p className="footer-description">
              {t('footer.description')}
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Instagram">
                <img src="/assets/19-373.webp" alt="Instagram" />
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <img src="/assets/19-375.webp" alt="Facebook" />
              </a>
              <a href="https://wa.me/966599754996" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                <img src="/assets/19-371.png" alt="WhatsApp" />
              </a>
            </div>
          </div>

          <div className="col-lg-3">
            <h3 className="footer-heading">{t('footer.quickLinks')}</h3>
            <ul className="footer-links">
              <li><Link href="/">{t('footer.home')}</Link></li>
              <li><Link href="/services">{t('footer.ourServices')}</Link></li>
              <li><Link href="/about">{t('footer.whoAreWe')}</Link></li>
              <li><Link href="/contact">{t('footer.contactUs')}</Link></li>
              <li><Link href="/products">{t('footer.products')}</Link></li>
              <li><Link href="/gallery">{t('footer.gallery')}</Link></li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h3 className="footer-heading">{t('footer.contacts')}</h3>
            <div className="footer-contact-info">
              <p className="footer-contact-label">{t('footer.officialAddress')}</p>
              <p className="footer-contact-value">{t('footer.address')}</p>

              <p className="footer-contact-label">{t('nav.contact')}:</p>
              <p className="footer-contact-value">
                <a href="https://wa.me/966599754996" target="_blank" rel="noopener noreferrer" className="contact-link d-inline-flex align-items-center gap-2">
                  <i className="fab fa-whatsapp"></i>
                  <span>{t('footer.phone')}</span>
                </a>
              </p>

              <p className="footer-contact-label">{t('contact.info.email')}</p>
              <p className="footer-contact-value">
                <a href="mailto:Ahmed@arabian-gulfs.com" className="contact-link">{t('footer.email')}</a>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <img src={copyrightIcon} alt="copyright" className="copyright-icon" />
          <span>{t('footer.copyright')}</span>
        </div>
      </div>
    </footer>
  );
}

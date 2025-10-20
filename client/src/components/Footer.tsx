import { Link } from 'wouter';

interface FooterProps {
  logoImage: string;
  logoText: string;
  copyrightIcon: string;
}

export default function Footer({ logoImage, logoText, copyrightIcon }: FooterProps) {
  return (
    <footer className="footer-section">
      <div className="footer-overlay"></div>
      <div className="container footer-container">
        <div className="row">
          <div className="col-lg-5">
            <div className="footer-logo-section">
              <div className="footer-logo-wrapper">
                <img src={logoImage} alt="Arabian Gulf Logo" className="footer-logo-img" />
                <div className="footer-logo-text-container">
                  <div className="footer-logo-text">Arabian gulf</div>
                  <div className="footer-logo-text-arabic">{logoText}</div>
                </div>
              </div>
            </div>
            <p className="footer-description">
              Arabian gulf is a Saudi-based seafood company committed to providing high-quality, fresh, and sustainable fish and marine products.<br/>
              With years of experience in the industry, we ensure excellence from sea to table — trusted by restaurants, hotels, and families across Saudi Arabia.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Instagram">
                <img src="/assets/19-373.webp" alt="Instagram" />
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <img src="/assets/19-375.webp" alt="Facebook" />
              </a>
              <a href="#" className="social-icon" aria-label="WhatsApp">
                <img src="/assets/19-371.webp" alt="WhatsApp" />
              </a>
            </div>
          </div>
          
          <div className="col-lg-3">
            <h3 className="footer-heading">Quick links</h3>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Our services</Link></li>
              <li><Link href="/about">Who are we?</Link></li>
              <li><Link href="/contact">Contact us</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-4">
            <h3 className="footer-heading">Contacts</h3>
            <div className="footer-contact-info">
              <p className="footer-contact-label">Official address:</p>
              <p className="footer-contact-value">Toroghat Fishing Trading, 3990 AR Riyadh Rd</p>
              
              <p className="footer-contact-label">Contact us:</p>
              <p className="footer-contact-value">
                <a href="tel:+966599754996" className="contact-link">+966 59 975 4996</a>
              </p>
              
              <p className="footer-contact-label">Email:</p>
              <p className="footer-contact-value">
                <a href="mailto:Ahmed@arabian-gulfs.com" className="contact-link">Ahmed@arabian-gulfs.com</a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="footer-copyright">
          <img src={copyrightIcon} alt="copyright" className="copyright-icon" />
          <span>All rights reserved Arabian gulf</span>
        </div>
      </div>
    </footer>
  );
}

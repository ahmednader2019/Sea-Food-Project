import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ContactUs() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="contact-hero-section">
        <div className="hero-overlay"></div>
        <div className="contact-hero-content hero-animate">
          <h1 className="contact-hero-title animate-fadeInUp">
            Get In Touch With Our Team For Orders, Partnerships, Or Inquiries.
          </h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <div className="contact-form-section">
        <div className="container-fluid px-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-form-card scroll-animate">
                <form>
                  <div className="form-group-custom">
                    <input 
                      type="text" 
                      className="form-input-custom" 
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  
                  <div className="form-group-custom">
                    <input 
                      type="tel" 
                      className="form-input-custom" 
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  
                  <div className="form-group-custom">
                    <input 
                      type="email" 
                      className="form-input-custom" 
                      placeholder="Email"
                      required
                    />
                  </div>
                  
                  <div className="form-group-custom">
                    <textarea 
                      className="form-input-custom form-textarea" 
                      placeholder="Message"
                      rows={4}
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="contact-submit-btn">
                    <span>Send</span>
                    <img src="/assets/39-158.svg" alt="send" className="send-icon" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information & Map Section */}
      <div className="contact-info-section">
        <div className="container-fluid px-5">
          <div className="row g-4">
            {/* Left - Contact Information */}
            <div className="col-lg-6">
              <h2 className="contact-info-title">Contacts</h2>
              
              <div className="contact-info-block">
                <h3 className="contact-info-label">Official address:</h3>
                <p className="contact-info-value">Toroghat Fishing Trading, 3990 AR Riyadh Rd</p>
              </div>
              
              <div className="contact-info-block">
                <h3 className="contact-info-label">Contact us:</h3>
                <div className="d-flex align-items-center gap-2">
                  <i className="fab fa-whatsapp contact-whatsapp-icon"></i>
                  <p className="contact-info-value mb-0">+966 59 975 4996</p>
                </div>
              </div>
              
              <div className="contact-info-block">
                <h3 className="contact-info-label">Email:</h3>
                <p className="contact-info-value">Ahmed@arabian-gulfs.com</p>
              </div>
              
              <div className="contact-info-block">
                <h3 className="contact-info-label">Owner</h3>
                <p className="contact-info-value">Abdulaziz bin Omar Al-Hasani</p>
                <p className="contact-info-value">+966 53 609 2876</p>
              </div>
              
              <div className="contact-info-block">
                <h3 className="contact-info-label">Ceo:</h3>
                <p className="contact-info-value">Ahmed Abouzaher farghly</p>
                <p className="contact-info-value">+966 59 975 4996</p>
              </div>
            </div>
            
            {/* Right - Map */}
            <div className="col-lg-6">
              <div className="contact-map-container">
                <img src="/assets/39-161.webp" alt="Location Map" className="contact-map-image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer
        logoImage="/assets/39-106.webp"
        logoText="الخلجان العربية"
        copyrightIcon="/assets/39-110.svg"
      />
    </>
  );
}


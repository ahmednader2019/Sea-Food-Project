import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTranslation } from '../hooks/useTranslation';
import { useContactForm } from '../hooks/useContactForm';
import { useEffect } from 'react';

export default function ContactUs() {
  const { t } = useTranslation();
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSubmit,
    resetForm,
  } = useContactForm();

  // Reinitialize scroll animations when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if ((window as any).reinitializeScrollAnimations) {
        (window as any).reinitializeScrollAnimations();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="contact-hero-section">
        <div className="hero-overlay"></div>
        <img
          src="/assets/image 27 (1).png"
          alt="Contact"
          className="hero-background-image"
        />
        <div className="contact-hero-content hero-animate">
          <h1 className="contact-hero-title animate-fadeInUp">
            {t('contact.hero.title')}
          </h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <img
          src="/assets/image 29 (2).png"
          alt="Water splash"
          className="form-background-image"
        />
        <div className="container-fluid px-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-form-card scroll-animate contact-form-fallback">
                {isSubmitted ? (
                  <div className="success-message text-center">
                    <h3 className="text-success mb-3">{t('contactForm.successTitle')}</h3>
                    <p className="mb-4">{t('contactForm.successMessage')}</p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="contact-submit-btn"
                      style={{ maxWidth: '300px', margin: '0 auto' }}
                    >
                      <span>{t('contactForm.sendAnother')}</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group-custom">
                      <input
                        type="text"
                        className={`form-input-custom ${errors.name ? 'is-invalid' : ''}`}
                        placeholder={t('contact.form.fullName')}
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                      {errors.name && (
                        <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                          {errors.name}
                        </div>
                      )}
                    </div>

                    <div className="form-group-custom">
                      <input
                        type="tel"
                        className={`form-input-custom ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder={t('contact.form.phoneNumber')}
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                      {errors.phone && (
                        <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                          {errors.phone}
                        </div>
                      )}
                    </div>

                    <div className="form-group-custom">
                      <input
                        type="email"
                        className={`form-input-custom ${errors.email ? 'is-invalid' : ''}`}
                        placeholder={t('contact.form.email')}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                      {errors.email && (
                        <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="form-group-custom">
                      <textarea
                        className={`form-input-custom form-textarea ${errors.message ? 'is-invalid' : ''}`}
                        placeholder={t('contact.form.message')}
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                      ></textarea>
                      {errors.message && (
                        <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                          {errors.message}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="contact-submit-btn"
                      disabled={isSubmitting}
                    >
                      <span>
                        {isSubmitting ? t('contactForm.sending') : t('contact.form.send')}
                      </span>
                      {!isSubmitting && (
                        <img src="/assets/39-158.svg" alt="send" className="send-icon" />
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Map Section */}
      <section className="contact-info-section">
        <div className="container-fluid px-5">
          <div className="row g-4">
            {/* Left - Contact Information */}
            <div className="col-lg-6 scroll-animate contact-info-fallback">
              <h2 className="contact-info-title">{t('contact.info.title')}</h2>

              <div className="contact-info-block">
                <h3 className="contact-info-label">{t('contact.info.officialAddress')}</h3>
                <p className="contact-info-value">{t('contact.info.address')}</p>
              </div>

              <div className="contact-info-block">
                <h3 className="contact-info-label">{t('contact.info.contactUs')}</h3>
                <a href="https://wa.me/966599754996" target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2 text-decoration-none contact-link">
                  <i className="fab fa-whatsapp contact-whatsapp-icon"></i>
                  <p className="contact-info-value mb-0">{t('contact.info.phone')}</p>
                </a>
              </div>

              <div className="contact-info-block">
                <h3 className="contact-info-label">{t('contact.info.email')}</h3>
                <p className="contact-info-value">{t('contact.info.emailAddress')}</p>
              </div>

              <div className="contact-info-block">
                <h3 className="contact-info-label">{t('contact.info.branches')}</h3>
                <p className="contact-info-value">
                  {t('contact.info.abha')} <a href="https://wa.me/966567677369" target="_blank" rel="noopener noreferrer" className="contact-link d-inline-flex align-items-center gap-2"><i className="fab fa-whatsapp"></i><span>{t('contact.info.abhaPhone')}</span></a>
                </p>
                <p className="contact-info-value">
                  {t('contact.info.jazan')} <a href="https://wa.me/966570819099" target="_blank" rel="noopener noreferrer" className="contact-link d-inline-flex align-items-center gap-2"><i className="fab fa-whatsapp"></i><span>{t('contact.info.jazanPhone')}</span></a>
                </p>
                <p className="contact-info-value">
                  {t('contact.info.general')} <a href="https://wa.me/966599754996" target="_blank" rel="noopener noreferrer" className="contact-link d-inline-flex align-items-center gap-2"><i className="fab fa-whatsapp"></i><span>{t('contact.info.generalPhone')}</span></a>
                </p>
              </div>

              <div className="contact-info-block">
                <h3 className="contact-info-label">{t('contact.info.owner')}</h3>
                <p className="contact-info-value">{t('contact.info.ownerName')}</p>
                <p className="contact-info-value">
                  <a href="https://wa.me/966536092876" target="_blank" rel="noopener noreferrer" className="contact-link d-inline-flex align-items-center gap-2"><i className="fab fa-whatsapp"></i><span>{t('contact.info.ownerPhone')}</span></a>
                </p>
              </div>

              <div className="contact-info-block">
                <h3 className="contact-info-label">{t('contact.info.ceo')}</h3>
                <p className="contact-info-value">{t('contact.info.ceoName')}</p>
                <p className="contact-info-value">
                  <a href="https://wa.me/966599754996" target="_blank" rel="noopener noreferrer" className="contact-link d-inline-flex align-items-center gap-2"><i className="fab fa-whatsapp"></i><span>{t('contact.info.ceoPhone')}</span></a>
                </p>
              </div>
            </div>

            {/* Right - Map */}
            <div className="col-lg-6 scroll-animate delay-200 contact-info-fallback">
              <div className="contact-map-container">
                <img src="/assets/map.png" alt="Location Map" className="contact-map-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        logoImage="/assets/19-227.webp"
        logoText="الخلجان العربية"
        copyrightIcon="/assets/39-110.svg"
      />
    </>
  );
}


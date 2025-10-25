import { useContactForm } from '@/hooks/useContactForm';
import { useTranslation } from '../hooks/useTranslation';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const { t } = useTranslation();
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSubmit,
    resetForm
  } = useContactForm();

  if (isSubmitted) {
    return (
      <div className={`contact-form-success ${className}`}>
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h3>{t('contactForm.successTitle')}</h3>
          <p>{t('contactForm.successMessage')}</p>
          <button type="button" onClick={resetForm} className="btn btn-secondary">
            {t('contactForm.sendAnother')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={`home-contact-form ${className}`} onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className={`form-control ${errors.name ? 'error' : ''}`}
          placeholder={t('contactForm.fullName')}
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          disabled={isSubmitting}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <input
          type="tel"
          className={`form-control ${errors.phone ? 'error' : ''}`}
          placeholder={t('contactForm.phoneNumber')}
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          disabled={isSubmitting}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <input
          type="email"
          className={`form-control ${errors.email ? 'error' : ''}`}
          placeholder={t('contactForm.email')}
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          disabled={isSubmitting}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <textarea
          className={`form-control ${errors.message ? 'error' : ''}`}
          rows={4}
          placeholder={t('contactForm.message')}
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          disabled={isSubmitting}
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      <button
        type="submit"
        className={`btn home-contact-btn ${isSubmitting ? 'loading' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            {t('contactForm.sending')}
          </>
        ) : (
          <>
            {t('contactForm.send')}
            <img src="/assets/19-356.svg" alt="send" className="send-icon" />
          </>
        )}
      </button>
    </form>
  );
}


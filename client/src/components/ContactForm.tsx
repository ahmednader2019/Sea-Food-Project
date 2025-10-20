import { useContactForm } from '@/hooks/useContactForm';

interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
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
          <h3>Thank you for your message!</h3>
          <p>We'll get back to you as soon as possible.</p>
          <button onClick={resetForm} className="btn btn-secondary">
            Send Another Message
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
          placeholder="Full Name"
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
          placeholder="Phone Number"
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
          placeholder="Email"
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
          placeholder="Message"
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
            Sending...
          </>
        ) : (
          <>
            Send
            <img src="/assets/19-356.svg" alt="send" className="send-icon" />
          </>
        )}
      </button>
    </form>
  );
}


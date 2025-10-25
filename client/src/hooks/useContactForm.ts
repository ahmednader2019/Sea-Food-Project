import { useState } from 'react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send form data to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to send message';
        try {
          const result = await response.json();
          errorMessage = result.error || errorMessage;
        } catch {
          // Response is not JSON
          errorMessage = 'Server error occurred';
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);

      // Use setTimeout to avoid React state update issues
      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }, 0);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Set a general error message
      setErrors({
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', email: '', message: '' });
    setErrors({});
    setIsSubmitted(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSubmit,
    resetForm
  };
}


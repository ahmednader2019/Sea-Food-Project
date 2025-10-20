/**
 * ARABIAN GULF SEAFOOD - SCROLL ANIMATIONS
 * Intersection Observer for smooth scroll-based animations
 */

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initStaggerAnimations();
  initParallaxEffects();
});

/**
 * Initialize Intersection Observer for scroll animations
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: unobserve after animation to improve performance
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-animate class
  const animateElements = document.querySelectorAll('.scroll-animate');
  animateElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Initialize stagger animations for groups of elements
 */
function initStaggerAnimations() {
  const staggerGroups = document.querySelectorAll('[data-stagger]');
  
  staggerGroups.forEach(group => {
    const children = group.children;
    const delay = parseInt(group.dataset.stagger) || 100;
    
    Array.from(children).forEach((child, index) => {
      child.style.animationDelay = `${index * delay}ms`;
      child.classList.add('scroll-animate');
    });
  });

  // Observe stagger groups
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach(child => {
          child.classList.add('active');
        });
      }
    });
  }, observerOptions);

  staggerGroups.forEach(group => {
    staggerObserver.observe(group);
  });
}

/**
 * Initialize parallax scrolling effects
 */
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;

  let ticking = false;

  function updateParallax() {
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const offset = rect.top + scrolled;
      const diff = scrolled - offset;
      const yPos = -(diff * speed);
      
      element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
}

/**
 * Add animation to element when it enters viewport
 */
function animateOnScroll(element, animationClass) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(element);
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Add ripple effect to buttons
 */
function addRippleEffect() {
  const buttons = document.querySelectorAll('.btn-animate, button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Initialize ripple effects
document.addEventListener('DOMContentLoaded', addRippleEffect);

/**
 * Animate numbers counting up
 */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

/**
 * Initialize counter animations
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.counter);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Initialize counter animations
document.addEventListener('DOMContentLoaded', initCounterAnimations);

/**
 * Add loading animation to forms
 */
function initFormAnimations() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const submitButton = this.querySelector('button[type="submit"]');
      if (submitButton && !submitButton.disabled) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
      }
    });
  });
}

// Initialize form animations
document.addEventListener('DOMContentLoaded', initFormAnimations);

/**
 * Add hover effect to images
 */
function initImageHoverEffects() {
  const images = document.querySelectorAll('.hover-zoom img');
  
  images.forEach(img => {
    img.parentElement.addEventListener('mouseenter', function() {
      img.style.transform = 'scale(1.1)';
    });
    
    img.parentElement.addEventListener('mouseleave', function() {
      img.style.transform = 'scale(1)';
    });
  });
}

// Initialize image hover effects
document.addEventListener('DOMContentLoaded', initImageHoverEffects);

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    animateOnScroll,
    smoothScrollTo,
    animateCounter,
    initScrollAnimations,
    initStaggerAnimations
  };
}


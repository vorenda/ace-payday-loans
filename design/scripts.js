/**
 * ACE PAYDAY LOANS - Interactive JavaScript
 * Handles: Navigation, Animations, Forms, FAQ Accordion
 */

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initStickyHeader();
  initMobileMenu();
  initFAQAccordions();
  initFormValidation();
  initSmoothScroll();
  initPhoneTracking();
  initLoanCalculator();
});

// ========================================
// REVEAL ANIMATIONS - Staggered on scroll
// ========================================
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// ========================================
// STICKY HEADER - With smooth transition
// ========================================
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        header.classList.toggle('scrolled', currentScroll > 50);

        // Hide on scroll down, show on scroll up (only after 100px)
        if (currentScroll > lastScroll && currentScroll > 100) {
          header.classList.add('header-hidden');
        } else {
          header.classList.remove('header-hidden');
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ========================================
// MOBILE MENU - Animated toggle
// ========================================
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const body = document.body;

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active');
    body.classList.toggle('menu-open', isOpen);

    // Animate menu items staggered
    if (isOpen) {
      menu.querySelectorAll('.mobile-menu-nav a').forEach((item, i) => {
        item.style.animationDelay = `${0.1 + i * 0.05}s`;
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';

        setTimeout(() => {
          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, 100 + i * 50);
      });
    }
  });

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
}

// ========================================
// FAQ ACCORDION - Smooth expand/collapse
// ========================================
function initFAQAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) {
            otherAnswer.style.maxHeight = '0';
          }
        }
      });

      // Toggle current item
      item.classList.toggle('open', !isOpen);

      if (!isOpen) {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      } else {
        answer.style.maxHeight = '0';
      }
    });

    // Set initial state
    answer.style.maxHeight = '0';
  });
}

// ========================================
// FORM VALIDATION - With micro-interactions
// ========================================
function initFormValidation() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');

    // Real-time validation feedback
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });

      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          validateField(input);
        }
      });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate all fields
      let isValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        // Focus first error field
        const firstError = form.querySelector('.error');
        if (firstError) {
          firstError.focus();
        }
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const originalText = submitBtn.textContent;

      // Add loading state
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      submitBtn.innerHTML = '<span>Processing...</span>';

      try {
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success state
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        submitBtn.innerHTML = '<span>Application Submitted!</span>';

        // Show success message
        showFormMessage(form, 'success', 'Thank you! We will contact you shortly.');

        // Reset form after delay
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.classList.remove('success');
          submitBtn.textContent = originalText;
          form.reset();
          hideFormMessage(form);
        }, 3000);

      } catch (error) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;
        showFormMessage(form, 'error', 'Something went wrong. Please try again.');
      }
    });
  });
}

function validateField(input) {
  const value = input.value.trim();
  let isValid = true;
  let errorMessage = '';

  // Remove existing error state
  input.classList.remove('error');
  const existingError = input.parentElement.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }

  // Required validation
  if (input.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'This field is required';
  }

  // Email validation
  if (input.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  }

  // Phone validation
  if (input.type === 'tel' && value) {
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }
  }

  // Show error if invalid
  if (!isValid) {
    input.classList.add('error');
    const errorEl = document.createElement('span');
    errorEl.className = 'field-error';
    errorEl.textContent = errorMessage;
    errorEl.style.cssText = 'color: #c44536; font-size: 0.875rem; margin-top: 0.25rem; display: block;';
    input.parentElement.appendChild(errorEl);
  }

  return isValid;
}

function showFormMessage(form, type, message) {
  hideFormMessage(form);

  const messageEl = document.createElement('div');
  messageEl.className = `form-message form-message--${type}`;
  messageEl.style.cssText = `
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
    font-weight: 500;
    background: ${type === 'success' ? '#e8f5e9' : '#ffebee'};
    color: ${type === 'success' ? '#2d8a5e' : '#c44536'};
    border: 1px solid ${type === 'success' ? '#2d8a5e' : '#c44536'};
  `;
  messageEl.textContent = message;

  form.appendChild(messageEl);
}

function hideFormMessage(form) {
  const existingMessage = form.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
}

// ========================================
// SMOOTH SCROLL - With offset for header
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// PHONE TRACKING - Click-to-call analytics
// ========================================
function initPhoneTracking() {
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      const phoneNumber = link.getAttribute('href').replace('tel:', '');
      const location = link.dataset.location || 'unknown';

      // Track with analytics (GA4, etc.)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_click', {
          event_category: 'Contact',
          event_label: phoneNumber,
          phone_number: phoneNumber,
          location: location
        });
      }

      console.log(`Phone click tracked: ${phoneNumber} from ${location}`);
    });
  });
}

// ========================================
// LOAN CALCULATOR - Interactive slider
// ========================================
function initLoanCalculator() {
  const calculator = document.querySelector('.loan-calculator');
  if (!calculator) return;

  const amountSlider = calculator.querySelector('#loan-amount');
  const amountDisplay = calculator.querySelector('.loan-amount-display');

  if (amountSlider && amountDisplay) {
    amountSlider.addEventListener('input', () => {
      const amount = parseInt(amountSlider.value);
      amountDisplay.textContent = `$${amount.toLocaleString()}`;

      // Update slider track fill
      const percent = ((amount - amountSlider.min) / (amountSlider.max - amountSlider.min)) * 100;
      amountSlider.style.background = `linear-gradient(to right, #0d4f4f ${percent}%, #e0e0e0 ${percent}%)`;
    });

    // Initialize display
    amountSlider.dispatchEvent(new Event('input'));
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Format phone number
function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

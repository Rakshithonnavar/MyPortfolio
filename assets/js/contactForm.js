/**
 * Contact Form Handler with proper validation and security
 */

// Initialize form handler on DOM load
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.php-email-form');
  if (form) {
    form.addEventListener('submit', submitForm);
  }
});

/**
 * Submit form with validation
 * @param {Event} e - Form submit event
 */
function submitForm(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.querySelector('#name');
  const email = form.querySelector('#email');
  const subject = form.querySelector('#subject');
  const message = form.querySelector('#message');

  // Validate required fields
  if (!name || !name.value.trim()) {
    showError('Please enter your name');
    return;
  }

  if (!email || !validateEmail(email.value)) {
    showError('Please enter a valid email address');
    return;
  }

  if (!subject || !subject.value.trim()) {
    showError('Please enter a subject');
    return;
  }

  if (!message || !message.value.trim()) {
    showError('Please enter a message');
    return;
  }

  // Sanitize inputs to prevent XSS
  const sanitizedData = {
    name: sanitizeInput(name.value),
    email: email.value.toLowerCase().trim(),
    subject: sanitizeInput(subject.value),
    message: sanitizeInput(message.value)
  };

  // Show loading state
  const loadingEl = form.querySelector('.loading');
  if (loadingEl) {
    loadingEl.style.display = 'block';
  }

  // FormSubmit.co handles the actual submission
  // The form's action attribute points to their endpoint
  form.submit();
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize input to prevent XSS attacks
 * @param {string} input - Input string to sanitize
 * @returns {string} - Sanitized string
 */
function sanitizeInput(input) {
  const element = document.createElement('div');
  element.textContent = input;
  return element.innerHTML;
}

/**
 * Show error message using SweetAlert
 * @param {string} message - Error message to display
 */
function showError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Validation Error',
    text: message,
    confirmButtonColor: '#ff0937'
  });
}

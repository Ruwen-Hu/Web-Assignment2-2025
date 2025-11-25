// BookingForm.js - Native JavaScript version
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const bookingForm = document.querySelector('.booking-form form');
        const formControls = document.querySelectorAll('.form-control');

        if (!bookingForm) return;

        // Real-time form validation on blur
        formControls.forEach(function (field) {
            field.addEventListener('blur', function () {
                validateField(this);
            });
        });

        // Form validation before submission
        bookingForm.addEventListener('submit', function (e) {
            let isValid = true;

            formControls.forEach(function (field) {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
                showMessage('Please fill in all required fields correctly', 'error');
            }
        });

        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.getAttribute('name');

            // Clear previous error state
            field.classList.remove('error');
            const existingError = field.nextElementSibling;
            if (existingError && existingError.classList.contains('error-message')) {
                existingError.remove();
            }

            let isValid = true;
            let errorMessage = '';

            // Validation rules
            switch (fieldName) {
                case 'CustomerName':
                    if (value === '') {
                        errorMessage = 'Please enter your name';
                        isValid = false;
                    } else if (value.length < 2) {
                        errorMessage = 'Name must be at least 2 characters';
                        isValid = false;
                    }
                    break;

                case 'CustomerEmail':
                    if (value === '') {
                        errorMessage = 'Please enter your email';
                        isValid = false;
                    } else if (!isValidEmail(value)) {
                        errorMessage = 'Please enter a valid email address';
                        isValid = false;
                    }
                    break;

                case 'CustomerPhone':
                    if (value === '') {
                        errorMessage = 'Please enter your phone number';
                        isValid = false;
                    } else if (!isValidPhone(value)) {
                        errorMessage = 'Please enter a valid phone number';
                        isValid = false;
                    }
                    break;
            }

            if (!isValid) {
                field.classList.add('error');
                const errorSpan = document.createElement('span');
                errorSpan.className = 'error-message';
                errorSpan.style.cssText = 'color: #dc3545; font-size: 0.9rem; display: block; margin-top: 0.25rem;';
                errorSpan.textContent = errorMessage;
                field.parentNode.insertBefore(errorSpan, field.nextSibling);
            }

            return isValid;
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function isValidPhone(phone) {
            const phoneRegex = /^1[3-9]\d{9}$/;
            return phoneRegex.test(phone);
        }

        function showMessage(message, type) {
            const alertClass = type === 'error' ? 'alert-danger' : 'alert-success';
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert ${alertClass}`;
            alertDiv.style.marginBottom = '1rem';
            alertDiv.textContent = message;

            const form = document.querySelector('.booking-form');
            form.insertBefore(alertDiv, form.firstChild);

            setTimeout(function () {
                alertDiv.style.opacity = '0';
                alertDiv.style.transition = 'opacity 0.3s ease';
                setTimeout(function () {
                    alertDiv.remove();
                }, 300);
            }, 5000);
        }
    });

})();
// FeedbackForm.js - Native JavaScript version
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const contactForm = document.querySelector('.contact-form form');
        const formControls = document.querySelectorAll('.form-control');

        if (!contactForm) return;

        contactForm.addEventListener('submit', function (e) {
            const name = document.getElementById('Name')?.value.trim();
            const email = document.getElementById('Email')?.value.trim();
            const message = document.getElementById('Message')?.value.trim();

            let isValid = true;

            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(function (el) {
                el.remove();
            });
            formControls.forEach(function (field) {
                field.classList.remove('error');
            });

            // Name validation
            if (!name) {
                showError('Name', 'Please enter your name');
                isValid = false;
            }

            // Email validation
            if (!email) {
                showError('Email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('Email', 'Please enter a valid email address');
                isValid = false;
            }

            // Message validation
            if (!message) {
                showError('Message', 'Please enter your message');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
            }
        });

        // Real-time validation
        formControls.forEach(function (field) {
            field.addEventListener('blur', function () {
                const value = this.value.trim();
                const fieldName = this.getAttribute('id');

                // Remove existing error messages for this field
                const existingError = this.nextElementSibling;
                if (existingError && existingError.classList.contains('error-message')) {
                    existingError.remove();
                }
                this.classList.remove('error');

                if (!value) {
                    if (fieldName !== 'Phone') {
                        showError(fieldName, 'This field is required');
                    }
                } else if (fieldName === 'Email' && !isValidEmail(value)) {
                    showError(fieldName, 'Please enter a valid email address');
                }
            });
        });

        function showError(fieldName, message) {
            const field = document.getElementById(fieldName);
            if (!field) return;

            field.classList.add('error');
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            errorSpan.style.cssText = 'color: #dc3545; font-size: 0.9rem; display: block; margin-top: 0.25rem;';
            errorSpan.textContent = message;
            field.parentNode.insertBefore(errorSpan, field.nextSibling);
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    });

})();
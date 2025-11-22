// Booking form interaction and validation
$(document).ready(function () {
    // Real-time form validation
    $('.form-control').on('blur', function () {
        validateField($(this));
    });

    // Form validation before submission
    $('form').on('submit', function (e) {
        let isValid = true;

        $('.form-control').each(function () {
            if (!validateField($(this))) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            showMessage('Please fill in all required fields correctly', 'error');
        }
    });

    function validateField($field) {
        const value = $field.val().trim();
        const fieldName = $field.attr('name');

        // Clear previous error state
        $field.removeClass('error');
        $field.next('.error-message').remove();

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
            $field.addClass('error');
            $field.after('<span class="error-message" style="color: #dc3545; font-size: 0.9rem; display: block; margin-top: 0.25rem;">' + errorMessage + '</span>');
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^1[3-9]\d{9}$/; // Simple Chinese phone number validation
        return phoneRegex.test(phone);
    }

    function showMessage(message, type) {
        const alertClass = type === 'error' ? 'alert-danger' : 'alert-success';
        const $alert = $('<div class="alert ' + alertClass + '" style="margin-bottom: 1rem;">' + message + '</div>');

        $('.booking-form').prepend($alert);

        setTimeout(function () {
            $alert.fadeOut(300, function () {
                $(this).remove();
            });
        }, 5000);
    }

    // Add error styles to CSS
    const errorStyle = document.createElement('style');
    errorStyle.textContent = `
        .form-control.error {
            border-color: #dc3545;
        }
        
        .alert-danger {
            background: #f8d7da;
            color: #721c24;
            padding: 1rem;
            border-radius: 5px;
            border: 1px solid #f5c6cb;
        }
    `;
    document.head.appendChild(errorStyle);
});
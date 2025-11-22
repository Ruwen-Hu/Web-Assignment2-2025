// Contact form validation and interaction
$(document).ready(function () {
    // Form submission handling
    $('form').on('submit', function (e) {
        const name = $('#Name').val().trim();
        const email = $('#Email').val().trim();
        const message = $('#Message').val().trim();

        let isValid = true;

        // Clear previous error messages
        $('.error-message').remove();
        $('.form-control').removeClass('error');

        // Name validation
        if (name === '') {
            showError('Name', 'Please enter your name');
            isValid = false;
        }

        // Email validation
        if (email === '') {
            showError('Email', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('Email', 'Please enter a valid email address');
            isValid = false;
        }

        // Message validation
        if (message === '') {
            showError('Message', 'Please enter your message');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        }
    });

    // Show error message
    function showError(fieldName, message) {
        const $field = $('#' + fieldName);
        $field.addClass('error');
        $field.after('<span class="error-message" style="color: red; font-size: 0.9rem; display: block; margin-top: 0.25rem;">' + message + '</span>');
    }

    // Email format validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Real-time validation
    $('.form-control').on('blur', function () {
        const $field = $(this);
        const value = $field.val().trim();
        const fieldName = $field.attr('id');

        $('.error-message').remove();
        $field.removeClass('error');

        if (value === '') {
            if (fieldName !== 'Phone') { // Phone is optional
                showError(fieldName, 'This field is required');
            }
        } else if (fieldName === 'Email' && !isValidEmail(value)) {
            showError(fieldName, 'Please enter a valid email address');
        }
    });
});

// Add error styles to CSS
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .form-control.error {
        border-color: #dc3545;
    }
    
    .error-message {
        color: #dc3545;
        font-size: 0.9rem;
        display: block;
        margin-top: 0.25rem;
    }
    
    .alert-success {
        background: #d4edda;
        color: #155724;
        padding: 1rem;
        border-radius: 5px;
        margin-bottom: 1rem;
        border: 1px solid #c3e6cb;
    }
`;
document.head.appendChild(errorStyle);
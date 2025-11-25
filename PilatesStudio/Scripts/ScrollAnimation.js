// ScrollAnimation.js - Native JavaScript version
(function () {
    'use strict';

    console.log('✅ ScrollAnimation.js loaded (Native)');

    // Add CSS animation styles
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .form-control.error {
            border-color: #dc3545;
        }
        
        .alert-danger {
            background: #f8d7da;
            color: #721c24;
            padding: 1rem;
            border-radius: 5px;
            border: 1px solid #f5c6cb;
            margin-bottom: 1rem;
        }
        
        .alert-success {
            background: #d4edda;
            color: #155724;
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 1rem;
            border: 1px solid #c3e6cb;
        }
        
        .error-message {
            color: #dc3545;
            font-size: 0.9rem;
            display: block;
            margin-top: 0.25rem;
        }
    `;
    document.head.appendChild(style);

    // Scroll animation effect
    document.addEventListener('DOMContentLoaded', function () {
        // Add fade-in class to elements that need animation
        const animatedElements = document.querySelectorAll('.feature-card, .instructor-card, .testimonial-card, .course-card, .about-card');
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
        });

        // Scroll animation function
        function handleScroll() {
            const fadeElements = document.querySelectorAll('.fade-in');
            const windowHeight = window.innerHeight;

            fadeElements.forEach(function (element) {
                const position = element.getBoundingClientRect().top;

                if (position < windowHeight - 50) {
                    element.classList.add('visible');
                }
            });
        }

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Trigger once on initialization
        handleScroll();
    });

})();
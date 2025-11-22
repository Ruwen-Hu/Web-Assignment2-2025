// ScrollAnimation.js - Fixed version
(function ($) {
    'use strict';

    // Scroll animation effect
    $(document).ready(function () {
        console.log('✅ ScrollAnimation.js loaded');

        // Add scroll animation
        $(window).scroll(function () {
            $('.fade-in').each(function () {
                var position = $(this).offset().top;
                var scrollPosition = $(window).scrollTop() + $(window).height();

                if (position < scrollPosition - 50) {
                    $(this).addClass('visible');
                }
            });
        });

        // Trigger once on initialization
        $(window).trigger('scroll');
    });

    // Add class to elements that need animation
    $(document).ready(function () {
        const animatedElements = document.querySelectorAll('.feature-card, .instructor-card, .testimonial-card, .course-card');
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
        });
    });

    // CSS animation classes
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
    `;
    document.head.appendChild(style);

})(jQuery); // Pass jQuery parameter to ensure compatibility
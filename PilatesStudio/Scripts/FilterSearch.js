// FilterSearch.js - Fixed version
(function ($) {
    'use strict';

    $(document).ready(function () {
        console.log('=== Starting search functionality initialization ===');

        // Check necessary elements
        const $searchInput = $('#searchInput');
        const $levelFilter = $('#levelFilter');
        const $categoryFilter = $('#categoryFilter');
        const $sortFilter = $('#sortFilter');
        const $coursesContainer = $('#coursesContainer');

        if ($searchInput.length === 0) {
            console.error('❌ Search input not found');
            return;
        }
        if ($coursesContainer.length === 0) {
            console.error('❌ Courses container not found');
            return;
        }

        console.log('✅ All necessary elements exist');

        let searchTimeout = null;

        // Bind events
        $levelFilter.on('change', function () {
            console.log('Level filter changed:', this.value);
            performSearch();
        });

        $categoryFilter.on('change', function () {
            console.log('Category filter changed:', this.value);
            performSearch();
        });

        $sortFilter.on('change', function () {
            console.log('Sort changed:', this.value);
            performSearch();
        });

        $searchInput.on('input', function () {
            const searchTerm = $(this).val().trim();
            console.log('Search input:', searchTerm);

            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function () {
                performSearch();
            }, 500);
        });

        // Search function
        function performSearch() {
            const searchData = {
                searchTerm: $searchInput.val().trim(),
                level: $levelFilter.val(),
                category: $categoryFilter.val(),
                sortBy: $sortFilter.val()
            };

            console.log('Sending search request:', searchData);

            // Show loading state
            $('#loadingIndicator').show();
            $coursesContainer.css('opacity', '0.6');

            $.ajax({
                url: '/Course/FilterCourses',
                type: 'POST',
                data: JSON.stringify(searchData),
                contentType: 'application/json',
                dataType: 'json'
            })
                .done(function (response) {
                    console.log('Received response:', response);

                    if (response.success) {
                        updateCoursesDisplay(response.courses, response.count);
                    } else {
                        showError('Search failed: ' + response.message);
                    }
                })
                .fail(function (xhr, status, error) {
                    console.error('Request failed:', status, error);
                    console.log('Response text:', xhr.responseText);
                    showError('Network error, please check connection: ' + error);
                })
                .always(function () {
                    $('#loadingIndicator').hide();
                    $coursesContainer.css('opacity', '1');
                });
        }

        function updateCoursesDisplay(courses, count) {
            console.log('Updating display:', count, 'courses');

            const $count = $('#courseCount');
            $count.text(count);

            if (!courses || courses.length === 0) {
                $coursesContainer.html(`
                    <div class="no-results" style="grid-column: 1 / -1;">
                        <i class="fas fa-search fa-3x"></i>
                        <h3>No matching courses found</h3>
                        <p>Please try adjusting your search criteria or filter options</p>
                    </div>
                `);
                return;
            }

            let html = '';
            courses.forEach(function (course) {
                const buttonHtml = course.AvailableSpots > 0
                    ? `<a href="/Course/BookCourse/${course.Id}" class="book-button">Book Now</a>`
                    : `<button class="book-button disabled" disabled>Fully Booked</button>`;

                // Format date
                const schedule = new Date(course.Schedule).toLocaleString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                }).replace(/\//g, '/').replace(' ', ' ');

                html += `
                    <div class="course-card">
                        <div class="course-image">
                            <img src="${course.ImageUrl}" alt="${course.Title}" 
                                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWbvuWDj+WbvueBhzwvdGV4dD48L3N2Zz4='">
                        </div>
                        <div class="course-info">
                            <h3>${course.Title}</h3>
                            <p class="course-category">${course.Category} - ${course.Level}</p>
                            <p class="course-description">${course.Description}</p>
                            <div class="course-details">
                                <p><i class="fas fa-user"></i> ${course.Instructor}</p>
                                <p><i class="fas fa-clock"></i> ${schedule}</p>
                                <p><i class="fas fa-tag"></i> ¥${course.Price}</p>
                                <p><i class="fas fa-users"></i> ${course.AvailableSpots} spots remaining</p>
                            </div>
                            ${buttonHtml}
                        </div>
                    </div>
                `;
            });

            $coursesContainer.html(html);
        }

        function showError(message) {
            $coursesContainer.html(`
                <div class="no-results" style="grid-column: 1 / -1;">
                    <i class="fas fa-exclamation-triangle fa-3x"></i>
                    <h3>${message}</h3>
                    <button onclick="location.reload()" class="book-button" style="margin-top: 1rem; width: auto; display: inline-block;">Reload</button>
                </div>
            `);
        }

        console.log('=== Search functionality initialization completed ===');
        console.log('💡 Tip: Try changing filters or entering search text');
    });

})(jQuery);
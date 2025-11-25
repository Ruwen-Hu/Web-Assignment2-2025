// FilterSearch.js - Native JavaScript version
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const searchInput = document.getElementById('searchInput');
        const levelFilter = document.getElementById('levelFilter');
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');
        const coursesContainer = document.getElementById('coursesContainer');
        const courseCount = document.getElementById('courseCount');
        const loadingIndicator = document.getElementById('loadingIndicator');

        console.log('✅ FilterSearch.js loaded (Native)');

        // Add event listeners
        if (searchInput) {
            searchInput.addEventListener('input', debounce(handleFilterChange, 300));
        }
        if (levelFilter) {
            levelFilter.addEventListener('change', handleFilterChange);
        }
        if (categoryFilter) {
            categoryFilter.addEventListener('change', handleFilterChange);
        }
        if (sortFilter) {
            sortFilter.addEventListener('change', handleFilterChange);
        }

        function handleFilterChange() {
            const searchTerm = searchInput ? searchInput.value : '';
            const level = levelFilter ? levelFilter.value : 'all';
            const category = categoryFilter ? categoryFilter.value : 'all';
            const sortBy = sortFilter ? sortFilter.value : 'schedule';

            console.log('Filter changed:', { searchTerm, level, category, sortBy });

            filterCourses(searchTerm, level, category, sortBy);
        }

        function filterCourses(searchTerm, level, category, sortBy) {
            if (loadingIndicator) {
                loadingIndicator.style.display = 'block';
            }

            // Simulate API call - in real application this would be a fetch request
            setTimeout(() => {
                try {
                    const formData = new FormData();
                    formData.append('searchTerm', searchTerm);
                    formData.append('level', level);
                    formData.append('category', category);
                    formData.append('sortBy', sortBy);

                    // This would be your actual API endpoint
                    fetch('/Course/FilterCourses', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'RequestVerificationToken': getAntiForgeryToken()
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                updateCoursesDisplay(data.courses);
                                if (courseCount) {
                                    courseCount.textContent = data.count;
                                }
                            } else {
                                console.error('Search failed:', data.message);
                            }
                        })
                        .catch(error => {
                            console.error('Search error:', error);
                            // Fallback to client-side filtering if server fails
                            fallbackFilter(searchTerm, level, category, sortBy);
                        })
                        .finally(() => {
                            if (loadingIndicator) {
                                loadingIndicator.style.display = 'none';
                            }
                        });

                } catch (error) {
                    console.error('Filter error:', error);
                    fallbackFilter(searchTerm, level, category, sortBy);
                    if (loadingIndicator) {
                        loadingIndicator.style.display = 'none';
                    }
                }
            }, 500);
        }

        function fallbackFilter(searchTerm, level, category, sortBy) {
            // Client-side filtering as fallback
            const courseCards = document.querySelectorAll('.course-card');
            let visibleCount = 0;

            courseCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.course-description').textContent.toLowerCase();
                const instructor = card.querySelector('.course-details p:first-child').textContent.toLowerCase();
                const courseLevel = card.querySelector('.course-category').textContent.toLowerCase();
                const courseCategory = card.querySelector('.course-category').textContent.toLowerCase();

                let shouldShow = true;

                // Search filter
                if (searchTerm) {
                    const searchLower = searchTerm.toLowerCase();
                    if (!title.includes(searchLower) &&
                        !description.includes(searchLower) &&
                        !instructor.includes(searchLower)) {
                        shouldShow = false;
                    }
                }

                // Level filter
                if (level !== 'all' && !courseLevel.includes(level.toLowerCase())) {
                    shouldShow = false;
                }

                // Category filter
                if (category !== 'all' && !courseCategory.includes(category.toLowerCase())) {
                    shouldShow = false;
                }

                if (shouldShow) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (courseCount) {
                courseCount.textContent = visibleCount;
            }
        }

        function updateCoursesDisplay(courses) {
            if (!coursesContainer) return;

            if (courses.length === 0) {
                coursesContainer.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search fa-3x"></i>
                        <h3>No Courses Found</h3>
                        <p>No courses match your search criteria</p>
                    </div>
                `;
                return;
            }

            let html = '';
            courses.forEach(course => {
                html += `
                    <div class="course-card" data-course-id="${course.Id}">
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
                                <p><i class="fas fa-clock"></i> ${new Date(course.Schedule).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })} ${new Date(course.Schedule).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                                <p><i class="fas fa-tag"></i> ¥${course.Price}</p>
                                <p><i class="fas fa-users"></i> ${course.AvailableSpots} spots remaining</p>
                            </div>
                            ${course.AvailableSpots > 0 ?
                        `<a href="/Course/BookCourse/${course.Id}" class="book-button">Book Now</a>` :
                        `<button class="book-button disabled" disabled>Fully Booked</button>`
                    }
                        </div>
                    </div>
                `;
            });

            coursesContainer.innerHTML = html;
        }

        function getAntiForgeryToken() {
            const tokenElement = document.querySelector('input[name="__RequestVerificationToken"]');
            return tokenElement ? tokenElement.value : '';
        }

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
    });

})();
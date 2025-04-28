document.addEventListener('DOMContentLoaded', function() {
    try {
        // Cache DOM elements
        const projectCards = document.querySelectorAll('.project-card');
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        const searchInput = document.querySelector('.search-bar input');
        const resetSearchBtn = document.getElementById('reset-search');
        const emptyState = document.querySelector('.empty-state');
        const paginationBtns = document.querySelectorAll('.pagination button');
        const userProfile = document.querySelector('.user-profile');
        const actionBtns = document.querySelectorAll('.action-btn');
        
        // Add click event listeners for project cards
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                const projectTitle = this.querySelector('.project-title').textContent;
                window.location.href = 'projectsDetail.html?project=' + encodeURIComponent(projectTitle);
            });
        });

        // Add click event listeners for sidebar items
        sidebarItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all items
                sidebarItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Get filter category from data attribute
                const filterCategory = this.getAttribute('data-filter');
                
                // Apply filter
                filterProjects(filterCategory);
            });
        });

        // Function to filter projects
        function filterProjects(category) {
            // Track if we have any visible projects
            let hasVisibleProjects = false;
            
            // Get search term if present
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            
            // Update page title to show current filter
            const filterName = document.querySelector(`.sidebar-item[data-filter="${category}"] span`).textContent;
            document.querySelector('.projects-title').textContent = filterName;
            
            // Filter projects
            projectCards.forEach(card => {
                const title = card.querySelector('.project-title').textContent.toLowerCase();
                const description = card.querySelector('.project-description').textContent.toLowerCase();
                const cardCategories = card.getAttribute('data-categories') || '';
                
                let matchesCategory = true;
                
                // Apply category filter if not "all"
                if (category !== 'all') {
                    // For demo, we're using data-categories attribute
                    // In a real app, this would be more sophisticated
                    matchesCategory = cardCategories.includes(category);
                    
                    // Special case for "my-projects" - in a real app this would check user assignment
                    if (category === 'my-projects') {
                        // For demo, randomly show some projects as "mine"
                        matchesCategory = Math.random() > 0.5;
                    }
                    
                    // Special case for "starred" - in a real app this would check starred status
                    if (category === 'starred') {
                        // For demo, randomly show some projects as "starred"
                        matchesCategory = Math.random() > 0.7;
                    }
                    
                    // Special case for "discover" - in a real app this would show recommended projects
                    if (category === 'discover') {
                        // For demo, show all projects for "discover"
                        matchesCategory = true;
                    }
                }
                
                // Check if matches search term
                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
                
                // Apply filters
                if (matchesCategory && matchesSearch) {
                    card.style.display = 'flex';
                    hasVisibleProjects = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide empty state
            if (emptyState) {
                emptyState.style.display = hasVisibleProjects ? 'none' : 'block';
            }
        }

        // Search functionality with debounce
        if (searchInput) {
            let debounceTimeout;
            searchInput.addEventListener('input', function() {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(() => {
                    const activeCategory = document.querySelector('.sidebar-item.active').getAttribute('data-filter');
                    filterProjects(activeCategory);
                }, 300);
            });
        }

        // Reset search and filters
        if (resetSearchBtn) {
            resetSearchBtn.addEventListener('click', function() {
                if (searchInput) searchInput.value = '';
                sidebarItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-filter') === 'all') {
                        item.classList.add('active');
                    }
                });
                filterProjects('all');
            });
        }

        // Make user profile clickable
        if (userProfile) {
            userProfile.addEventListener('click', function() {
                window.location.href = 'profile.html';
            });
        }

        // Action buttons functionality
        if (actionBtns) {
            actionBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent triggering project card click
                    
                    const buttonText = this.textContent.trim();
                    if (buttonText.includes('Filter')) {
                        // Show filter dialog (in a real app)
                        alert('Filter options would appear here');
                    } else if (buttonText.includes('Sort')) {
                        // Show sort options (in a real app)
                        alert('Sort options would appear here');
                    }
                });
            });
        }

        // Pagination functionality
        if (paginationBtns) {
            paginationBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    paginationBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // In a real app, this would load the appropriate page
                    alert(`Loading page ${this.textContent}`);
                });
            });
        }

        // Optimize description heights for better visual appearance
        function equalizeProjectDescriptions() {
            // Group cards by rows to ensure only cards in the same row have same height
            const viewportWidth = window.innerWidth;
            let cardsPerRow = 3;
            
            // Adjust cards per row based on viewport
            if (viewportWidth < 768) {
                cardsPerRow = 1;
            } else if (viewportWidth < 992) {
                cardsPerRow = 2;
            }
            
            // Reset heights first
            document.querySelectorAll('.project-description').forEach(desc => {
                desc.style.height = 'auto';
            });
            
            // If single column layout, don't equalize heights
            if (cardsPerRow === 1) return;
            
            const descriptions = Array.from(document.querySelectorAll('.project-description'));
            
            // Process each row
            for (let i = 0; i < descriptions.length; i += cardsPerRow) {
                const rowDescriptions = descriptions.slice(i, i + cardsPerRow);
                let maxHeight = 0;
                
                // Find max height in this row
                rowDescriptions.forEach(desc => {
                    maxHeight = Math.max(maxHeight, desc.offsetHeight);
                });
                
                // Set all descriptions in this row to max height
                rowDescriptions.forEach(desc => {
                    desc.style.height = `${maxHeight}px`;
                });
            }
        }

        // Run on page load and window resize with debounce
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(equalizeProjectDescriptions, 200);
        });
        
        // Initial run after a short delay to ensure DOM is fully rendered
        setTimeout(equalizeProjectDescriptions, 100);
        
        // Apply initial filter
        filterProjects('all');
        
    } catch (error) {
        console.error('Error in projects.js:', error);
    }
});
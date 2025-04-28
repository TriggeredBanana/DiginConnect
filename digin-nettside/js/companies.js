document.addEventListener('DOMContentLoaded', () => {
    try {
        // Cache DOM elements
        const filterItems = document.querySelectorAll('.sidebar-item');
        const companyCards = document.querySelectorAll('.company-card');
        const searchInput = document.querySelector('.search-bar input');
        const emptyState = document.querySelector('.empty-state');
        const resetSearchBtn = document.getElementById('reset-search');
        const paginationBtns = document.querySelectorAll('.pagination button');
        const viewMoreBtns = document.querySelectorAll('.view-more');
        const userProfile = document.querySelector('.user-profile');
        
        // Initialize the current filter
        let currentFilter = 'all';
        let debounceTimeout = null;

        // Function to filter companies with debounce
        function filterCompanies() {
            let hasVisibleCards = false;
            const searchTerm = searchInput && searchInput.value ? searchInput.value.toLowerCase() : '';
            
            companyCards.forEach(card => {
                if (!card) return;
                
                const companyName = card.querySelector('.company-name')?.textContent.toLowerCase() || '';
                const companyDesc = card.querySelector('.company-description')?.textContent.toLowerCase() || '';
                const categoriesAttr = card.getAttribute('data-categories') || 'none';
                const categories = categoriesAttr.split(',');
                
                const matchesFilter = currentFilter === 'all' || categories.includes(currentFilter);
                const matchesSearch = companyName.includes(searchTerm) || companyDesc.includes(searchTerm);
                
                if (matchesFilter && matchesSearch) {
                    card.style.display = 'flex';
                    hasVisibleCards = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide empty state if it exists
            if (emptyState) {
                emptyState.style.display = hasVisibleCards ? 'none' : 'block';
            }
        }

        // Add click event listeners for filter sidebar items
        filterItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                // Remove active class from all items
                filterItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
                
                // Get the filter value
                currentFilter = this.getAttribute('data-filter') || 'all';
                
                // Apply filter
                filterCompanies();
            });
        });

        // Add search functionality with proper debouncing
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(filterCompanies, 300);
            });
        }

        // Reset search and filters
        if (resetSearchBtn) {
            resetSearchBtn.addEventListener('click', function() {
                if (searchInput) searchInput.value = '';
                filterItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-filter') === 'all') {
                        item.classList.add('active');
                    }
                });
                currentFilter = 'all';
                filterCompanies();
            });
        }

        // Add pagination functionality
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                paginationBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                alert(`Loading page ${this.textContent}`);
            });
        });
        
        // Set first pagination button as active by default
        if (paginationBtns.length > 0) {
            paginationBtns[0].classList.add('active');
        }

        // Add navigation for "View Company" buttons
        viewMoreBtns.forEach(button => {
            if (!button) return;
            
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default button behavior
                e.stopPropagation(); // Prevent event bubbling
                
                const companyCard = this.closest('.company-card');
                if (!companyCard) return;
                
                const companyNameElem = companyCard.querySelector('.company-name');
                if (!companyNameElem) return;
                
                const companyName = companyNameElem.textContent;
                window.location.href = `companiesDetail.html?company=${encodeURIComponent(companyName)}`;
            });
        });

        // Make user profile clickable
        if (userProfile) {
            userProfile.addEventListener('click', function() {
                window.location.href = 'profile.html';
            });
        }

        // Apply initial filtering
        filterCompanies();
        
        // FIX: Pre-load all company images to prevent continuous loading attempts
        document.querySelectorAll('.company-logo img').forEach(img => {
            // Set a single error handler instead of inline onerror attributes
            img.onerror = function() {
                const companyName = this.closest('.company-card')?.querySelector('.company-name')?.textContent || 'Company';
                this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60" style="background:%23f8f9fa"><text x="50%" y="50%" font-family="Arial" font-size="16" fill="%23666" text-anchor="middle" dominant-baseline="middle">' + companyName + '</text></svg>';
                // Remove the error handler to prevent potential loops
                this.onerror = null;
            };
        });
        
    } catch (error) {
        console.error('Error in companies.js:', error);
    }
});
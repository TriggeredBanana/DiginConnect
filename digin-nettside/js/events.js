document.addEventListener('DOMContentLoaded', function() {
    try {
        // DOM Elements
        const userProfile = document.querySelector('.user-profile');
        const searchInput = document.getElementById('search-input');
        const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
        const applyFilterBtn = document.querySelector('.filter-apply-btn');
        const resetFilterBtn = document.querySelector('.filter-reset-btn');
        const resetFiltersBtn = document.getElementById('reset-filters-btn');
        const viewOptions = document.querySelectorAll('.view-option-btn');
        const eventsList = document.getElementById('events-list');
        const eventCards = document.querySelectorAll('.event-card');
        const loadMoreBtn = document.getElementById('load-more-btn');
        const noEventsMessage = document.getElementById('no-events-message');
        const rsvpButtons = document.querySelectorAll('.event-rsvp-btn');
        const shareButtons = document.querySelectorAll('.event-share-btn');
        const reminderButtons = document.querySelectorAll('.event-reminder-btn');
        const createEventBtn = document.querySelector('.create-event-btn');
        const recommendedEventButtons = document.querySelectorAll('.recommended-event .btn-outline');
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');
        const currentMonthDisplay = document.getElementById('current-month-display');
        const calendarDays = document.getElementById('calendar-days');
        
        // Current state
        const currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        
        // Make user profile navigation work
        if (userProfile) {
            userProfile.addEventListener('click', function() {
                window.location.href = 'profile.html';
            });
        }
        
        // Initialize the calendar
        function initCalendar() {
            updateCalendar();
            
            // Add event listeners for calendar navigation
            if (prevMonthBtn) {
                prevMonthBtn.addEventListener('click', function() {
                    currentMonth--;
                    if (currentMonth < 0) {
                        currentMonth = 11;
                        currentYear--;
                    }
                    updateCalendar();
                });
            }
            
            if (nextMonthBtn) {
                nextMonthBtn.addEventListener('click', function() {
                    currentMonth++;
                    if (currentMonth > 11) {
                        currentMonth = 0;
                        currentYear++;
                    }
                    updateCalendar();
                });
            }
        }
        
        // Update calendar display
        function updateCalendar() {
            if (!currentMonthDisplay || !calendarDays) return;
            
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                            'July', 'August', 'September', 'October', 'November', 'December'];
            
            // Update month/year display
            currentMonthDisplay.textContent = `${months[currentMonth]} ${currentYear}`;
            
            // Clear previous days
            calendarDays.innerHTML = '';
            
            // Get first day of the month and number of days in month
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            
            // Adjust for Monday as first day (0 = Monday, 6 = Sunday)
            const startingDay = firstDay === 0 ? 6 : firstDay - 1;
            
            // Create empty cells for days before start of month
            for (let i = 0; i < startingDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.classList.add('calendar-day', 'empty');
                calendarDays.appendChild(emptyDay);
            }
            
            // Create calendar days
            for (let i = 1; i <= daysInMonth; i++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-day');
                dayElement.textContent = i;
                
                // Check if this date has events
                const eventDate = new Date(currentYear, currentMonth, i);
                const hasEvents = checkForEvents(eventDate);
                
                if (hasEvents) {
                    dayElement.classList.add('has-events');
                }
                
                // Check if this is today
                if (i === currentDate.getDate() && 
                    currentMonth === currentDate.getMonth() && 
                    currentYear === currentDate.getFullYear()) {
                    dayElement.classList.add('today');
                }
                
                // Add click event for days
                dayElement.addEventListener('click', function() {
                    // In a real app, this would navigate to events for this date or show events in a popup
                    const dateString = `${months[currentMonth]} ${i}, ${currentYear}`;
                    alert(`Showing events for ${dateString}`);
                });
                
                calendarDays.appendChild(dayElement);
            }
        }
        
        // Check if a specific date has events (this is a simplified version)
        function checkForEvents(date) {
            // Hard-coded sample event dates for demo purposes
            // In a real app, this would check against an actual events database
            const eventDates = [
                new Date(2025, 4, 15), // May 15, 2025
                new Date(2025, 4, 22), // May 22, 2025
                new Date(2025, 5, 2),  // June 2, 2025
                new Date(2025, 5, 14), // June 14, 2025
                new Date(2025, 6, 5),  // July 5, 2025
            ];
            
            return eventDates.some(eventDate => 
                eventDate.getDate() === date.getDate() && 
                eventDate.getMonth() === date.getMonth() && 
                eventDate.getFullYear() === date.getFullYear()
            );
        }
        
        // Filter events based on search input and checkboxes
        function filterEvents() {
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            
            // Get selected event types
            const selectedTypes = [];
            const selectedLocations = [];
            const selectedCompanies = [];
            
            filterCheckboxes.forEach(checkbox => {
                if (!checkbox.checked) return;
                
                // Determine which filter group this checkbox belongs to
                const filterGroup = checkbox.closest('.filter-group');
                if (!filterGroup) return;
                
                const filterTitle = filterGroup.querySelector('.filter-title').textContent.toLowerCase();
                
                if (filterTitle === 'event type') {
                    selectedTypes.push(checkbox.value);
                } else if (filterTitle === 'location') {
                    selectedLocations.push(checkbox.value);
                } else if (filterTitle === 'companies') {
                    selectedCompanies.push(checkbox.value);
                }
            });
            
            // Apply filters to events
            let visibleCount = 0;
            
            eventCards.forEach(card => {
                const eventName = card.querySelector('.event-name').textContent.toLowerCase();
                const eventDescription = card.querySelector('.event-description').textContent.toLowerCase();
                const eventOrganizer = card.querySelector('.event-organizer').textContent.toLowerCase();
                const eventType = card.getAttribute('data-type');
                const eventLocation = card.getAttribute('data-location');
                const eventCompany = card.getAttribute('data-company');
                
                // Check if event matches search term
                const matchesSearch = searchTerm === '' || 
                                      eventName.includes(searchTerm) || 
                                      eventDescription.includes(searchTerm) || 
                                      eventOrganizer.includes(searchTerm);
                
                // Check if event matches selected filters
                const matchesType = selectedTypes.length === 0 || selectedTypes.includes(eventType);
                const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(eventLocation);
                const matchesCompany = selectedCompanies.length === 0 || selectedCompanies.includes(eventCompany);
                
                // Show/hide event based on filters
                if (matchesSearch && matchesType && matchesLocation && matchesCompany) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide no events message
            if (noEventsMessage) {
                noEventsMessage.style.display = visibleCount === 0 ? 'flex' : 'none';
            }
            
            // Show/hide load more button based on filtered results
            if (loadMoreBtn) {
                loadMoreBtn.style.display = visibleCount > 0 ? 'flex' : 'none';
            }
            
            return visibleCount;
        }
        
        // Reset all filters
        function resetFilters() {
            if (searchInput) {
                searchInput.value = '';
            }
            
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            
            filterEvents();
        }
        
        // Add click event listeners for filter buttons
        if (applyFilterBtn) {
            applyFilterBtn.addEventListener('click', filterEvents);
        }
        
        if (resetFilterBtn) {
            resetFilterBtn.addEventListener('click', resetFilters);
        }
        
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', resetFilters);
        }
        
        // Add input event for search with debounce
        if (searchInput) {
            let debounceTimeout;
            searchInput.addEventListener('input', function() {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(filterEvents, 300);
            });
        }
        
        // Add click event listeners for view options
        viewOptions.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all view options
                viewOptions.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the selected view
                const selectedView = this.getAttribute('data-view');
                
                // Update view
                if (eventsList) {
                    eventsList.className = 'events-list';
                    eventsList.classList.add(selectedView + '-view');
                }
            });
        });
        
        // Add click event for load more button
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                // In a real app, this would load more events from the server
                this.classList.add('loading');
                this.innerHTML = 'Loading...';
                
                // Simulate loading delay
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = `
                        Load more events
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    `;
                    alert('No more events to load');
                }, 1000);
            });
        }
        
        // Add click event listeners for RSVP buttons
        rsvpButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const eventCard = this.closest('.event-card');
                const eventName = eventCard.querySelector('.event-name').textContent;
                
                // Toggle RSVP status
                if (this.classList.contains('attending')) {
                    this.classList.remove('attending');
                    this.textContent = 'RSVP';
                    alert(`You are no longer attending "${eventName}"`);
                } else {
                    this.classList.add('attending');
                    this.textContent = 'Attending';
                    alert(`You are now attending "${eventName}". This event has been added to your calendar.`);
                    
                    // In a real app, we would update the attendee count and avatars
                }
            });
        });
        
        // Add click event listeners for share buttons
        shareButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const eventCard = this.closest('.event-card');
                const eventName = eventCard.querySelector('.event-name').textContent;
                
                // In a real app, this would open a share dialog
                alert(`Sharing options for "${eventName}"\n- Copy link\n- Email\n- Share to LinkedIn\n- Share to Twitter`);
            });
        });
        
        // Add click event listeners for reminder buttons
        reminderButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const eventCard = this.closest('.event-card');
                const eventName = eventCard.querySelector('.event-name').textContent;
                
                // Toggle reminder status
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    alert(`Reminder removed for "${eventName}"`);
                } else {
                    this.classList.add('active');
                    alert(`You will be reminded about "${eventName}" one day before the event`);
                }
            });
        });
        
        // Add click event for create event button
        if (createEventBtn) {
            createEventBtn.addEventListener('click', function() {
                // In a real app, this would navigate to an event creation form or open a modal
                alert('Event creation form would open here');
            });
        }
        
        // Add click events for recommended event buttons
        recommendedEventButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const eventCard = this.closest('.recommended-event');
                const eventName = eventCard.querySelector('.rec-event-name').textContent;
                
                // Toggle RSVP status
                if (this.classList.contains('attending')) {
                    this.classList.remove('attending');
                    this.textContent = 'RSVP';
                    alert(`You are no longer attending "${eventName}"`);
                } else {
                    this.classList.add('attending');
                    this.textContent = 'Attending';
                    alert(`You are now attending "${eventName}". This event has been added to your calendar.`);
                }
            });
        });
        
        // Initialize the page
        initCalendar();
        
        // Apply initial filtering
        filterEvents();
        
    } catch (error) {
        console.error('Error in events.js:', error);
    }
});
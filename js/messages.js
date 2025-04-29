document.addEventListener('DOMContentLoaded', function() {
    try {
        // Cache DOM elements
        const tabs = document.querySelectorAll('.content-tabs button');
        const messageItems = document.querySelectorAll('.message-item');
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        const searchInput = document.querySelector('.search-bar input');
        const searchClearBtn = document.querySelector('.search-clear');
        const resetSearchBtn = document.getElementById('reset-search');
        const emptyState = document.querySelector('.empty-state');
        const sortBtn = document.querySelector('.sort-btn');
        const userProfile = document.querySelector('.user-profile');
        const composeBtn = document.querySelector('.compose-btn');
        const checkboxes = document.querySelectorAll('.checkbox-container input');
        const starButtons = document.querySelectorAll('.star-btn');
        const optionsButtons = document.querySelectorAll('.options-btn');
        const headerRefreshBtn = document.querySelector('.header-action[title="Refresh"]');
        const headerMoreBtn = document.querySelector('.header-action[title="More options"]');
        const messagesTitle = document.querySelector('.messages-title');
        const messagesCount = document.querySelector('.messages-count');
        
        // Current state
        let currentFolder = 'inbox';
        let currentTab = 'all messages';
        let currentSort = 'date';
        let currentPage = 1;
        let itemsPerPage = 10;
        let totalMessages = messageItems.length;
        let selectedMessages = new Set();

        // Update messages title and count based on folder
        function updateHeaderInfo() {
            // Set title based on current folder
            if (messagesTitle) {
                const activeFolder = document.querySelector('.sidebar-item.active');
                if (activeFolder) {
                    const folderName = activeFolder.querySelector('span:not(.badge)').textContent;
                    messagesTitle.textContent = folderName;
                }
            }
            
            // Count visible messages
            if (messagesCount) {
                let visibleCount = 0;
                messageItems.forEach(item => {
                    if (item.style.display !== 'none') {
                        visibleCount++;
                    }
                });
                messagesCount.textContent = `${visibleCount} message${visibleCount !== 1 ? 's' : ''}`;
            }
        }

        // Add click event listeners for tabs
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tabs.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Update current tab
                currentTab = this.textContent.toLowerCase();
                
                // Filter messages
                filterMessages();
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
                
                // Get the folder
                currentFolder = this.getAttribute('data-folder');
                
                // Update header info
                updateHeaderInfo();
                
                // Filter messages based on folder
                filterMessages();
            });
        });

        // Function to filter messages
        function filterMessages() {
            // Reset selection
            selectedMessages.clear();
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            let hasVisibleMessages = false;
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            
            messageItems.forEach(item => {
                const sender = item.querySelector('.sender-name').textContent.toLowerCase();
                const subject = item.querySelector('.message-subject').textContent.toLowerCase();
                const content = item.querySelector('.message-preview').textContent.toLowerCase();
                
                // Check if message is appropriate for current folder
                let matchesFolder = true;
                if (currentFolder === 'starred') {
                    matchesFolder = item.querySelector('.star-btn.starred') !== null;
                } else if (currentFolder === 'snoozed') {
                    // For demo, no messages are snoozed
                    matchesFolder = false;
                } else if (currentFolder === 'sent') {
                    // For demo, no messages are sent
                    matchesFolder = false;
                } else if (currentFolder === 'drafts') {
                    // For demo, no messages are drafts
                    matchesFolder = false;
                } else if (currentFolder === 'labels') {
                    // For demo, no messages have labels
                    matchesFolder = false;
                }
                
                // Check if matches the current tab filter
                let matchesTab = true;
                if (currentTab !== 'all messages') {
                    if (currentTab === 'companies') {
                        matchesTab = sender.includes('egde') || sender.includes('webstep') || 
                                    sender.includes('crayon') || sender.includes('digin');
                    } else if (currentTab === 'users') {
                        matchesTab = !sender.includes('egde') && !sender.includes('webstep') && 
                                    !sender.includes('crayon') && !sender.includes('digin');
                    } else if (currentTab === 'projects') {
                        matchesTab = subject.includes('prosjekt') || content.includes('prosjekt') || 
                                    subject.includes('project') || content.includes('project');
                    }
                }
                
                // Check if matches search term
                const matchesSearch = searchTerm === '' || 
                                    sender.includes(searchTerm) || 
                                    subject.includes(searchTerm) || 
                                    content.includes(searchTerm);
                
                // Apply all filters
                if (matchesFolder && matchesTab && matchesSearch) {
                    item.style.display = 'flex';
                    hasVisibleMessages = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide empty state
            if (emptyState) {
                emptyState.style.display = hasVisibleMessages ? 'none' : 'flex';
            }
            
            // Update displayed count
            updateHeaderInfo();
        }

        // Search functionality with debounce
        if (searchInput) {
            let debounceTimeout;
            searchInput.addEventListener('input', function() {
                // Show/hide clear button
                if (searchClearBtn) {
                    searchClearBtn.style.display = this.value ? 'flex' : 'none';
                }
                
                // Debounce search
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(filterMessages, 300);
            });
            
            // Initial state for clear button
            if (searchClearBtn) {
                searchClearBtn.style.display = searchInput.value ? 'flex' : 'none';
                searchClearBtn.addEventListener('click', function() {
                    searchInput.value = '';
                    searchInput.focus();
                    this.style.display = 'none';
                    filterMessages();
                });
            }
        }

        // Reset search and filters
        if (resetSearchBtn) {
            resetSearchBtn.addEventListener('click', function() {
                if (searchInput) {
                    searchInput.value = '';
                    if (searchClearBtn) {
                        searchClearBtn.style.display = 'none';
                    }
                }
                
                // Reset to inbox folder
                sidebarItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-folder') === 'inbox') {
                        item.classList.add('active');
                    }
                });
                
                // Reset to all messages tab
                tabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.textContent.toLowerCase() === 'all messages') {
                        tab.classList.add('active');
                    }
                });
                
                // Reset state
                currentFolder = 'inbox';
                currentTab = 'all messages';
                
                // Update UI
                updateHeaderInfo();
                filterMessages();
            });
        }

        // Sorting functionality
        if (sortBtn) {
            sortBtn.addEventListener('click', function() {
                // Toggle sort order (in a real app, you'd have a dropdown menu)
                const sortOptions = ['date', 'sender', 'subject'];
                const currentIndex = sortOptions.indexOf(currentSort);
                const nextIndex = (currentIndex + 1) % sortOptions.length;
                currentSort = sortOptions[nextIndex];
                
                // Update button text
                this.innerHTML = `
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="7 11 12 6 17 11"></polyline>
                        <polyline points="7 17 12 12 17 17"></polyline>
                    </svg>
                    Sort: ${currentSort.charAt(0).toUpperCase() + currentSort.slice(1)}
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                `;
                
                // In a real app, you would sort the messages here
                // For this demo, just show an alert
                alert(`Messages sorted by: ${currentSort}`);
            });
        }

        // Handle message checkboxes for bulk actions
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    selectedMessages.add(index);
                } else {
                    selectedMessages.delete(index);
                }
                
                // In a real app, you'd update a bulk actions menu here
                console.log(`Selected messages: ${selectedMessages.size}`);
            });
        });

        // Handle star buttons
        starButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering message click
                
                // Toggle starred class
                this.classList.toggle('starred');
                
                // Update SVG appearance
                if (this.classList.contains('starred')) {
                    this.setAttribute('title', 'Remove from starred');
                    this.innerHTML = `
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="none">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    `;
                } else {
                    this.setAttribute('title', 'Mark as starred');
                    this.innerHTML = `
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    `;
                }
                
                // If we're in the starred folder, update the visibility
                if (currentFolder === 'starred') {
                    filterMessages();
                }
            });
        });

        // Options buttons functionality
        optionsButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering message click
                
                // In a real app, this would show a context menu
                // For this demo, just show an alert
                const messageItem = this.closest('.message-item');
                const sender = messageItem.querySelector('.sender-name').textContent;
                const subject = messageItem.querySelector('.message-subject').textContent;
                
                alert(`Options for message "${subject}" from ${sender}`);
            });
        });

        // Add click handler for message items
        messageItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Don't handle click if it's on a control element
                if (e.target.closest('.checkbox-container') || 
                    e.target.closest('.star-btn') || 
                    e.target.closest('.options-btn')) {
                    return;
                }
                
                const sender = this.querySelector('.sender-name').textContent;
                const subject = this.querySelector('.message-subject').textContent;
                
                // In a real app, this would navigate to a message detail view
                alert(`Opening message from ${sender}: "${subject}"`);
                
                // Mark as read by removing unread class
                this.classList.remove('unread');
            });
        });

        // Handle refresh button
        if (headerRefreshBtn) {
            headerRefreshBtn.addEventListener('click', function() {
                // Simulate refresh with animation
                this.classList.add('spinning');
                
                // In a real app, this would reload messages from server
                setTimeout(() => {
                    this.classList.remove('spinning');
                    alert('Messages refreshed');
                }, 1000);
            });
        }

        // Handle more options button
        if (headerMoreBtn) {
            headerMoreBtn.addEventListener('click', function() {
                // In a real app, this would show a dropdown menu
                alert('More options menu');
            });
        }

        // Handle compose button click
        if (composeBtn) {
            composeBtn.addEventListener('click', function() {
                // In a real app, this would open a compose dialog or navigate to a compose page
                alert('New message composer would open here');
            });
        }

        // Make user profile clickable
        if (userProfile) {
            userProfile.addEventListener('click', function() {
                window.location.href = 'profile.html';
            });
        }
        
        // Initial state setup
        updateHeaderInfo();
        
    } catch (error) {
        console.error('Error in messages.js:', error);
    }
});
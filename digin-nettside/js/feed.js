document.addEventListener('DOMContentLoaded', function() {
    try {
        // DOM Elements
        const userProfile = document.querySelector('.user-profile');
        const actionBtns = document.querySelectorAll('.action-btn');
        const likeBtns = document.querySelectorAll('.like-btn');
        const commentBtns = document.querySelectorAll('.comment-btn');
        const shareBtns = document.querySelectorAll('.share-btn');
        const savePostBtns = document.querySelectorAll('.action-icon-btn[title="Save post"]');
        const moreOptionsBtns = document.querySelectorAll('.action-icon-btn[title="More options"]');
        const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="Search"]');
        const feedFilters = document.querySelector('.btn-outline[title="Filter feed"]');
        const feedRefresh = document.querySelector('.btn-outline[title="Refresh feed"]');
        const loadMoreBtn = document.querySelector('.load-more-btn');
        const composePostBtn = document.querySelector('.compose-actions .btn-primary');
        const connectionTabs = document.querySelectorAll('.connection-tabs .tab');
        const rsvpBtns = document.querySelectorAll('.event-card .btn-outline');
        const projectCards = document.querySelectorAll('.project-card-mini');
        const viewAllConnections = document.querySelector('.view-all-btn');
        const connectionCards = document.querySelectorAll('.connection-card');
        
        // Make user profile navigation work
        if (userProfile) {
            userProfile.addEventListener('click', function() {
                window.location.href = 'profile.html';
            });
        }
        
        // Add click event listeners for like buttons
        if (likeBtns) {
            likeBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const isLiked = this.classList.contains('liked');
                    
                    // Toggle the liked state
                    if (isLiked) {
                        this.classList.remove('liked');
                        this.innerHTML = `
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            Like
                        `;
                    } else {
                        this.classList.add('liked');
                        this.innerHTML = `
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="none">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            Liked
                        `;
                    }
                    
                    // Update the engagement info (in a real app, this would be an API call)
                    const feedCard = this.closest('.feed-card');
                    const reactionsElement = feedCard.querySelector('.reactions span:last-child');
                    const currentCount = parseInt(reactionsElement.textContent);
                    const newCount = isLiked ? currentCount - 1 : currentCount + 1;
                    reactionsElement.textContent = newCount + ' reactions';
                });
            });
        }
        
        // Add click event listeners for comment buttons
        if (commentBtns) {
            commentBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Get the publisher name from the feed card
                    const feedCard = this.closest('.feed-card');
                    const publisherName = feedCard.querySelector('.publisher-name').textContent;
                    
                    // Show comment input (in a real app, this would open a comment area)
                    const commentText = prompt(`Add a comment to ${publisherName}'s post:`);
                    if (commentText && commentText.trim() !== '') {
                        alert(`Comment added: "${commentText}"`);
                        
                        // Update comment count (in a real app, this would be an API call)
                        const commentCountElement = feedCard.querySelector('.comment-count');
                        const currentCount = parseInt(commentCountElement.textContent);
                        commentCountElement.textContent = (currentCount + 1) + ' comments';
                    }
                });
            });
        }
        
        // Add click event listeners for share buttons
        if (shareBtns) {
            shareBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const feedCard = this.closest('.feed-card');
                    const publisherName = feedCard.querySelector('.publisher-name').textContent;
                    
                    // Simple share functionality (would be more sophisticated in a real app)
                    alert(`You've shared ${publisherName}'s post with your network`);
                });
            });
        }
        
        // Add click event listeners for save post buttons
        if (savePostBtns) {
            savePostBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const isSaved = this.classList.contains('saved');
                    
                    if (isSaved) {
                        this.classList.remove('saved');
                        this.innerHTML = `
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                        `;
                        alert('Post removed from saved items');
                    } else {
                        this.classList.add('saved');
                        this.innerHTML = `
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="none">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                        `;
                        alert('Post saved to your profile');
                    }
                });
            });
        }
        
        // Add click event listeners for more options buttons
        if (moreOptionsBtns) {
            moreOptionsBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const feedCard = this.closest('.feed-card');
                    const publisherName = feedCard.querySelector('.publisher-name').textContent;
                    
                    // Simple options menu (would be a dropdown in a real app)
                    alert(`Options for ${publisherName}'s post:\n- Report post\n- Hide posts from ${publisherName}\n- Follow ${publisherName}`);
                });
            });
        }
        
        // Add search functionality
        if (searchInputs) {
            searchInputs.forEach(input => {
                input.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    const searchContainer = this.closest('.search-container');
                    const column = searchContainer.parentElement;
                    
                    // Determine what to filter based on which column the search is in
                    if (column.classList.contains('left-column')) {
                        // Filter connections
                        connectionCards.forEach(card => {
                            const name = card.querySelector('.connection-name').textContent.toLowerCase();
                            const title = card.querySelector('.connection-title').textContent.toLowerCase();
                            
                            if (name.includes(searchTerm) || title.includes(searchTerm)) {
                                card.style.display = 'flex';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    } else if (column.classList.contains('middle-column')) {
                        // Filter feed posts
                        const feedCards = document.querySelectorAll('.feed-card');
                        feedCards.forEach(card => {
                            const publisher = card.querySelector('.publisher-name').textContent.toLowerCase();
                            const title = card.querySelector('.post-title').textContent.toLowerCase();
                            const content = card.querySelector('.post-text').textContent.toLowerCase();
                            
                            if (publisher.includes(searchTerm) || title.includes(searchTerm) || content.includes(searchTerm)) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    }
                });
            });
        }
        
        // Feed filter functionality
        if (feedFilters) {
            feedFilters.addEventListener('click', function() {
                // In a real app, this would open a filter modal or dropdown
                alert('Filter options:\n- All updates\n- Company updates only\n- Project updates only\n- Connection updates only');
            });
        }
        
        // Feed refresh functionality
        if (feedRefresh) {
            feedRefresh.addEventListener('click', function() {
                // Add a refresh animation
                this.classList.add('refreshing');
                
                // Simulate a refresh (in a real app, this would fetch new content)
                setTimeout(() => {
                    this.classList.remove('refreshing');
                    alert('Feed refreshed with the latest updates');
                }, 1000);
            });
        }
        
        // Load more button functionality
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                // Add a loading state
                this.classList.add('loading');
                this.textContent = 'Loading...';
                
                // Simulate loading more posts (in a real app, this would fetch more content)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = `
                        Load more updates
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <polyline points="19 12 12 19 5 12"></polyline>
                        </svg>
                    `;
                    alert('No more updates to load');
                }, 1500);
            });
        }
        
        // Compose post functionality
        if (composePostBtn) {
            composePostBtn.addEventListener('click', function() {
                const composeInput = document.querySelector('.compose-input');
                const postText = composeInput.value.trim();
                
                if (postText === '') {
                    alert('Please enter some content for your post');
                    return;
                }
                
                // In a real app, this would submit the post to an API
                alert('Your post has been published!');
                composeInput.value = '';
            });
        }
        
        // Connection tabs functionality
        if (connectionTabs) {
            connectionTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs
                    connectionTabs.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // Show appropriate connections (in a real app, this would filter the connections)
                    const tabText = this.textContent.toLowerCase();
                    alert(`Showing ${tabText} connections`);
                });
            });
        }
        
        // RSVP button functionality
        if (rsvpBtns) {
            rsvpBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const eventCard = this.closest('.event-card');
                    const eventName = eventCard.querySelector('.event-name').textContent;
                    
                    const isAttending = this.classList.contains('attending');
                    
                    if (isAttending) {
                        this.classList.remove('attending');
                        this.textContent = 'RSVP';
                        alert(`You are no longer attending "${eventName}"`);
                    } else {
                        this.classList.add('attending');
                        this.textContent = 'Attending';
                        alert(`You are now attending "${eventName}"`);
                    }
                });
            });
        }
        
        // Make project cards clickable
        if (projectCards) {
            projectCards.forEach(card => {
                card.addEventListener('click', function() {
                    const projectName = this.querySelector('.project-name').textContent;
                    window.location.href = `projectsDetail.html?project=${encodeURIComponent(projectName)}`;
                });
            });
        }
        
        // View all connections button
        if (viewAllConnections) {
            viewAllConnections.addEventListener('click', function() {
                // In a real app, this would navigate to a connections page
                alert('Navigating to all connections');
            });
        }
        
        // Make connection message buttons work
        document.querySelectorAll('.connection-card .btn-primary').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering the card click event
                const connectionName = this.closest('.connection-card').querySelector('.connection-name').textContent;
                window.location.href = `messages.html?contact=${encodeURIComponent(connectionName)}`;
            });
        });
        
    } catch (error) {
        console.error('Error in feed.js:', error);
    }
});
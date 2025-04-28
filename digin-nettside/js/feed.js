document.addEventListener('DOMContentLoaded', function() {
    // Make user profile navigation work
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
    }

    // Add click event listeners for action buttons in feed posts (like, comment, share)
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Get button text to determine action type
            const actionType = this.textContent.trim();
            
            // Get the company name from the feed card
            const feedCard = this.closest('.feed-card');
            const companyName = feedCard.querySelector('.company-name').textContent;
            
            // Different action based on button type
            if (actionType.includes('Like')) {
                this.innerHTML = '❤️ Liked';
                this.style.color = '#e91e63';
                alert(`You liked the post from ${companyName}`);
            } 
            else if (actionType.includes('Comment')) {
                const commentText = prompt(`Add a comment to ${companyName}'s post:`);
                if (commentText && commentText.trim() !== '') {
                    alert(`Comment added: "${commentText}"`);
                }
            }
            else if (actionType.includes('Share')) {
                alert(`You shared the post from ${companyName}`);
            }
        });
    });

    // Add click event listeners for share options
    const shareOptions = document.querySelectorAll('.share-options span');
    shareOptions.forEach(option => {
        option.addEventListener('click', function() {
            const feedCard = this.closest('.feed-card');
            const companyName = feedCard.querySelector('.company-name').textContent;
            
            if (this.textContent === '🔗') {
                alert(`Link to ${companyName}'s post copied to clipboard`);
            } else {
                alert(`More options for ${companyName}'s post`);
            }
        });
    });

    // Fix navigation for message buttons in contacts
    const messageBtns = document.querySelectorAll('.contact-card .btn');
    messageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const contactName = this.closest('.contact-card').querySelector('.contact-name').textContent;
            window.location.href = `messages.html?contact=${encodeURIComponent(contactName)}`;
        });
    });

    // Make project cards clickable
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if the click was on the View Details button
            if (e.target.classList.contains('view-btn') || e.target.closest('.view-btn')) {
                return;
            }
            
            const projectName = this.querySelector('.project-name').textContent;
            window.location.href = `projectsDetail.html?project=${encodeURIComponent(projectName)}`;
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const feedCards = document.querySelectorAll('.feed-card');
            
            feedCards.forEach(card => {
                const companyName = card.querySelector('.company-name').textContent.toLowerCase();
                const feedTitle = card.querySelector('.feed-title').textContent.toLowerCase();
                const feedContent = card.querySelector('.feed-content p').textContent.toLowerCase();
                
                if (companyName.includes(searchTerm) || 
                    feedTitle.includes(searchTerm) || 
                    feedContent.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});
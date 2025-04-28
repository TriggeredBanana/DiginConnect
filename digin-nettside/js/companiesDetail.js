document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const userProfile = document.querySelector('.user-profile');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const inquiryButton = document.querySelector('.btn-inquiry');
    const projectCards = document.querySelectorAll('.project-card');
    const viewMoreLinks = document.querySelectorAll('.view-more-link');
    
    // Get company name from query string or page content
    const companyName = new URLSearchParams(window.location.search).get('company') || 
                        document.querySelector('.company-logo-header').textContent.trim();
    
    // Make user profile clickable
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
    }
    
    // Make sidebar navigation interactive
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section ID
            const targetId = this.getAttribute('href').substring(1);
            
            // In a real app, you would show/hide sections based on the target ID
            // For this demo, show an alert
            alert(`Navigating to ${this.textContent} section`);
        });
    });
    
    // Handle inquiry button click
    if (inquiryButton) {
        inquiryButton.addEventListener('click', function() {
            alert(`Your inquiry to ${companyName} has been sent! A representative will contact you soon.`);
        });
    }
    
    // Make project cards interactive
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('h4').textContent;
            window.location.href = `projectsDetail.html?project=${encodeURIComponent(projectTitle)}`;
        });
    });
    
    // Handle "View more" links
    viewMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Loading more projects...');
        });
    });
    
    // Add analytics tracking
    console.log(`Company detail page viewed: ${companyName}`);
});
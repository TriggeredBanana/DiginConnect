// JavaScript for the profile page
document.addEventListener('DOMContentLoaded', function() {
    console.log("Profile page loaded");

    // Profile page interactions
    const editProfileLink = document.querySelector('.edit-profile-link');
    if (editProfileLink) {
        editProfileLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Edit profile feature is coming soon!');
        });
    }

    // Make project cards clickable
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('h4').textContent;
            // Navigate to project detail page
            window.location.href = 'projectsDetail.html?project=' + encodeURIComponent(projectTitle);
        });
    });

    // Make stats clickable
    const projectStats = document.querySelector('.stat-item:nth-child(3)');
    if (projectStats) {
        projectStats.addEventListener('click', function() {
            window.location.href = 'projects.html';
        });
    }

    // Make user profile navigation consistent
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        // This is already active on the profile page, but for consistency:
        userProfile.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
    }
});
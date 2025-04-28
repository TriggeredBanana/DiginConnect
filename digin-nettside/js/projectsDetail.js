// JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add click event for join project button
    const joinButton = document.querySelector('.btn-primary');
    if (joinButton) {
        joinButton.addEventListener('click', function() {
            alert('Du har valgt å delta i prosjektet "Digitalisering av havneanlegg". En prosjektadministrator vil kontakte deg snart.');
        });
    }
    
    // Add click event for save project button
    const saveButton = document.querySelector('.btn-outline');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            this.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                Lagret
            `;
            this.style.color = '#00a0e3';
            alert('Prosjektet er lagret i din profil.');
        });
    }
    
    // Add hover effect for team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f5f5f7';
            this.style.borderRadius = '8px';
            this.style.cursor = 'pointer';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        member.addEventListener('click', function() {
            const name = this.querySelector('.team-name').textContent;
            alert(`Du har valgt å kontakte ${name}. Meldingsfunksjonen åpnes.`);
        });
    });
    
    // Add hover effect for goal cards
    const goalCards = document.querySelectorAll('.goal-card');
    goalCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            this.style.cursor = 'pointer';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
        
        card.addEventListener('click', function() {
            const title = this.querySelector('.goal-title').textContent;
            alert(`Du har valgt å se detaljer for "${title}". Detaljvisning åpnes.`);
        });
    });

    // Make related projects clickable
    const relatedProjects = document.querySelectorAll('.related-project');
    relatedProjects.forEach(project => {
        project.addEventListener('click', function(e) {
            e.preventDefault();
            const name = this.querySelector('.related-project-name').textContent;
            alert(`Du har valgt å se prosjektet "${name}". Laster inn prosjektdetaljer.`);
        });
    });

    // Ensure user profile navigation works
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
    }
});
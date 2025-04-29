document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // In a real application, you would send these credentials to a server
    // For demo purposes, we'll just redirect to the feed page
    if (email && password) {
        // Changed from activity-feed.html to feed.html to match your actual page name
        window.location.href = 'feed.html';
    }
});
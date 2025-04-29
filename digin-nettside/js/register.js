document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAgreement = document.getElementById('termsAgreement').checked;
    
    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (!termsAgreement) {
        alert('You must agree to the Terms of Service and Privacy Policy');
        return;
    }
    
    // In a real application, you would send these details to a server
    // For demo purposes, we'll just redirect to the login page
    window.location.href = 'login.html'; // Changed from index.html to login.html
});

// Toggle password visibility for confirm password
document.querySelector('.toggle-password').addEventListener('click', function() {
    const passwordField = document.getElementById('confirmPassword');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.textContent = '👁️';
    } else {
        passwordField.type = 'password';
        this.textContent = '👁️';
    }
});

// Toggle password visibility for main password
document.querySelector('.toggle-password-main').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.textContent = '👁️';
    } else {
        passwordField.type = 'password';
        this.textContent = '👁️';
    }
});
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAgreement = document.getElementById('termsAgreement').checked;
    
    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
                alert('Vennligst fyll ut alle feltene');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passordene samsvarer ikke');
        return;
    }
    
    if (!termsAgreement) {
        alert('Du må akseptere vilkårene for å registrere deg');
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
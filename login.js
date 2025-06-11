document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Create an element to show error messages
    const errorMessage = document.createElement('div');
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '10px';
    errorMessage.style.fontWeight = 'bold';
    form.appendChild(errorMessage);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const usernameOrEmail = usernameInput.value.trim();
        const password = passwordInput.value;

        const validUsernames = ['vasudha kulkarni'];
        const validEmails = ['kulkarnivasudha07@gmail.com'];
        const validPassword = 'vasu5804';

        const isValidUser = (validUsernames.includes(usernameOrEmail.toLowerCase()) || validEmails.includes(usernameOrEmail.toLowerCase())) && password === validPassword;

        if (isValidUser) {
            errorMessage.textContent = '';
            window.location.href = 'home.html';
        } else {
            errorMessage.textContent = 'Please enter valid credentials';
            alert('Please enter valid credentials');
        }
    });
});

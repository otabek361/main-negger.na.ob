const registerButton = document.querySelector('.register');
const loginButton = document.querySelector('.login');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const messageDiv = document.querySelector('#message');
const body = document.body;

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

registerButton.addEventListener('click', async () => {
    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;

    if (userEmail && userPassword) {
        const hashedPassword = await hashPassword(userPassword);
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userPassword', hashedPassword);
        body.style.backgroundColor = 'green';
        messageDiv.textContent = 'Registration successful!';
        messageDiv.style.color = 'green';
    } else {
        body.style.backgroundColor = 'red';
        messageDiv.textContent = 'Please fill in all fields!';
        messageDiv.style.color = 'red';
    }
});

loginButton.addEventListener('click', async () => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');
    const hashedPassword = await hashPassword(passwordInput.value);

    if (emailInput.value === storedEmail && hashedPassword === storedPassword) {
        body.style.backgroundColor = 'green';
        messageDiv.textContent = 'Login successful!';
        messageDiv.style.color = 'green';
    } else {
        body.style.backgroundColor = 'red';
        messageDiv.textContent = 'Incorrect email or password!';
        messageDiv.style.color = 'red';
    }
});
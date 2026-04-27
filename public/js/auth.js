// auth.js

const alertArea = document.getElementById('alert-area');

function showAlert(message, type) {
  alertArea.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
}

// Check if we're on the login page
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
  // Show success alert if redirected from register
  const params = new URLSearchParams(window.location.search);
  if (params.get('registered') === 'true') {
    showAlert('New user registered! Please log in.', 'success');
  }

  loginBtn.addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
      showAlert('Please fill in both fields', 'danger');
      return;
    }

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.username);
        window.location.href = '/';
      } else {
        showAlert(data.error, 'danger');
      }
    } catch (error) {
      console.error('Login error:', error);
      showAlert('Something went wrong. Please try again.', 'danger');
    }
  });
}

// Check if we're on the register page
const registerBtn = document.getElementById('register-btn');
if (registerBtn) {
  registerBtn.addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!username || !password || !confirmPassword) {
      showAlert('Please fill in all fields', 'danger');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Passwords do not match', 'danger');
      return;
    }

    if (password.length < 6) {
      showAlert('Password must be at least 6 characters', 'danger');
      return;
    }

    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = '/html/login.html?registered=true';
      } else {
        showAlert(data.error, 'danger');
      }
    } catch (error) {
      console.error('Register error:', error);
      showAlert('Something went wrong. Please try again.', 'danger');
    }
  });
}
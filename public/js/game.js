// game.js

let score = 0;
let timeLimit = 1500;
let gameActive = false;
let timer = null;
let token = localStorage.getItem('token');
let username = localStorage.getItem('username');

// Update navbar based on login status
function updateNav() {
  const navAuth = document.getElementById('nav-auth');
  if (token && username) {
    navAuth.innerHTML = `
      <span class="text-light me-3">${username}</span>
      <button class="btn btn-outline-light btn-sm" id="logout-btn">Logout</button>
    `;
    document.getElementById('logout-btn').addEventListener('click', logout);
  } else {
    navAuth.innerHTML = `<a href="/html/login.html" class="btn btn-primary btn-sm">Login / Register</a>`;
  }
}

// Logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  token = null;
  username = null;
  updateNav();
  loadLeaderboard();
}

// Start game
document.getElementById('start-btn').addEventListener('click', () => {
  score = 0;
  timeLimit = 1500;
  gameActive = true;
  document.getElementById('score-display').textContent = '0';
  document.getElementById('time-display').textContent = '1500ms';
  document.getElementById('start-btn').disabled = true;
  spawnTarget();
});

// Spawn a target in a random position
function spawnTarget() {
  const gameArea = document.getElementById('game-area');
  gameArea.innerHTML = '';

  const target = document.createElement('div');
  target.className = 'target';
  target.textContent = 'Click!';

  const maxX = gameArea.offsetWidth - 60;
  const maxY = gameArea.offsetHeight - 60;
  target.style.left = Math.floor(Math.random() * maxX) + 'px';
  target.style.top = Math.floor(Math.random() * maxY) + 'px';

  target.addEventListener('click', () => {
    if (!gameActive) return;
    clearTimeout(timer);
    score++;
    timeLimit = Math.max(300, timeLimit - 75);
    document.getElementById('score-display').textContent = score;
    document.getElementById('time-display').textContent = timeLimit + 'ms';
    spawnTarget();
  });

  gameArea.appendChild(target);

  timer = setTimeout(() => {
    gameActive = false;
    endGame();
  }, timeLimit);
}

// End the game and show the modal
function endGame() {
  const gameArea = document.getElementById('game-area');
  gameArea.innerHTML = '<span class="text-muted">Game over!</span>';
  document.getElementById('start-btn').disabled = false;
  document.getElementById('final-score').textContent = score;

  const modal = document.getElementById('game-over-modal');
  const message = document.getElementById('modal-message');
  const submitBtn = document.getElementById('modal-submit-btn');
  const loginBtn = document.getElementById('modal-login-btn');

  if (token) {
    message.textContent = 'Submit your score to the leaderboard?';
    submitBtn.style.display = 'inline-block';
    loginBtn.style.display = 'none';
  } else {
    message.textContent = 'Log in to save your score to the leaderboard';
    submitBtn.style.display = 'none';
    loginBtn.style.display = 'inline-block';
  }

  modal.style.display = 'flex';
}

// Submit score
document.getElementById('modal-submit-btn').addEventListener('click', async () => {
  try {
    const res = await fetch('/api/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ playerName: username, score: score })
    });

    if (res.ok) {
      document.getElementById('game-over-modal').style.display = 'none';
      loadLeaderboard();
    } else {
      alert('Failed to submit score');
    }
  } catch (error) {
    console.error('Error submitting score:', error);
  }
});

// Login button in modal
document.getElementById('modal-login-btn').addEventListener('click', () => {
  window.location.href = '/html/login.html';
});

// Play again button
document.getElementById('modal-play-again-btn').addEventListener('click', () => {
  document.getElementById('game-over-modal').style.display = 'none';
});

// Load leaderboard
async function loadLeaderboard() {
  try {
    const res = await fetch('/api/scores');
    const scores = await res.json();
    const tbody = document.getElementById('leaderboard-body');

    if (scores.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No scores yet</td></tr>';
      return;
    }

    tbody.innerHTML = scores.map((s, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${s.playerName}</td>
        <td>${s.score}</td>
        <td>${new Date(s.createdAt).toLocaleDateString()}</td>
        <td>${token && s.playerName === username ? `<button class="btn btn-danger btn-sm delete-btn" data-id="${s._id}">Delete</button>` : ''}</td>
      </tr>
    `).join('');

    // Add delete listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        try {
          const res = await fetch(`/api/scores/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
          });
          if (res.ok) {
            loadLeaderboard();
          } else {
            alert('Failed to delete score');
          }
        } catch (error) {
          console.error('Error deleting score:', error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading leaderboard:', error);
  }
}

// Search leaderboard
document.getElementById('search-input').addEventListener('input', async (e) => {
  const query = e.target.value.toLowerCase();
  const rows = document.querySelectorAll('#leaderboard-body tr');
  rows.forEach(row => {
    const player = row.cells[1]?.textContent.toLowerCase() || '';
    row.style.display = player.includes(query) ? '' : 'none';
  });
});

// Initialize
updateNav();
loadLeaderboard();
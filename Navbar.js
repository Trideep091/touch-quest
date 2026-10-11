import { PlayerProgressService } from './playerProgress.js';
import { StorageService } from './storage.js';
import { AudioService } from './audioFeedback.js';

export function renderNavbar(container, onNavigate, onStartQuest) {
  const profile = PlayerProgressService.getProfile();
  const settings = StorageService.getSettings();

  container.innerHTML = `
    <header class="site-header">
      <div class="container nav-container">
        <a href="#home" class="brand-logo" id="nav-brand-logo">
          <div class="logo-icon">🌿</div>
          <span>TouchQuest</span>
        </a>

        <ul class="nav-links">
          <li><a href="#home" class="nav-link active" data-nav="home">Home</a></li>
          <li><a href="#how-it-works" class="nav-link" data-nav="how-it-works">How It Works</a></li>
          <li><a href="#levels" class="nav-link" data-nav="levels">3 Levels</a></li>
          <li><a href="#badges" class="nav-link" data-nav="badges">Badges</a></li>
          <li><a href="#profile" class="nav-link" data-nav="profile">Profile</a></li>
          <li><a href="#open-ai" class="nav-link" data-nav="open-ai">Open AI</a></li>
        </ul>

        <div class="nav-actions">
          <button class="player-stat-pill" id="navbar-profile-pill" title="View Profile">
            <span>⚡ ${profile.xp} XP</span>
            <span>🔥 ${profile.currentStreak || 1}d</span>
          </button>

          <button class="sound-toggle-btn" id="navbar-sound-toggle" title="Toggle Sound Feedback">
            ${settings.soundEnabled !== false ? '🔊' : '🔇'}
          </button>

          <button class="btn btn-primary" id="navbar-start-btn">
            Start Quest →
          </button>

          <button class="mobile-menu-btn" id="navbar-mobile-toggle" aria-label="Toggle menu">
            ☰
          </button>
        </div>
      </div>
    </header>
  `;

  // Attach event listeners
  const brandLogo = container.querySelector('#nav-brand-logo');
  brandLogo?.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('home');
  });

  const links = container.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-nav');
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      onNavigate(target);
    });
  });

  const profilePill = container.querySelector('#navbar-profile-pill');
  profilePill?.addEventListener('click', () => {
    onNavigate('profile');
  });

  const startBtn = container.querySelector('#navbar-start-btn');
  startBtn?.addEventListener('click', () => {
    onStartQuest();
  });

  const soundBtn = container.querySelector('#navbar-sound-toggle');
  soundBtn?.addEventListener('click', () => {
    const currSettings = StorageService.getSettings();
    currSettings.soundEnabled = !currSettings.soundEnabled;
    StorageService.saveSettings(currSettings);
    soundBtn.innerHTML = currSettings.soundEnabled ? '🔊' : '🔇';
    if (currSettings.soundEnabled) {
      AudioService.playShutter();
    }
  });

  const mobileBtn = container.querySelector('#navbar-mobile-toggle');
  mobileBtn?.addEventListener('click', () => {
    const navLinks = container.querySelector('.nav-links');
    if (navLinks) {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '72px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = '#FFFFFF';
      navLinks.style.padding = '1.5rem';
      navLinks.style.borderBottom = 'var(--border-light)';
      navLinks.style.boxShadow = 'var(--shadow-md)';
    }
  });
}

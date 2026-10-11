import { PlayerProgressService } from './playerProgress.js';
import { StorageService } from './storage.js';
import { BADGES } from './badges.js';

export function renderPlayerProfile(container, onStartQuest) {
  const profile = PlayerProgressService.getProfile();
  const levelInfo = PlayerProgressService.getLevelInfo(profile.xp);
  const history = StorageService.getHistory();
  const completedSessions = StorageService.getCompletedQuestSessions();

  container.innerHTML = `
    <section class="section-padding" id="profile-section">
      <div class="container container-narrow">
        <div class="section-header">
          <div class="section-eyebrow">Field Journal</div>
          <h2 class="section-title">Explorer Profile</h2>
          <p class="section-subtitle">
            Your outdoor discoveries, earned badges, and quest statistics.
          </p>
        </div>

        <div class="profile-overview-card">
          <div class="profile-top-row">
            <div class="profile-avatar">
              🧭
            </div>
            <div class="profile-title-col">
              <h2>Explorer Level ${levelInfo.level}</h2>
              <div class="explorer-rank-tag">
                <span>🌲</span> ${levelInfo.title}
              </div>
            </div>
          </div>

          <!-- XP Progress Bar (Requirement #31) -->
          <div class="xp-bar-container">
            <div class="xp-bar-labels">
              <span>Experience Points (XP)</span>
              <span><strong>${profile.xp}</strong> / ${levelInfo.nextXP} XP (${levelInfo.xpToNext} XP to Level ${levelInfo.level + 1})</span>
            </div>
            <div class="xp-progress-track">
              <div class="xp-progress-fill" style="width: ${levelInfo.progressPercent}%;"></div>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="profile-stats-grid">
            <div class="stat-box">
              <div class="stat-box-value">${profile.totalQuestsStarted}</div>
              <div class="stat-box-label">Total Quests</div>
            </div>
            <div class="stat-box">
              <div class="stat-box-value">${profile.completedQuests}</div>
              <div class="stat-box-label">Completed</div>
            </div>
            <div class="stat-box">
              <div class="stat-box-value">${profile.photosCaptured}</div>
              <div class="stat-box-label">Photos Verified</div>
            </div>
            <div class="stat-box">
              <div class="stat-box-value">${profile.unlockedBadgeIds.length} / ${BADGES.length}</div>
              <div class="stat-box-label">Badges</div>
            </div>
            <div class="stat-box">
              <div class="stat-box-value">${profile.currentStreak || 1} 🔥</div>
              <div class="stat-box-label">Day Streak</div>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; margin-top: 2rem; justify-content: space-between; flex-wrap: wrap;">
            <button class="btn btn-primary" id="profile-play-btn">
              Begin New Quest →
            </button>
            <button class="btn btn-secondary" id="profile-reset-btn" style="font-size: 0.82rem; color: #999;">
              Reset Profile Data (Test Tool)
            </button>
          </div>
        </div>

        <!-- Discoveries Photo Gallery -->
        <div style="margin-top: 3.5rem;">
          <h3 style="font-size: 1.4rem; font-weight: 850; color: var(--color-forest); margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
            <span>📸 Verified Discoveries Archive</span>
            <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-text-muted);">${history.length} photos</span>
          </h3>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
            Real-world subjects found during your outdoor missions.
          </p>

          ${history.length === 0 ? `
            <div style="text-align: center; padding: 3rem; background: #FFFFFF; border-radius: var(--radius-md); border: var(--border-light); color: var(--color-text-muted);">
              <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🌱</div>
              <p>No photos captured yet. Go outside and complete Level 1 to build your archive!</p>
            </div>
          ` : `
            <div class="photo-gallery-grid">
              ${history.slice().reverse().map(item => `
                <div class="gallery-photo-card">
                  ${item.photoPreview ? `<img src="${item.photoPreview}" alt="${item.title}" loading="lazy">` : `<div style="aspect-ratio:1/1; background: var(--color-bg-alt); display:flex; align-items:center; justify-content:center; font-size:2rem;">📷</div>`}
                  <div class="gallery-photo-info">
                    <div class="gallery-photo-title">${item.title}</div>
                    <div class="gallery-photo-level">Level ${item.level} • ${item.category}</div>
                    <div style="font-size: 0.72rem; color: var(--color-primary); margin-top: 0.25rem;">
                      ✓ ${item.verificationReason || 'Verified'}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    </section>
  `;

  container.querySelector('#profile-play-btn')?.addEventListener('click', onStartQuest);

  container.querySelector('#profile-reset-btn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset your local explorer profile and challenge history?')) {
      StorageService.resetAllData();
      renderPlayerProfile(container, onStartQuest);
    }
  });
}

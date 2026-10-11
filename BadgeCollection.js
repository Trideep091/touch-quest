import { BADGES } from './badges.js';
import { PlayerProgressService } from './playerProgress.js';

export function renderBadgeCollection(container) {
  const profile = PlayerProgressService.getProfile();
  const unlockedIds = new Set(profile.unlockedBadgeIds || []);
  const unlockDates = profile.badgeUnlockDates || {};

  container.innerHTML = `
    <section class="section-padding" id="badges-section">
      <div class="container">
        <div class="section-header">
          <div class="section-eyebrow">Scout Achievements</div>
          <h2 class="section-title">Badge Collection</h2>
          <p class="section-subtitle">
            Permanent physical-style embroidered patches awarded for sharpening your outdoor observation skills.
          </p>
        </div>

        <div style="display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 2.5rem;">
          <button class="btn btn-primary" id="filter-all-badges">All Badges (${BADGES.length})</button>
          <button class="btn btn-secondary" id="filter-unlocked-badges">Unlocked (${unlockedIds.size})</button>
          <button class="btn btn-secondary" id="filter-locked-badges">Locked (${BADGES.length - unlockedIds.size})</button>
        </div>

        <div class="badges-grid" id="badges-container-grid">
          ${renderBadgeCards(BADGES, unlockedIds, unlockDates)}
        </div>
      </div>
    </section>
  `;

  // Attach filter events
  const allBtn = container.querySelector('#filter-all-badges');
  const unlockedBtn = container.querySelector('#filter-unlocked-badges');
  const lockedBtn = container.querySelector('#filter-locked-badges');
  const grid = container.querySelector('#badges-container-grid');

  function updateActiveFilter(activeBtn, filteredBadges) {
    [allBtn, unlockedBtn, lockedBtn].forEach(b => {
      b.classList.remove('btn-primary');
      b.classList.add('btn-secondary');
    });
    activeBtn.classList.remove('btn-secondary');
    activeBtn.classList.add('btn-primary');
    grid.innerHTML = renderBadgeCards(filteredBadges, unlockedIds, unlockDates);
  }

  allBtn?.addEventListener('click', () => updateActiveFilter(allBtn, BADGES));
  unlockedBtn?.addEventListener('click', () => updateActiveFilter(unlockedBtn, BADGES.filter(b => unlockedIds.has(b.id))));
  lockedBtn?.addEventListener('click', () => updateActiveFilter(lockedBtn, BADGES.filter(b => !unlockedIds.has(b.id))));
}

function renderBadgeCards(badgeList, unlockedIds, unlockDates) {
  if (badgeList.length === 0) {
    return `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--color-text-muted);">No badges match this filter.</div>`;
  }

  return badgeList.map(badge => {
    const isUnlocked = unlockedIds.has(badge.id);
    const dateStr = unlockDates[badge.id] 
      ? new Date(unlockDates[badge.id]).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
      : null;

    return `
      <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
        <div class="badge-art-frame">
          <img src="${badge.image}" alt="${badge.title} Badge" loading="lazy">
          ${!isUnlocked ? '<div class="lock-overlay">🔒</div>' : ''}
        </div>

        <h3>${badge.title}</h3>
        <p>${badge.description}</p>

        <div style="font-size: 0.78rem; color: var(--color-text-muted); margin-bottom: 1rem;">
          Requirement: <strong>${badge.requirement}</strong>
        </div>

        <div class="badge-status-pill">
          ${isUnlocked 
            ? `✓ Unlocked on ${dateStr || 'Recent Quest'} (+${badge.xpReward} XP)`
            : `🔒 Locked (+${badge.xpReward} XP reward)`}
        </div>
      </div>
    `;
  }).join('');
}

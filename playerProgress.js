import { StorageService } from './storage.js';
import { BADGES } from './badges.js';

export const PlayerProgressService = {
  getProfile() {
    return StorageService.getProfile();
  },

  /**
   * Calculates XP required for next level
   */
  getLevelInfo(xp) {
    const thresholds = [
      { level: 1, title: 'Novice Explorer', minXP: 0, nextXP: 150 },
      { level: 2, title: 'Keen Observer', minXP: 150, nextXP: 350 },
      { level: 3, title: 'Grass Toucher', minXP: 350, nextXP: 650 },
      { level: 4, title: 'Trailblazer', minXP: 650, nextXP: 1050 },
      { level: 5, title: 'Outdoor Naturalist', minXP: 1050, nextXP: 1550 },
      { level: 6, title: 'Master Scout', minXP: 1550, nextXP: 2150 },
      { level: 7, title: 'Wilderness Lens', minXP: 2150, nextXP: 2850 },
      { level: 8, title: 'Touch Grass Legend', minXP: 2850, nextXP: 3700 }
    ];

    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (xp >= thresholds[i].minXP) {
        const currentTier = thresholds[i];
        const span = currentTier.nextXP - currentTier.minXP;
        const progressInTier = Math.min(xp - currentTier.minXP, span);
        const percent = Math.min(100, Math.round((progressInTier / span) * 100));

        return {
          level: currentTier.level,
          title: currentTier.title,
          currentXP: xp,
          minXP: currentTier.minXP,
          nextXP: currentTier.nextXP,
          progressPercent: percent,
          xpToNext: Math.max(0, currentTier.nextXP - xp)
        };
      }
    }

    return {
      level: 1,
      title: 'Novice Explorer',
      currentXP: xp,
      minXP: 0,
      nextXP: 150,
      progressPercent: Math.round((xp / 150) * 100),
      xpToNext: 150 - xp
    };
  },

  /**
   * Awards XP for completing a single challenge
   */
  awardChallengeXP(levelNumber) {
    let earned = 20;
    if (levelNumber === 2) earned = 35;
    if (levelNumber === 3) earned = 50;

    const profile = this.getProfile();
    profile.xp += earned;
    profile.photosCaptured += 1;

    const levelInfo = this.getLevelInfo(profile.xp);
    profile.explorerLevel = levelInfo.level;

    StorageService.saveProfile(profile);
    const newBadges = this.checkAndAwardBadges();

    return {
      earnedXP: earned,
      totalXP: profile.xp,
      levelInfo,
      newBadges
    };
  },

  /**
   * Awards XP for finishing an entire 3-level quest
   */
  awardFullQuestCompletion(stats = {}) {
    const profile = this.getProfile();
    const bonusXP = 100;
    profile.xp += bonusXP;
    profile.completedQuests += 1;
    profile.totalQuestsStarted += 1;

    // Streak logic
    const today = new Date().toDateString();
    if (profile.lastPlayedDate !== today) {
      profile.currentStreak += 1;
      profile.lastPlayedDate = today;
    }

    const levelInfo = this.getLevelInfo(profile.xp);
    profile.explorerLevel = levelInfo.level;

    StorageService.saveProfile(profile);

    // Save session in quest history
    StorageService.saveCompletedQuestSession({
      date: new Date().toISOString(),
      durationSeconds: stats.durationSeconds || 0,
      photosCount: 9,
      retries: stats.retries || 0,
      xpEarned: 20 * 4 + 35 * 3 + 50 * 2 + bonusXP, // 385 XP
      badgesEarned: stats.badgesEarned || []
    });

    const newBadges = this.checkAndAwardBadges();

    return {
      bonusXP,
      totalXP: profile.xp,
      levelInfo,
      newBadges
    };
  },

  recordRetry() {
    const profile = this.getProfile();
    profile.retriesCount = (profile.retriesCount || 0) + 1;
    StorageService.saveProfile(profile);
  },

  /**
   * Checks badge requirements and unlocks any new ones
   */
  checkAndAwardBadges() {
    const profile = this.getProfile();
    const history = StorageService.getHistory();
    const newlyUnlocked = [];

    const natureChallengesCount = history.filter(h => h.category === 'nature').length;
    const level3ChallengesCount = history.filter(h => h.level === 3).length;

    BADGES.forEach(badge => {
      if (profile.unlockedBadgeIds.includes(badge.id)) return;

      let eligible = false;

      if (badge.id === 'first_explorer' && profile.completedQuests >= 1) {
        eligible = true;
      } else if (badge.id === 'sharp_eyes' && profile.completedQuests >= 10) {
        eligible = true;
      } else if (badge.id === 'nature_lover' && natureChallengesCount >= 10) {
        eligible = true;
      } else if (badge.id === 'visual_hunter' && profile.photosCaptured >= 50) {
        eligible = true;
      } else if (badge.id === 'challenge_master' && level3ChallengesCount >= 10) {
        eligible = true;
      } else if (badge.id === 'touch_grass_legend' && profile.completedQuests >= 25) {
        eligible = true;
      }

      if (eligible) {
        profile.unlockedBadgeIds.push(badge.id);
        profile.badgeUnlockDates = profile.badgeUnlockDates || {};
        profile.badgeUnlockDates[badge.id] = new Date().toISOString();
        profile.xp += badge.xpReward;
        newlyUnlocked.push(badge);
      }
    });

    if (newlyUnlocked.length > 0) {
      const levelInfo = this.getLevelInfo(profile.xp);
      profile.explorerLevel = levelInfo.level;
      StorageService.saveProfile(profile);
    }

    return newlyUnlocked;
  }
};

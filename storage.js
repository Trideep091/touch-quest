// Local storage abstraction for TouchQuest state persistence
const STORAGE_KEYS = {
  PROFILE: 'touchquest_profile_v1',
  HISTORY: 'touchquest_challenge_history_v1',
  QUEST_SESSIONS: 'touchquest_quest_sessions_v1',
  SETTINGS: 'touchquest_settings_v1',
  CURRENT_QUEST: 'touchquest_active_quest_v1'
};

const inMemoryStore = {};

const safeStorage = {
  getItem(key) {
    if (typeof localStorage !== 'undefined') {
      try { return localStorage.getItem(key); } catch (e) { return inMemoryStore[key] || null; }
    }
    return inMemoryStore[key] || null;
  },
  setItem(key, value) {
    if (typeof localStorage !== 'undefined') {
      try { localStorage.setItem(key, value); return; } catch (e) {}
    }
    inMemoryStore[key] = String(value);
  },
  removeItem(key) {
    if (typeof localStorage !== 'undefined') {
      try { localStorage.removeItem(key); return; } catch (e) {}
    }
    delete inMemoryStore[key];
  }
};

const DEFAULT_PROFILE = {
  explorerLevel: 1,
  xp: 0,
  totalQuestsStarted: 0,
  completedQuests: 0,
  photosCaptured: 0,
  unlockedBadgeIds: [],
  badgeUnlockDates: {},
  currentStreak: 1,
  lastPlayedDate: null,
  retriesCount: 0
};

const DEFAULT_SETTINGS = {
  soundEnabled: true,
  aiProvider: 'open_weight_simulation', // 'open_weight_simulation' | 'web_vision' | 'custom_endpoint'
  customEndpointUrl: '',
  customApiKey: '',
  hapticFeedback: true
};

export const StorageService = {
  getProfile() {
    try {
      const data = safeStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!data) return { ...DEFAULT_PROFILE };
      return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
    } catch (e) {
      console.warn('Error reading profile:', e);
      return { ...DEFAULT_PROFILE };
    }
  },

  saveProfile(profile) {
    try {
      safeStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile:', e);
    }
  },

  getHistory() {
    try {
      const data = safeStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Error reading history:', e);
      return [];
    }
  },

  saveHistory(history) {
    try {
      safeStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.error('Error saving history:', e);
    }
  },

  getCompletedQuestSessions() {
    try {
      const data = safeStorage.getItem(STORAGE_KEYS.QUEST_SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveCompletedQuestSession(session) {
    try {
      const sessions = this.getCompletedQuestSessions();
      sessions.unshift(session); // latest first
      safeStorage.setItem(STORAGE_KEYS.QUEST_SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.error('Error saving quest session:', e);
    }
  },

  getActiveQuest() {
    try {
      const data = safeStorage.getItem(STORAGE_KEYS.CURRENT_QUEST);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveActiveQuest(quest) {
    try {
      if (quest) {
        safeStorage.setItem(STORAGE_KEYS.CURRENT_QUEST, JSON.stringify(quest));
      } else {
        safeStorage.removeItem(STORAGE_KEYS.CURRENT_QUEST);
      }
    } catch (e) {
      console.error('Error saving active quest:', e);
    }
  },

  clearActiveQuest() {
    try {
      safeStorage.removeItem(STORAGE_KEYS.CURRENT_QUEST);
    } catch (e) {
      console.error('Error clearing active quest:', e);
    }
  },

  getSettings() {
    try {
      const data = safeStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) return { ...DEFAULT_SETTINGS };
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch (e) {
      return { ...DEFAULT_SETTINGS };
    }
  },

  saveSettings(settings) {
    try {
      safeStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  },

  resetAllData() {
    try {
      Object.values(STORAGE_KEYS).forEach(k => safeStorage.removeItem(k));
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
  }
};

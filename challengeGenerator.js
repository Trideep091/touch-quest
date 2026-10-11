import { CHALLENGE_SEED_DATABASE } from './sampleChallenges.js';
import { CHALLENGE_CATEGORIES } from './challengeCategories.js';
import { ChallengeHistoryService } from './challengeHistory.js';

/**
 * Open-Weight AI Challenge Generator
 * Supports swappable providers and anti-repetition rules
 */
export const ChallengeGeneratorService = {
  /**
   * Generates a complete 3-level quest
   * @param {Object} options
   * @returns {Promise<Object>} complete quest specification
   */
  async generateFullQuest(options = {}) {
    const history = ChallengeHistoryService.getHistory();
    const completedIds = ChallengeHistoryService.getCompletedChallengeIds();
    const recentConcepts = ChallengeHistoryService.getRecentConcepts(12);

    // AI simulation delay with realistic steps
    const l1 = await this.generateLevelChallenges(1, 4, completedIds, recentConcepts);
    const l2 = await this.generateLevelChallenges(2, 3, completedIds, [...recentConcepts, ...l1.map(c => c.concept)]);
    const l3 = await this.generateLevelChallenges(3, 2, completedIds, [...recentConcepts, ...l1.map(c => c.concept), ...l2.map(c => c.concept)]);

    const questId = `quest_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

    return {
      id: questId,
      createdAt: new Date().toISOString(),
      theme: 'Everyday Wonder',
      generatorModel: 'Qwen-2.5-7B-Instruct (Open-Weight)',
      historyConsideredCount: history.length,
      levels: {
        1: {
          level: 1,
          name: 'Explorer',
          subtitle: 'Start by noticing what is already around you.',
          timeLimitSeconds: 40 * 60, // 40 minutes
          timeLimitMinutes: 40,
          requiredPhotos: 4,
          difficulty: 'Easy',
          challenges: l1
        },
        2: {
          level: 2,
          name: 'Observer',
          subtitle: 'The easy discoveries are behind you. Now look closer.',
          timeLimitSeconds: 30 * 60, // 30 minutes
          timeLimitMinutes: 30,
          requiredPhotos: 3,
          difficulty: 'Medium',
          challenges: l2
        },
        3: {
          level: 3,
          name: 'Creative Explorer',
          subtitle: 'Two photos. Make them count.',
          timeLimitSeconds: 15 * 60, // 15 minutes
          timeLimitMinutes: 15,
          extensionSeconds: 3 * 60, // +3 minutes
          requiredPhotos: 2,
          difficulty: 'Hard',
          challenges: l3
        }
      }
    };
  },

  /**
   * Generates challenges for a specific level with anti-repetition & category balancing
   */
  async generateLevelChallenges(level, count, completedIds, bannedRecentConcepts = []) {
    // 1. Get pool candidates for this level
    let candidates = CHALLENGE_SEED_DATABASE.filter(c => c.level === level);

    // 2. Separate into untouched vs previously seen
    let freshCandidates = candidates.filter(c => !completedIds.has(c.id) && !bannedRecentConcepts.includes(c.concept));

    // If candidate pool exhausted due to high quest count, use smart variations
    if (freshCandidates.length < count) {
      const reused = candidates.filter(c => !freshCandidates.some(f => f.concept === c.concept));
      const variations = reused.map(c => ChallengeHistoryService.generateSmartVariation(c));
      freshCandidates = [...freshCandidates, ...variations];
    }

    // 3. Shuffle pool
    const shuffled = [...freshCandidates].sort(() => 0.5 - Math.random());

    // 4. Ensure category diversity (do not pick all same category)
    const selected = [];
    const usedCategories = new Set();

    for (const item of shuffled) {
      if (selected.length >= count) break;

      // Prefer unique category for each slot
      if (!usedCategories.has(item.category) || selected.length + (count - usedCategories.size) <= count) {
        selected.push({
          ...item,
          status: 'not_started', // 'not_started' | 'selected' | 'verifying' | 'completed' | 'failed'
          photoData: null,
          verificationResult: null,
          attempts: 0
        });
        usedCategories.add(item.category);
      }
    }

    // 5. Fallback fill if strict category uniqueness was too restrictive
    if (selected.length < count) {
      for (const item of shuffled) {
        if (selected.length >= count) break;
        if (!selected.some(s => s.id === item.id)) {
          selected.push({
            ...item,
            status: 'not_started',
            photoData: null,
            verificationResult: null,
            attempts: 0
          });
        }
      }
    }

    // Assign challenge display indices (Challenge 01, Challenge 02, etc.)
    return selected.map((item, idx) => ({
      ...item,
      number: idx + 1,
      numberFormatted: String(idx + 1).padStart(2, '0')
    }));
  },

  /**
   * Generates a preview string showing Open-Weight prompt payload
   */
  formatOpenWeightPrompt(level, difficulty, count, previousConcepts) {
    return `### SYSTEM PROMPT (Open-Weight Model: Qwen-2.5 / Llama-3.1)
You are the TouchQuest Outdoor Photography Director.
Target: Generate ${count} achievable outdoor photography challenges for Level ${level}.
Difficulty: ${difficulty}.
Safety: Public, ground-level, no trespassing, no traffic, no heights.
Avoid past concepts: [${previousConcepts.slice(-6).join(', ')}]
Requirements: Everyday neighbourhood, sidewalk, park, garden accessible.
Output JSON format only.`;
  }
};

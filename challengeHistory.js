import { StorageService } from './storage.js';

/**
 * Challenge History & Anti-Repetition Service
 * Meets Requirements #23, #24, #25
 */
export const ChallengeHistoryService = {
  getHistory() {
    return StorageService.getHistory();
  },

  /**
   * Records a successfully completed challenge
   */
  recordCompletedChallenge(challenge, photoMeta = {}) {
    const history = this.getHistory();
    const entry = {
      id: challenge.id,
      challengeText: challenge.description,
      title: challenge.title,
      category: challenge.category,
      difficulty: challenge.difficulty,
      concept: challenge.concept,
      level: challenge.level,
      dateCompleted: new Date().toISOString(),
      photoPreview: photoMeta.previewUrl || null,
      verificationReason: photoMeta.reason || 'Verified'
    };
    history.push(entry);
    StorageService.saveHistory(history);
    return entry;
  },

  /**
   * Returns list of concepts completed in recent quests
   */
  getRecentConcepts(recentLimit = 15) {
    const history = this.getHistory();
    return history.slice(-recentLimit).map(h => h.concept);
  },

  /**
   * Returns set of all exact challenge IDs ever completed
   */
  getCompletedChallengeIds() {
    const history = this.getHistory();
    return new Set(history.map(h => h.id));
  },

  /**
   * Checks whether a challenge concept was recently completed
   */
  hasConceptBeenUsedRecently(concept, recentCount = 10) {
    const recent = this.getRecentConcepts(recentCount);
    return recent.includes(concept);
  },

  /**
   * Returns concept cooldown information
   */
  getConceptHistoryStats() {
    const history = this.getHistory();
    const conceptCounts = {};
    const categoryCounts = {};

    history.forEach(item => {
      conceptCounts[item.concept] = (conceptCounts[item.concept] || 0) + 1;
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });

    return {
      totalCompleted: history.length,
      conceptCounts,
      categoryCounts,
      last5Concepts: history.slice(-5).map(h => h.concept)
    };
  },

  /**
   * Transforms a previously used broad concept into a smart variation twist
   * Example: 'color_green' -> 'Find two different shades of green in one photograph'
   */
  generateSmartVariation(baseChallenge) {
    const variationsByConcept = {
      'color_green': {
        title: 'Dual Greens',
        description: 'Find two distinctly different shades of natural green in one single photograph.',
        concept: 'color_green_dual',
        hint: 'Look for deep dark pine needles resting near vibrant lime-green moss.'
      },
      'shape_circular': {
        title: 'Concentric Circles',
        description: 'Find a circular outdoor object that has another circular element inside it.',
        concept: 'shape_circular_nested',
        hint: 'Tree rings on a stump, a drain ring, or a daisy center.'
      },
      'botanical_bloom': {
        title: 'Sidewalk Botanical',
        description: 'Find a wildflower blooming against concrete, brick, or stone rather than open soil.',
        concept: 'botanical_urban_crevice',
        hint: 'Look for tiny resilient blooms nestled in sidewalk seams.'
      },
      'shadow_silhouette': {
        title: 'Shadow Gradient',
        description: 'Find a cast shadow that has a sharp dark core fading into a soft fuzzy edge.',
        concept: 'shadow_soft_hard',
        hint: 'Cast shadows under afternoon trees show natural penumbra.'
      },
      'contrasting_textures': {
        title: 'Triple Texture Fusion',
        description: 'Find three outdoor textures (rough, smooth, and patterned) touching together.',
        concept: 'triple_texture_fusion',
        hint: 'Fallen leaf resting on a wet smooth stone surrounded by gravel.'
      }
    };

    if (variationsByConcept[baseChallenge.concept]) {
      const variation = variationsByConcept[baseChallenge.concept];
      return {
        ...baseChallenge,
        id: `${baseChallenge.id}_var_${Date.now()}`,
        title: variation.title,
        description: variation.description,
        concept: variation.concept,
        hint: variation.hint,
        isSmartVariation: true
      };
    }

    return baseChallenge;
  }
};

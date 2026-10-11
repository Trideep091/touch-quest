// Challenge categories data as defined in requirement #26 & safety rules #44
export const CHALLENGE_CATEGORIES = [
  {
    id: 'color',
    name: 'Color & Hues',
    icon: '🎨',
    description: 'Vibrant natural pigments, subtle tones, and color harmonies outdoors.',
    difficultyTiers: [1, 2],
    safetyChecked: true
  },
  {
    id: 'shape',
    name: 'Geometry & Shape',
    icon: '⭕',
    description: 'Pure geometric forms, natural circles, sharp angles, and silhouettes.',
    difficultyTiers: [1, 2],
    safetyChecked: true
  },
  {
    id: 'nature',
    name: 'Flora & Earth',
    icon: '🌿',
    description: 'Leaves, moss, soil, wildflowers, tree bark, and living organisms.',
    difficultyTiers: [1, 2, 3],
    safetyChecked: true
  },
  {
    id: 'texture',
    name: 'Tactile Textures',
    icon: '🖐️',
    description: 'Rough bark, smooth river stone, velvety petals, and weathered grain.',
    difficultyTiers: [1, 2, 3],
    safetyChecked: true
  },
  {
    id: 'shadow',
    name: 'Light & Shadows',
    icon: '🌓',
    description: 'Striking silhouettes, cast sunlight patterns, and daylight gradients.',
    difficultyTiers: [2, 3],
    safetyChecked: true
  },
  {
    id: 'reflection',
    name: 'Reflections & Water',
    icon: '🪞',
    description: 'Puddles, glass panes, morning dew, and mirror-like surfaces.',
    difficultyTiers: [2, 3],
    safetyChecked: true
  },
  {
    id: 'pattern',
    name: 'Rhythm & Patterns',
    icon: '🧩',
    description: 'Repeating natural rhythms, brick courses, leaf veins, and lattices.',
    difficultyTiers: [1, 2, 3],
    safetyChecked: true
  },
  {
    id: 'perspective',
    name: 'Perspective & Angles',
    icon: '📐',
    description: 'Extreme low viewpoints, bug-eye vantage points, and bird-eye views.',
    difficultyTiers: [2, 3],
    safetyChecked: true
  },
  {
    id: 'contrast',
    name: 'Visual Contrast',
    icon: '⚖️',
    description: 'Dark vs bright, rough vs smooth, old vs young in one composition.',
    difficultyTiers: [2, 3],
    safetyChecked: true
  },
  {
    id: 'human_vs_nature',
    name: 'Nature vs Man-Made',
    icon: '🌱🏛️',
    description: 'Sprouts pushing through asphalt, vines climbing brick, co-existence.',
    difficultyTiers: [2, 3],
    safetyChecked: true
  },
  {
    id: 'visual_illusion',
    name: 'Pareidolia & Twists',
    icon: '👁️',
    description: 'Faces in tree trunks, forced perspective, and visual puns.',
    difficultyTiers: [3],
    safetyChecked: true
  },
  {
    id: 'creative_observation',
    name: 'Creative Twists',
    icon: '✨',
    description: 'Two separate objects appearing connected, unusual metaphors.',
    difficultyTiers: [2, 3],
    safetyChecked: true
  }
];

export const SAFETY_GUIDELINES = [
  'Never enter private property or climb unsafe heights.',
  'Stay safe from roads, traffic, and vehicle lanes.',
  'Observe small wildlife from a respectful distance without touching.',
  'Never trespass into fenced or restricted locations.',
  'Respect the privacy of strangers and neighbors.'
];

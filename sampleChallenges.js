// Curated challenge pools across 3 levels
// Following requirement #2: Ordinary neighborhood, campus, park, garden, residential street
// Following requirement #23-25: Semantic concepts tracked to prevent duplicates and enable smart variation

export const CHALLENGE_SEED_DATABASE = [
  // 🟢 LEVEL 1: EXPLORER (Easy, 40 mins, 4 photos) - Observation of immediate surroundings
  {
    id: 'l1_green_object',
    level: 1,
    title: 'Vibrant Green',
    description: 'Find something naturally green outdoors.',
    category: 'nature',
    concept: 'color_green',
    difficulty: 1,
    hint: 'Look closely at fresh grass shoots, moss on a garden rock, or young tree leaves.',
    sampleImage: 'sample_green_plant.jpg',
    expectedFeatures: { minGreenHue: 0.25, type: 'nature' }
  },
  {
    id: 'l1_round_geometry',
    level: 1,
    title: 'Circular Wonder',
    description: 'Find something perfectly round in your surroundings.',
    category: 'shape',
    concept: 'shape_circular',
    difficulty: 1,
    hint: 'Look for a smooth round pebble, a dandelion head, or a circular drain grate.',
    sampleImage: 'sample_round_stone.jpg',
    expectedFeatures: { circularity: 0.7, type: 'shape' }
  },
  {
    id: 'l1_flower_or_plant',
    level: 1,
    title: 'Flora Encounter',
    description: 'Find a wildflower, blooming bud, or interesting garden leaf.',
    category: 'nature',
    concept: 'botanical_bloom',
    difficulty: 1,
    hint: 'Even a tiny clover bloom or sidewalk dandelion counts.',
    sampleImage: 'sample_green_plant.jpg',
    expectedFeatures: { botanical: true }
  },
  {
    id: 'l1_weathered_vintage',
    level: 1,
    title: 'Marks of Time',
    description: 'Find something outdoors that looks old, weathered, or aged.',
    category: 'texture',
    concept: 'weathered_patina',
    difficulty: 1,
    hint: 'Rusty gate hinges, lichen-covered stones, or weathered timber fences show natural aging.',
    sampleImage: 'sample_tree_face.jpg',
    expectedFeatures: { textureRoughness: 0.5 }
  },
  {
    id: 'l1_yellow_accent',
    level: 1,
    title: 'Sunny Hue',
    description: 'Find a distinct pop of bright yellow in your environment.',
    category: 'color',
    concept: 'color_yellow',
    difficulty: 1,
    hint: 'Autumn leaves, yellow sidewalk curb paint, or dandelions.',
    expectedFeatures: { colorYellow: true }
  },
  {
    id: 'l1_straight_line',
    level: 1,
    title: 'Linear Alignment',
    description: 'Find a sharp, straight line cutting through the outdoor scene.',
    category: 'pattern',
    concept: 'straight_lines',
    difficulty: 1,
    hint: 'Sidewalk seams, telephone wires against the sky, or fence slats.',
    expectedFeatures: { linearEdges: true }
  },
  {
    id: 'l1_soft_texture',
    level: 1,
    title: 'Gentle Surface',
    description: 'Find an outdoor surface that looks remarkably soft or velvety.',
    category: 'texture',
    concept: 'tactile_soft',
    difficulty: 1,
    hint: 'Moss cushion, flower petals, or a fluffy seed head.',
    expectedFeatures: { softTexture: true }
  },
  {
    id: 'l1_sky_frame',
    level: 1,
    title: 'Canopy Window',
    description: 'Photograph the open sky through a natural frame of leaves or branches.',
    category: 'composition',
    concept: 'sky_canopy_frame',
    difficulty: 1,
    hint: 'Point your camera directly up through tree branches overhead.',
    expectedFeatures: { upwardAngle: true }
  },

  // 🟡 LEVEL 2: OBSERVER (Medium, 30 mins, 3 photos) - Restrictions, comparisons, subtle relationships
  {
    id: 'l2_red_non_manmade',
    level: 2,
    title: 'Organic Crimson',
    description: 'Find something red that is strictly NOT man-made.',
    category: 'nature',
    concept: 'natural_red',
    difficulty: 2,
    hint: 'Red berries, crimson autumn leaves, or reddish soil/rose petals. No stop signs or bricks!',
    expectedFeatures: { colorRed: true, naturalSubject: true }
  },
  {
    id: 'l2_shadow_silhouette',
    level: 2,
    title: 'Shadow Silhouette',
    description: 'Find a shadow that creates an intricate or intriguing shape on the ground.',
    category: 'shadow',
    concept: 'shadow_silhouette',
    difficulty: 2,
    hint: 'Look for shadows cast by tree branches, bicycle spokes, or decorative railings on sunlit pavement.',
    sampleImage: 'sample_shadow_pattern.jpg',
    expectedFeatures: { highContrastShadow: true }
  },
  {
    id: 'l2_same_shape_diff_size',
    level: 2,
    title: 'Echoing Shapes',
    description: 'Find two objects of distinctly different sizes that share the exact same shape.',
    category: 'shape',
    concept: 'scale_echo',
    difficulty: 2,
    hint: 'A large tree leaf alongside a tiny clover leaflet, or two round pebbles of varying scale.',
    sampleImage: 'sample_round_stone.jpg',
    expectedFeatures: { dualSubjects: true }
  },
  {
    id: 'l2_two_textures',
    level: 2,
    title: 'Tactile Contrast',
    description: 'Capture two sharply contrasting textures touching in a single photograph.',
    category: 'texture',
    concept: 'contrasting_textures',
    difficulty: 2,
    hint: 'Smooth glass/metal against rough bark, or soft green moss growing over coarse concrete.',
    sampleImage: 'sample_green_plant.jpg',
    expectedFeatures: { dualTexture: true }
  },
  {
    id: 'l2_nature_meets_stone',
    level: 2,
    title: 'Pavement Pioneer',
    description: 'Photograph a natural plant sprouting directly through an artificial structure.',
    category: 'human_vs_nature',
    concept: 'crack_sprout',
    difficulty: 2,
    hint: 'Grass pushing through cracked asphalt, or ivy creeping along concrete blocks.',
    expectedFeatures: { manMadeAndNature: true }
  },
  {
    id: 'l2_rhythmic_pattern',
    level: 2,
    title: 'Rhythmic Sequence',
    description: 'Find an outdoor repeating pattern that breaks or shifts at one point.',
    category: 'pattern',
    concept: 'pattern_disruption',
    difficulty: 2,
    hint: 'Row of bricks with one discolored, or evenly spaced fence pickets with a fallen leaf.',
    expectedFeatures: { patternRegularity: true }
  },
  {
    id: 'l2_partially_hidden',
    level: 2,
    title: 'Veiled Discovery',
    description: 'Photograph an outdoor object that is partially concealed by another element.',
    category: 'creative_observation',
    concept: 'peeking_subject',
    difficulty: 2,
    hint: 'A stone half-buried under fallen leaves, or a post seen through tall reeds.',
    expectedFeatures: { depthLayering: true }
  },

  // 🔴 LEVEL 3: CREATIVE EXPLORER (Hard, 15 mins, 2 photos) - Twists, pareidolia, unusual viewpoints
  {
    id: 'l3_unexpected_face',
    level: 3,
    title: 'Everyday Pareidolia',
    description: 'Find something ordinary outdoors that unintentionally looks like a face.',
    category: 'visual_illusion',
    concept: 'pareidolia_face',
    difficulty: 3,
    hint: 'Knots in weathered tree bark, electrical box sockets, or leaf markings that smile or gaze back.',
    sampleImage: 'sample_tree_face.jpg',
    expectedFeatures: { facialSymmetry: true }
  },
  {
    id: 'l3_nature_manmade_interaction',
    level: 3,
    title: 'Living Balance',
    description: 'Photograph nature and something man-made actively interacting in the same frame.',
    category: 'human_vs_nature',
    concept: 'symbiotic_frame',
    difficulty: 3,
    hint: 'A snail creeping on a rusty bolt, rain droplets gathered on painted metal, or tree roots hugging a curb.',
    expectedFeatures: { interaction: true }
  },
  {
    id: 'l3_surreal_reflection',
    level: 3,
    title: 'Mirror Realm',
    description: 'Find a reflection in water or outdoor glass that dramatically alters reality.',
    category: 'reflection',
    concept: 'altered_reflection',
    difficulty: 3,
    hint: 'A puddle reflecting an inverted street lamp, or car window glass showing sky instead of interior.',
    expectedFeatures: { reflectiveDistortion: true }
  },
  {
    id: 'l3_bug_perspective',
    level: 3,
    title: 'Miniature Titan',
    description: 'Photograph a tiny object from ground level so it looms like a giant monument.',
    category: 'perspective',
    concept: 'forced_perspective_miniature',
    difficulty: 3,
    hint: 'Rest your camera flat on the grass facing a 2-inch pebble or mushroom from 3 inches away.',
    sampleImage: 'sample_round_stone.jpg',
    expectedFeatures: { groundLevelView: true }
  },
  {
    id: 'l3_three_textures_single_shot',
    level: 3,
    title: 'Trio of Textures',
    description: 'Capture three distinctly different textures together in a single tightly composed shot.',
    category: 'texture',
    concept: 'triple_texture_harmony',
    difficulty: 3,
    hint: 'E.g., rough wood bark + smooth wet stone + delicate green moss in one close-up frame.',
    sampleImage: 'sample_green_plant.jpg',
    expectedFeatures: { multiTexture: true }
  },
  {
    id: 'l3_shadow_chameleon',
    level: 3,
    title: 'Shadow Disguise',
    description: 'Find an object whose cast shadow looks like an entirely different recognizable creature or thing.',
    category: 'shadow',
    concept: 'shadow_metaphor',
    difficulty: 3,
    hint: 'A mailbox shadow that looks like a bird, or leafy twig shadow resembling a hand.',
    sampleImage: 'sample_shadow_pattern.jpg',
    expectedFeatures: { shadowMetaphor: true }
  }
];

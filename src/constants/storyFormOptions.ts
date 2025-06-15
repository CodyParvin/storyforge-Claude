
// Genre options for story creation
export const GENRE_OPTIONS = [
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'sci-fi', label: 'Science Fiction' },
  { value: 'horror', label: 'Horror' },
  { value: 'romance', label: 'Romance' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'drama', label: 'Drama' }
] as const;

// Tone options
export const TONE_OPTIONS = [
  { value: 'dark', label: 'Dark' },
  { value: 'lighthearted', label: 'Lighthearted' },
  { value: 'gritty', label: 'Gritty' },
  { value: 'epic', label: 'Epic' },
  { value: 'comedic', label: 'Comedic' },
  { value: 'philosophical', label: 'Philosophical' }
] as const;

// Story length options
export const LENGTH_OPTIONS = [
  { value: 'short-story', label: 'Short Story' },
  { value: 'novella', label: 'Novella' },
  { value: 'full-novel', label: 'Full Novel' }
] as const;

// Time period options
export const TIME_PERIOD_OPTIONS = [
  { value: 'ancient', label: 'Ancient' },
  { value: 'medieval', label: 'Medieval' },
  { value: 'modern', label: 'Modern' },
  { value: 'futuristic', label: 'Futuristic' },
  { value: 'post-apocalyptic', label: 'Post-Apocalyptic' }
] as const;

// Technology level options
export const TECH_LEVEL_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'low', label: 'Low' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'high', label: 'High' },
  { value: 'alien', label: 'Alien' }
] as const;

// Magic level options
export const MAGIC_LEVEL_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'low', label: 'Low' },
  { value: 'common', label: 'Common' },
  { value: 'powerful', label: 'Powerful' },
  { value: 'godlike', label: 'Godlike' }
] as const;

// Character race options
export const RACE_OPTIONS = [
  { value: 'human', label: 'Human' },
  { value: 'elf', label: 'Elf' },
  { value: 'orc', label: 'Orc' },
  { value: 'alien', label: 'Alien' },
  { value: 'custom', label: 'Custom' }
] as const;

// Antagonist type options
export const ANTAGONIST_TYPE_OPTIONS = [
  { value: 'monster', label: 'Monster' },
  { value: 'rival', label: 'Rival' },
  { value: 'government', label: 'Government' },
  { value: 'alien-force', label: 'Alien Force' },
  { value: 'betrayer', label: 'Betrayer' },
  { value: 'abstract-evil', label: 'Abstract Evil' }
] as const;

// Threat level options
export const THREAT_LEVEL_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'dangerous', label: 'Dangerous' },
  { value: 'world-ending', label: 'World-ending' }
] as const;

// Point of view options
export const POV_OPTIONS = [
  { value: 'first-person', label: 'First Person' },
  { value: 'third-limited', label: 'Third Person Limited' },
  { value: 'omniscient', label: 'Omniscient' }
] as const;

// Narrative style options
export const NARRATIVE_STYLE_OPTIONS = [
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'literary', label: 'Literary' },
  { value: 'philosophical', label: 'Philosophical' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'journal-style', label: 'Journal-style' }
] as const;

// Conflict type options
export const CONFLICT_TYPE_OPTIONS = [
  { value: 'internal', label: 'Internal' },
  { value: 'external', label: 'External' },
  { value: 'cosmic', label: 'Cosmic' },
  { value: 'political', label: 'Political' },
  { value: 'relational', label: 'Relational' }
] as const;

// Ending type options
export const ENDING_TYPE_OPTIONS = [
  { value: 'happy', label: 'Happy' },
  { value: 'tragic', label: 'Tragic' },
  { value: 'bittersweet', label: 'Bittersweet' },
  { value: 'cliffhanger', label: 'Cliffhanger' },
  { value: 'heroic-sacrifice', label: 'Heroic Sacrifice' },
  { value: 'twist-ending', label: 'Twist Ending' }
] as const;

// AI model options
export const AI_MODEL_OPTIONS = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'claude-3', label: 'Claude 3' },
  { value: 'gemini-1.5', label: 'Gemini 1.5' }
] as const;

// Available themes for stories
export const AVAILABLE_THEMES = [
  'Redemption', 'Betrayal', 'Love', 'Survival', 'Destiny',
  'Sacrifice', 'Identity', 'Power', 'Friendship', 'Justice'
] as const;

// Maximum number of supporting characters allowed
export const MAX_SUPPORTING_CHARACTERS = 3;

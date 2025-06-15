
interface ChapterOutline {
  number: number;
  title: string;
  summary: string;
}

interface StoryFormData {
  title: string;
  genre: string;
  tone: string;
  length: string;
  worldName: string;
  timePeriod: string;
  techLevel: string;
  magicLevel: string;
  mainName: string;
  race: string;
  role: string;
  personality: string;
  abilities: string;
  antagonistName: string;
  motivation: string;
  type: string;
  threatLevel: string;
  supportingCharacters: Array<{ name: string; traits: string }>;
  pov: string;
  narrativeStyle: string;
  conflictType: string;
  themes: string[];
  twist: string;
  endingType: string;
  openEnded: boolean;
  selectedModel: string;
}

export const buildChapterPrompt = (
  outline: ChapterOutline[], 
  chapterIndex: number, 
  formData: StoryFormData
): string => {
  const currentChapter = outline[chapterIndex];
  const previousChapter = chapterIndex > 0 ? outline[chapterIndex - 1] : null;
  const themesText = formData.themes.length > 0 ? formData.themes.join(', ') : 'adventure';
  
  let prompt = `Write Chapter ${currentChapter.number}: "${currentChapter.title}" for the ${formData.genre || 'fantasy'} story "${formData.title || 'Untitled Story'}" with a ${formData.tone || 'epic'} tone.

Chapter Summary: ${currentChapter.summary}

Story Context:
- Setting: ${formData.worldName ? `The world of ${formData.worldName}, ` : ''}set in ${formData.timePeriod || 'medieval'} times
- Main Character: ${formData.mainName || 'The protagonist'}, a ${formData.race || 'human'} ${formData.role || 'warrior'}
- Antagonist: ${formData.antagonistName || 'The villain'}
- Themes: ${themesText}
- Point of View: ${formData.pov || 'third-person limited'}
- Narrative Style: ${formData.narrativeStyle || 'cinematic'}`;

  if (previousChapter) {
    prompt += `\n\nPrevious Chapter Context: "${previousChapter.title}" - ${previousChapter.summary}`;
  }

  prompt += `\n\nWrite an extensive, fully-developed chapter (5000-8000 words) that creates a complete reading experience. The chapter MUST include:

**STRUCTURAL REQUIREMENTS:**
1. Multiple distinct scenes (3-5 scenes minimum)
2. Rich dialogue throughout - characters should speak naturally and frequently
3. Varied formatting with section breaks, scene transitions, and pacing changes
4. Clear chapter arc with setup, development, climax, and resolution

**DIALOGUE AND CHARACTER INTERACTION:**
- Include substantial dialogue between characters (at least 30% of the chapter)
- Use dialogue to reveal character personalities, motivations, and relationships
- Include both conversation and internal monologue
- Show character dynamics through their speaking patterns and word choices
- Use dialogue tags and action beats to enhance the conversation flow

**NARRATIVE DEPTH:**
- Detailed world-building and atmospheric descriptions
- Character development through actions, thoughts, and reactions
- Multiple plot threads that advance the overall story
- Emotional depth and character growth moments
- Sensory details that immerse readers in the world

**FORMATTING AND PACING:**
- Use scene breaks (###) to separate major scenes
- Include both fast-paced action and slower character moments
- Vary sentence length and paragraph structure for rhythm
- Include moments of tension, relief, and emotional resonance

Write in an engaging, ${formData.tone || 'epic'} style that matches the ${formData.genre || 'fantasy'} genre. Make readers feel completely immersed in the story world and deeply connected to the characters through their words and actions.`;

  return prompt;
};

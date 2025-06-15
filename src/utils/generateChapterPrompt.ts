
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

  prompt += `\n\nWrite a full chapter (800-1500 words) that advances the plot naturally from the outline. Include dialogue, action, and character development. Use descriptive language that matches the ${formData.tone || 'epic'} tone.`;

  return prompt;
};

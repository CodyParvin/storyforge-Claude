
import { StoryData } from '../contexts/StoryContext';

export const exportAsMarkdown = (storyData: StoryData): string => {
  let content = `# ${storyData.metadata.title}\n\n`;
  
  // Add metadata
  content += `**Genre:** ${storyData.metadata.genre}\n`;
  content += `**Tone:** ${storyData.metadata.tone}\n`;
  content += `**Length:** ${storyData.metadata.length}\n\n`;
  
  // Add outline if no chapters are generated
  if (storyData.chapters.length === 0 && storyData.outline.length > 0) {
    content += `## Story Outline\n\n`;
    storyData.outline.forEach(chapter => {
      content += `### Chapter ${chapter.number}: ${chapter.title}\n\n`;
      content += `${chapter.summary}\n\n`;
    });
  } else {
    // Add generated chapters
    storyData.chapters
      .sort((a, b) => a.chapterIndex - b.chapterIndex)
      .forEach(chapter => {
        const outline = storyData.outline[chapter.chapterIndex];
        if (outline) {
          content += `## Chapter ${outline.number}: ${outline.title}\n\n`;
          content += `${chapter.content}\n\n---\n\n`;
        }
      });
  }
  
  return content;
};

export const exportAsJSON = (storyData: StoryData): string => {
  return JSON.stringify(storyData, null, 2);
};

export const exportAsTXT = (storyData: StoryData): string => {
  let content = `${storyData.metadata.title}\n`;
  content += '='.repeat(storyData.metadata.title.length) + '\n\n';
  
  // Add generated chapters
  storyData.chapters
    .sort((a, b) => a.chapterIndex - b.chapterIndex)
    .forEach(chapter => {
      const outline = storyData.outline[chapter.chapterIndex];
      if (outline) {
        content += `Chapter ${outline.number}: ${outline.title}\n`;
        content += '-'.repeat(`Chapter ${outline.number}: ${outline.title}`.length) + '\n\n';
        content += chapter.content + '\n\n';
      }
    });
    
  return content;
};

export const downloadFile = (filename: string, content: string, type: string = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (content: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(content);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = content;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

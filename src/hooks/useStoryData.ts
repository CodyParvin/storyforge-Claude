
import { useStory } from '../contexts/StoryContext';
import { useToast } from './use-toast';

/**
 * Enhanced hook for story data management
 * Provides convenient methods for story operations and progress tracking
 */
export const useStoryData = () => {
  const story = useStory();
  const { toast } = useToast();

  /**
   * Save the current story with user feedback
   */
  const saveCurrentStory = () => {
    if (story.storyData) {
      story.saveStory({});
      toast({
        title: "Story Saved",
        description: "Your story has been saved successfully."
      });
    }
  };

  /**
   * Calculate chapter completion progress
   * @returns Object containing completed count, total count, and percentage
   */
  const getChapterProgress = () => {
    if (!story.storyData) return { completed: 0, total: 0, percentage: 0 };
    
    const total = story.storyData.outline.length;
    const completed = story.storyData.chapters.filter(ch => ch.isGenerated).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage };
  };

  /**
   * Check if a specific chapter has been generated
   * @param chapterIndex - Index of the chapter to check
   * @returns True if chapter is generated
   */
  const isChapterGenerated = (chapterIndex: number): boolean => {
    return story.storyData?.chapters.some(
      ch => ch.chapterIndex === chapterIndex && ch.isGenerated
    ) || false;
  };

  /**
   * Get content for a specific chapter
   * @param chapterIndex - Index of the chapter
   * @returns Chapter content string or empty string if not found
   */
  const getChapterContent = (chapterIndex: number): string => {
    return story.storyData?.chapters.find(
      ch => ch.chapterIndex === chapterIndex
    )?.content || '';
  };

  return {
    ...story,
    saveCurrentStory,
    getChapterProgress,
    isChapterGenerated,
    getChapterContent
  };
};

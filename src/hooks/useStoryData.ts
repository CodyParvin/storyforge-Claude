
import { useStory } from '../contexts/StoryContext';
import { useToast } from './use-toast';

export const useStoryData = () => {
  const story = useStory();
  const { toast } = useToast();

  const saveCurrentStory = () => {
    if (story.storyData) {
      story.saveStory({});
      toast({
        title: "Story Saved",
        description: "Your story has been saved successfully."
      });
    }
  };

  const getChapterProgress = () => {
    if (!story.storyData) return { completed: 0, total: 0, percentage: 0 };
    
    const total = story.storyData.outline.length;
    const completed = story.storyData.chapters.filter(ch => ch.isGenerated).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage };
  };

  const isChapterGenerated = (chapterIndex: number): boolean => {
    return story.storyData?.chapters.some(
      ch => ch.chapterIndex === chapterIndex && ch.isGenerated
    ) || false;
  };

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

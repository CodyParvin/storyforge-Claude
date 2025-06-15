
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface StoryFormData {
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

export interface ChapterOutline {
  number: number;
  title: string;
  summary: string;
}

export interface ChapterContent {
  chapterIndex: number;
  content: string;
  isGenerated: boolean;
  lastModified: Date;
}

export interface StoryData {
  id: string;
  metadata: StoryFormData;
  outline: ChapterOutline[];
  chapters: ChapterContent[];
  createdAt: Date;
  lastModified: Date;
  isComplete: boolean;
}

interface StoryContextType {
  storyData: StoryData | null;
  savedStories: StoryData[];
  saveStory: (data: Partial<StoryData>) => void;
  loadStory: (id: string) => void;
  createNewStory: (formData: StoryFormData) => string;
  updateOutline: (outline: ChapterOutline[]) => void;
  updateChapter: (chapterIndex: number, content: string) => void;
  deleteStory: (id: string) => void;
  clearCurrentStory: () => void;
  exportStory: (format: 'json' | 'txt' | 'markdown') => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

const STORAGE_KEY = 'storyWriter_stories';
const CURRENT_STORY_KEY = 'storyWriter_currentStory';

export const StoryProvider = ({ children }: { children: ReactNode }) => {
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [savedStories, setSavedStories] = useState<StoryData[]>([]);

  // Load saved stories and current story from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedStories = JSON.parse(saved).map((story: any) => ({
          ...story,
          createdAt: new Date(story.createdAt),
          lastModified: new Date(story.lastModified),
          chapters: story.chapters.map((chapter: any) => ({
            ...chapter,
            lastModified: new Date(chapter.lastModified)
          }))
        }));
        setSavedStories(parsedStories);
      } catch (error) {
        console.error('Error loading saved stories:', error);
      }
    }

    const currentStory = localStorage.getItem(CURRENT_STORY_KEY);
    if (currentStory) {
      try {
        const parsed = JSON.parse(currentStory);
        setStoryData({
          ...parsed,
          createdAt: new Date(parsed.createdAt),
          lastModified: new Date(parsed.lastModified),
          chapters: parsed.chapters.map((chapter: any) => ({
            ...chapter,
            lastModified: new Date(chapter.lastModified)
          }))
        });
      } catch (error) {
        console.error('Error loading current story:', error);
      }
    }
  }, []);

  // Save to localStorage whenever stories change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedStories));
  }, [savedStories]);

  useEffect(() => {
    if (storyData) {
      localStorage.setItem(CURRENT_STORY_KEY, JSON.stringify(storyData));
    } else {
      localStorage.removeItem(CURRENT_STORY_KEY);
    }
  }, [storyData]);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const createNewStory = (formData: StoryFormData): string => {
    const id = generateId();
    const newStory: StoryData = {
      id,
      metadata: formData,
      outline: [],
      chapters: [],
      createdAt: new Date(),
      lastModified: new Date(),
      isComplete: false
    };
    
    setStoryData(newStory);
    return id;
  };

  const saveStory = (data: Partial<StoryData>) => {
    if (!storyData) return;

    const updatedStory = {
      ...storyData,
      ...data,
      lastModified: new Date()
    };

    setStoryData(updatedStory);

    // Update or add to saved stories
    setSavedStories(prev => {
      const existing = prev.find(story => story.id === updatedStory.id);
      if (existing) {
        return prev.map(story => 
          story.id === updatedStory.id ? updatedStory : story
        );
      } else {
        return [...prev, updatedStory];
      }
    });
  };

  const loadStory = (id: string) => {
    const story = savedStories.find(s => s.id === id);
    if (story) {
      setStoryData(story);
    }
  };

  const updateOutline = (outline: ChapterOutline[]) => {
    if (!storyData) return;
    
    const updatedStory = {
      ...storyData,
      outline,
      lastModified: new Date()
    };
    
    saveStory(updatedStory);
  };

  const updateChapter = (chapterIndex: number, content: string) => {
    if (!storyData) return;

    const updatedChapters = [...storyData.chapters];
    const existingChapterIndex = updatedChapters.findIndex(
      ch => ch.chapterIndex === chapterIndex
    );

    const chapterData: ChapterContent = {
      chapterIndex,
      content,
      isGenerated: true,
      lastModified: new Date()
    };

    if (existingChapterIndex >= 0) {
      updatedChapters[existingChapterIndex] = chapterData;
    } else {
      updatedChapters.push(chapterData);
    }

    // Check if story is complete
    const isComplete = updatedChapters.length === storyData.outline.length &&
      updatedChapters.every(ch => ch.isGenerated);

    saveStory({
      chapters: updatedChapters,
      isComplete
    });
  };

  const deleteStory = (id: string) => {
    setSavedStories(prev => prev.filter(story => story.id !== id));
    if (storyData?.id === id) {
      setStoryData(null);
    }
  };

  const clearCurrentStory = () => {
    setStoryData(null);
  };

  const exportStory = (format: 'json' | 'txt' | 'markdown') => {
    if (!storyData) return;

    let content = '';
    const filename = `${storyData.metadata.title || 'story'}.${format}`;

    switch (format) {
      case 'json':
        content = JSON.stringify(storyData, null, 2);
        break;
      
      case 'txt':
        content = `${storyData.metadata.title}\n\n`;
        storyData.chapters
          .sort((a, b) => a.chapterIndex - b.chapterIndex)
          .forEach(chapter => {
            const outline = storyData.outline[chapter.chapterIndex];
            content += `Chapter ${outline.number}: ${outline.title}\n\n`;
            content += chapter.content + '\n\n';
          });
        break;
      
      case 'markdown':
        content = `# ${storyData.metadata.title}\n\n`;
        content += `**Genre:** ${storyData.metadata.genre}\n`;
        content += `**Tone:** ${storyData.metadata.tone}\n\n`;
        storyData.chapters
          .sort((a, b) => a.chapterIndex - b.chapterIndex)
          .forEach(chapter => {
            const outline = storyData.outline[chapter.chapterIndex];
            content += `## Chapter ${outline.number}: ${outline.title}\n\n`;
            content += chapter.content + '\n\n';
          });
        break;
    }

    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const value: StoryContextType = {
    storyData,
    savedStories,
    saveStory,
    loadStory,
    createNewStory,
    updateOutline,
    updateChapter,
    deleteStory,
    clearCurrentStory,
    exportStory
  };

  return (
    <StoryContext.Provider value={value}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};

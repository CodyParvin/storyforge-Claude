
// API utility functions for future backend integration

export interface Story {
  id: string;
  title: string;
  content: string;
  author: string;
  genre: string;
  rating: number;
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  storiesCount: number;
  averageRating: number;
  readersCount: number;
  createdAt: string;
}

// Mock API functions (to be replaced with actual API calls)
export const fetchStories = async (): Promise<Story[]> => {
  // Mock data for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'The Digital Awakening',
          content: 'Story content here...',
          author: 'AI Assistant',
          genre: 'Science Fiction',
          rating: 4.8,
          readTime: 12,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
        },
      ]);
    }, 1000);
  });
};

export const createStory = async (storyData: Partial<Story>): Promise<Story> => {
  // Mock creation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(36).substr(2, 9),
        title: storyData.title || 'Untitled Story',
        content: storyData.content || '',
        author: 'Current User',
        genre: storyData.genre || 'General',
        rating: 0,
        readTime: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }, 1500);
  });
};

export const fetchUserProfile = async (): Promise<UserProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'user_123',
        username: 'StoryCreator',
        email: 'user@example.com',
        storiesCount: 12,
        averageRating: 4.7,
        readersCount: 847,
        createdAt: '2024-01-01T00:00:00Z',
      });
    }, 800);
  });
};

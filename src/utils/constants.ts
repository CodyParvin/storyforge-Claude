
export const APP_NAME = 'AI StoryForge';

export const ROUTES = {
  HOME: '/',
  CREATE: '/create',
  STORIES: '/stories',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

export const STORY_GENRES = [
  'Fantasy',
  'Science Fiction',
  'Mystery',
  'Romance',
  'Adventure',
  'Horror',
  'Thriller',
  'Drama',
  'Comedy',
  'Historical Fiction',
] as const;

export const API_ENDPOINTS = {
  STORIES: '/api/stories',
  CREATE_STORY: '/api/stories/create',
  USER_PROFILE: '/api/user/profile',
  SETTINGS: '/api/user/settings',
} as const;

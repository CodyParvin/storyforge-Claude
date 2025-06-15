
import React from 'react';
import { BookOpen } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">AI StoryForge</h2>
        <p className="text-gray-600 animate-pulse">Loading your creative workspace...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

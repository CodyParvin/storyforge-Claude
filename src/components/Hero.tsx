
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e0e7ff%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 bg-indigo-100 dark:bg-indigo-900/50 px-3 sm:px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm sm:text-base text-indigo-800 dark:text-indigo-300 font-medium">AI-Powered Storytelling</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            Craft Amazing Stories with
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> AI Magic</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Unlock your creativity with AI StoryForge. Generate compelling narratives, develop characters, and bring your imagination to life with the power of artificial intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              to="/create"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-indigo-600 dark:bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Start Creating
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            
            <Link
              to="/stories"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg border-2 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200 w-full sm:w-auto"
            >
              <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Browse Stories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

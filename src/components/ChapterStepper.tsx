
import React from 'react';
import { Check, Circle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChapterStepperProps {
  totalChapters: number;
  currentChapter: number;
  completedChapters: number[];
  onChapterClick: (chapterIndex: number) => void;
}

const ChapterStepper = ({ 
  totalChapters, 
  currentChapter, 
  completedChapters, 
  onChapterClick 
}: ChapterStepperProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Chapter Progress</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {completedChapters.length} of {totalChapters} completed
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalChapters }, (_, index) => {
          const chapterNumber = index + 1;
          const isCompleted = completedChapters.includes(index);
          const isCurrent = currentChapter === index;
          const isAccessible = isCompleted || isCurrent || index === 0;
          
          return (
            <button
              key={index}
              onClick={() => isAccessible && onChapterClick(index)}
              disabled={!isAccessible}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-110 focus:scale-110",
                {
                  "bg-green-500 text-white hover:bg-green-600 animate-bounce-subtle": isCompleted,
                  "bg-indigo-500 text-white ring-2 ring-indigo-200 dark:ring-indigo-400 animate-pulse": isCurrent && !isCompleted,
                  "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed": !isAccessible,
                  "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 cursor-pointer hover:shadow-md": isAccessible && !isCurrent && !isCompleted
                }
              )}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {isCompleted ? (
                <Check className="h-4 w-4 animate-scale-in" />
              ) : !isAccessible ? (
                <Lock className="h-3 w-3" />
              ) : (
                chapterNumber
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-indigo-500 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${(completedChapters.length / totalChapters) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ChapterStepper;

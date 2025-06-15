
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">Chapter Progress</h3>
        <span className="text-sm text-gray-500">
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
                "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200",
                {
                  "bg-green-500 text-white hover:bg-green-600": isCompleted,
                  "bg-indigo-500 text-white ring-2 ring-indigo-200": isCurrent && !isCompleted,
                  "bg-gray-100 text-gray-400 cursor-not-allowed": !isAccessible,
                  "bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer": isAccessible && !isCurrent && !isCompleted
                }
              )}
            >
              {isCompleted ? (
                <Check className="h-4 w-4" />
              ) : !isAccessible ? (
                <Lock className="h-3 w-3" />
              ) : (
                chapterNumber
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-3 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(completedChapters.length / totalChapters) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ChapterStepper;

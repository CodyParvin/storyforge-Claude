
import React from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection = ({ title, description, children, className }: FormSectionProps) => {
  return (
    <section className={cn(
      "bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm",
      className
    )}>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-600 pb-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
};

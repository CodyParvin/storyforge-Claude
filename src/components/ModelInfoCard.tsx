
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Sparkles } from 'lucide-react';

interface ModelInfoCardProps {
  modelName: string;
  className?: string;
}

interface ModelInfo {
  description: string;
  icon: React.ComponentType<any>;
}

/**
 * Model information database containing descriptions and icons
 * for different AI models used in story generation
 */
const MODEL_INFO_DATABASE: Record<string, ModelInfo> = {
  'gpt-4o': {
    description: 'A cutting-edge multimodal model from OpenAI with advanced reasoning capabilities.',
    icon: Sparkles
  },
  'gpt-4': {
    description: 'OpenAI\'s most capable model with superior performance on complex tasks.',
    icon: Sparkles
  },
  'claude-3-opus': {
    description: 'Anthropic\'s most powerful model with exceptional reasoning and creativity.',
    icon: Cpu
  },
  'claude-3-sonnet': {
    description: 'A balanced model from Anthropic offering great performance and efficiency.',
    icon: Cpu
  },
  'claude-3-haiku': {
    description: 'Anthropic\'s fastest model optimized for quick, intelligent responses.',
    icon: Cpu
  }
};

/**
 * Get model information with fallback for unknown models
 * @param modelName - The name of the AI model
 * @returns Model information object with description and icon
 */
const getModelInfo = (modelName: string): ModelInfo => {
  return MODEL_INFO_DATABASE[modelName] || {
    description: 'An advanced AI model designed for creative writing and storytelling.',
    icon: Sparkles
  };
};

/**
 * ModelInfoCard component displays information about the AI model
 * used to generate story content, including description and icon
 */
const ModelInfoCard = ({ modelName, className = '' }: ModelInfoCardProps) => {
  const modelInfo = getModelInfo(modelName);
  const Icon = modelInfo.icon;

  return (
    <Card className={`border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {/* Model icon */}
          <div className="flex-shrink-0">
            <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 transition-colors duration-200 hover:text-indigo-700 dark:hover:text-indigo-300" />
          </div>
          
          {/* Model information text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200">
              Generated with {modelName}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed transition-colors duration-200">
              {modelInfo.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelInfoCard;

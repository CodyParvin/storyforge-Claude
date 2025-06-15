
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import ChapterStepper from '../components/ChapterStepper';
import ModelInfoCard from '../components/ModelInfoCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  ArrowLeft, 
  ArrowRight, 
  RefreshCw, 
  Loader2, 
  Play,
  ChevronLeft
} from 'lucide-react';
import { buildChapterPrompt } from '../utils/generateChapterPrompt';
import { generateChapter } from '../utils/generateChapter';

interface ChapterOutline {
  number: number;
  title: string;
  summary: string;
}

interface StoryFormData {
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

interface ChapterData {
  chapterIndex: number;
  content: string;
  isGenerated: boolean;
}

const ChapterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<StoryFormData | null>(null);
  const [outline, setOutline] = useState<ChapterOutline[]>([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [chapterData, setChapterData] = useState<ChapterData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  
  useEffect(() => {
    // Check if data was passed from navigation state or session storage
    if (location.state?.formData && location.state?.outline) {
      setFormData(location.state.formData);
      setOutline(location.state.outline);
    } else {
      // Try to get from session storage
      const storedData = sessionStorage.getItem('approvedOutline');
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setFormData(parsed.formData);
        setOutline(parsed.outline);
      } else {
        // No data available, redirect back
        toast({
          title: "No outline found",
          description: "Please create and approve an outline first.",
          variant: "destructive"
        });
        navigate('/outline');
        return;
      }
    }
  }, [location.state, navigate, toast]);

  const currentChapter = outline[currentChapterIndex];
  const completedChapters = chapterData.map(chapter => chapter.chapterIndex);
  
  const handleGenerateChapter = async (chapterIndex: number) => {
    if (!formData || !outline.length) return;
    
    setIsGenerating(true);
    try {
      const prompt = buildChapterPrompt(outline, chapterIndex, formData);
      console.log('Generated chapter prompt:', prompt);
      
      const content = await generateChapter(prompt, formData.selectedModel || 'gpt-4o');
      
      // Update chapter data
      setChapterData(prev => {
        const existing = prev.find(ch => ch.chapterIndex === chapterIndex);
        if (existing) {
          return prev.map(ch => 
            ch.chapterIndex === chapterIndex 
              ? { ...ch, content, isGenerated: true }
              : ch
          );
        } else {
          return [...prev, { chapterIndex, content, isGenerated: true }];
        }
      });
      
      toast({
        title: "Chapter Generated!",
        description: `Chapter ${chapterIndex + 1} has been successfully created.`
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating the chapter. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAutoGenerate = async () => {
    if (!formData || !outline.length) return;
    
    setIsAutoGenerating(true);
    try {
      for (let i = 0; i < outline.length; i++) {
        if (!chapterData.find(ch => ch.chapterIndex === i)) {
          await handleGenerateChapter(i);
          // Small delay between generations
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      toast({
        title: "All Chapters Generated!",
        description: "Your complete story has been generated successfully."
      });
    } catch (error) {
      toast({
        title: "Auto-generation Failed",
        description: "Some chapters may not have been generated. Please try individual generation.",
        variant: "destructive"
      });
    } finally {
      setIsAutoGenerating(false);
    }
  };

  const getCurrentChapterContent = () => {
    return chapterData.find(ch => ch.chapterIndex === currentChapterIndex)?.content || '';
  };

  const isCurrentChapterGenerated = () => {
    return chapterData.some(ch => ch.chapterIndex === currentChapterIndex && ch.isGenerated);
  };

  const formatChapterContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/### (.*?)(?=\n|$)/g, '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^/, '<p class="mb-4">')
      .replace(/$/, '</p>');
  };

  if (!formData || !outline.length) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-lg text-gray-600">Loading your story...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/outline')}
            className="mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Outline
          </Button>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full mb-4">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <span className="text-indigo-800 font-medium">Chapter Editor</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {formData.title || 'Your Story'}
            </h1>
            <p className="text-lg text-gray-600">
              Chapter {currentChapterIndex + 1} of {outline.length}
            </p>
          </div>

          {/* Model Info Card */}
          {formData.selectedModel && (
            <div className="mb-6">
              <ModelInfoCard 
                modelName={formData.selectedModel} 
                className="max-w-md mx-auto"
              />
            </div>
          )}
        </div>

        {/* Chapter Stepper */}
        <ChapterStepper
          totalChapters={outline.length}
          currentChapter={currentChapterIndex}
          completedChapters={completedChapters}
          onChapterClick={setCurrentChapterIndex}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chapter Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Chapters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {outline.map((chapter, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentChapterIndex(index)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                      currentChapterIndex === index
                        ? 'bg-indigo-100 text-indigo-800'
                        : completedChapters.includes(index)
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="font-medium">Chapter {chapter.number}</div>
                    <div className="text-xs opacity-75 truncate">{chapter.title}</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Auto-generate button */}
            <Button
              onClick={handleAutoGenerate}
              disabled={isAutoGenerating || isGenerating}
              variant="outline"
              className="w-full"
            >
              {isAutoGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Auto-generating...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Auto-Generate All
                </>
              )}
            </Button>
          </div>

          {/* Chapter Content Area */}
          <div className="lg:col-span-3">
            <Card className="min-h-[600px]">
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      Chapter {currentChapter?.number}: {currentChapter?.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {currentChapter?.summary}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleGenerateChapter(currentChapterIndex)}
                      disabled={isGenerating}
                      variant={isCurrentChapterGenerated() ? "outline" : "default"}
                      size="sm"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          {isCurrentChapterGenerated() ? 'Regenerate' : 'Generate'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                {isCurrentChapterGenerated() ? (
                  <ScrollArea className="h-[70vh] pr-4">
                    <div 
                      className="prose prose-lg max-w-none leading-relaxed text-gray-800"
                      dangerouslySetInnerHTML={{ 
                        __html: formatChapterContent(getCurrentChapterContent()) 
                      }}
                    />
                  </ScrollArea>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                    <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Chapter Not Generated Yet
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                      Click "Generate" to create this chapter based on your story outline and preferences.
                    </p>
                    <Button
                      onClick={() => handleGenerateChapter(currentChapterIndex)}
                      disabled={isGenerating}
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Generating Chapter...
                        </>
                      ) : (
                        'Generate This Chapter'
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chapter Navigation Controls */}
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentChapterIndex(Math.max(0, currentChapterIndex - 1))}
                disabled={currentChapterIndex === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Chapter
              </Button>
              
              <span className="text-sm text-gray-500">
                {currentChapterIndex + 1} of {outline.length}
              </span>
              
              <Button
                variant="outline"
                onClick={() => setCurrentChapterIndex(Math.min(outline.length - 1, currentChapterIndex + 1))}
                disabled={currentChapterIndex === outline.length - 1}
              >
                Next Chapter
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChapterPage;

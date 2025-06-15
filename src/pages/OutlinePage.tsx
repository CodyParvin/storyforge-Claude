import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import ModelInfoCard from '../components/ModelInfoCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FileText, ArrowLeft, Loader2 } from 'lucide-react';

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

interface ChapterOutline {
  number: number;
  title: string;
  summary: string;
}

const buildOutlinePrompt = (formData: StoryFormData): string => {
  const themesText = formData.themes.length > 0 ? formData.themes.join(', ') : 'adventure';
  const supportingCharsText = formData.supportingCharacters.length > 0 
    ? formData.supportingCharacters.map(char => `${char.name} (${char.traits})`).join(', ')
    : 'various allies';

  return `Write a detailed story outline for "${formData.title || 'Untitled Story'}", a ${formData.genre || 'fantasy'} story with a ${formData.tone || 'epic'} tone. 

Setting: ${formData.worldName ? `The world of ${formData.worldName}, ` : ''}set in ${formData.timePeriod || 'medieval'} times with ${formData.techLevel || 'low'} technology and ${formData.magicLevel || 'moderate'} magic levels.

Main Character: ${formData.mainName || 'The protagonist'}, a ${formData.race || 'human'} ${formData.role || 'warrior'}. ${formData.personality || 'A brave and determined individual.'} Special abilities: ${formData.abilities || 'Standard combat skills.'}

Antagonist: ${formData.antagonistName || 'The villain'}, a ${formData.type || 'rival'} with ${formData.threatLevel || 'moderate'} threat level. Motivation: ${formData.motivation || 'Power and conquest.'}

Supporting Characters: ${supportingCharsText}

Story Elements:
- Conflict Type: ${formData.conflictType || 'external'}
- Themes: ${themesText}
- Point of View: ${formData.pov || 'third-person limited'}
- Narrative Style: ${formData.narrativeStyle || 'cinematic'}
- Ending Type: ${formData.endingType || 'heroic'}
- Open-ended: ${formData.openEnded ? 'Yes' : 'No'}
${formData.twist ? `- Plot Twist: ${formData.twist}` : ''}

Create a ${formData.length || 'novella'}-length outline with 5-10 chapters, each with a compelling title and 2-3 sentence summary that advances the plot toward the ${formData.endingType || 'heroic'} conclusion.`;
};

const generateStoryOutline = async (prompt: string, model: string): Promise<ChapterOutline[]> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

  // Mock outline generation based on prompt content
  const mockOutlines: ChapterOutline[] = [
    {
      number: 1,
      title: "The Call to Adventure",
      summary: "Our hero discovers their destiny when a mysterious stranger arrives with urgent news. The peaceful world they knew is threatened by an ancient evil awakening. Reluctantly, they must leave everything behind to embark on a perilous journey."
    },
    {
      number: 2,
      title: "Crossing the Threshold",
      summary: "The protagonist enters the dangerous unknown, facing their first real challenge. They meet unlikely allies who will prove crucial to their quest. A shocking betrayal forces them to question everything they believed about their mission."
    },
    {
      number: 3,
      title: "Trials and Tribulations",
      summary: "Our hero faces seemingly impossible obstacles that test both their physical abilities and moral resolve. Ancient secrets are revealed that change their understanding of the conflict. The antagonist's true power becomes terrifyingly clear."
    },
    {
      number: 4,
      title: "The Mentor's Wisdom",
      summary: "A wise guide appears to help the protagonist unlock their hidden potential. Crucial skills are learned and inner strength is discovered through rigorous training. However, the mentor harbors a dark secret that threatens to destroy everything."
    },
    {
      number: 5,
      title: "The Point of No Return",
      summary: "The hero makes a fateful decision that seals their destiny and burns all bridges to their former life. Allies are lost in a devastating battle that pushes everyone to their limits. The true scope of the evil they face is finally revealed."
    },
    {
      number: 6,
      title: "Into the Abyss",
      summary: "All seems lost as the protagonist faces their darkest hour, stripped of allies and hope. They must confront their deepest fears and personal demons to find the strength to continue. A surprising revelation about their enemy changes everything."
    },
    {
      number: 7,
      title: "The Final Confrontation",
      summary: "The climactic battle begins as all forces converge for the ultimate showdown. Sacrifices are made and unexpected heroes rise to the occasion. The protagonist must choose between personal desires and the greater good."
    },
    {
      number: 8,
      title: "Resolution and New Beginnings",
      summary: "The aftermath of the great battle brings both victory and loss, forever changing the world. The hero must find their place in this new reality they helped create. Seeds are planted for future adventures, but this chapter of the journey reaches its conclusion."
    }
  ];

  // Return a subset based on length preference
  const numChapters = prompt.includes('short story') ? 5 : prompt.includes('full novel') ? 8 : 6;
  return mockOutlines.slice(0, numChapters);
};

const OutlinePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState<StoryFormData | null>(null);
  const [outline, setOutline] = useState<ChapterOutline[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    // Check if form data was passed from navigation state
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const handleGenerateOutline = async () => {
    if (!formData) {
      toast({
        title: "No form data",
        description: "Please go back and fill out the story form first.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = buildOutlinePrompt(formData);
      console.log('Generated prompt:', prompt);
      
      const generatedOutline = await generateStoryOutline(prompt, formData.selectedModel || 'gpt-4o');
      setOutline(generatedOutline);
      setHasGenerated(true);
      
      toast({
        title: "Outline Generated!",
        description: `Successfully created a ${generatedOutline.length}-chapter outline using ${formData.selectedModel || 'GPT-4o'}.`
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your outline. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApproveOutline = () => {
    if (outline.length === 0) return;
    
    // Store outline in session storage for use in chapters page
    sessionStorage.setItem('approvedOutline', JSON.stringify({
      formData,
      outline,
      timestamp: Date.now()
    }));
    
    toast({
      title: "Outline Approved!",
      description: "Proceeding to chapter generation...",
    });
    
    navigate('/chapters', { 
      state: { 
        formData, 
        outline 
      } 
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/create')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Story Form
          </Button>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full mb-6">
              <FileText className="h-5 w-5 text-indigo-600" />
              <span className="text-indigo-800 font-medium">Story Outline</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {formData?.title || 'Your Story Outline'}
            </h1>
            <p className="text-xl text-gray-600">
              {formData 
                ? `${formData.genre} • ${formData.tone} • ${formData.length}`
                : 'Generate your AI-powered story outline'
              }
            </p>
          </div>
        </div>

        {/* Model Info Card */}
        {formData?.selectedModel && (
          <div className="mb-8">
            <ModelInfoCard 
              modelName={formData.selectedModel} 
              className="max-w-md mx-auto"
            />
          </div>
        )}

        {!hasGenerated && (
          <div className="text-center mb-12">
            <Button
              onClick={handleGenerateOutline}
              disabled={isGenerating || !formData}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-semibold"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating Outline...
                </>
              ) : (
                'Generate Outline'
              )}
            </Button>
            {!formData && (
              <p className="text-sm text-gray-500 mt-2">
                Please complete the story form first
              </p>
            )}
          </div>
        )}

        {isGenerating && (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-indigo-600" />
            <p className="text-lg text-gray-600">
              Creating your story outline using {formData?.selectedModel || 'AI'}...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This may take a few moments
            </p>
          </div>
        )}

        {outline.length > 0 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your Story Outline</h2>
              <p className="text-gray-600">
                {outline.length} chapters • Generated with {formData?.selectedModel || 'AI'}
              </p>
            </div>
            
            <div className="space-y-4">
              {outline.map((chapter) => (
                <Card key={chapter.number} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Chapter {chapter.number}: {chapter.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{chapter.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleGenerateOutline}
                disabled={isGenerating}
                size="lg"
                className="px-6 py-3"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  'Regenerate Outline'
                )}
              </Button>
              <Button
                onClick={handleApproveOutline}
                disabled={isGenerating}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
              >
                Approve & Continue to Chapters
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OutlinePage;


import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStoryData } from '../hooks/useStoryData';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText, File, Book, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExportPage = () => {
  const { storyData, exportStory, getChapterProgress } = useStoryData();
  const { toast } = useToast();
  const navigate = useNavigate();

  const progress = getChapterProgress();

  const exportFormats = [
    { 
      icon: FileText, 
      name: 'JSON', 
      description: 'Complete story data (outline + chapters + metadata)',
      format: 'json' as const
    },
    { 
      icon: FileText, 
      name: 'TXT', 
      description: 'Plain text format for reading',
      format: 'txt' as const
    },
    { 
      icon: File, 
      name: 'Markdown', 
      description: 'Formatted text with headings',
      format: 'markdown' as const
    },
  ];

  const handleExport = (format: 'json' | 'txt' | 'markdown') => {
    if (!storyData) {
      toast({
        title: "No Story Data",
        description: "Please create and generate a story first.",
        variant: "destructive"
      });
      return;
    }

    if (format !== 'json' && progress.completed === 0) {
      toast({
        title: "No Chapters Generated",
        description: "Generate at least one chapter before exporting story content.",
        variant: "destructive"
      });
      return;
    }

    try {
      exportStory(format);
      toast({
        title: "Export Successful",
        description: `Your story has been exported as ${format.toUpperCase()}.`
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your story.",
        variant: "destructive"
      });
    }
  };

  if (!storyData) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Story Found</h2>
            <p className="text-gray-600 mb-6">
              You need to create and generate a story before you can export it.
            </p>
            <Button onClick={() => navigate('/create')}>
              Create New Story
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button
          variant="outline"
          onClick={() => navigate('/chapters')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Chapters
        </Button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full mb-6">
            <Download className="h-5 w-5 text-indigo-600" />
            <span className="text-indigo-800 font-medium">Export Story</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Export "{storyData.metadata.title}"
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Download your story in various formats
          </p>
          
          {/* Progress indicator */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Badge variant={progress.completed === progress.total ? "default" : "secondary"}>
              {progress.completed} of {progress.total} chapters generated
            </Badge>
            <Badge variant="outline">
              {storyData.metadata.genre} • {storyData.metadata.tone}
            </Badge>
            {storyData.isComplete && (
              <Badge className="bg-green-100 text-green-800">
                Story Complete
              </Badge>
            )}
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Choose Export Format</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {exportFormats.map(({ icon: Icon, name, description, format }) => (
                <button
                  key={name}
                  onClick={() => handleExport(format)}
                  className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-colors text-center"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{name}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Story Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Genre:</span>
                <span className="ml-2 text-gray-600">{storyData.metadata.genre}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Tone:</span>
                <span className="ml-2 text-gray-600">{storyData.metadata.tone}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Length:</span>
                <span className="ml-2 text-gray-600">{storyData.metadata.length}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">AI Model:</span>
                <span className="ml-2 text-gray-600">{storyData.metadata.selectedModel}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Created:</span>
                <span className="ml-2 text-gray-600">
                  {storyData.createdAt.toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Last Modified:</span>
                <span className="ml-2 text-gray-600">
                  {storyData.lastModified.toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {progress.percentage}% complete ({progress.completed}/{progress.total} chapters)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ExportPage;

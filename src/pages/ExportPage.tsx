
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStoryData } from '../hooks/useStoryData';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText, File, Copy, AlertCircle, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { exportAsMarkdown, exportAsJSON, exportAsTXT, downloadFile, copyToClipboard } from '../utils/exportHelpers';

const ExportPage = () => {
  const { storyData, getChapterProgress } = useStoryData();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [previewFormat, setPreviewFormat] = useState<'markdown' | 'txt'>('markdown');

  const progress = getChapterProgress();

  const getPreviewContent = () => {
    if (!storyData) return '';
    return previewFormat === 'markdown' ? exportAsMarkdown(storyData) : exportAsTXT(storyData);
  };

  const handleDownloadMarkdown = () => {
    if (!storyData) return;
    const content = exportAsMarkdown(storyData);
    downloadFile(`${storyData.metadata.title || 'story'}.md`, content, 'text/markdown');
    toast({
      title: "Download Started",
      description: "Your story has been downloaded as Markdown."
    });
  };

  const handleDownloadJSON = () => {
    if (!storyData) return;
    const content = exportAsJSON(storyData);
    downloadFile(`${storyData.metadata.title || 'story'}.json`, content, 'application/json');
    toast({
      title: "Download Started",
      description: "Your story data has been downloaded as JSON."
    });
  };

  const handleDownloadTXT = () => {
    if (!storyData) return;
    const content = exportAsTXT(storyData);
    downloadFile(`${storyData.metadata.title || 'story'}.txt`, content, 'text/plain');
    toast({
      title: "Download Started",
      description: "Your story has been downloaded as plain text."
    });
  };

  const handleCopyToClipboard = async () => {
    if (!storyData) return;
    const content = previewFormat === 'markdown' ? exportAsMarkdown(storyData) : exportAsTXT(storyData);
    const success = await copyToClipboard(content);
    
    if (success) {
      toast({
        title: "Copied to Clipboard!",
        description: `Your story has been copied as ${previewFormat.toUpperCase()}.`
      });
    } else {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard. Please try downloading instead.",
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/chapters')}
            className="mb-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chapters
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4 mr-2" />
            Return to Start
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Export "{storyData.metadata.title}"
          </h1>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Badge variant={progress.completed === progress.total ? "default" : "secondary"}>
              {progress.completed} of {progress.total} chapters generated
            </Badge>
            <Badge variant="outline">
              {storyData.metadata.genre} • {storyData.metadata.tone}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Export Options - Left Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    onClick={handleDownloadMarkdown}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download as Markdown
                  </Button>
                  <Button
                    onClick={handleDownloadJSON}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <File className="h-4 w-4 mr-2" />
                    Download as JSON
                  </Button>
                  <Button
                    onClick={handleDownloadTXT}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download as Plain Text
                  </Button>
                  <Button
                    onClick={handleCopyToClipboard}
                    className="w-full justify-start"
                    variant="default"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Story to Clipboard
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Story Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Genre:</span>
                    <span className="text-gray-600">{storyData.metadata.genre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Tone:</span>
                    <span className="text-gray-600">{storyData.metadata.tone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Length:</span>
                    <span className="text-gray-600">{storyData.metadata.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Created:</span>
                    <span className="text-gray-600">
                      {storyData.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {progress.percentage}% complete
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview - Right Column */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Story Preview</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={previewFormat === 'markdown' ? 'default' : 'outline'}
                      onClick={() => setPreviewFormat('markdown')}
                    >
                      Markdown
                    </Button>
                    <Button
                      size="sm"
                      variant={previewFormat === 'txt' ? 'default' : 'outline'}
                      onClick={() => setPreviewFormat('txt')}
                    >
                      Plain Text
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px] p-6">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
                    {getPreviewContent()}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExportPage;

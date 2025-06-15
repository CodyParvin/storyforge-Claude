import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';

interface SupportingCharacter {
  name: string;
  traits: string;
}

interface StoryFormData {
  // Story Basics
  title: string;
  genre: string;
  tone: string;
  length: string;
  
  // Setting
  worldName: string;
  timePeriod: string;
  techLevel: string;
  magicLevel: string;
  
  // Main Character
  mainName: string;
  race: string;
  role: string;
  personality: string;
  abilities: string;
  
  // Antagonist
  antagonistName: string;
  motivation: string;
  type: string;
  threatLevel: string;
  
  // Supporting Characters
  supportingCharacters: SupportingCharacter[];
  
  // Narrative Style
  pov: string;
  narrativeStyle: string;
  
  // Plot Elements
  conflictType: string;
  themes: string[];
  twist: string;
  
  // Ending Preferences
  endingType: string;
  openEnded: boolean;
  
  // AI Model
  selectedModel: string;
}

const StoryForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<StoryFormData>({
    title: '',
    genre: '',
    tone: '',
    length: '',
    worldName: '',
    timePeriod: '',
    techLevel: '',
    magicLevel: '',
    mainName: '',
    race: '',
    role: '',
    personality: '',
    abilities: '',
    antagonistName: '',
    motivation: '',
    type: '',
    threatLevel: '',
    supportingCharacters: [],
    pov: '',
    narrativeStyle: '',
    conflictType: '',
    themes: [],
    twist: '',
    endingType: '',
    openEnded: false,
    selectedModel: ''
  });

  const handleInputChange = (field: keyof StoryFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleThemeChange = (theme: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      themes: checked 
        ? [...prev.themes, theme]
        : prev.themes.filter(t => t !== theme)
    }));
  };

  const addSupportingCharacter = () => {
    if (formData.supportingCharacters.length < 3) {
      setFormData(prev => ({
        ...prev,
        supportingCharacters: [...prev.supportingCharacters, { name: '', traits: '' }]
      }));
    }
  };

  const removeSupportingCharacter = (index: number) => {
    setFormData(prev => ({
      ...prev,
      supportingCharacters: prev.supportingCharacters.filter((_, i) => i !== index)
    }));
  };

  const updateSupportingCharacter = (index: number, field: 'name' | 'traits', value: string) => {
    setFormData(prev => ({
      ...prev,
      supportingCharacters: prev.supportingCharacters.map((char, i) => 
        i === index ? { ...char, [field]: value } : char
      )
    }));
  };

  const handleGenerateOutline = () => {
    console.log('Generating outline with data:', formData);
    
    // Navigate to outline page with form data
    navigate('/outline', { 
      state: { 
        formData 
      } 
    });
  };

  const availableThemes = [
    'Redemption', 'Betrayal', 'Love', 'Survival', 'Destiny', 
    'Sacrifice', 'Identity', 'Power', 'Friendship', 'Justice'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Story</h1>
        <p className="text-gray-600">Fill out the details below to generate your AI-powered story outline</p>
      </div>

      <form className="space-y-8">
        {/* Story Basics Section */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Story Basics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Story Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter your story title"
                required
              />
            </div>
            <div>
              <Label htmlFor="genre">Genre *</Label>
              <Select value={formData.genre} onValueChange={(value) => handleInputChange('genre', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                  <SelectItem value="sci-fi">Science Fiction</SelectItem>
                  <SelectItem value="horror">Horror</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                  <SelectItem value="mystery">Mystery</SelectItem>
                  <SelectItem value="thriller">Thriller</SelectItem>
                  <SelectItem value="drama">Drama</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select value={formData.tone} onValueChange={(value) => handleInputChange('tone', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="lighthearted">Lighthearted</SelectItem>
                  <SelectItem value="gritty">Gritty</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="comedic">Comedic</SelectItem>
                  <SelectItem value="philosophical">Philosophical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="length">Length</Label>
              <Select value={formData.length} onValueChange={(value) => handleInputChange('length', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short-story">Short Story</SelectItem>
                  <SelectItem value="novella">Novella</SelectItem>
                  <SelectItem value="full-novel">Full Novel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Story Setting Section */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Story Setting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="worldName">World or Realm Name</Label>
              <Input
                id="worldName"
                value={formData.worldName}
                onChange={(e) => handleInputChange('worldName', e.target.value)}
                placeholder="Enter world name"
              />
            </div>
            <div>
              <Label htmlFor="timePeriod">Time Period</Label>
              <Select value={formData.timePeriod} onValueChange={(value) => handleInputChange('timePeriod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ancient">Ancient</SelectItem>
                  <SelectItem value="medieval">Medieval</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="futuristic">Futuristic</SelectItem>
                  <SelectItem value="post-apocalyptic">Post-Apocalyptic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="techLevel">Technology Level</Label>
              <Select value={formData.techLevel} onValueChange={(value) => handleInputChange('techLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tech level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="alien">Alien</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="magicLevel">Magic Level</Label>
              <Select value={formData.magicLevel} onValueChange={(value) => handleInputChange('magicLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select magic level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="powerful">Powerful</SelectItem>
                  <SelectItem value="godlike">Godlike</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Main Character Section */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Main Character
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mainName">Character Name</Label>
                <Input
                  id="mainName"
                  value={formData.mainName}
                  onChange={(e) => handleInputChange('mainName', e.target.value)}
                  placeholder="Enter character name"
                />
              </div>
              <div>
                <Label htmlFor="race">Race</Label>
                <Select value={formData.race} onValueChange={(value) => handleInputChange('race', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select race" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="human">Human</SelectItem>
                    <SelectItem value="elf">Elf</SelectItem>
                    <SelectItem value="orc">Orc</SelectItem>
                    <SelectItem value="alien">Alien</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="role">Class / Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                placeholder="e.g. warrior, hacker, priest"
              />
            </div>
            <div>
              <Label htmlFor="personality">Personality</Label>
              <Textarea
                id="personality"
                value={formData.personality}
                onChange={(e) => handleInputChange('personality', e.target.value)}
                placeholder="Describe their personality in 1–2 sentences"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="abilities">Special Abilities</Label>
              <Textarea
                id="abilities"
                value={formData.abilities}
                onChange={(e) => handleInputChange('abilities', e.target.value)}
                placeholder="Describe special skills, powers, or tools"
                rows={3}
              />
            </div>
          </div>
        </section>

        {/* Antagonist Section */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Antagonist
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="antagonistName">Name</Label>
                <Input
                  id="antagonistName"
                  value={formData.antagonistName}
                  onChange={(e) => handleInputChange('antagonistName', e.target.value)}
                  placeholder="Enter antagonist name"
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monster">Monster</SelectItem>
                    <SelectItem value="rival">Rival</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="alien-force">Alien Force</SelectItem>
                    <SelectItem value="betrayer">Betrayer</SelectItem>
                    <SelectItem value="abstract-evil">Abstract Evil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="motivation">Motivation</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                placeholder="What drives them?"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="threatLevel">Threat Level</Label>
              <Select value={formData.threatLevel} onValueChange={(value) => handleInputChange('threatLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select threat level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="dangerous">Dangerous</SelectItem>
                  <SelectItem value="world-ending">World-ending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Supporting Characters Section */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Supporting Characters
            </h2>
            <Button
              type="button"
              onClick={addSupportingCharacter}
              disabled={formData.supportingCharacters.length >= 3}
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Character
            </Button>
          </div>
          <div className="space-y-4">
            {formData.supportingCharacters.map((character, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Character {index + 1}</h3>
                  <Button
                    type="button"
                    onClick={() => removeSupportingCharacter(index)}
                    variant="ghost"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`support-name-${index}`}>Name</Label>
                    <Input
                      id={`support-name-${index}`}
                      value={character.name}
                      onChange={(e) => updateSupportingCharacter(index, 'name', e.target.value)}
                      placeholder="Character name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`support-traits-${index}`}>Traits</Label>
                    <Textarea
                      id={`support-traits-${index}`}
                      value={character.traits}
                      onChange={(e) => updateSupportingCharacter(index, 'traits', e.target.value)}
                      placeholder="Brief description of personality or role"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
            {formData.supportingCharacters.length === 0 && (
              <p className="text-gray-500 text-center py-4">No supporting characters added yet</p>
            )}
          </div>
        </section>

        {/* Narrative Style Section */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Narrative Style
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pov">Point of View</Label>
              <Select value={formData.pov} onValueChange={(value) => handleInputChange('pov', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select POV" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-person">First Person</SelectItem>
                  <SelectItem value="third-limited">Third Person Limited</SelectItem>
                  <SelectItem value="omniscient">Omniscient</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="narrativeStyle">Narrative Style</Label>
              <Select value={formData.narrativeStyle} onValueChange={(value) => handleInputChange('narrativeStyle', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cinematic">Cinematic</SelectItem>
                  <SelectItem value="literary">Literary</SelectItem>
                  <SelectItem value="philosophical">Philosophical</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="journal-style">Journal-style</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Plot Elements Section */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Plot Elements
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="conflictType">Conflict Type</Label>
              <Select value={formData.conflictType} onValueChange={(value) => handleInputChange('conflictType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select conflict type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                  <SelectItem value="cosmic">Cosmic</SelectItem>
                  <SelectItem value="political">Political</SelectItem>
                  <SelectItem value="relational">Relational</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Themes</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {availableThemes.map((theme) => (
                  <div key={theme} className="flex items-center space-x-2">
                    <Checkbox
                      id={theme}
                      checked={formData.themes.includes(theme)}
                      onCheckedChange={(checked) => handleThemeChange(theme, checked as boolean)}
                    />
                    <Label htmlFor={theme} className="text-sm">{theme}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="twist">Plot Twist (Optional)</Label>
              <Textarea
                id="twist"
                value={formData.twist}
                onChange={(e) => handleInputChange('twist', e.target.value)}
                placeholder="Describe any desired plot twist or secret reveal"
                rows={3}
              />
            </div>
          </div>
        </section>

        {/* Ending Preferences Section */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Story Ending Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="endingType">Ending Type</Label>
              <Select value={formData.endingType} onValueChange={(value) => handleInputChange('endingType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ending type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="happy">Happy</SelectItem>
                  <SelectItem value="tragic">Tragic</SelectItem>
                  <SelectItem value="bittersweet">Bittersweet</SelectItem>
                  <SelectItem value="cliffhanger">Cliffhanger</SelectItem>
                  <SelectItem value="heroic-sacrifice">Heroic Sacrifice</SelectItem>
                  <SelectItem value="twist-ending">Twist Ending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="openEnded"
                checked={formData.openEnded}
                onCheckedChange={(checked) => handleInputChange('openEnded', checked)}
              />
              <Label htmlFor="openEnded">Is the ending open to interpretation?</Label>
            </div>
          </div>
        </section>

        {/* AI Model Selector Section */}
        <section className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-indigo-200 pb-2">
            Review & Generate
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="selectedModel">AI Model to Use</Label>
              <Select value={formData.selectedModel} onValueChange={(value) => handleInputChange('selectedModel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select AI model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                  <SelectItem value="gemini-1.5">Gemini 1.5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="text-center">
              <Button
                type="button"
                onClick={handleGenerateOutline}
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-semibold"
              >
                Generate Outline
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                Click to generate your AI-powered story outline
              </p>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default StoryForm;

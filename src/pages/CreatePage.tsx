
import React from 'react';
import Layout from '../components/Layout';
import { PenTool, Sparkles } from 'lucide-react';

const CreatePage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <span className="text-indigo-800 font-medium">Story Creation</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Story</h1>
          <p className="text-xl text-gray-600">Let AI help you craft an amazing narrative</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <PenTool className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Story Workshop</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your story title..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option>Select a genre...</option>
                <option>Fantasy</option>
                <option>Science Fiction</option>
                <option>Mystery</option>
                <option>Romance</option>
                <option>Adventure</option>
                <option>Horror</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story Prompt
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Describe your story idea or let AI suggest one..."
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Save Draft
              </button>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Generate Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePage;

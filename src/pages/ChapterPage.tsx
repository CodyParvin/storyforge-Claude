
import React from 'react';
import Layout from '../components/Layout';
import { BookOpen, Save, Eye } from 'lucide-react';

const ChapterPage = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full mb-6">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            <span className="text-indigo-800 font-medium">Chapter Editor</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Write Your Chapters</h1>
          <p className="text-xl text-gray-600">Craft your story with AI assistance</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Chapters</h3>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((chapter) => (
                  <button
                    key={chapter}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      chapter === 1 
                        ? 'bg-indigo-100 text-indigo-800' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    Chapter {chapter}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Chapter 1</h2>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </button>
                </div>
              </div>
              
              <textarea
                className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Start writing your chapter here..."
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChapterPage;

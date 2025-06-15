
import React from 'react';
import Layout from '../components/Layout';
import { FileText, Plus, Edit } from 'lucide-react';

const OutlinePage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full mb-6">
            <FileText className="h-5 w-5 text-indigo-600" />
            <span className="text-indigo-800 font-medium">Story Outline</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Outline</h1>
          <p className="text-xl text-gray-600">Structure your story with AI-powered outline generation</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Story Structure</h2>
            <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add Chapter
            </button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((chapter) => (
              <div key={chapter} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Chapter {chapter}</h3>
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">Chapter outline will appear here...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OutlinePage;

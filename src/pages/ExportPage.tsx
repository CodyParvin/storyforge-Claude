
import React from 'react';
import Layout from '../components/Layout';
import { Download, FileText, File, Book } from 'lucide-react';

const ExportPage = () => {
  const exportFormats = [
    { icon: FileText, name: 'PDF', description: 'Print-ready format' },
    { icon: File, name: 'DOCX', description: 'Microsoft Word document' },
    { icon: Book, name: 'EPUB', description: 'E-book format' },
    { icon: FileText, name: 'TXT', description: 'Plain text file' },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full mb-6">
            <Download className="h-5 w-5 text-indigo-600" />
            <span className="text-indigo-800 font-medium">Export Story</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Export Your Story</h1>
          <p className="text-xl text-gray-600">Download your completed story in various formats</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose Export Format</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportFormats.map(({ icon: Icon, name, description }) => (
              <button
                key={name}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-colors text-left"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{name}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Include cover page</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Include table of contents</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Include chapter numbers</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
              <Download className="h-5 w-5 mr-2" />
              Export Story
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExportPage;


import React from 'react';
import Layout from '../components/Layout';
import { Settings, User, Bell, Shield, Palette } from 'lucide-react';

const SettingsPage = () => {
  const settingSections = [
    {
      icon: User,
      title: 'Account Settings',
      description: 'Manage your account information and preferences'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure how you receive updates and alerts'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Control your privacy settings and security options'
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize the look and feel of your interface'
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full mb-6">
            <Settings className="h-5 w-5 text-gray-600" />
            <span className="text-gray-800 font-medium">Settings</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Account Settings</h1>
          <p className="text-xl text-gray-600">Manage your AI StoryForge experience</p>
        </div>
        
        <div className="space-y-6">
          {settingSections.map(({ icon: Icon, title, description }, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
                <div className="flex-shrink-0">
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;

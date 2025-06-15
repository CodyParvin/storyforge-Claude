
import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { Lightbulb, Zap, Users, Star } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Lightbulb,
      title: 'AI-Powered Creativity',
      description: 'Generate unique story ideas, characters, and plot twists with advanced AI assistance.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Create compelling stories in minutes, not hours. Our AI helps you overcome writer\'s block instantly.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Share your stories, get feedback, and collaborate with fellow storytellers worldwide.'
    },
    {
      icon: Star,
      title: 'Professional Quality',
      description: 'Generate publication-ready content with our advanced editing and formatting tools.'
    }
  ];

  return (
    <Layout>
      <Hero />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AI StoryForge?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of storytelling with our cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;

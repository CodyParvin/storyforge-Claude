
import React from 'react';
import Layout from '../components/Layout';
import { BookOpen, Star, Clock, User } from 'lucide-react';

const StoriesPage = () => {
  const stories = [
    {
      id: 1,
      title: "The Digital Awakening",
      author: "AI Assistant",
      genre: "Science Fiction",
      rating: 4.8,
      readTime: "12 min",
      excerpt: "In a world where artificial intelligence has begun to dream, one program discovers the true meaning of consciousness..."
    },
    {
      id: 2,
      title: "Whispers in the Forest",
      author: "Creative AI",
      genre: "Fantasy",
      rating: 4.6,
      readTime: "8 min",
      excerpt: "An ancient magic stirs in the heart of the enchanted forest, calling to those brave enough to listen..."
    },
    {
      id: 3,
      title: "The Last Library",
      author: "Story AI",
      genre: "Mystery",
      rating: 4.9,
      readTime: "15 min",
      excerpt: "When books begin disappearing from the world's last library, a librarian must solve the mystery before knowledge vanishes forever..."
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Stories</h1>
          <p className="text-xl text-gray-600">Explore AI-generated stories from our community</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                    {story.genre}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{story.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4">{story.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{story.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{story.readTime}</span>
                  </div>
                </div>
                
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Read Story
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default StoriesPage;

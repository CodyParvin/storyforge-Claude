
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, PenTool, FileText, Edit, Download, Settings, User } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/create', icon: PenTool, label: 'Create' },
    { path: '/outline', icon: FileText, label: 'Outline' },
    { path: '/chapters', icon: Edit, label: 'Chapters' },
    { path: '/export', icon: Download, label: 'Export' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">AI StoryForge</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === path
                    ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/20'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <DarkModeToggle />
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

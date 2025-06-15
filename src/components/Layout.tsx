
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout component that wraps all pages with consistent
 * navigation, content area, and footer structure
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Navigation header */}
      <Navbar />
      
      {/* Main content area */}
      <main className="flex-1 w-full">
        <div className="w-full overflow-x-hidden">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;

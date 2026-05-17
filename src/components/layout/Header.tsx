import React from 'react';
import { Languages } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Languages className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-primary tracking-tight">LingoScore</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">How it works</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Resources</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Sign In</button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition-all">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

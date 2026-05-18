import React from 'react';
import { Languages } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2">
            <Languages className="w-10 h-10 text-primary" />
            <span className="text-2xl font-black text-primary tracking-tighter">LingoScore</span>
          </Link>
          <nav className="hidden lg:flex gap-10">
            <Link href="#" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">How it works</Link>
            <Link href="#" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">CEFR Exams</Link>
            <Link href="#" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Resources</Link>
          </nav>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hidden sm:block text-sm font-bold text-slate-600 hover:text-primary transition-colors">Sign In</Link>
            <Link href="/login" className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-secondary transition-all shadow-lg shadow-primary/20">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Sparkles, BarChart3, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl tracking-tight">
            Master Your English with <span className="text-secondary">AI Precision</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get an instant, detailed analysis of your writing according to CEFR standards.
            Identify your strengths and areas for improvement in seconds.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a href="#assess" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary transition-all shadow-lg shadow-primary/20">
              Start Assessment
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-blue-50 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">AI-Powered Analysis</h3>
            <p className="text-sm text-gray-600">Advanced LLMs evaluate your text for grammar, vocabulary, and coherence.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">Detailed Scoring</h3>
            <p className="text-sm text-gray-600">Receive scores for all four language skills mapped to CEFR A1-C2 levels.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">Actionable Feedback</h3>
            <p className="text-sm text-gray-600">Get specific recommendations on how to elevate your English proficiency.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

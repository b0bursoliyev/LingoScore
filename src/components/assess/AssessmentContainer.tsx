'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface AssessmentContainerProps {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  progress: number;
  onExit?: () => void;
}

export default function AssessmentContainer({
  children,
  title,
  icon,
  progress,
  onExit
}: AssessmentContainerProps) {
  const router = useRouter();

  const handleExit = () => {
    if (onExit) onExit();
    else if (confirm("Are you sure you want to exit? Your progress in this module will be lost.")) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="bg-white border-b border-slate-100 py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/5 rounded-xl text-primary">
            {icon}
          </div>
          <div>
            <h1 className="font-black text-primary leading-none">{title}</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Language Assessment</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold">In Progress</span>
          </div>
          <button
            onClick={handleExit}
            className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Progress Bar (Global) */}
      <div className="h-1 bg-slate-100 w-full sticky top-[73px] z-50">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <main className="max-w-7xl mx-auto py-12 px-4">
        {children}
      </main>

      {/* Footer / Tip */}
      <footer className="text-center pb-12">
        <p className="text-slate-400 text-xs font-medium">
          Powered by LingoScore AI Engine • CEFR Standardized
        </p>
      </footer>
    </div>
  );
}

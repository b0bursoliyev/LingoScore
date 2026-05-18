'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { PenTool, Loader2 } from 'lucide-react';

export default function WritingTest() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setScore = useTestStore((state) => state.setSkillScore);

  const wordCount = useMemo(() => text.trim().split(/\s+/).filter(Boolean).length, [text]);

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate complex analysis
    setTimeout(() => {
      const score = Math.min(95, Math.max(20, wordCount / 2));
      setScore('writing', score);
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <h2 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
          <PenTool className="w-8 h-8 text-secondary" />
          Writing Assessment
        </h2>

        <p className="mb-6 font-bold text-slate-600">Prompt: Discuss the advantages and disadvantages of remote work in the modern era.</p>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[400px] bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 outline-none focus:border-primary focus:bg-white transition-all font-medium"
            placeholder="Start typing your essay here..."
          />
          <div className={`absolute bottom-4 right-6 font-bold text-sm ${wordCount < 50 ? 'text-orange-500' : 'text-green-600'}`}>
            {wordCount} words (Minimum 50)
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={wordCount < 50 || isLoading}
          className="mt-10 w-full bg-primary text-white py-5 rounded-2xl font-black text-xl hover:bg-secondary transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Writing Assessment"}
        </button>
      </div>
    </div>
  );
}

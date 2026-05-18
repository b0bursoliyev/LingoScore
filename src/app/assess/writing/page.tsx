'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { PenTool, Loader2 } from 'lucide-react';
import AssessmentContainer from '@/components/assess/AssessmentContainer';

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
    <AssessmentContainer
      title="Writing Assessment"
      icon={<PenTool className="w-6 h-6" />}
      progress={wordCount >= 50 ? 100 : (wordCount / 50) * 100}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
          <h2 className="text-3xl font-black text-primary mb-8 flex items-center gap-4">
            <PenTool className="w-10 h-10 text-secondary" />
            Essay Writing
          </h2>

          <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
            <p className="font-bold text-primary/80 uppercase tracking-widest text-xs mb-2">Essay Prompt</p>
            <p className="font-bold text-primary text-xl leading-relaxed">Discuss the advantages and disadvantages of remote work in the modern era.</p>
          </div>

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
            className="mt-10 w-full bg-primary text-white py-6 rounded-[1.5rem] font-black text-2xl hover:bg-secondary transition-all disabled:opacity-50 flex items-center justify-center gap-4 shadow-xl shadow-primary/20"
          >
            {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : "Submit Writing Assessment"}
          </button>
        </div>
      </div>
    </AssessmentContainer>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PASSAGE = `Artificial Intelligence (AI) is transforming the way we interact with technology. From personalized recommendations to self-driving cars, AI systems are becoming increasingly integrated into our daily lives. One of the most significant impacts of AI is in the field of education, where intelligent tutoring systems can provide customized learning experiences for students.`;

export default function ReadingTest() {
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();
  const setScore = useTestStore((state) => state.setSkillScore);

  const handleFinish = () => {
    // Basic scoring: correct answer is 2 (tutoring systems)
    const score = selected === 2 ? 85 : 40;
    setScore('reading', score);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <h2 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-secondary" />
          Reading Comprehension
        </h2>

        <div className="bg-slate-50 p-6 rounded-2xl mb-8 leading-relaxed text-slate-700 italic">
          "{PASSAGE}"
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg mb-4">What is a significant impact of AI mentioned in the text?</h3>
          {[
            "Creating social media platforms",
            "Designing self-driving airplanes",
            "Customized learning in education",
            "Improving global weather patterns"
          ].map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-medium flex justify-between items-center ${
                selected === i ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              {opt}
              {selected === i && <CheckCircle className="w-5 h-5" />}
            </button>
          ))}
        </div>

        <button
          onClick={handleFinish}
          disabled={selected === null}
          className="mt-10 w-full bg-primary text-white py-5 rounded-2xl font-black text-xl hover:bg-secondary transition-all disabled:opacity-50"
        >
          Submit Reading Module
        </button>
      </div>
    </div>
  );
}

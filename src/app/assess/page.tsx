'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AssessmentForm from "@/components/assessment/AssessmentForm";
import { useAssessmentStore } from '@/store/useAssessmentStore';
import { ClipboardList, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AssessPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAnalysisData = useAssessmentStore((state) => state.setAnalysisData);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (response.ok) {
        setAnalysisData(data);
        router.push('/results');
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze text.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-bold mb-4 border border-primary/10">
            <ClipboardList className="w-4 h-4" />
            Specialized CEFR Exam Assessment
          </div>
          <h1 className="text-4xl font-black text-primary mb-4">New Writing Task</h1>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            Provide a writing sample (min 50 words). Our AI will evaluate it based on
            CEFR exam criteria for Grammatical Range, Lexical Resource, and Cohesion.
          </p>
        </motion.div>

        <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl shadow-blue-100/50 border border-slate-100">
          <div className="bg-slate-50 rounded-[2rem] p-8 md:p-10 border border-slate-200/50">
            <AssessmentForm onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-start gap-4 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-primary mb-1">Exam Conditions</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Try to write without using external dictionaries or tools for the most accurate assessment.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-start gap-4 shadow-sm">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
              <ClipboardList className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="font-bold text-primary mb-1">Word Count Tip</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Longer samples (150-250 words) typically result in more precise CEFR level detection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

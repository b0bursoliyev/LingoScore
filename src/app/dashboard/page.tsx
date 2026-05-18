'use client';

import React, { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { useTestStore } from '@/store/useTestStore';
import { useRouter } from 'next/navigation';
import ResultsDashboard from '@/components/dashboard/ResultsDashboard';
import {
  PlusCircle, BookOpen, Volume2, PenTool, Mic,
  Trophy, TrendingUp, ChevronRight, LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { user, history, logout, addResult } = useUserStore();
  const { currentScores, resetScores } = useTestStore();
  const [viewingResult, setViewingResult] = useState<any>(null);
  const router = useRouter();

  if (!user) {
    if (typeof window !== 'undefined') router.push('/auth');
    return null;
  }

  const isTestComplete = currentScores.reading > 0 && currentScores.listening > 0 && currentScores.writing > 0 && currentScores.speaking > 0;

  const handleGenerateReport = async () => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: currentScores, user }),
      });
      const data = await response.json();
      addResult(data);
      resetScores();
      setViewingResult(data);
    } catch (e) {
      console.error(e);
    }
  };

  if (viewingResult) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <ResultsDashboard data={viewingResult} onReset={() => setViewingResult(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-100 py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-xl">L</div>
          <span className="text-xl font-black text-primary">LingoScore</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-600">Hello, {user.name}</span>
            <div className="w-8 h-8 bg-blue-100 text-primary rounded-full flex items-center justify-center font-bold">{user.name[0]}</div>
          </div>
          <button onClick={() => { logout(); router.push('/'); }} className="text-slate-400 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-black text-primary mb-8 flex items-center gap-3">
                <PlusCircle className="w-7 h-7 text-secondary" />
                Current Assessment
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { id: 'reading', icon: BookOpen, label: 'Reading' },
                  { id: 'listening', icon: Volume2, label: 'Listening' },
                  { id: 'writing', icon: PenTool, label: 'Writing' },
                  { id: 'speaking', icon: Mic, label: 'Speaking' },
                ].map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => router.push(`/assess/${skill.id}`)}
                    className={`p-6 rounded-[1.5rem] border-2 transition-all flex flex-col items-center gap-4 ${
                      currentScores[skill.id as keyof typeof currentScores] > 0
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                      : 'bg-slate-50 border-slate-100 hover:border-primary text-slate-400'
                    }`}
                  >
                    <skill.icon className="w-8 h-8" />
                    <span className="font-bold text-sm uppercase tracking-widest">{skill.label}</span>
                    {currentScores[skill.id as keyof typeof currentScores] > 0 && <span className="text-xs font-black">COMPLETED</span>}
                  </button>
                ))}
              </div>

              {isTestComplete && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleGenerateReport}
                  className="mt-10 w-full bg-primary text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Generate Final CEFR Report
                </motion.button>
              )}
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-black text-primary mb-8 flex items-center gap-3 text-secondary">
                Assessment History
              </h2>
              {history.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-slate-400 font-medium italic">No assessments yet. Complete all 4 modules above!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((res) => (
                    <button
                      key={res.id}
                      onClick={() => setViewingResult(res)}
                      className="w-full flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl font-black text-primary shadow-sm border border-slate-100">{res.overallLevel}</div>
                        <div className="text-left">
                          <div className="font-black text-primary uppercase tracking-wider">Proficiency Report</div>
                          <div className="text-sm font-bold text-slate-400">{res.date}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-primary p-8 rounded-[2rem] text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <Trophy className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-xl font-black mb-2">Target Proficiency</h3>
                <div className="text-5xl font-black text-accent mb-4">C1</div>
                <p className="text-white/60 text-sm font-medium">Keep practicing to reach your goal!</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-primary mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Skill Progress
              </h3>
              <div className="space-y-6">
                {['Reading', 'Listening', 'Writing', 'Speaking'].map((label) => (
                  <div key={label}>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      <span>{label}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

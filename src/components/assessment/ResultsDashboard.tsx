'use client';

import React from 'react';
import { CheckCircle2, XCircle, Award, Download, ArrowLeft, Info, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalysisData {
  overallLevel: string;
  overallScore: number;
  metrics: {
    reading: number;
    listening: number;
    writing: number;
    speaking: number;
  };
  vocabulary: {
    variety: string;
    complexity: string;
  };
  grammar: {
    errorCount: number;
    errors: Array<{ original: string; suggestion: string; type: string }>;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
  };
  wordCount: number;
}

interface ResultsDashboardProps {
  data: AnalysisData;
  onReset: () => void;
  onExport: () => void;
}

const Gauge = ({ value, label, size = 130 }: { value: number; label: string; size?: number }) => {
  const radius = size * 0.38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center group">
      <div className="relative mb-3" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-slate-100"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-accent circular-gauge"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-primary group-hover:scale-110 transition-transform">{value}%</span>
        </div>
      </div>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
};

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data, onReset, onExport }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      id="results-report"
      className="w-full bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,43,78,0.1)] border border-slate-100"
    >
      {/* Header Section */}
      <div className="bg-primary p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <button
              onClick={onReset}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 text-sm font-semibold no-export group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              New Assessment
            </button>
            <h2 className="text-4xl font-black mb-2 flex items-center gap-4">
              Proficiency Report
              <Award className="w-10 h-10 text-accent" />
            </h2>
            <p className="text-white/60 font-medium">Detailed AI analysis of your English writing performance.</p>
          </div>
          <button
            onClick={onExport}
            className="bg-white text-primary px-8 py-4 rounded-2xl text-base font-bold flex items-center gap-3 hover:bg-slate-50 transition-all shadow-xl no-export active:scale-95"
          >
            <Download className="w-5 h-5" />
            Download PDF Report
          </button>
        </div>
      </div>

      <div className="p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Score Card */}
          <div className="lg:col-span-4 bg-slate-50 rounded-[1.5rem] p-10 flex flex-col items-center text-center border border-slate-200/50">
            <div className="w-32 h-32 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6 border border-slate-100">
              <span className="text-6xl font-black text-primary leading-none">{data.overallLevel}</span>
            </div>
            <div className="inline-block px-4 py-1.5 bg-accent text-white text-xs font-black uppercase tracking-widest rounded-full mb-6">
              CEFR Level
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${data.overallScore}%` }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>
            <div className="text-sm font-bold text-slate-500 mb-6">Mastery: {data.overallScore}%</div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Your writing exhibits strong {data.overallLevel} capabilities with notable precision in structure.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <h3 className="text-lg font-black text-primary mb-8 uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-1 bg-accent rounded-full" />
              Skill Breakdown
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Gauge value={data.metrics.reading} label="Reading" />
              <Gauge value={data.metrics.listening} label="Listening" />
              <Gauge value={data.metrics.writing} label="Writing" />
              <Gauge value={data.metrics.speaking} label="Speaking" />
            </div>
          </div>
        </div>

        {/* Feedback Sections */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-emerald-50/30 p-8 rounded-[1.5rem] border border-emerald-100 shadow-sm">
            <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              Core Strengths
            </h3>
            <ul className="space-y-4">
              {data.feedback.strengths.map((s, i) => (
                <li key={i} className="text-slate-700 flex gap-4 font-medium">
                  <span className="text-emerald-500 font-black">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/30 p-8 rounded-[1.5rem] border border-amber-100 shadow-sm">
            <h3 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-amber-600" />
              </div>
              Priority Improvements
            </h3>
            <ul className="space-y-4">
              {data.feedback.improvements.map((s, i) => (
                <li key={i} className="text-slate-700 flex gap-4 font-medium">
                  <span className="text-amber-500 font-black">!</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Stats Footer */}
        <div className="mt-16 p-8 bg-slate-50 rounded-[1.5rem] grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Word Count</div>
            <div className="text-2xl font-black text-primary">{data.wordCount}</div>
          </div>
          <div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Lexical Variety</div>
            <div className="text-2xl font-black text-primary">{data.vocabulary.variety}</div>
          </div>
          <div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Complexity</div>
            <div className="text-2xl font-black text-primary">{data.vocabulary.complexity}</div>
          </div>
          <div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Grammar Error Rate</div>
            <div className="text-2xl font-black text-primary">{((data.grammar.errorCount / data.wordCount) * 100).toFixed(1)}%</div>
          </div>
        </div>

        {/* Next Steps CTA */}
        <div className="mt-12 flex items-center justify-between p-6 bg-primary/5 rounded-2xl border border-primary/10">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-primary" />
            <p className="text-sm font-bold text-primary">Want to reach the next level faster?</p>
          </div>
          <button className="flex items-center gap-2 text-primary font-black text-sm hover:underline">
            Unlock Personalized Study Plan
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsDashboard;

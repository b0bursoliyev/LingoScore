'use client';

import React from 'react';
import { CheckCircle2, XCircle, Award, Download, ArrowLeft } from 'lucide-react';
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

const Gauge = ({ value, label, size = 120 }: { value: number; label: string; size?: number }) => {
  const radius = size * 0.4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-100"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-secondary"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-primary">{value}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-semibold text-gray-600 uppercase tracking-wider">{label}</span>
    </div>
  );
};

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data, onReset, onExport }) => {
  return (
    <div id="results-report" className="w-full bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <button onClick={onReset} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-4 no-export">
            <ArrowLeft className="w-4 h-4" />
            Back to Assessment
          </button>
          <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
            Your Assessment Results
            <Award className="w-8 h-8 text-secondary" />
          </h2>
        </div>
        <button
          onClick={onExport}
          className="bg-white border-2 border-gray-100 text-primary px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-all no-export"
        >
          <Download className="w-4 h-4" />
          Export as PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Overall Level */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center p-8 bg-blue-50 rounded-2xl border border-blue-100">
          <div className="text-6xl font-black text-primary mb-2">{data.overallLevel}</div>
          <div className="text-lg font-bold text-secondary uppercase tracking-widest mb-6">CEFR Level</div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${data.overallScore}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Your writing demonstrates characteristics of an <strong>{data.overallLevel}</strong> proficiency level.
          </p>
        </div>

        {/* Middle: Skills Gauges */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
          <Gauge value={data.metrics.reading} label="Reading" />
          <Gauge value={data.metrics.listening} label="Listening" />
          <Gauge value={data.metrics.writing} label="Writing" />
          <Gauge value={data.metrics.speaking} label="Speaking" />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Strengths */}
        <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
          <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Strengths
          </h3>
          <ul className="space-y-3">
            {data.feedback.strengths.map((s, i) => (
              <li key={i} className="text-sm text-green-700 flex gap-2">
                <span className="min-w-[18px] h-[18px] bg-green-200 text-green-800 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
          <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Areas for Improvement
          </h3>
          <ul className="space-y-3">
            {data.feedback.improvements.map((s, i) => (
              <li key={i} className="text-sm text-orange-700 flex gap-2">
                <span className="min-w-[18px] h-[18px] bg-orange-200 text-orange-800 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Analysis Details */}
      <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Vocabulary Variety</div>
          <div className="text-lg font-bold text-primary">{data.vocabulary.variety}</div>
        </div>
        <div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Grammar Errors</div>
          <div className="text-lg font-bold text-primary">{data.grammar.errorCount} detected</div>
        </div>
        <div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Word Count</div>
          <div className="text-lg font-bold text-primary">{data.wordCount} words</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;

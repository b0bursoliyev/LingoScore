'use client';

import React from 'react';
import {
  CheckCircle2, XCircle, Award, Download, ArrowLeft,
  BookOpen, Volume2, PenTool, Mic, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

interface AnalysisData {
  id: string;
  date: string;
  overallLevel: string;
  overallScore: number;
  skills: {
    reading: number;
    listening: number;
    writing: number;
    speaking: number;
  };
}

interface ResultsDashboardProps {
  data: AnalysisData;
  onReset: () => void;
}

const Gauge = ({ value, label, icon: Icon }: { value: number; label: string; icon: any }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
      <div className="relative w-24 h-24 mb-4">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-200"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-accent"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary opacity-20 absolute" />
          <span className="text-xl font-black text-primary relative">{value}%</span>
        </div>
      </div>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
  );
};

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data, onReset }) => {
  const handleExport = async () => {
    const element = document.getElementById('report-container');
    if (!element) return;

    const noExport = element.querySelectorAll<HTMLElement>('.no-export');
    noExport.forEach(el => el.style.display = 'none');

    try {
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#f8fafc' // Matches background
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const img = new Image();
      img.src = dataUrl;

      await new Promise((resolve) => {
        img.onload = () => {
          const width = 210;
          const height = (img.height * width) / img.width;
          pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
          pdf.save(`LingoScore_Report_${data.id}.pdf`);
          resolve(null);
        };
      });
    } catch (e) {
      console.error('Export failed:', e);
    } finally {
      noExport.forEach(el => el.style.display = '');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto space-y-8 pb-20"
      id="report-container"
    >
      <div className="flex justify-between items-center no-export">
        <button onClick={onReset} className="flex items-center gap-2 text-slate-400 font-bold hover:text-primary transition-all">
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </button>
        <button
          onClick={handleExport}
          className="bg-primary text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-secondary transition-all shadow-lg"
        >
          <Download className="w-5 h-5" /> Download PDF Certificate
        </button>
      </div>

      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />

        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
          <div className="w-48 h-48 bg-slate-50 rounded-[2.5rem] flex flex-col items-center justify-center border-4 border-primary/10 shadow-inner">
            <span className="text-7xl font-black text-primary">{data.overallLevel}</span>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mt-2">CEFR Level</span>
          </div>

          <div className="flex-grow">
            <h1 className="text-4xl font-black text-primary mb-4">Official Proficiency Report</h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">
              Based on your performance across all four language skills, your English proficiency
              aligns with the <strong>{data.overallLevel}</strong> standard of the Common European Framework of Reference.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Gauge value={data.skills.reading} label="Reading" icon={BookOpen} />
              <Gauge value={data.skills.listening} label="Listening" icon={Volume2} />
              <Gauge value={data.skills.writing} label="Writing" icon={PenTool} />
              <Gauge value={data.skills.speaking} label="Speaking" icon={Mic} />
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-10">
          <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100">
            <h3 className="text-xl font-black text-emerald-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              Core Strengths
            </h3>
            <ul className="space-y-4 text-emerald-800 font-medium">
              <li>• Consistent use of complex grammatical structures.</li>
              <li>• High lexical variety in academic contexts.</li>
              <li>• Strong coherence in multi-paragraph compositions.</li>
            </ul>
          </div>
          <div className="bg-orange-50/50 p-8 rounded-[2rem] border border-orange-100">
            <h3 className="text-xl font-black text-orange-900 mb-6 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-orange-600" />
              Areas to Improve
            </h3>
            <ul className="space-y-4 text-orange-800 font-medium">
              <li>• Focus on connecting words for better transitions.</li>
              <li>• Diversify adjectives in descriptive speaking tasks.</li>
              <li>• Refine spelling in highly technical vocabulary.</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsDashboard;

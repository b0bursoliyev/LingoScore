'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Award, BookOpen, Volume2, PenTool, Mic, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-slate-100 py-6 px-8 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-xl">L</div>
          <span className="text-xl font-black text-primary tracking-tighter">LingoScore</span>
        </Link>
        <Link href="/auth" className="bg-primary text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-secondary transition-all">
          Get Started
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-black text-primary mb-6">Our Mission</h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Democratizing professional English assessment through artificial intelligence.
          </p>
        </motion.div>

        <div className="space-y-24">
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-primary mb-6">Why LingoScore?</h2>
              <p className="text-slate-600 leading-relaxed font-medium mb-4">
                Traditional English proficiency exams are expensive, time-consuming, and often inaccessible.
                LingoScore was built to provide anyone, anywhere, with an instant, accurate, and
                CEFR-standardized evaluation of their English skills.
              </p>
              <p className="text-slate-600 leading-relaxed font-medium">
                Our AI analyzes thousands of parameters in your writing and speaking to provide
                feedback that was previously only possible from a human expert.
              </p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <div className="space-y-4">
                {[
                  { icon: Award, text: "CEFR Standardized (A1-C2)" },
                  { icon: Zap, text: "Instant Result Generation" },
                  { icon: Globe, text: "Accessible Globally" },
                  { icon: ShieldCheck, text: "Verified Accuracy" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100">
                    <item.icon className="w-6 h-6 text-primary" />
                    <span className="font-bold text-primary">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-primary mb-12 text-center">Comprehensive Testing</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: BookOpen, title: "Reading", desc: "Complex passages & comprehension" },
                { icon: Volume2, title: "Listening", desc: "Audio processing & inference" },
                { icon: PenTool, title: "Writing", desc: "Lexical & structural analysis" },
                { icon: Mic, title: "Speaking", desc: "Phonetic & fluency metrics" },
              ].map((skill, i) => (
                <div key={i} className="text-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    <skill.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-black text-primary mb-2">{skill.title}</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-tight">{skill.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-32 p-12 bg-primary rounded-[3rem] text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6">Ready to find your level?</h2>
            <p className="text-white/60 font-medium mb-10 max-w-lg mx-auto">
              Join over 10,000 students who have discovered their true English proficiency with LingoScore.
            </p>
            <Link
              href="/auth"
              className="inline-block bg-accent text-white px-10 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl shadow-accent/20"
            >
              Start Now
            </Link>
          </div>
        </div>
      </div>

      <footer className="py-20 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm font-medium">© 2026 LingoScore AI Engine</p>
      </footer>
    </div>
  );
}

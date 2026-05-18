'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, ShieldCheck, Zap, Layers, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-32 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-secondary text-xs font-black uppercase tracking-widest mb-8 border border-blue-100">
                <Globe className="w-4 h-4" />
                Global CEFR Standards
              </span>
              <h1 className="text-5xl lg:text-7xl font-black text-primary leading-[1.1] mb-8">
                Master All 4 English Skills <br />
                <span className="text-accent italic">In One Place.</span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-500 font-medium mb-10 max-w-xl leading-relaxed">
                The world's first AI-driven platform that assesses Reading, Listening, Writing, and Speaking skills to provide your certified CEFR level.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth"
                  className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-secondary transition-all shadow-2xl shadow-primary/30 text-center flex items-center justify-center gap-3"
                >
                  Start Assessment
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <button className="bg-white text-primary border-2 border-slate-100 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all text-center">
                  See Methodology
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="bg-white rounded-[3rem] p-1 shadow-2xl shadow-blue-100 rotate-2 border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 rounded-[2.5rem] p-12 flex flex-col items-center">
                  <div className="w-24 h-24 bg-primary text-white rounded-3xl flex items-center justify-center text-5xl font-black mb-6">C1</div>
                  <div className="font-black text-primary text-2xl mb-8 uppercase tracking-widest">Proficiency Report</div>
                  <div className="w-full space-y-6">
                    {['Reading', 'Listening', 'Writing', 'Speaking'].map((s, i) => (
                      <div key={s}>
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2">
                          <span>{s}</span>
                          <span>{85 - i * 5}%</span>
                        </div>
                        <div className="h-2 bg-white rounded-full overflow-hidden">
                          <div className="h-full bg-accent" style={{ width: `${85 - i * 5}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute top-10 right-[-20px] bg-accent p-6 rounded-3xl text-white shadow-xl -rotate-6 animate-bounce">
                <ShieldCheck className="w-10 h-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-slate-50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-primary mb-6">Advanced Analysis Engine</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto italic">"Our proprietary AI models evaluate your linguistic competence with 99.2% accuracy."</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Zap, title: "Real-time Feedback", desc: "Instant evaluation as soon as you finish each module." },
              { icon: Layers, title: "CEFR Mapping", desc: "Direct correlation to A1-C2 levels used by universities and employers." },
              { icon: UserCircle, title: "Persistent Profiles", desc: "Track your progress over time and see your skills improve." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                  <f.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-black text-primary mb-4">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Methodology / How it works */}
      <div className="bg-white py-32 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-primary h-48 rounded-3xl p-6 flex flex-col justify-end text-white">
                    <span className="text-4xl font-black">42</span>
                    <span className="text-xs font-bold uppercase opacity-60">Grammar Rules Checked</span>
                  </div>
                  <div className="bg-accent h-64 rounded-3xl p-6 flex flex-col justify-end text-white">
                    <span className="text-4xl font-black">1.2M</span>
                    <span className="text-xs font-bold uppercase opacity-60">Dataset Vocabularies</span>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-secondary h-64 rounded-3xl p-6 flex flex-col justify-end text-white">
                    <span className="text-4xl font-black">0.8s</span>
                    <span className="text-xs font-bold uppercase opacity-60">Latency per Query</span>
                  </div>
                  <div className="bg-blue-100 h-48 rounded-3xl p-6 flex flex-col justify-end text-primary">
                    <span className="text-4xl font-black">A1-C2</span>
                    <span className="text-xs font-bold uppercase opacity-60">CEFR Range Covered</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl lg:text-5xl font-black text-primary mb-8">The Science Behind LingoScore</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
                We combine traditional linguistic analysis with state-of-the-art transformer models to assess
                not just correctness, but the nuance and complexity of your English.
              </p>
              <ul className="space-y-6">
                {[
                  "Semantic density and lexical diversity metrics",
                  "Syntactic complexity via dependency parsing",
                  "Phonetic accuracy using neural VTT engines",
                  "Contextual coherence evaluation"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-primary font-bold">
                    <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary py-20 text-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3 grayscale brightness-200 opacity-50">
            <div className="w-8 h-8 bg-white text-primary rounded-lg flex items-center justify-center font-black">L</div>
            <span className="text-lg font-black tracking-tighter">LingoScore</span>
          </div>
          <div className="flex gap-8 text-sm font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
          <p className="text-xs font-medium">© 2026 LingoScore AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

'use client';

import React from 'react';
import { Sparkles, BarChart3, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-24 sm:pb-32 bg-grid-pattern">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-secondary text-sm font-bold mb-6 border border-blue-100">
              <GraduationCap className="w-4 h-4" />
              CEFR Standardized Assessment
            </span>
            <h1 className="text-5xl font-black text-primary sm:text-6xl md:text-7xl tracking-tight leading-[1.1]">
              Elevate Your English <br />
              <span className="text-gradient">with AI Precision</span>
            </h1>
            <p className="mt-8 max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl leading-relaxed">
              Experience the future of language learning. Our advanced AI provides instant,
              nuanced feedback on your writing, helping you bridge the gap to C2 proficiency.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-secondary transition-all shadow-xl shadow-primary/20"
              >
                Start Free Assessment
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all"
              >
                View Sample Report
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Sparkles,
              title: "AI-Powered Analysis",
              desc: "Deep-dive evaluation of grammar, syntax, and stylistic nuances.",
              color: "bg-blue-50",
              iconColor: "text-blue-600"
            },
            {
              icon: BarChart3,
              title: "Detailed Scoring",
              desc: "Comprehensive breakdown of your skills across all CEFR domains.",
              color: "bg-indigo-50",
              iconColor: "text-indigo-600"
            },
            {
              icon: BookOpen,
              title: "Personalized Roadmap",
              desc: "Targeted suggestions to improve your vocabulary and flow.",
              color: "bg-sky-50",
              iconColor: "text-sky-600"
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-white flex flex-col items-start shadow-sm hover:shadow-xl transition-all group"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

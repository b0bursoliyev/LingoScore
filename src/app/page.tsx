import Hero from "@/components/home/Hero";
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50/50">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <GraduationCap className="w-16 h-16 text-accent mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to certify your English?</h2>
            <p className="text-white/70 text-lg md:text-xl mb-12 font-medium">
              Join thousands of students using LingoScore to prepare for CEFR, IELTS, and TOEFL exams with real-time AI feedback.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-3 bg-accent text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-primary transition-all shadow-xl shadow-accent/20 hover:scale-105 active:scale-95"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { Volume2, Play, CheckCircle } from 'lucide-react';

export default function ListeningTest() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();
  const setScore = useTestStore((state) => state.setSkillScore);

  const speak = () => {
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance("Welcome to the listening test. Please listen carefully. The weather in London is quite rainy today, with a high of fifteen degrees Celsius.");
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleFinish = () => {
    const score = selected === 0 ? 90 : 35;
    setScore('listening', score);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <h2 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
          <Volume2 className="w-8 h-8 text-secondary" />
          Listening Module
        </h2>

        <div className="flex flex-col items-center justify-center p-10 bg-slate-50 rounded-2xl mb-8 border-2 border-dashed border-slate-200">
          <button
            onClick={speak}
            disabled={isPlaying}
            className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            <Play className={`w-10 h-10 ${isPlaying ? 'animate-pulse' : ''}`} />
          </button>
          <p className="mt-4 font-bold text-slate-500">{isPlaying ? "Listening to Audio..." : "Click to Play Audio"}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg mb-4">What is the weather like in London according to the audio?</h3>
          {["Rainy", "Sunny", "Snowy", "Windy"].map((opt, i) => (
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
          Submit Listening Module
        </button>
      </div>
    </div>
  );
}

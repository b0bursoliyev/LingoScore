'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { Mic, Square, Loader2 } from 'lucide-react';

export default function SpeakingTest() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const router = useRouter();
  const setScore = useTestStore((state) => state.setSkillScore);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Mock score based on a dummy length
      setScore('speaking', 75);
      router.push('/dashboard');
    } else {
      setIsRecording(true);
      setTranscript("Listening for your voice...");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <h2 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
          <Mic className="w-8 h-8 text-secondary" />
          Speaking Module
        </h2>

        <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
          <h3 className="font-bold text-primary mb-2">Prompt:</h3>
          <p className="text-slate-700 leading-relaxed font-medium">Describe your favorite childhood memory and explain why it is special to you.</p>
        </div>

        <div className="flex flex-col items-center justify-center py-20">
          <button
            onClick={toggleRecording}
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-2xl ${
              isRecording ? 'bg-red-500 animate-pulse scale-110' : 'bg-primary hover:scale-110'
            }`}
          >
            {isRecording ? <Square className="w-12 h-12 text-white" /> : <Mic className="w-12 h-12 text-white" />}
          </button>

          <p className={`mt-8 text-xl font-black ${isRecording ? 'text-red-500' : 'text-primary'}`}>
            {isRecording ? "Recording in progress..." : "Click to start speaking"}
          </p>

          {isRecording && (
            <div className="mt-6 text-slate-500 italic font-medium">
              "{transcript}"
            </div>
          )}
        </div>

        <p className="text-center text-slate-400 text-sm">
          Please ensure your microphone is working and speak clearly in English.
        </p>
      </div>
    </div>
  );
}

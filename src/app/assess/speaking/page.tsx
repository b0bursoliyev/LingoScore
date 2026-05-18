'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { Mic, Square, Loader2 } from 'lucide-react';
import AssessmentContainer from '@/components/assess/AssessmentContainer';

export default function SpeakingTest() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [transcript, setTranscript] = useState('');
  const router = useRouter();
  const setScore = useTestStore((state) => state.setSkillScore);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecorded(true);
      setTranscript("Simulation complete. Your voice has been analyzed.");
    } else {
      setIsRecording(true);
      setTranscript("Listening for your voice...");
    }
  };

  const handleFinish = () => {
    // Mock score based on simulation
    setScore('speaking', 78);
    router.push('/dashboard');
  };

  return (
    <AssessmentContainer
      title="Speaking Assessment"
      icon={<Mic className="w-6 h-6" />}
      progress={isRecording ? 50 : (hasRecorded ? 100 : 0)}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 text-center">
          <h2 className="text-3xl font-black text-primary mb-8 flex items-center justify-center gap-4">
            <Mic className="w-10 h-10 text-secondary" />
            Voice Accuracy Test
          </h2>

          <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
            <h3 className="font-bold text-primary mb-2">Prompt:</h3>
            <p className="text-slate-700 leading-relaxed font-medium text-lg">Describe your favorite childhood memory and explain why it is special to you.</p>
          </div>

          <div className="flex flex-col items-center justify-center py-16">
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

            {(isRecording || hasRecorded) && (
              <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 w-full max-w-lg mx-auto">
                <p className="text-slate-500 italic font-medium leading-relaxed">
                  {transcript}
                </p>
              </div>
            )}
          </div>

          <p className="text-center text-slate-400 text-sm mb-10">
            Please ensure your microphone is working and speak clearly in English.
          </p>

          <button
            onClick={handleFinish}
            disabled={!hasRecorded || isRecording}
            className="w-full bg-primary text-white py-6 rounded-[1.5rem] font-black text-2xl hover:bg-secondary transition-all disabled:opacity-50 flex items-center justify-center gap-4 shadow-xl shadow-primary/20"
          >
            Submit Speaking Assessment
          </button>
        </div>
      </div>
    </AssessmentContainer>
  );
}

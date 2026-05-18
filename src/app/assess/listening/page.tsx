'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { Volume2, Play, CheckCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AssessmentContainer from '@/components/assess/AssessmentContainer';

const QUESTIONS = [
  {
    audioText: "Welcome to the listening test. The weather in London is quite rainy today, with a high of fifteen degrees Celsius.",
    question: "What is the weather like in London?",
    options: ["Rainy", "Sunny", "Snowy", "Windy"],
    correct: 0
  },
  {
    audioText: "The local museum is open from Tuesday to Sunday, from 10 am to 5 pm. It is closed on Mondays.",
    question: "On which day is the museum closed?",
    options: ["Tuesday", "Friday", "Sunday", "Monday"],
    correct: 3
  },
  {
    audioText: "I'd like to order a large pepperoni pizza and two bottles of sparkling water, please. My address is 42 Maple Street.",
    question: "What did the speaker order besides pizza?",
    options: ["Juice", "Sparkling water", "Still water", "Cola"],
    correct: 1
  },
  {
    audioText: "The train for Manchester leaves from platform seven at 3:45 pm. Please ensure you have your tickets ready for inspection.",
    question: "What platform does the train leave from?",
    options: ["Platform 3", "Platform 5", "Platform 7", "Platform 9"],
    correct: 2
  },
  {
    audioText: "To improve your English, we recommend reading for at least thirty minutes every day and watching movies with subtitles.",
    question: "How long should you read every day to improve your English?",
    options: ["10 minutes", "15 minutes", "30 minutes", "60 minutes"],
    correct: 2
  }
];

export default function ListeningTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null));
  const router = useRouter();
  const setScore = useTestStore((state) => state.setSkillScore);

  const speak = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(QUESTIONS[currentIndex].audioText);
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    let correctCount = 0;
    answers.forEach((ans, i) => {
      if (ans === QUESTIONS[i].correct) correctCount++;
    });
    const score = Math.round((correctCount / QUESTIONS.length) * 100);
    setScore('listening', score);
    router.push('/dashboard');
  };

  const q = QUESTIONS[currentIndex];

  return (
    <AssessmentContainer
      title="Listening Assessment"
      icon={<Volume2 className="w-6 h-6" />}
      progress={((currentIndex + 1) / QUESTIONS.length) * 100}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <div className="text-sm font-black text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              Question {currentIndex + 1} of {QUESTIONS.length}
            </div>
          </div>

          <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-3xl mb-12 border-2 border-dashed border-slate-200">
              <button
                onClick={speak}
                disabled={isPlaying}
                className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-all disabled:opacity-50 shadow-2xl shadow-primary/30"
              >
                {isPlaying ? <Loader2 className="w-12 h-12 animate-spin" /> : <Play className="w-12 h-12 ml-1" />}
              </button>
              <p className="mt-6 font-black text-primary/60 uppercase tracking-[0.2em] text-sm">
                {isPlaying ? "Audio playing..." : "Click to hear prompt"}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-black text-xl text-primary mb-6">{q.question}</h3>
              <div className="grid gap-4">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all font-bold flex justify-between items-center ${
                      answers[currentIndex] === i
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-slate-100 hover:border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${
                        answers[currentIndex] === i ? 'bg-primary text-white border-primary' : 'bg-white border-slate-100 text-slate-400'
                      }`}>
                        {i + 1}
                      </span>
                      {opt}
                    </span>
                    {answers[currentIndex] === i && <CheckCircle className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

          <div className="mt-12 flex gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex-1 bg-slate-50 text-slate-400 py-4 rounded-2xl font-black border border-slate-100 hover:bg-slate-100 disabled:opacity-30 transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={answers[currentIndex] === null}
              className="flex-[2] bg-primary text-white py-4 rounded-2xl font-black hover:bg-secondary transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              {currentIndex === QUESTIONS.length - 1 ? 'Finish Assessment' : 'Next Question'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </AssessmentContainer>
  );
}

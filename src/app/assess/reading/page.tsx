'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTestStore } from '@/store/useTestStore';
import { BookOpen, CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AssessmentContainer from '@/components/assess/AssessmentContainer';

const QUESTIONS = [
  {
    passage: "Artificial Intelligence (AI) is transforming the way we interact with technology. From personalized recommendations to self-driving cars, AI systems are becoming increasingly integrated into our daily lives. One of the most significant impacts of AI is in the field of education, where intelligent tutoring systems can provide customized learning experiences for students.",
    question: "What is a significant impact of AI mentioned in the text?",
    options: [
      "Creating social media platforms",
      "Designing self-driving airplanes",
      "Customized learning in education",
      "Improving global weather patterns"
    ],
    correct: 2
  },
  {
    passage: "Climate change is one of the most pressing challenges facing humanity today. The rise in global temperatures is primarily caused by the emission of greenhouse gases from human activities, such as burning fossil fuels and deforestation. Scientists warn that without immediate action, we could face catastrophic consequences, including more frequent and severe weather events, rising sea levels, and loss of biodiversity.",
    question: "According to the passage, what is the primary cause of rising global temperatures?",
    options: [
      "Natural solar cycles",
      "Greenhouse gas emissions from human activities",
      "Volcanic eruptions",
      "Ocean current shifts"
    ],
    correct: 1
  },
  {
    passage: "The Industrial Revolution, which began in the late 18th century, marked a major turning point in history. It transitioned societies from agrarian economies to industrialized ones, characterized by the use of new manufacturing processes and the development of machines. While it led to significant economic growth, it also brought about social challenges, such as poor working conditions and urbanization.",
    question: "What characterized the transition during the Industrial Revolution?",
    options: [
      "A shift to agrarian dominance",
      "The decline of manufacturing",
      "The use of new manufacturing processes and machines",
      "The end of urbanization"
    ],
    correct: 2
  },
  {
    passage: "The human brain is a complex organ that serves as the center of the nervous system. It is responsible for processing sensory information, regulating bodily functions, and enabling cognitive abilities such as thought, memory, and emotion. Despite centuries of study, much about how the brain functions remains a mystery to scientists.",
    question: "What is the human brain NOT mentioned as being responsible for?",
    options: [
      "Processing sensory information",
      "Enabling cognitive abilities",
      "Regulating bodily functions",
      "Producing physical energy for muscles"
    ],
    correct: 3
  },
  {
    passage: "Space exploration has expanded our understanding of the universe and our place within it. Since the launch of the first satellite, humans have sent probes to distant planets, landed on the moon, and established a permanent presence in low Earth orbit. Future missions aim to reach Mars and explore the moons of Jupiter and Saturn, searching for signs of extraterrestrial life.",
    question: "What is one goal of future space missions mentioned in the text?",
    options: [
      "To colonize the moon immediately",
      "To search for signs of extraterrestrial life",
      "To build a wall around Earth",
      "To stop using satellites"
    ],
    correct: 1
  }
];

export default function ReadingTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null));
  const router = useRouter();
  const setScore = useTestStore((state) => state.setSkillScore);

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
    setScore('reading', score);
    router.push('/dashboard');
  };

  const q = QUESTIONS[currentIndex];

  return (
    <AssessmentContainer
      title="Reading Assessment"
      icon={<BookOpen className="w-6 h-6" />}
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-slate-50 p-6 rounded-2xl mb-8 leading-relaxed text-slate-700 italic border border-slate-100">
              "{q.passage}"
            </div>

            <div className="space-y-4">
              <h3 className="font-black text-xl text-primary mb-6">{q.question}</h3>
              <div className="grid gap-4">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all font-bold flex justify-between items-center ${
                      answers[currentIndex] === i
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-slate-100 hover:border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${
                        answers[currentIndex] === i ? 'bg-primary text-white border-primary' : 'bg-white border-slate-100 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + i)}
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

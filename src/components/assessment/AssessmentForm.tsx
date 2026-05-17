'use client';

import React, { useState, useMemo } from 'react';
import { Send, Loader2, AlertCircle } from 'lucide-react';

interface AssessmentFormProps {
  onAnalyze: (text: string) => Promise<void>;
  isLoading: boolean;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const wordCount = useMemo(() => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }, [text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wordCount < 50) {
      setError('Please enter at least 50 words to receive an accurate assessment.');
      return;
    }
    setError(null);
    onAnalyze(text);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Paste your essay or paragraph here (minimum 50 words)..."
          className="w-full min-h-[300px] p-6 text-gray-700 bg-white border-2 border-gray-100 rounded-2xl focus:border-secondary focus:ring-0 outline-none transition-all resize-y shadow-sm"
          disabled={isLoading}
        />
        <div className={`absolute bottom-4 right-6 text-sm font-medium ${wordCount < 50 ? 'text-orange-500' : 'text-green-600'}`}>
          {wordCount} words
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-orange-600 text-sm bg-orange-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={isLoading || wordCount < 50}
          className={`flex items-center gap-2 px-10 py-4 rounded-xl font-bold transition-all shadow-lg ${
            isLoading || wordCount < 50
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
            : 'bg-primary text-white hover:bg-secondary shadow-primary/20'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Text...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Analyze My Level
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AssessmentForm;

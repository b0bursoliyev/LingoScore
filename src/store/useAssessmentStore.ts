import { create } from 'zustand';

interface AnalysisData {
  overallLevel: string;
  overallScore: number;
  metrics: {
    cohesion: number;
    grammar: number;
    vocabulary: number;
    taskResponse: number;
  };
  vocabulary: {
    variety: string;
    complexity: string;
  };
  grammar: {
    errorCount: number;
    errors: Array<{ original: string; suggestion: string; type: string }>;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
  };
  wordCount: number;
}

interface AssessmentState {
  analysisData: AnalysisData | null;
  setAnalysisData: (data: AnalysisData) => void;
  reset: () => void;
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  analysisData: null,
  setAnalysisData: (data) => set({ analysisData: data }),
  reset: () => set({ analysisData: null }),
}));

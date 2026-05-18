import { create } from 'zustand';

interface SkillScores {
  reading: number;
  listening: number;
  writing: number;
  speaking: number;
}

interface TestState {
  currentScores: SkillScores;
  setSkillScore: (skill: keyof SkillScores, score: number) => void;
  resetScores: () => void;
}

export const useTestStore = create<TestState>((set) => ({
  currentScores: { reading: 0, listening: 0, writing: 0, speaking: 0 },
  setSkillScore: (skill, score) => set((state) => ({
    currentScores: { ...state.currentScores, [skill]: score }
  })),
  resetScores: () => set({ currentScores: { reading: 0, listening: 0, writing: 0, speaking: 0 } }),
}));

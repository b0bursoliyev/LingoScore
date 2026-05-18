import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TestResult {
  id: string;
  date: string;
  skills: {
    reading: number;
    listening: number;
    writing: number;
    speaking: number;
  };
  overallLevel: string;
  overallScore: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserState {
  user: User | null;
  history: TestResult[];
  login: (email: string, name: string) => void;
  logout: () => void;
  addResult: (result: TestResult) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      history: [],
      login: (email, name) => set({
        user: { id: Math.random().toString(36).substring(7), email, name }
      }),
      logout: () => set({ user: null, history: [] }),
      addResult: (result) => set((state) => ({
        history: [result, ...state.history]
      })),
    }),
    { name: 'lingoscore-user-storage' }
  )
);

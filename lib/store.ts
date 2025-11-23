import { create } from 'zustand';
import gameData from './game-data.json';

export type Question = {
  id: string;
  value: number;
  question: string;
  answer: string;
};

export type Category = {
  id: string;
  title: string;
  questions: Question[];
};

interface GameState {
  categories: Category[];
  currentQuestion: Question | null;
  answeredQuestions: Set<string>;
  score: number;
  
  selectQuestion: (question: Question) => void;
  closeQuestion: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  categories: gameData,
  currentQuestion: null,
  answeredQuestions: new Set(),
  score: 0,

  selectQuestion: (question) => set((state) => {
    if (state.answeredQuestions.has(question.id)) return state;
    return { currentQuestion: question };
  }),

  closeQuestion: () => set((state) => {
    if (!state.currentQuestion) return state;
    const newAnswered = new Set(state.answeredQuestions);
    newAnswered.add(state.currentQuestion.id);
    return {
      currentQuestion: null,
      answeredQuestions: newAnswered,
      // Optional: Add score logic here if we were tracking correct/incorrect
    };
  }),

  resetGame: () => set({
    currentQuestion: null,
    answeredQuestions: new Set(),
    score: 0,
  }),
}));

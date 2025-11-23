import { create } from 'zustand';

export type Question = {
  id: string;
  categoryId: string;
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

// Mock Data Generation
const CATEGORY_TITLES = ["History", "Science", "Geography", "Pop Culture", "Technology"];
const VALUES = [100, 200, 300, 400, 500];

const generateMockData = (): Category[] => {
  return CATEGORY_TITLES.map((title, catIndex) => {
    const categoryId = `cat-${catIndex}`;
    return {
      id: categoryId,
      title,
      questions: VALUES.map((value, valIndex) => ({
        id: `${categoryId}-q-${valIndex}`,
        categoryId,
        value,
        question: `This is a ${value} point question about ${title}.`,
        answer: `What is the answer to the ${value} point ${title} question?`
      }))
    };
  });
};

const initialCategories = generateMockData();

export const useGameStore = create<GameState>((set) => ({
  categories: initialCategories,
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

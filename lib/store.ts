import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

export type Team = {
  id: string;
  name: string;
  score: number;
};

interface GameSnapshot {
  categories: Category[];
  currentQuestion: Question | null;
  answeredQuestions: string[];
  teams: Team[];
  gameStarted: boolean;
}

interface GameState extends GameSnapshot {
  history: GameSnapshot[];
  
  selectQuestion: (question: Question) => void;
  closeQuestion: (winnerTeamIds?: string[]) => void;
  setTeams: (count: number) => void;
  resetGame: () => void;
  undo: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      categories: gameData,
      currentQuestion: null,
      answeredQuestions: [],
      teams: [],
      gameStarted: false,
      history: [],

      selectQuestion: (question) => set((state) => {
        if (state.answeredQuestions.includes(question.id)) return state;
        
        // Save snapshot
        const snapshot: GameSnapshot = {
          categories: state.categories,
          currentQuestion: state.currentQuestion,
          answeredQuestions: state.answeredQuestions,
          teams: state.teams,
          gameStarted: state.gameStarted,
        };

        return { 
          currentQuestion: question,
          history: [...state.history, snapshot]
        };
      }),

      closeQuestion: (winnerTeamIds) => set((state) => {
        if (!state.currentQuestion) return state;
        
        const newAnswered = [...state.answeredQuestions, state.currentQuestion.id];

        let newTeams = state.teams;
        if (winnerTeamIds && winnerTeamIds.length > 0) {
          newTeams = state.teams.map(team => 
            winnerTeamIds.includes(team.id)
              ? { ...team, score: team.score + (state.currentQuestion?.value || 0) }
              : team
          );
        }

        return {
          currentQuestion: null,
          answeredQuestions: newAnswered,
          teams: newTeams,
          // Do not push to history here. 
          // This ensures that "Undo" takes us back to the state BEFORE the question was opened (Snapshot from selectQuestion).
        };
      }),

      setTeams: (count) => set((state) => {
        // Save snapshot (even for initial setup, though history might be empty usually)
        const snapshot: GameSnapshot = {
          categories: state.categories,
          currentQuestion: state.currentQuestion,
          answeredQuestions: state.answeredQuestions,
          teams: state.teams,
          gameStarted: state.gameStarted,
        };

        return {
          teams: Array.from({ length: count }, (_, i) => ({
            id: `team-${i + 1}`,
            name: `Team ${i + 1}`,
            score: 0,
          })),
          gameStarted: true,
        };
      }),

      resetGame: () => set({
        categories: gameData,
        currentQuestion: null,
        answeredQuestions: [],
        teams: [],
        gameStarted: false,
        history: [],
      }),

      undo: () => set((state) => {
        if (state.history.length === 0) return state;
        
        const previous = state.history[state.history.length - 1];
        const newHistory = state.history.slice(0, -1);
        
        return {
          ...previous,
          history: newHistory,
        };
      }),
    }),
    {
      name: 'jeopardy-storage',
    }
  )
);

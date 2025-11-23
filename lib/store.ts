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

interface GameState {
  categories: Category[];
  currentQuestion: Question | null;
  answeredQuestions: string[];
  teams: Team[];
  gameStarted: boolean;
  
  selectQuestion: (question: Question) => void;
  closeQuestion: (winnerTeamId?: string) => void;
  setTeams: (count: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      categories: gameData,
      currentQuestion: null,
      answeredQuestions: [],
      teams: [],
      gameStarted: false,

      selectQuestion: (question) => set((state) => {
        if (state.answeredQuestions.includes(question.id)) return state;
        return { currentQuestion: question };
      }),

      closeQuestion: (winnerTeamId) => set((state) => {
        if (!state.currentQuestion) return state;
        
        const newAnswered = [...state.answeredQuestions, state.currentQuestion.id];

        let newTeams = state.teams;
        if (winnerTeamId) {
          newTeams = state.teams.map(team => 
            team.id === winnerTeamId 
              ? { ...team, score: team.score + (state.currentQuestion?.value || 0) }
              : team
          );
        }

        return {
          currentQuestion: null,
          answeredQuestions: newAnswered,
          teams: newTeams,
        };
      }),

      setTeams: (count) => set({
        teams: Array.from({ length: count }, (_, i) => ({
          id: `team-${i + 1}`,
          name: `Team ${i + 1}`,
          score: 0,
        })),
        gameStarted: true,
      }),

      resetGame: () => set({
        currentQuestion: null,
        answeredQuestions: [],
        teams: [],
        gameStarted: false,
      }),
    }),
    {
      name: 'jeopardy-storage',
    }
  )
);

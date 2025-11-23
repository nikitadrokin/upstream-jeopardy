'use client';

import { Board } from "@/components/Board";
import { QuestionView } from "@/components/QuestionView";
import { useGameStore } from "@/lib/store";

export default function Home() {
  const { currentQuestion, resetGame, score } = useGameStore();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto py-8">
        <header className="flex justify-between items-center mb-8 px-4">
          <h1 className="text-4xl font-bold text-yellow-400 tracking-wider uppercase">Jeopardy!</h1>
          <div className="flex items-center gap-6">
            <div className="text-2xl font-bold">
              Score: <span className="text-yellow-400">${score}</span>
            </div>
            <button 
              onClick={resetGame}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
            >
              Reset Game
            </button>
          </div>
        </header>

        <Board />
        
        {currentQuestion && <QuestionView />}
      </div>
    </main>
  );
}

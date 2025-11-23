'use client';

import { Board } from "@/components/Board";
import { QuestionView } from "@/components/QuestionView";
import { TeamSetup } from "@/components/TeamSetup";
import { useGameStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { currentQuestion, resetGame, gameStarted } = useGameStore();

  if (!gameStarted) {
    return <TeamSetup />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto py-8">
        <header className="flex justify-between items-center mb-8 px-4">
          <h1 className="text-4xl font-bold text-primary tracking-wider uppercase">Jeopardy!</h1>
          <div className="flex items-center gap-6">
            <Button 
              onClick={resetGame}
              variant="destructive"
              className="font-semibold"
            >
              Reset Game
            </Button>
          </div>
        </header>

        <Board />
        
        {currentQuestion && <QuestionView />}
      </div>
    </main>
  );
}

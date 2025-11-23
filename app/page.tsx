'use client';

import { Board } from "@/components/Board";
import { QuestionView } from "@/components/QuestionView";
import { TeamSetup } from "@/components/TeamSetup";
import { useGameStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { RotateCcw, ZoomOut, Smartphone, Monitor } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { currentQuestion, resetGame, gameStarted, undo, history } = useGameStore();
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  if (!gameStarted) {
    return <TeamSetup />;
  }

  const handleResetConfirm = () => {
    resetGame();
    setIsResetDialogOpen(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Mobile Warning Overlay */}
      <div className="md:hidden fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-8 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary uppercase tracking-widest">
            Upstream Jeopardy
          </h1>
          <p className="text-2xl font-medium text-foreground">
            Your device is too small to play this game.
          </p>
        </div>

        <div className="bg-card/50 p-6 rounded-xl border border-border/50 shadow-sm max-w-xs w-full">
          <p className="text-lg text-muted-foreground mb-4 font-medium">Please try one of the following:</p>
          <ul className="text-left space-y-3 text-foreground/90">
            <li className="flex items-center gap-3">
              <span className="bg-primary/20 p-1.5 rounded-full"><ZoomOut className="w-4 h-4 text-primary" /></span>
              Zoom out your browser
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-primary/20 p-1.5 rounded-full"><Smartphone className="w-4 h-4 text-primary rotate-90" /></span>
              Rotate to landscape
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-primary/20 p-1.5 rounded-full"><Monitor className="w-4 h-4 text-primary" /></span>
              Use a larger screen
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto py-8 hidden md:block">
        <header className="flex justify-between items-center mb-8 px-4">
          <h1 className="text-4xl font-bold text-primary tracking-wider uppercase">Upstream Jeopardy</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={undo}
              disabled={history.length === 0}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Undo
            </Button>

            <Button
              variant="destructive"
              className="font-semibold"
              onClick={() => setIsResetDialogOpen(true)}
            >
              Reset Game
            </Button>
          </div>
        </header>

        <Board />

        {currentQuestion && <QuestionView />}

        {isResetDialogOpen && (
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
            <div className="max-w-4xl w-full text-center space-y-12">
              <div className="space-y-4">
                <h2 className="text-2xl text-secondary font-bold uppercase tracking-widest">
                  Warning
                </h2>
                <p className="text-5xl md:text-7xl font-serif font-bold leading-tight text-foreground">
                  Are you absolutely sure?
                </p>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  This action cannot be undone. This will permanently delete your current game progress and reset all scores.
                </p>
              </div>

              <div className="flex gap-4 justify-center pt-8">
                <Button
                  variant="outline"
                  onClick={() => setIsResetDialogOpen(false)}
                  size="lg"
                  className="px-8 py-8 text-xl font-bold rounded-full shadow-lg min-w-[200px]"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleResetConfirm}
                  size="lg"
                  className="px-8 py-8 text-xl font-bold rounded-full shadow-lg min-w-[200px]"
                >
                  Yes, Reset Game
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

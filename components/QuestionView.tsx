'use client';

import { useGameStore } from '@/lib/store';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

export function QuestionView() {
  const { currentQuestion, closeQuestion, teams, undo } = useGameStore();
  const [showAnswer, setShowAnswer] = useState(false);

  if (!currentQuestion) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
      <div className="max-w-4xl w-full text-center space-y-12 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-16 right-4"
          onClick={undo}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Undo Selection</span>
        </Button>
        <div className="space-y-4">
          <h2 className="text-2xl text-secondary font-bold uppercase tracking-widest">
            For ${currentQuestion.value}
          </h2>
          <p className="text-5xl md:text-7xl font-serif font-bold leading-tight text-foreground">
            {currentQuestion.question}
          </p>
        </div>

        {showAnswer && (
          <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-12">
            <div>
              <Separator className="bg-secondary/30 my-8" />
              <p className="text-3xl md:text-5xl text-secondary font-bold italic">
                {currentQuestion.answer}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-muted-foreground uppercase tracking-widest">Award Points To:</p>
              <div className="flex flex-wrap gap-4 justify-center">
                {teams.map((team) => (
                  <Button
                    key={team.id}
                    onClick={() => {
                      setShowAnswer(false);
                      closeQuestion(team.id);
                    }}
                    className="px-6 py-6 font-bold text-lg shadow-lg min-w-[120px]"
                  >
                    {team.name}
                  </Button>
                ))}
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowAnswer(false);
                    closeQuestion();
                  }}
                  className="px-6 py-6 font-bold text-lg shadow-lg min-w-[120px]"
                >
                  No One
                </Button>
              </div>
            </div>
          </div>
        )}

        {!showAnswer && (
          <div className="flex gap-4 justify-center pt-12">
            <Button
              onClick={() => setShowAnswer(true)}
              size="lg"
              className="px-8 py-8 text-xl font-bold rounded-full shadow-lg"
            >
              Show Answer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

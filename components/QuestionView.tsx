'use client';

import { useGameStore } from '@/lib/store';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { cn } from '@/lib/utils';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';
import { motion, AnimatePresence } from 'motion/react';

export function QuestionView() {
  const { currentQuestion, closeQuestion, teams, undo } = useGameStore();
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  useLockBodyScroll();

  if (!currentQuestion) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300">
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="container w-full text-center space-y-12 pt-16 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0"
            onClick={undo}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Undo Selection</span>
          </Button>
          <motion.div
            layout
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              y: { type: 'spring', stiffness: 100, damping: 20, delay: 0.1 },
              opacity: { duration: 0.3, delay: 0.1 },
              layout: { type: 'spring', stiffness: 250, damping: 30, duration: 0.5 }
            }}
          >
            <h2 className="text-2xl text-secondary font-bold uppercase tracking-widest">
              For ${currentQuestion.value}
            </h2>
            <p className="text-5xl md:text-6xl font-serif font-bold leading-tight text-foreground">
              {currentQuestion.question}
            </p>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {showAnswer && (
              <motion.div
                key="answer"
                className="space-y-12"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{
                  y: { type: 'spring', stiffness: 100, damping: 20 },
                  opacity: { duration: 0.3 },
                  layout: { type: 'spring', stiffness: 300, damping: 30 }
                }}
                layout
              >
                <div>
                  <div className='px-8'><Separator className="bg-secondary/30 my-8" /></div>
                  <div className="space-y-2">
                    <p className="text-sm text-secondary/70 font-bold uppercase tracking-widest">
                      Correct Response
                    </p>
                    <p className="text-3xl md:text-5xl text-secondary font-bold italic">
                      {currentQuestion.answer}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/50 space-y-8 backdrop-blur-sm mt-16">
                  <p className="text-xl text-muted-foreground uppercase tracking-widest font-medium text-center">Select Winners</p>

                  <div className="grid grid-cols-[repeat(auto-fill,minmax(max(120px,calc(25%_-_1rem)),1fr))] max-w-4xl mx-auto gap-4 justify-center">
                    {teams.map((team) => {
                      const isSelected = selectedTeams.includes(team.id);
                      return (
                        <Button
                          key={team.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedTeams(selectedTeams.filter(id => id !== team.id));
                            } else {
                              setSelectedTeams([...selectedTeams, team.id]);
                            }
                          }}
                          variant={isSelected ? "default" : "outline"}
                          className={cn(
                            "px-6 py-6 font-bold text-lg shadow-lg min-w-[120px] transition-all border",
                            isSelected ? "scale-105" : "opacity-70 hover:opacity-100"
                          )}
                        >
                          {team.name}
                        </Button>
                      );
                    })}
                  </div>

                  <div className="flex flex-col items-center gap-4 pt-4">
                    <Button
                      onClick={() => {
                        setShowAnswer(false);
                        closeQuestion(selectedTeams);
                      }}
                      size="lg"
                      className="px-12 py-6 text-xl font-bold rounded-full shadow-xl min-w-[200px]"
                    >
                      Continue
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        if (selectedTeams.length === teams.length) {
                          setSelectedTeams([]);
                        } else {
                          setSelectedTeams(teams.map(t => t.id));
                        }
                      }}
                      className="text-muted-foreground hover:text-foreground rounded-full"
                    >
                      {selectedTeams.length === teams.length ? "Deselect All" : "Select All Teams"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>


          {!showAnswer && (
            <motion.div
              className="flex gap-4 justify-center pt-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: 0.2
              }}
            >
              <Button
                onClick={() => setShowAnswer(true)}
                size="lg"
                className="px-8 py-8 text-xl font-bold rounded-full shadow-lg"
              >
                Show Answer
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

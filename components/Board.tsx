'use client';

import { useGameStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

export function Board() {
  const { categories, selectQuestion, answeredQuestions, teams } = useGameStore();

  // Calculate the maximum number of questions in any category to determine rows
  const maxQuestions = Math.max(...categories.map(c => c.questions.length));

  return (
    <div className="w-full mx-auto p-6 flex flex-col gap-10 select-none">
      <div className="grid grid-cols-5 gap-3">
        {/* Category Headers */}
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-center font-bold text-lg uppercase tracking-widest p-4 [text-wrap:balance] rounded-xl flex items-center justify-center min-h-[100px] shadow-lg border border-primary/30 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {category.title}
          </div>
        ))}

        <div className='px-4 col-span-full'><Separator /></div>

        {/* Questions Grid */}
        {Array.from({ length: maxQuestions }).map((_, rowIndex) => (
          categories.map((category) => {
            const question = category.questions[rowIndex];
            // Handle cases where a category might have fewer questions
            if (!question) {
              return <div key={`empty-${category.id}-${rowIndex}`} className="h-28" />;
            }

            const isAnswered = answeredQuestions.includes(question.id);

            return (
              <button
                key={question.id}
                onClick={() => !isAnswered && selectQuestion(question)}
                disabled={isAnswered}
                className={cn(
                  "group h-28 rounded-xl flex items-center justify-center transition-all duration-100 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4",
                  isAnswered
                    ? "bg-muted/30 border border-muted/50 cursor-default"
                    : "bg-gradient-to-br from-card to-card/80 border border-border/50 hover:border-secondary/50 cursor-pointer shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-1 active:scale-95 backdrop-blur-sm"
                )}
              >
                {!isAnswered && (
                  <>
                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 transition-opacity duration-100 group-hover:opacity-100" />
                    <span className="text-5xl font-bold text-secondary relative z-10 tracking-tight">
                      ${question.value}
                    </span>
                  </>
                )}
              </button>
            );
          })
        ))}
      </div>

      {/* Team Scores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/50">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-100 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="text-muted-foreground font-semibold uppercase tracking-widest text-xs mb-2">
              {team.name}
            </div>
            <div className="text-4xl font-bold text-secondary tracking-tight">
              ${team.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

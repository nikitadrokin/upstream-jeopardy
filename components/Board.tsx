'use client';

import { useGameStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Card, CardContent } from "@/components/ui/card";

export function Board() {
  const { categories, selectQuestion, answeredQuestions, teams } = useGameStore();

  // Calculate the maximum number of questions in any category to determine rows
  const maxQuestions = Math.max(...categories.map(c => c.questions.length));

  return (
    <div className="w-full max-w-7xl mx-auto p-4 flex flex-col gap-8">
      <div className="grid grid-cols-5 gap-4">
        {/* Category Headers */}
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="bg-primary text-primary-foreground border-primary flex items-center justify-center min-h-[100px] shadow-md rounded-none rounded-t-lg"
          >
            <CardContent className="p-4 text-center font-bold text-xl uppercase tracking-wider">
              {category.title}
            </CardContent>
          </Card>
        ))}

        {/* Questions Grid */}
        {Array.from({ length: maxQuestions }).map((_, rowIndex) => (
          categories.map((category) => {
            const question = category.questions[rowIndex];
            // Handle cases where a category might have fewer questions
            if (!question) {
               return <div key={`empty-${category.id}-${rowIndex}`} className="h-32" />;
            }

            const isAnswered = answeredQuestions.includes(question.id);

            return (
              <Card
                key={question.id}
                onClick={() => !isAnswered && selectQuestion(question)}
                className={cn(
                  "h-32 flex items-center justify-center transition-all duration-200 border-2",
                  isAnswered 
                    ? "bg-muted border-muted cursor-default opacity-50" 
                    : "bg-card border-primary/20 hover:bg-accent hover:scale-105 hover:shadow-xl cursor-pointer hover:border-secondary"
                )}
              >
                <CardContent className="p-0 text-4xl font-bold text-secondary">
                  {isAnswered ? "" : `$${question.value}`}
                </CardContent>
              </Card>
            );
          })
        ))}
      </div>

      {/* Team Scores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border">
        {teams.map((team) => (
          <Card key={team.id} className="bg-card/50 border-border">
            <CardContent className="p-4 text-center">
              <div className="text-muted-foreground font-bold uppercase tracking-wider text-sm mb-1">
                {team.name}
              </div>
              <div className="text-3xl font-bold text-secondary">
                ${team.score}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

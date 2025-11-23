'use client';

import { useGameStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function Board() {
  const { categories, selectQuestion, answeredQuestions } = useGameStore();

  // Calculate the maximum number of questions in any category to determine rows
  const maxQuestions = Math.max(...categories.map(c => c.questions.length));

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-5 gap-4">
        {/* Category Headers */}
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="bg-blue-800 text-white p-4 text-center font-bold text-xl uppercase tracking-wider flex items-center justify-center min-h-[100px] rounded-t-lg shadow-md"
          >
            {category.title}
          </div>
        ))}

        {/* Questions Grid */}
        {Array.from({ length: maxQuestions }).map((_, rowIndex) => (
          categories.map((category) => {
            const question = category.questions[rowIndex];
            // Handle cases where a category might have fewer questions
            if (!question) {
               return <div key={`empty-${category.id}-${rowIndex}`} className="h-32" />;
            }

            const isAnswered = answeredQuestions.has(question.id);

            return (
              <button
                key={question.id}
                onClick={() => !isAnswered && selectQuestion(question)}
                disabled={isAnswered}
                className={cn(
                  "h-32 flex items-center justify-center text-4xl font-bold transition-all duration-200 rounded-lg shadow-sm border-2 border-blue-900/20",
                  isAnswered 
                    ? "bg-gray-200 text-gray-400 cursor-default" 
                    : "bg-blue-600 text-yellow-400 hover:bg-blue-500 hover:scale-105 hover:shadow-xl cursor-pointer"
                )}
              >
                {isAnswered ? "" : `$${question.value}`}
              </button>
            );
          })
        ))}
      </div>
    </div>
  );
}

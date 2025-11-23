'use client';

import { useGameStore } from '@/lib/store';
import { useState } from 'react';

export function QuestionView() {
  const { currentQuestion, closeQuestion } = useGameStore();
  const [showAnswer, setShowAnswer] = useState(false);

  if (!currentQuestion) return null;

  return (
    <div className="fixed inset-0 z-50 bg-blue-900 text-white flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
      <div className="max-w-4xl w-full text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl text-yellow-400 font-bold uppercase tracking-widest">
            For ${currentQuestion.value}
          </h2>
          <p className="text-5xl md:text-7xl font-serif font-bold leading-tight">
            {currentQuestion.question}
          </p>
        </div>

        {showAnswer && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="w-full h-px bg-yellow-400/30 my-8" />
            <p className="text-3xl md:text-5xl text-yellow-400 font-bold italic">
              {currentQuestion.answer}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center pt-12">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="px-8 py-4 bg-yellow-400 text-blue-900 text-xl font-bold rounded-full hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-yellow-400/20"
            >
              Show Answer
            </button>
          ) : (
            <button
              onClick={() => {
                setShowAnswer(false);
                closeQuestion();
              }}
              className="px-8 py-4 bg-white text-blue-900 text-xl font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              Back to Board
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

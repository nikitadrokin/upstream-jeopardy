'use client';

import { useGameStore } from '@/lib/store';
import { motion, Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { Trophy, Medal } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface GameOverProps {
    onReset: () => void;
}

const ANIMATION_DELAY = 1.5;

export function GameOver({ onReset }: GameOverProps) {
    const { teams } = useGameStore();
    const [animationKey, setAnimationKey] = useState(0);

    // Sort teams by score descending
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
    const topThree = sortedTeams.slice(0, 3);
    const restTeams = sortedTeams.slice(3);

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
            },
        },
    };

    const podiumVariants: Variants = {
        hidden: { y: 50, opacity: 0, filter: 'blur(2px)' },
        visible: (custom: number) => ({
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                // Stagger: 3rd place (custom=2) at 0s, 2nd place (custom=1) at 2s, 1st place (custom=0) at 4s
                delay: custom === 2 ? 0 : custom === 1 ? ANIMATION_DELAY : ANIMATION_DELAY * 2,
            },
        }),
    };

    const listContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: ANIMATION_DELAY * 3, // Wait for all podium animations to finish (0s + 2s + 2s + animation time)
            },
        },
    };

    const listItemVariants: Variants = {
        hidden: { y: -30, opacity: 0, filter: 'blur(4px)' },
        visible: {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    };

    return (
        <motion.div
            key={animationKey}
            className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-5xl mx-auto p-8 pt-36 select-none"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* <motion.h1
                className="text-6xl font-bold text-primary mt-10 mb-24 uppercase tracking-widest text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                Game Over
            </motion.h1> */}

            {/* Podium */}
            <div className="flex items-end justify-center gap-6 mb-16 w-full h-[420px]">
                {/* 2nd Place */}
                {topThree[1] && (
                    <motion.div
                        className="flex flex-col items-center w-1/3"
                        variants={podiumVariants}
                        custom={1}
                    >
                        <div className="mb-6 text-center">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center shadow-lg">
                                <Medal className="w-9 h-9 text-slate-100" />
                            </div>
                            <div className="text-2xl font-bold text-foreground mb-2">{topThree[1].name}</div>
                            <div className="text-3xl font-bold bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent">${topThree[1].score}</div>
                        </div>
                        <div className="w-full bg-gradient-to-b from-slate-600 to-slate-700 h-[200px] rounded-t-2xl rounded-b-sm flex items-start justify-center pt-6 relative border-t-4 border-slate-400 shadow-[0_-10px_40px_rgba(148,163,184,0.3)]">
                            <div className="text-7xl font-bold bg-gradient-to-b from-slate-200 to-slate-400 bg-clip-text text-transparent">2</div>
                        </div>
                    </motion.div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                    <motion.div
                        className="flex flex-col items-center w-1/3 z-10"
                        variants={podiumVariants}
                        custom={0}
                    >
                        <div className="mb-6 text-center">
                            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.8)]">
                                <Trophy className="w-11 h-11 text-yellow-800" />
                            </div>
                            <div className="text-3xl font-bold text-foreground mb-2">{topThree[0].name}</div>
                            <div className="text-5xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">${topThree[0].score}</div>
                        </div>
                        <div className="w-full bg-gradient-to-b from-yellow-400/40 via-yellow-500/30 to-yellow-600/40 h-[280px] rounded-t-2xl rounded-b-sm flex items-start justify-center pt-6 relative border-t-4 border-yellow-300 shadow-[0_-10px_60px_rgba(250,204,21,0.6)] animate-pulse-subtle">
                            <div className="text-9xl font-bold bg-gradient-to-b from-yellow-200 to-yellow-400 bg-clip-text text-transparent">1</div>
                        </div>
                    </motion.div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                    <motion.div
                        className="flex flex-col items-center w-1/3"
                        variants={podiumVariants}
                        custom={2}
                    >
                        <div className="mb-6 text-center">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg">
                                <Medal className="w-9 h-9 text-amber-100" />
                            </div>
                            <div className="text-2xl font-bold text-foreground mb-2">{topThree[2].name}</div>
                            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">${topThree[2].score}</div>
                        </div>
                        <div className="w-full bg-gradient-to-b from-amber-700 to-amber-900 h-[140px] rounded-t-2xl rounded-b-sm flex items-start justify-center pt-6 relative border-t-4 border-amber-600 shadow-[0_-10px_40px_rgba(217,119,6,0.3)]">
                            <div className="text-7xl font-bold bg-gradient-to-b from-amber-400 to-amber-600 bg-clip-text text-transparent">3</div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Remaining Teams List */}
            {restTeams.length > 0 && (
                <motion.div
                    className="w-full max-w-xl space-y-2"
                    variants={listContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {restTeams.map((team, index) => (
                        <motion.div
                            key={team.id}
                            variants={listItemVariants}
                            className="flex items-center justify-between py-3 px-2"
                        >
                            <div className="flex items-center gap-6">
                                <span className="text-2xl font-bold text-muted-foreground w-8">#{index + 4}</span>
                                <span className="text-xl font-medium text-foreground">{team.name}</span>
                            </div>
                            <span className="text-2xl font-bold text-secondary">${team.score}</span>
                        </motion.div>
                    ))}

                    <motion.div
                        variants={listItemVariants}
                        className="flex gap-4 items-center justify-center mt-18 antialiased"
                    >
                        <Button
                            onClick={() => setAnimationKey(prev => prev + 1)}
                            size="lg"
                            variant="outline"
                            className="text-xl px-8 py-8 rounded-full font-bold shadow-lg hover:scale-105 transition-transform gap-2"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Replay
                        </Button>
                        <Button
                            onClick={onReset}
                            size="lg"
                            className="text-xl px-12 py-8 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            Start New Game
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}

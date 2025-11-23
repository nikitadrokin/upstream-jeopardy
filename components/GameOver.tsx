'use client';

import { useGameStore } from '@/lib/store';
import { motion, Variants } from 'motion/react';
import { cn } from '@/lib/utils';
import { Trophy, Medal } from 'lucide-react';
import { Button } from './ui/button';

interface GameOverProps {
    onReset: () => void;
}

export function GameOver({ onReset }: GameOverProps) {
    const { teams } = useGameStore();

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
                staggerChildren: 0.5,
                delayChildren: 0.5,
            },
        },
    };

    const podiumVariants: Variants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12,
            },
        },
    };

    const listContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 2, // Wait for podium to finish
            },
        },
    };

    const listItemVariants: Variants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-5xl mx-auto p-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1
                className="text-6xl font-bold text-primary mb-16 uppercase tracking-widest text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                Game Over
            </motion.h1>

            {/* Podium */}
            <div className="flex items-end justify-center gap-4 mb-16 w-full h-[400px]">
                {/* 2nd Place */}
                {topThree[1] && (
                    <motion.div
                        className="flex flex-col items-center w-1/3"
                        variants={podiumVariants}
                        custom={1}
                    >
                        <div className="mb-4 text-center">
                            <div className="text-2xl font-bold text-foreground mb-2">{topThree[1].name}</div>
                            <div className="text-3xl font-bold text-secondary">${topThree[1].score}</div>
                        </div>
                        <div className="w-full bg-slate-700 h-[200px] rounded-t-lg flex items-start justify-center pt-4 relative border-t-4 border-slate-500 shadow-2xl">
                            <div className="text-6xl font-bold text-slate-400">2</div>
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
                        <div className="mb-4 text-center">
                            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-foreground mb-2">{topThree[0].name}</div>
                            <div className="text-5xl font-bold text-yellow-400">${topThree[0].score}</div>
                        </div>
                        <div className="w-full bg-yellow-600/20 h-[280px] rounded-t-lg flex items-start justify-center pt-4 relative border-t-4 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.3)]">
                            <div className="text-8xl font-bold text-yellow-400">1</div>
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
                        <div className="mb-4 text-center">
                            <div className="text-2xl font-bold text-foreground mb-2">{topThree[2].name}</div>
                            <div className="text-3xl font-bold text-amber-700">${topThree[2].score}</div>
                        </div>
                        <div className="w-full bg-amber-900/40 h-[140px] rounded-t-lg flex items-start justify-center pt-4 relative border-t-4 border-amber-700 shadow-2xl">
                            <div className="text-6xl font-bold text-amber-700">3</div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Remaining Teams List */}
            {restTeams.length > 0 && (
                <motion.div
                    className="w-full max-w-2xl space-y-4 mb-12"
                    variants={listContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {restTeams.map((team, index) => (
                        <motion.div
                            key={team.id}
                            variants={listItemVariants}
                            className="flex items-center justify-between bg-card/50 p-6 rounded-xl border border-border/50 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-6">
                                <span className="text-2xl font-bold text-muted-foreground w-8">#{index + 4}</span>
                                <span className="text-xl font-medium text-foreground">{team.name}</span>
                            </div>
                            <span className="text-2xl font-bold text-secondary">${team.score}</span>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 }}
            >
                <Button
                    onClick={onReset}
                    size="lg"
                    className="text-xl px-12 py-8 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                >
                    Start New Game
                </Button>
            </motion.div>
        </motion.div>
    );
}

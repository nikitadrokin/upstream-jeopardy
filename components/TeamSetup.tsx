'use client';

import { useGameStore } from '@/lib/store';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function TeamSetup() {
  const { setTeams } = useGameStore();
  const [teamCount, setTeamCount] = useState(2);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-primary uppercase tracking-wider">
            Game Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4 text-center">
            <Label className="text-xl font-medium">
              How many teams?
            </Label>
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTeamCount(Math.max(1, teamCount - 1))}
                className="w-12 h-12 rounded-full text-2xl font-bold"
              >
                -
              </Button>
              <span className="text-4xl font-bold w-16">
                {teamCount}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTeamCount(Math.min(6, teamCount + 1))}
                className="w-12 h-12 rounded-full text-2xl font-bold"
              >
                +
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setTeams(teamCount)}
            className="w-full py-6 text-xl font-bold uppercase tracking-wide"
          >
            Start Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

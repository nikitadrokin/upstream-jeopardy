'use client';

import { useGameStore } from '@/lib/store';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from 'lucide-react';

const MIN_TEAMS = 1;
const MAX_TEAMS = 20;

export function TeamSetup() {
  const { setTeams } = useGameStore();
  const [teamCount, setTeamCount] = useState(2);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-primary uppercase tracking-wider">
            Welcome to Upstream Jeopardy!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-center text-xl font-medium text-muted-foreground">Let's set up the game</p>
          <div className="space-y-4 text-center">
            <Label className="text-xl font-medium inline-block">
              How many teams are playing?
            </Label>
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTeamCount(Math.max(MIN_TEAMS, teamCount - 1))}
                className="w-12 h-12 rounded-full text-2xl font-bold"
              >
                <Minus />
              </Button>
              <span className="text-4xl font-bold w-16">
                {teamCount}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTeamCount(Math.min(MAX_TEAMS, teamCount + 1))}
                className="w-12 h-12 rounded-full text-2xl font-bold"
              >
                <Plus />
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

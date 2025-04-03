"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award } from "lucide-react"

type Player = {
  id: string
  name: string
  score: number
  game: string
}

export function LeaderboardPreview() {
  const [topPlayers, setTopPlayers] = useState<Player[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const mockTopPlayers: Player[] = [
      { id: "p1", name: "Alex Chen", score: 950, game: "AI Mind Reader" },
      { id: "p2", name: "Jamie Smith", score: 920, game: "VR Maze Challenge" },
      { id: "p3", name: "Taylor Kim", score: 890, game: "Code Roulette" },
      { id: "p4", name: "Jordan Lee", score: 850, game: "Cybersecurity Escape Room" },
      { id: "p5", name: "Casey Wong", score: 820, game: "Gesture-Controlled Racing" },
    ]

    setTopPlayers(mockTopPlayers)
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
          Top Players
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPlayers.map((player, index) => (
            <div key={player.id} className="flex items-center justify-between border-b pb-2 last:border-0">
              <div className="flex items-center">
                {index === 0 ? (
                  <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                ) : index === 1 ? (
                  <Medal className="mr-2 h-5 w-5 text-gray-400" />
                ) : index === 2 ? (
                  <Award className="mr-2 h-5 w-5 text-amber-700" />
                ) : (
                  <span className="mr-2 h-5 w-5 flex items-center justify-center font-bold">{index + 1}</span>
                )}
                <div>
                  <p className="font-medium">{player.name}</p>
                  <p className="text-xs text-muted-foreground">{player.game}</p>
                </div>
              </div>
              <span className="font-bold">{player.score}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/leaderboard">View Full Leaderboard</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


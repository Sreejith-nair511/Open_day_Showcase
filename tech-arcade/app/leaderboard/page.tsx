"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trophy, Medal, Award, Search } from "lucide-react"

type Player = {
  id: string
  name: string
  score: number
  game: string
  date: string
}

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [gameFilter, setGameFilter] = useState("all")

  useEffect(() => {
    // In a real app, this would be an API call
    const mockPlayers: Player[] = [
      { id: "p1", name: "Alex Chen", score: 950, game: "AI Mind Reader", date: "2025-04-19" },
      { id: "p2", name: "Jamie Smith", score: 920, game: "VR Maze Challenge", date: "2025-04-19" },
      { id: "p3", name: "Taylor Kim", score: 890, game: "Code Roulette", date: "2025-04-19" },
      { id: "p4", name: "Jordan Lee", score: 850, game: "Cybersecurity Escape Room", date: "2025-04-19" },
      { id: "p5", name: "Casey Wong", score: 820, game: "Gesture-Controlled Racing", date: "2025-04-19" },
      { id: "p6", name: "Riley Johnson", score: 800, game: "AI vs Human Drawing", date: "2025-04-19" },
      { id: "p7", name: "Morgan Brown", score: 780, game: "AR Treasure Hunt", date: "2025-04-19" },
      { id: "p8", name: "Avery Davis", score: 760, game: "AI Mind Reader", date: "2025-04-19" },
      { id: "p9", name: "Quinn Wilson", score: 740, game: "Code Roulette", date: "2025-04-19" },
      { id: "p10", name: "Skyler Garcia", score: 720, game: "VR Maze Challenge", date: "2025-04-19" },
      { id: "p11", name: "Reese Martinez", score: 700, game: "Cybersecurity Escape Room", date: "2025-04-19" },
      { id: "p12", name: "Finley Robinson", score: 680, game: "Gesture-Controlled Racing", date: "2025-04-19" },
      { id: "p13", name: "Drew Thompson", score: 660, game: "AI vs Human Drawing", date: "2025-04-19" },
      { id: "p14", name: "Hayden Lewis", score: 640, game: "AR Treasure Hunt", date: "2025-04-19" },
      { id: "p15", name: "Parker Hall", score: 620, game: "AI Mind Reader", date: "2025-04-19" },
    ]

    setPlayers(mockPlayers)
    setFilteredPlayers(mockPlayers)
  }, [])

  useEffect(() => {
    let result = players

    // Apply search filter
    if (searchQuery) {
      result = result.filter((player) => player.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply game filter
    if (gameFilter !== "all") {
      result = result.filter((player) => player.game === gameFilter)
    }

    setFilteredPlayers(result)
  }, [searchQuery, gameFilter, players])

  const games = [
    "AI Mind Reader",
    "Gesture-Controlled Racing",
    "Cybersecurity Escape Room",
    "AI vs Human Drawing",
    "Code Roulette",
    "VR Maze Challenge",
    "AR Treasure Hunt",
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Leaderboard</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  See who's leading the competition at the Tech Arcade.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-4xl mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                      Top Players
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search players..."
                          className="pl-8 w-[200px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="game-filter" className="sr-only">
                          Filter by game
                        </Label>
                        <Select value={gameFilter} onValueChange={setGameFilter}>
                          <SelectTrigger id="game-filter" className="w-[200px]">
                            <SelectValue placeholder="Filter by game" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Games</SelectItem>
                            {games.map((game) => (
                              <SelectItem key={game} value={game}>
                                {game}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Game</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPlayers.map((player, index) => (
                        <TableRow key={player.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              {index === 0 ? (
                                <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                              ) : index === 1 ? (
                                <Medal className="mr-2 h-5 w-5 text-gray-400" />
                              ) : index === 2 ? (
                                <Award className="mr-2 h-5 w-5 text-amber-700" />
                              ) : (
                                <span className="ml-2 mr-4">{index + 1}</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{player.name}</TableCell>
                          <TableCell>{player.game}</TableCell>
                          <TableCell className="text-right font-bold">{player.score}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {filteredPlayers.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No players found matching your criteria.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


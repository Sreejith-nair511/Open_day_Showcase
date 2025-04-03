"use client"

import { useState, useEffect, useRef } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, Search, Map, QrCode } from "lucide-react"
import { useGameState } from "@/hooks/use-game-state"
import { Progress } from "@/components/ui/progress"
import { useMobile } from "@/hooks/use-mobile"

type Clue = {
  id: string
  title: string
  hint: string
  qrCode: string // In a real app, this would be a unique identifier for the QR code
  found: boolean
}

const initialClues: Clue[] = [
  {
    id: "c1",
    title: "First Clue",
    hint: "Look for a QR code near the entrance",
    qrCode: "TECH-ARCADE-CLUE1",
    found: false,
  },
  {
    id: "c2",
    title: "Second Clue",
    hint: "Find the QR code in the innovation zone",
    qrCode: "TECH-ARCADE-CLUE2",
    found: false,
  },
  {
    id: "c3",
    title: "Third Clue",
    hint: "The QR code is hidden in the gaming area",
    qrCode: "TECH-ARCADE-CLUE3",
    found: false,
  },
  {
    id: "c4",
    title: "Fourth Clue",
    hint: "Look for a QR code near the refreshments",
    qrCode: "TECH-ARCADE-CLUE4",
    found: false,
  },
  {
    id: "c5",
    title: "Final Clue",
    hint: "The last QR code is at the exit",
    qrCode: "TECH-ARCADE-CLUE5",
    found: false,
  },
]

export default function ARTreasureHunt() {
  const [gameState, setGameState] = useState<"ready" | "playing" | "scanning" | "complete">("ready")
  const [clues, setClues] = useState<Clue[]>([])
  const [currentClueIndex, setCurrentClueIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [scanResult, setScanResult] = useState("")
  const [startTime, setStartTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { user, isLoading, saveScore } = useGameState("AR Treasure Hunt")
  const isMobile = useMobile()

  useEffect(() => {
    if (gameState !== "playing") return

    // Start timer
    setStartTime(Date.now())
    timerRef.current = setInterval(() => {
      setCurrentTime(Date.now() - startTime)
    }, 100)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameState])

  const startGame = () => {
    setGameState("playing")
    setClues(JSON.parse(JSON.stringify(initialClues)))
    setCurrentClueIndex(0)
    setScore(0)
    setStartTime(Date.now())
  }

  const startScanning = async () => {
    setGameState("scanning")
    setScanResult("")

    // In a real app, this would use a QR code scanning library
    // For this demo, we'll simulate scanning after a delay
    setTimeout(() => {
      // Simulate finding the current clue
      const simulatedScan = clues[currentClueIndex].qrCode
      handleScanResult(simulatedScan)
    }, 3000)
  }

  const handleScanResult = (result: string) => {
    setScanResult(result)

    // Check if the scanned QR code matches the current clue
    if (result === clues[currentClueIndex].qrCode) {
      // Mark clue as found
      const updatedClues = [...clues]
      updatedClues[currentClueIndex].found = true
      setClues(updatedClues)

      // Add points
      setScore(score + 20)

      // Check if all clues are found
      const allFound = updatedClues.every((clue) => clue.found)
      if (allFound) {
        completeGame()
      } else {
        // Move to next unfound clue
        const nextIndex = updatedClues.findIndex((clue, index) => index > currentClueIndex && !clue.found)
        if (nextIndex !== -1) {
          setCurrentClueIndex(nextIndex)
        }

        // Return to playing state
        setGameState("playing")
      }
    } else {
      // Wrong QR code
      setTimeout(() => {
        setGameState("playing")
      }, 2000)
    }
  }

  const completeGame = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setGameState("complete")

    // Calculate final score based on time and clues found
    const timeBonus = Math.max(0, 300 - Math.floor(currentTime / 1000)) * 2
    const finalScore = score + timeBonus

    saveScore(finalScore)
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex items-center mb-8">
              <Button variant="ghost" size="icon" asChild>
                <a href="/arcade">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to Arcade</span>
                </a>
              </Button>
              <h1 className="text-3xl font-bold ml-2">AR Treasure Hunt</h1>
            </div>

            <div className="mx-auto max-w-md">
              {gameState === "ready" ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Map className="mr-2 h-5 w-5 text-primary" />
                      AR Treasure Hunt
                    </CardTitle>
                    <CardDescription>Scan QR codes to find clues and solve the mystery!</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <p className="mb-6">
                      Follow the hints and scan QR codes to complete the treasure hunt. Find all clues as quickly as
                      possible!
                    </p>
                    <Button onClick={startGame} size="lg">
                      Start Hunt
                    </Button>
                  </CardContent>
                </Card>
              ) : gameState === "playing" ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center">
                          <Map className="mr-2 h-5 w-5 text-primary" />
                          Treasure Hunt
                        </CardTitle>
                        <span className="text-xl font-bold">{formatTime(currentTime)}</span>
                      </div>
                      <Progress value={(clues.filter((c) => c.found).length / clues.length) * 100} className="h-2" />
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex justify-between items-center">
                        <span>Score: {score}</span>
                        <span>
                          Clues: {clues.filter((c) => c.found).length}/{clues.length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{clues[currentClueIndex].title}</CardTitle>
                      <CardDescription>{clues[currentClueIndex].hint}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center py-6">
                      <QrCode className="h-24 w-24 mx-auto mb-4 text-primary" />
                      <p className="mb-4">Find and scan the QR code to reveal the next clue!</p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button onClick={startScanning}>Scan QR Code</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Clues Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {clues.map((clue, index) => (
                          <li key={clue.id} className="flex items-center">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                                clue.found ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700"
                              }`}
                            >
                              {clue.found ? "✓" : index + 1}
                            </div>
                            <span className={clue.found ? "line-through opacity-70" : ""}>{clue.title}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ) : gameState === "scanning" ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Scanning QR Code</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <div className="relative w-64 h-64 mx-auto mb-4 bg-black rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border-2 border-white/50 rounded-lg"></div>
                        <Search className="absolute h-12 w-12 text-white/70 animate-pulse" />
                      </div>
                      {/* In a real app, this would show the camera feed */}
                      <div className="absolute inset-0 bg-black/80"></div>
                    </div>

                    {scanResult && (
                      <div className="mt-4">
                        <p className="font-medium">
                          {scanResult === clues[currentClueIndex].qrCode
                            ? "Clue found! Great job!"
                            : "Wrong QR code. Try again!"}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Treasure Hunt Complete!</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <p className="text-2xl font-bold mb-2">Final Score: {score}</p>
                    <p className="mb-2">Time: {formatTime(currentTime)}</p>
                    <p className="mb-6">You've found all the clues and completed the treasure hunt!</p>
                    <Button onClick={startGame}>Play Again</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


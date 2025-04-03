"use client"

import { useState, useEffect, useRef } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, Timer, Compass, ArrowUp, ArrowDown, ArrowLeftIcon, ArrowRight } from "lucide-react"
import { useGameState } from "@/hooks/use-game-state"
import { useMobile } from "@/hooks/use-mobile"

// Define maze cell types
type CellType = "wall" | "path" | "start" | "end" | "player"

// Simple maze representation
const mazes = [
  // Level 1
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "start", "path", "path", "path", "path", "wall", "path", "path", "wall"],
    ["wall", "wall", "wall", "wall", "path", "path", "wall", "path", "wall", "wall"],
    ["wall", "path", "path", "path", "path", "wall", "wall", "path", "path", "wall"],
    ["wall", "path", "wall", "wall", "wall", "wall", "path", "path", "wall", "wall"],
    ["wall", "path", "path", "path", "path", "path", "path", "wall", "path", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "path", "wall", "wall", "path", "wall"],
    ["wall", "path", "path", "path", "path", "path", "path", "path", "path", "wall"],
    ["wall", "path", "wall", "wall", "wall", "wall", "wall", "wall", "path", "wall"],
    ["wall", "path", "path", "path", "path", "path", "path", "path", "end", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
  // Level 2
  [
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
    ["wall", "start", "path", "path", "path", "wall", "path", "path", "path", "path", "path", "wall"],
    ["wall", "wall", "wall", "wall", "path", "wall", "path", "wall", "wall", "wall", "path", "wall"],
    ["wall", "path", "path", "path", "path", "wall", "path", "path", "path", "wall", "path", "wall"],
    ["wall", "path", "wall", "wall", "wall", "wall", "wall", "wall", "path", "wall", "path", "wall"],
    ["wall", "path", "path", "path", "path", "path", "path", "wall", "path", "wall", "path", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "path", "wall", "path", "path", "path", "wall"],
    ["wall", "path", "path", "path", "path", "path", "path", "wall", "wall", "wall", "path", "wall"],
    ["wall", "path", "wall", "wall", "wall", "wall", "wall", "wall", "path", "wall", "path", "wall"],
    ["wall", "path", "path", "path", "path", "path", "path", "path", "path", "wall", "path", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "path", "end", "wall"],
    ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  ],
]

export default function VRMazeGame() {
  const [gameState, setGameState] = useState<"ready" | "playing" | "complete">("ready")
  const [level, setLevel] = useState(0)
  const [maze, setMaze] = useState<CellType[][]>([])
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 })
  const [startTime, setStartTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [bestTime, setBestTime] = useState<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { user, isLoading, saveScore } = useGameState("VR Maze Challenge")
  const isMobile = useMobile()

  // Device orientation for VR-like control
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 })
  const [usingDeviceOrientation, setUsingDeviceOrientation] = useState(false)

  useEffect(() => {
    if (gameState !== "playing") return

    // Initialize maze and find start position
    const newMaze = JSON.parse(JSON.stringify(mazes[level]))
    let startX = 0
    let startY = 0

    for (let y = 0; y < newMaze.length; y++) {
      for (let x = 0; x < newMaze[y].length; x++) {
        if (newMaze[y][x] === "start") {
          startX = x
          startY = y
          break
        }
      }
    }

    setMaze(newMaze)
    setPlayerPosition({ x: startX, y: startY })
    setStartTime(Date.now())

    // Start timer
    timerRef.current = setInterval(() => {
      setCurrentTime(Date.now() - startTime)
    }, 100)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameState, level])

  // Handle device orientation for VR-like control
  useEffect(() => {
    if (!isMobile || gameState !== "playing" || !usingDeviceOrientation) return

    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      })

      // Move based on device tilt
      if (event.beta && event.gamma) {
        if (event.beta > 20) movePlayer("down")
        else if (event.beta < -20) movePlayer("up")

        if (event.gamma > 20) movePlayer("right")
        else if (event.gamma < -20) movePlayer("left")
      }
    }

    window.addEventListener("deviceorientation", handleOrientation)
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [isMobile, gameState, usingDeviceOrientation])

  // Handle keyboard controls
  useEffect(() => {
    if (gameState !== "playing") return

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          movePlayer("up")
          break
        case "ArrowDown":
          movePlayer("down")
          break
        case "ArrowLeft":
          movePlayer("left")
          break
        case "ArrowRight":
          movePlayer("right")
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [gameState, playerPosition, maze])

  const startGame = () => {
    setGameState("playing")
    setLevel(0)
    requestDeviceOrientation()
  }

  const requestDeviceOrientation = async () => {
    if (
      isMobile &&
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission()
        if (permission === "granted") {
          setUsingDeviceOrientation(true)
        }
      } catch (error) {
        console.error("Error requesting device orientation permission:", error)
      }
    }
  }

  const movePlayer = (direction: "up" | "down" | "left" | "right") => {
    const { x, y } = playerPosition
    let newX = x
    let newY = y

    switch (direction) {
      case "up":
        newY = y - 1
        break
      case "down":
        newY = y + 1
        break
      case "left":
        newX = x - 1
        break
      case "right":
        newX = x + 1
        break
    }

    // Check if the new position is valid
    if (newY >= 0 && newY < maze.length && newX >= 0 && newX < maze[newY].length && maze[newY][newX] !== "wall") {
      // Check if reached the end
      if (maze[newY][newX] === "end") {
        completeLevel()
      } else {
        setPlayerPosition({ x: newX, y: newY })
      }
    }
  }

  const completeLevel = () => {
    if (timerRef.current) clearInterval(timerRef.current)

    const completionTime = Date.now() - startTime

    if (level < mazes.length - 1) {
      // Move to next level
      setLevel(level + 1)
      setStartTime(Date.now())

      // Restart timer
      timerRef.current = setInterval(() => {
        setCurrentTime(Date.now() - startTime)
      }, 100)
    } else {
      // Game complete
      setGameState("complete")

      // Calculate score based on time (lower time = higher score)
      const score = Math.max(0, 10000 - Math.floor(completionTime / 100))
      saveScore(score)

      // Update best time
      if (!bestTime || completionTime < bestTime) {
        setBestTime(completionTime)
      }
    }
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10)
    return `${seconds}.${milliseconds.toString().padStart(2, "0")}s`
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
              <h1 className="text-3xl font-bold ml-2">VR Maze Challenge</h1>
            </div>

            <div className="mx-auto max-w-2xl">
              {gameState === "ready" ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Compass className="mr-2 h-5 w-5 text-primary" />
                      VR Maze Challenge
                    </CardTitle>
                    <CardDescription>
                      Navigate through a 3D maze using {isMobile ? "head movements" : "arrow keys"}!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <p className="mb-6">
                      Find your way through the maze to reach the exit. Complete all levels as quickly as possible!
                    </p>
                    <Button onClick={startGame} size="lg">
                      Start Challenge
                    </Button>
                  </CardContent>
                </Card>
              ) : gameState === "playing" ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center">
                          <Timer className="mr-2 h-5 w-5 text-primary" />
                          Time
                        </CardTitle>
                        <span className="text-xl font-bold">{formatTime(currentTime)}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex justify-between items-center">
                        <span>
                          Level {level + 1} of {mazes.length}
                        </span>
                        {isMobile && (
                          <span className="text-xs">
                            {usingDeviceOrientation ? "Tilt to move" : "Tap arrows to move"}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="aspect-square relative bg-background border rounded-md overflow-hidden">
                        <div
                          className="grid grid-cols-1"
                          style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${maze[0]?.length || 1}, 1fr)`,
                            gridTemplateRows: `repeat(${maze.length || 1}, 1fr)`,
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          {maze.map((row, y) =>
                            row.map((cell, x) => (
                              <div
                                key={`${x}-${y}`}
                                className={`
                                  ${cell === "wall" ? "bg-gray-800" : ""}
                                  ${cell === "start" ? "bg-green-500" : ""}
                                  ${cell === "end" ? "bg-red-500" : ""}
                                  ${cell === "path" ? "bg-gray-200 dark:bg-gray-700" : ""}
                                  ${playerPosition.x === x && playerPosition.y === y ? "bg-blue-500" : ""}
                                  border border-gray-900/10 dark:border-gray-100/10
                                `}
                              />
                            )),
                          )}
                        </div>

                        {/* Player indicator */}
                        <div
                          className="absolute bg-blue-500 rounded-full animate-pulse"
                          style={{
                            width: "10%",
                            height: "10%",
                            top: `${(playerPosition.y / maze.length) * 100}%`,
                            left: `${(playerPosition.x / (maze[0]?.length || 1)) * 100}%`,
                            transform: "translate(-50%, -50%)",
                            transition: "top 0.3s, left 0.3s",
                          }}
                        />
                      </div>

                      {/* Mobile controls */}
                      {isMobile && !usingDeviceOrientation && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <div></div>
                          <Button variant="outline" size="icon" onClick={() => movePlayer("up")}>
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <div></div>

                          <Button variant="outline" size="icon" onClick={() => movePlayer("left")}>
                            <ArrowLeftIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => movePlayer("down")}>
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => movePlayer("right")}>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-muted-foreground">
                        {isMobile
                          ? "Tilt your device or use the on-screen controls to navigate"
                          : "Use arrow keys to navigate through the maze"}
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Maze Complete!</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <p className="text-2xl font-bold mb-2">Your Time: {formatTime(currentTime)}</p>
                    {bestTime && <p className="mb-4 text-muted-foreground">Best Time: {formatTime(bestTime)}</p>}
                    <p className="mb-6">You've successfully navigated through all the mazes!</p>
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


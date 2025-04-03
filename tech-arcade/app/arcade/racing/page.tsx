"use client"

import { useState, useEffect, useRef } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, Clock } from "lucide-react"
import { useGameState } from "@/hooks/use-game-state"
import { useMobile } from "@/hooks/use-mobile"

export default function RacingGame() {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready")
  const [position, setPosition] = useState(50) // 0-100 position of car
  const [time, setTime] = useState(0)
  const [bestTime, setBestTime] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const { user, isLoading, saveScore } = useGameState("Gesture-Controlled Racing")
  const isMobile = useMobile()

  // Handle device motion for mobile
  useEffect(() => {
    if (!isMobile || gameState !== "playing") return

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      if (event.accelerationIncludingGravity) {
        const x = event.accelerationIncludingGravity.x || 0
        // Update car position based on device tilt
        setPosition((prev) => {
          const newPos = prev - x * 0.5
          return Math.max(0, Math.min(100, newPos))
        })
      }
    }

    window.addEventListener("devicemotion", handleDeviceMotion)
    return () => {
      window.removeEventListener("devicemotion", handleDeviceMotion)
    }
  }, [isMobile, gameState])

  // Handle keyboard controls for desktop
  useEffect(() => {
    if (gameState !== "playing") return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setPosition((prev) => Math.max(0, prev - 5))
      } else if (event.key === "ArrowRight") {
        setPosition((prev) => Math.min(100, prev + 5))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [gameState])

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let obstacles: { x: number; y: number; width: number }[] = []
    let distance = 0
    let speed = 5
    startTimeRef.current = Date.now()

    const gameLoop = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw road
      ctx.fillStyle = "#333"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw road markings
      ctx.strokeStyle = "#fff"
      ctx.setLineDash([20, 20])
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, 0)
      ctx.lineTo(canvas.width / 2, canvas.height)
      ctx.stroke()

      // Draw car
      const carWidth = 30
      const carHeight = 50
      const carX = (position / 100) * (canvas.width - carWidth)
      const carY = canvas.height - carHeight - 20

      ctx.fillStyle = "red"
      ctx.fillRect(carX, carY, carWidth, carHeight)

      // Generate obstacles
      if (Math.random() < 0.02) {
        const obstacleWidth = 30 + Math.random() * 30
        const obstacleX = Math.random() * (canvas.width - obstacleWidth)
        obstacles.push({ x: obstacleX, y: -50, width: obstacleWidth })
      }

      // Update and draw obstacles
      ctx.fillStyle = "#666"
      obstacles = obstacles.filter((obstacle) => {
        obstacle.y += speed
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, 30)

        // Check collision
        if (
          obstacle.y + 30 > carY &&
          obstacle.y < carY + carHeight &&
          obstacle.x + obstacle.width > carX &&
          obstacle.x < carX + carWidth
        ) {
          // Game over on collision
          endGame()
          return false
        }

        return obstacle.y < canvas.height
      })

      // Update distance and speed
      distance += speed
      if (distance % 1000 < speed) {
        speed += 0.5
      }

      // Update time
      setTime(Math.floor((Date.now() - startTimeRef.current) / 10))

      // Check if finished (reached 10000 distance)
      if (distance >= 10000) {
        endGame(true)
        return
      }

      animationRef.current = requestAnimationFrame(gameLoop)
    }

    animationRef.current = requestAnimationFrame(gameLoop)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [gameState])

  const startGame = () => {
    setGameState("playing")
    setTime(0)
  }

  const endGame = (finished = false) => {
    cancelAnimationFrame(animationRef.current)
    setGameState("finished")

    const finalTime = time

    if (finished) {
      // Convert time to score (lower time = higher score)
      const score = Math.max(0, 10000 - finalTime)

      // Save score
      saveScore(score)

      // Update best time
      if (!bestTime || finalTime < bestTime) {
        setBestTime(finalTime)
      }
    }
  }

  const resetGame = () => {
    setGameState("ready")
    setPosition(50)
    setTime(0)
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
              <h1 className="text-3xl font-bold ml-2">Gesture-Controlled Racing</h1>
            </div>

            <div className="mx-auto max-w-md">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Race Against Time
                  </CardTitle>
                  <CardDescription>
                    {isMobile
                      ? "Tilt your device left and right to control the car!"
                      : "Use the left and right arrow keys to control the car!"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      width={300}
                      height={400}
                      className="border border-border rounded-md mx-auto"
                    />

                    {gameState === "ready" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
                        <Button onClick={startGame}>Start Race</Button>
                      </div>
                    )}

                    {gameState === "finished" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-md">
                        <Trophy className="h-12 w-12 text-yellow-500 mb-4" />
                        <p className="text-xl font-bold mb-2">Race Complete!</p>
                        <p className="mb-4">Your time: {(time / 100).toFixed(2)}s</p>
                        {bestTime && (
                          <p className="text-sm text-muted-foreground mb-4">
                            Best time: {(bestTime / 100).toFixed(2)}s
                          </p>
                        )}
                        <Button onClick={resetGame}>Race Again</Button>
                      </div>
                    )}
                  </div>

                  {gameState === "playing" && (
                    <div className="mt-4 text-center">
                      <p className="text-2xl font-bold">{(time / 100).toFixed(2)}s</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Avoid obstacles and reach the finish line!</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


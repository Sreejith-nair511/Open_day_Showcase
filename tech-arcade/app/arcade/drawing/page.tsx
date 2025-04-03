"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, Pencil, Eraser } from "lucide-react"
import { useGameState } from "@/hooks/use-game-state"

const CANVAS_SIZE = 280
const LINE_WIDTH = 15

const ITEMS_TO_DRAW = [
  "apple",
  "banana",
  "car",
  "dog",
  "house",
  "tree",
  "flower",
  "sun",
  "moon",
  "star",
  "bicycle",
  "airplane",
  "fish",
  "cat",
  "bird",
]

export default function DrawingGame() {
  const [gameState, setGameState] = useState<"ready" | "drawing" | "guessing" | "result">("ready")
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentItem, setCurrentItem] = useState("")
  const [aiGuess, setAiGuess] = useState("")
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const { user, isLoading, saveScore } = useGameState("AI vs Human Drawing")

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = CANVAS_SIZE
    canvas.height = CANVAS_SIZE

    const context = canvas.getContext("2d")
    if (!context) return

    context.lineCap = "round"
    context.lineJoin = "round"
    context.lineWidth = LINE_WIDTH
    context.strokeStyle = "black"

    // Set white background
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

    contextRef.current = context
  }, [])

  const startGame = () => {
    setGameState("drawing")
    setScore(0)
    setRound(1)
    getRandomItem()
  }

  const getRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * ITEMS_TO_DRAW.length)
    setCurrentItem(ITEMS_TO_DRAW[randomIndex])
    clearCanvas()
  }

  const clearCanvas = () => {
    const context = contextRef.current
    if (!context) return

    context.fillStyle = "white"
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  }

  const startDrawing = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    if (gameState !== "drawing") return

    const { offsetX, offsetY } = getEventCoordinates(nativeEvent)
    const context = contextRef.current
    if (!context) return

    context.beginPath()
    context.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const draw = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || gameState !== "drawing") return

    const { offsetX, offsetY } = getEventCoordinates(nativeEvent)
    const context = contextRef.current
    if (!context) return

    context.lineTo(offsetX, offsetY)
    context.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return

    const context = contextRef.current
    if (!context) return

    context.closePath()
    setIsDrawing(false)
  }

  const getEventCoordinates = (event: any) => {
    if (event.touches) {
      // Touch event
      const canvas = canvasRef.current
      if (!canvas) return { offsetX: 0, offsetY: 0 }

      const rect = canvas.getBoundingClientRect()
      const touch = event.touches[0]

      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      }
    } else {
      // Mouse event
      return {
        offsetX: event.offsetX,
        offsetY: event.offsetY,
      }
    }
  }

  const submitDrawing = () => {
    setGameState("guessing")

    // Simulate AI guessing
    setTimeout(() => {
      // 50% chance of guessing correctly
      const isCorrect = Math.random() < 0.5

      if (isCorrect) {
        setAiGuess(currentItem)
      } else {
        // Pick a random incorrect guess
        let incorrectGuess
        do {
          const randomIndex = Math.floor(Math.random() * ITEMS_TO_DRAW.length)
          incorrectGuess = ITEMS_TO_DRAW[randomIndex]
        } while (incorrectGuess === currentItem)

        setAiGuess(incorrectGuess)
      }

      setGameState("result")
    }, 2000)
  }

  const handleResult = (aiWasCorrect: boolean) => {
    // If AI was wrong, player gets points
    if (!aiWasCorrect) {
      setScore(score + 100)
    }

    if (round < 5) {
      // Next round
      setRound(round + 1)
      getRandomItem()
      setGameState("drawing")
    } else {
      // Game over
      saveScore(score)
      setGameState("ready")
    }
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
              <h1 className="text-3xl font-bold ml-2">AI vs Human Drawing</h1>
            </div>

            <div className="mx-auto max-w-md">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Pencil className="mr-2 h-5 w-5 text-primary" />
                    Draw and Fool the AI
                  </CardTitle>
                  <CardDescription>Draw the given item and see if the AI can guess what it is!</CardDescription>
                </CardHeader>
                <CardContent>
                  {gameState === "ready" ? (
                    <div className="text-center py-8">
                      <p className="mb-4">
                        Draw 5 different items and try to fool the AI. If the AI guesses wrong, you get points!
                      </p>
                      <Button onClick={startGame}>Start Game</Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-sm font-medium">Round: {round}/5</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Score: {score}</span>
                        </div>
                      </div>

                      {gameState === "drawing" && <p className="text-center mb-4 font-bold">Draw a: {currentItem}</p>}

                      <div className="relative border border-border rounded-md overflow-hidden">
                        <canvas
                          ref={canvasRef}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                          className="touch-none bg-white"
                        />

                        {gameState === "guessing" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                            <div className="text-center">
                              <p className="text-lg font-bold mb-2">AI is thinking...</p>
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                            </div>
                          </div>
                        )}

                        {gameState === "result" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                            <div className="text-center">
                              <p className="text-lg font-bold mb-2">AI's guess:</p>
                              <p className="text-2xl font-bold mb-4">{aiGuess}</p>
                              <p className="mb-4">Was the AI correct?</p>
                              <div className="flex justify-center space-x-4">
                                <Button onClick={() => handleResult(true)}>Yes</Button>
                                <Button onClick={() => handleResult(false)}>No</Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
                {gameState === "drawing" && (
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={clearCanvas}>
                      <Eraser className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                    <Button onClick={submitDrawing}>Submit Drawing</Button>
                  </CardFooter>
                )}
              </Card>

              {gameState === "ready" && score > 0 && (
                <div className="mt-4">
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="pt-6">
                      <Trophy className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-lg font-medium text-center">Final Score: {score}</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


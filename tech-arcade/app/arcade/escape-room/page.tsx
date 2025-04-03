"use client"

import { useState, useEffect, useRef } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, Timer, Lock } from "lucide-react"
import { useGameState } from "@/hooks/use-game-state"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Challenge = {
  id: string
  title: string
  description: string
  hint: string
  solution: string
  type: "decrypt" | "password" | "code"
  points: number
}

const challenges: Challenge[] = [
  {
    id: "c1",
    title: "Encrypted Message",
    description: "Decrypt this Caesar cipher: DWWDFN DW GDZQ",
    hint: "The key is 3 positions back in the alphabet",
    solution: "ATTACK AT DAWN",
    type: "decrypt",
    points: 10,
  },
  {
    id: "c2",
    title: "Password Crack",
    description:
      "Find the password. Hint: It's a 4-digit number where all digits add up to 14, and the first digit is twice the last.",
    hint: "Try 8xx2",
    solution: "8222",
    type: "password",
    points: 15,
  },
  {
    id: "c3",
    title: "Security Code",
    description:
      "The code is hidden in this message: 'The 3rd letter of SECURITY, followed by the 1st letter of NETWORK, the 5th letter of PASSWORD, and the 2nd letter of ENCRYPTION'",
    hint: "Extract the specified letters from each word",
    solution: "CNWO",
    type: "code",
    points: 20,
  },
  {
    id: "c4",
    title: "Binary Decode",
    description: "Convert this binary to ASCII: 01101000 01100001 01100011 01101011 01100101 01110010",
    hint: "Each 8-bit sequence represents one ASCII character",
    solution: "HACKER",
    type: "decrypt",
    points: 15,
  },
  {
    id: "c5",
    title: "Final Lock",
    description: "Combine the first letter of each previous solution to form the master key",
    hint: "Take the first letter of each answer you've found",
    solution: "ACNH",
    type: "code",
    points: 30,
  },
]

export default function EscapeRoomGame() {
  const [gameState, setGameState] = useState<"ready" | "playing" | "complete">("ready")
  const [currentTime, setCurrentTime] = useState(300) // 5 minutes in seconds
  const [score, setScore] = useState(0)
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showHint, setShowHint] = useState<Record<string, boolean>>({})
  const [feedback, setFeedback] = useState<Record<string, "correct" | "incorrect" | null>>({})
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { user, isLoading, saveScore } = useGameState("Cybersecurity Escape Room")

  useEffect(() => {
    if (gameState !== "playing") return

    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameState])

  const startGame = () => {
    setGameState("playing")
    setCurrentTime(300)
    setScore(0)
    setCurrentChallengeIndex(0)
    setAnswers({})
    setShowHint({})
    setFeedback({})
  }

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setGameState("complete")
    saveScore(score)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleAnswerChange = (challengeId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [challengeId]: value.toUpperCase(),
    }))
  }

  const checkAnswer = (challenge: Challenge) => {
    const userAnswer = answers[challenge.id] || ""
    const isCorrect = userAnswer.trim().toUpperCase() === challenge.solution.toUpperCase()

    setFeedback((prev) => ({
      ...prev,
      [challenge.id]: isCorrect ? "correct" : "incorrect",
    }))

    if (isCorrect) {
      setScore((prev) => prev + challenge.points)

      // Move to next challenge if available
      if (currentChallengeIndex < challenges.length - 1) {
        setTimeout(() => {
          setCurrentChallengeIndex((prev) => prev + 1)
        }, 1000)
      } else {
        // All challenges completed
        setTimeout(() => {
          endGame()
        }, 1000)
      }
    }
  }

  const toggleHint = (challengeId: string) => {
    setShowHint((prev) => ({
      ...prev,
      [challengeId]: !prev[challengeId],
    }))
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
              <h1 className="text-3xl font-bold ml-2">Cybersecurity Escape Room</h1>
            </div>

            <div className="mx-auto max-w-2xl">
              {gameState === "ready" ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="mr-2 h-5 w-5 text-primary" />
                      Cybersecurity Challenge
                    </CardTitle>
                    <CardDescription>
                      Solve cryptographic puzzles and security challenges to escape before time runs out!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <p className="mb-6">
                      You have 5 minutes to solve a series of cybersecurity challenges. Each correct answer gives you
                      points and brings you closer to escape!
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
                          Time Remaining
                        </CardTitle>
                        <span className="text-xl font-bold">{formatTime(currentTime)}</span>
                      </div>
                      <Progress value={(currentTime / 300) * 100} className="h-2" />
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex justify-between items-center">
                        <span>Score: {score}</span>
                        <span>
                          Challenge {currentChallengeIndex + 1} of {challenges.length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{challenges[currentChallengeIndex].title}</CardTitle>
                      <CardDescription>{challenges[currentChallengeIndex].description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`answer-${challenges[currentChallengeIndex].id}`}>Your Answer</Label>
                          <Input
                            id={`answer-${challenges[currentChallengeIndex].id}`}
                            value={answers[challenges[currentChallengeIndex].id] || ""}
                            onChange={(e) => handleAnswerChange(challenges[currentChallengeIndex].id, e.target.value)}
                            className={
                              feedback[challenges[currentChallengeIndex].id] === "correct"
                                ? "border-green-500"
                                : feedback[challenges[currentChallengeIndex].id] === "incorrect"
                                  ? "border-red-500"
                                  : ""
                            }
                          />
                        </div>

                        {feedback[challenges[currentChallengeIndex].id] === "incorrect" && (
                          <p className="text-red-500 text-sm">Incorrect answer. Try again!</p>
                        )}

                        {feedback[challenges[currentChallengeIndex].id] === "correct" && (
                          <p className="text-green-500 text-sm">Correct! Moving to next challenge...</p>
                        )}

                        {showHint[challenges[currentChallengeIndex].id] && (
                          <div className="bg-muted p-3 rounded-md text-sm">
                            <p className="font-medium">Hint:</p>
                            <p>{challenges[currentChallengeIndex].hint}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => toggleHint(challenges[currentChallengeIndex].id)}>
                        {showHint[challenges[currentChallengeIndex].id] ? "Hide Hint" : "Show Hint"}
                      </Button>
                      <Button
                        onClick={() => checkAnswer(challenges[currentChallengeIndex])}
                        disabled={!answers[challenges[currentChallengeIndex].id]}
                      >
                        Submit Answer
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Challenge Complete!</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <p className="text-2xl font-bold mb-2">Your Score: {score}</p>
                    <p className="mb-6">
                      {score >= 70
                        ? "Excellent work! You've mastered the cybersecurity challenges!"
                        : score >= 40
                          ? "Good job! You've shown solid cybersecurity skills."
                          : "You've completed the challenge. Keep practicing your cybersecurity skills!"}
                    </p>
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


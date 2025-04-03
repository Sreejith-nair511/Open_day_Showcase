"use client"

import { useState, useEffect, useRef } from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, Timer, Code, RefreshCw } from "lucide-react"
import { useGameState } from "@/hooks/use-game-state"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

type CodingChallenge = {
  id: string
  title: string
  description: string
  starterCode: string
  testCases: Array<{
    input: string
    expectedOutput: string
  }>
  difficulty: "easy" | "medium" | "hard"
  points: number
}

const challenges: CodingChallenge[] = [
  {
    id: "c1",
    title: "Sum of Two Numbers",
    description: "Write a function that returns the sum of two numbers.",
    starterCode: "function sum(a, b) {\n  // Your code here\n}",
    testCases: [
      { input: "sum(1, 2)", expectedOutput: "3" },
      { input: "sum(5, 7)", expectedOutput: "12" },
    ],
    difficulty: "easy",
    points: 10,
  },
  {
    id: "c2",
    title: "Reverse a String",
    description: "Write a function that reverses a string.",
    starterCode: "function reverseString(str) {\n  // Your code here\n}",
    testCases: [
      { input: "reverseString('hello')", expectedOutput: "'olleh'" },
      { input: "reverseString('world')", expectedOutput: "'dlrow'" },
    ],
    difficulty: "easy",
    points: 10,
  },
  {
    id: "c3",
    title: "Find the Largest Number",
    description: "Write a function that finds the largest number in an array.",
    starterCode: "function findLargest(arr) {\n  // Your code here\n}",
    testCases: [
      { input: "findLargest([1, 5, 3, 9, 2])", expectedOutput: "9" },
      { input: "findLargest([10, 20, 5, 15])", expectedOutput: "20" },
    ],
    difficulty: "medium",
    points: 15,
  },
  {
    id: "c4",
    title: "Count Vowels",
    description: "Write a function that counts the number of vowels in a string.",
    starterCode: "function countVowels(str) {\n  // Your code here\n}",
    testCases: [
      { input: "countVowels('hello')", expectedOutput: "2" },
      { input: "countVowels('programming')", expectedOutput: "3" },
    ],
    difficulty: "medium",
    points: 15,
  },
  {
    id: "c5",
    title: "Check Palindrome",
    description: "Write a function that checks if a string is a palindrome (reads the same forward and backward).",
    starterCode: "function isPalindrome(str) {\n  // Your code here\n}",
    testCases: [
      { input: "isPalindrome('racecar')", expectedOutput: "true" },
      { input: "isPalindrome('hello')", expectedOutput: "false" },
    ],
    difficulty: "medium",
    points: 20,
  },
]

export default function CodeRouletteGame() {
  const [gameState, setGameState] = useState<"ready" | "spinning" | "coding" | "checking" | "result" | "complete">(
    "ready",
  )
  const [currentChallenge, setCurrentChallenge] = useState<CodingChallenge | null>(null)
  const [userCode, setUserCode] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [testResults, setTestResults] = useState<
    Array<{ passed: boolean; input: string; expected: string; actual: string }>
  >([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { user, isLoading, saveScore } = useGameState("Code Roulette")

  useEffect(() => {
    if (gameState !== "coding") return

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          checkCode()
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
    setGameState("ready")
    setScore(0)
    setRound(1)
    spinWheel()
  }

  const spinWheel = () => {
    setGameState("spinning")

    // Simulate wheel spinning
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * challenges.length)
      setCurrentChallenge(challenges[randomIndex])
      setUserCode(challenges[randomIndex].starterCode)
      setTimeLeft(60)
      setGameState("coding")
    }, 1500)
  }

  const checkCode = () => {
    if (!currentChallenge) return

    if (timerRef.current) clearInterval(timerRef.current)
    setGameState("checking")

    try {
      // Create a safe evaluation environment
      const safeEval = (code: string, input: string) => {
        try {
          // This is a simplified version - in a real app, you'd want a more secure sandbox
          const fn = new Function(`
            ${code}
            return ${input};
          `)
          return String(fn())
        } catch (error) {
          return `Error: ${(error as Error).message}`
        }
      }

      const results = currentChallenge.testCases.map((testCase) => {
        const actual = safeEval(userCode, testCase.input)
        const expected = testCase.expectedOutput
        return {
          passed: actual === expected,
          input: testCase.input,
          expected,
          actual,
        }
      })

      setTestResults(results)

      // Calculate points
      const allPassed = results.every((r) => r.passed)
      if (allPassed) {
        setScore((prev) => prev + currentChallenge.points)
      }

      setGameState("result")
    } catch (error) {
      setTestResults([
        {
          passed: false,
          input: "Error evaluating code",
          expected: "Valid code",
          actual: `Error: ${(error as Error).message}`,
        },
      ])
      setGameState("result")
    }
  }

  const nextRound = () => {
    if (round >= 5) {
      // Game complete after 5 rounds
      setGameState("complete")
      saveScore(score)
    } else {
      setRound((prev) => prev + 1)
      spinWheel()
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
              <h1 className="text-3xl font-bold ml-2">Code Roulette</h1>
            </div>

            <div className="mx-auto max-w-3xl">
              {gameState === "ready" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="mr-2 h-5 w-5 text-primary" />
                      Code Roulette Challenge
                    </CardTitle>
                    <CardDescription>
                      Spin the wheel and solve random coding challenges against the clock!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <p className="mb-6">
                      You'll have 60 seconds to solve each coding challenge. Complete 5 rounds to finish the game!
                    </p>
                    <Button onClick={startGame} size="lg">
                      Spin the Wheel
                    </Button>
                  </CardContent>
                </Card>
              )}

              {gameState === "spinning" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Spinning the Wheel...</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                    <RefreshCw className="h-16 w-16 text-primary mx-auto animate-spin" />
                    <p className="mt-4">Round {round} of 5</p>
                  </CardContent>
                </Card>
              )}

              {(gameState === "coding" || gameState === "checking") && currentChallenge && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center">
                          <Timer className="mr-2 h-5 w-5 text-primary" />
                          Time Remaining
                        </CardTitle>
                        <span className="text-xl font-bold">{timeLeft}s</span>
                      </div>
                      <Progress value={(timeLeft / 60) * 100} className="h-2" />
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex justify-between items-center">
                        <span>Score: {score}</span>
                        <span>Round {round} of 5</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{currentChallenge.title}</CardTitle>
                      <CardDescription>{currentChallenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Test Cases:</p>
                        <ul className="text-sm space-y-1 list-disc pl-5">
                          {currentChallenge.testCases.map((testCase, index) => (
                            <li key={index}>
                              Input: <code className="bg-muted px-1 py-0.5 rounded">{testCase.input}</code>, Expected:{" "}
                              <code className="bg-muted px-1 py-0.5 rounded">{testCase.expectedOutput}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4">
                        <Textarea
                          value={userCode}
                          onChange={(e) => setUserCode(e.target.value)}
                          className="font-mono h-48"
                          disabled={gameState === "checking"}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={checkCode} disabled={gameState === "checking"}>
                        {gameState === "checking" ? "Checking..." : "Submit Code"}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}

              {gameState === "result" && currentChallenge && (
                <Card>
                  <CardHeader>
                    <CardTitle>Challenge Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="font-medium">{currentChallenge.title}</p>

                      <div className="space-y-3">
                        {testResults.map((result, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-md ${
                              result.passed ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
                            }`}
                          >
                            <p className="font-medium">
                              Test Case {index + 1}: {result.passed ? "Passed" : "Failed"}
                            </p>
                            <p className="text-sm">
                              Input: <code>{result.input}</code>
                            </p>
                            <p className="text-sm">
                              Expected: <code>{result.expected}</code>
                            </p>
                            <p className="text-sm">
                              Actual: <code>{result.actual}</code>
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t">
                        <p className="font-medium">
                          {testResults.every((r) => r.passed)
                            ? `Great job! You earned ${currentChallenge.points} points.`
                            : "Some tests failed. Keep practicing!"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={nextRound}>{round >= 5 ? "Finish Game" : "Next Challenge"}</Button>
                  </CardFooter>
                </Card>
              )}

              {gameState === "complete" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Game Complete!</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <p className="text-2xl font-bold mb-2">Final Score: {score}</p>
                    <p className="mb-6">
                      {score >= 60
                        ? "Excellent work! You're a coding master!"
                        : score >= 30
                          ? "Good job! You've shown solid coding skills."
                          : "You've completed the challenge. Keep practicing your coding skills!"}
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


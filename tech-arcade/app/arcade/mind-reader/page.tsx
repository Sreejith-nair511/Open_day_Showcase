"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Brain, ArrowLeft, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Question = {
  id: number
  text: string
  options: string[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "Is your thought a living thing?",
    options: ["Yes", "No", "Partially"],
  },
  {
    id: 2,
    text: "Is it larger than a microwave oven?",
    options: ["Yes", "No", "About the same size"],
  },
  {
    id: 3,
    text: "Would you find it in a typical household?",
    options: ["Yes", "No", "Sometimes"],
  },
  {
    id: 4,
    text: "Is it used for entertainment?",
    options: ["Yes", "No", "It can be"],
  },
  {
    id: 5,
    text: "Does it use electricity?",
    options: ["Yes", "No", "Sometimes"],
  },
]

const possibleThoughts = [
  "Cat",
  "Dog",
  "Television",
  "Smartphone",
  "Book",
  "Plant",
  "Bicycle",
  "Laptop",
  "Chair",
  "Refrigerator",
]

export default function MindReaderGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [aiConfidence, setAiConfidence] = useState(0)
  const [prediction, setPrediction] = useState("")
  const [gameState, setGameState] = useState<"playing" | "guessing" | "result">("playing")
  const [score, setScore] = useState(0)
  const [userThought, setUserThought] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("arcade-user")
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to play games",
        variant: "destructive",
      })
      router.push("/register")
    }
  }, [router, toast])

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    // Update AI confidence based on answers
    const newConfidence = Math.min(aiConfidence + Math.random() * 20, 100)
    setAiConfidence(newConfidence)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // AI is making a prediction
      setGameState("guessing")

      // Simulate AI thinking
      setTimeout(() => {
        // Pick a random thought from the list
        const randomThought = possibleThoughts[Math.floor(Math.random() * possibleThoughts.length)]
        setPrediction(randomThought)
        setGameState("result")
      }, 2000)
    }
  }

  const handleResultSubmit = (isCorrect: boolean) => {
    // Calculate score based on AI confidence and correctness
    const newScore = isCorrect ? 0 : Math.round(aiConfidence)
    setScore(newScore)

    // In a real app, this would be an API call to save the score
    const user = JSON.parse(localStorage.getItem("arcade-user") || "{}")

    toast({
      title: isCorrect ? "AI guessed correctly!" : "AI was wrong!",
      description: isCorrect
        ? "The AI read your mind! You scored 0 points."
        : `You fooled the AI! You scored ${newScore} points.`,
    })

    // Reset game after a short delay
    setTimeout(() => {
      setCurrentQuestion(0)
      setAnswers([])
      setAiConfidence(0)
      setPrediction("")
      setGameState("playing")
      setUserThought("")
    }, 3000)
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
              <h1 className="text-3xl font-bold ml-2">AI Mind Reader</h1>
            </div>

            <div className="mx-auto max-w-md">
              {gameState === "playing" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="mr-2 h-5 w-5 text-primary" />
                      Think of an object...
                    </CardTitle>
                    <CardDescription>
                      Think of an object and answer the questions. The AI will try to guess what you're thinking!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {currentQuestion === 0 && (
                      <div className="mb-4">
                        <Label htmlFor="user-thought">What are you thinking of? (Only you can see this)</Label>
                        <div className="flex items-center mt-2">
                          <input
                            id="user-thought"
                            value={userThought}
                            onChange={(e) => setUserThought(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter what you're thinking of"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className="text-sm font-medium">AI Confidence: {Math.round(aiConfidence)}%</span>
                      </div>
                      <Progress value={aiConfidence} className="h-2" />

                      <div className="mt-4">
                        <h3 className="text-lg font-medium mb-2">{questions[currentQuestion].text}</h3>
                        <RadioGroup className="space-y-2">
                          {questions[currentQuestion].options.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={option} onClick={() => handleAnswer(option)} />
                              <Label htmlFor={option}>{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {gameState === "guessing" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">AI is thinking...</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center py-8">
                    <div className="animate-pulse flex flex-col items-center">
                      <Brain className="h-16 w-16 text-primary mb-4" />
                      <Progress value={aiConfidence} className="w-64 h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {gameState === "result" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">AI's Prediction</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <div className="mb-6">
                      <p className="text-lg mb-2">I think you're thinking of a:</p>
                      <p className="text-4xl font-bold text-primary">{prediction}</p>
                    </div>
                    <p className="mb-4">Is the AI correct?</p>
                  </CardContent>
                  <CardFooter className="flex justify-center space-x-4">
                    <Button onClick={() => handleResultSubmit(true)}>Yes, that's right!</Button>
                    <Button variant="outline" onClick={() => handleResultSubmit(false)}>
                      No, I was thinking of {userThought || "something else"}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {score > 0 && (
                <div className="mt-4 text-center">
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="pt-6">
                      <Trophy className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-lg font-medium">You scored {score} points!</p>
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


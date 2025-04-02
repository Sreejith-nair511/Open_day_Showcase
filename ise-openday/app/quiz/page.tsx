"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Trophy, Clock, Award, CheckCircle, XCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    question: "Which technology is used for creating decentralized applications?",
    options: ["Blockchain", "Machine Learning", "Virtual Reality", "Cloud Computing"],
    correctAnswer: "Blockchain",
  },
  {
    id: 2,
    question: "What does IoT stand for?",
    options: ["Internet of Technology", "Internet of Things", "Integration of Technology", "Intelligent Online Tools"],
    correctAnswer: "Internet of Things",
  },
  {
    id: 3,
    question: "Which of the following is NOT a machine learning algorithm?",
    options: ["Random Forest", "K-Means Clustering", "HTML5", "Support Vector Machine"],
    correctAnswer: "HTML5",
  },
  {
    id: 4,
    question: "What is the primary purpose of a neural network?",
    options: [
      "To create virtual reality environments",
      "To process and learn from data",
      "To secure blockchain transactions",
      "To connect IoT devices",
    ],
    correctAnswer: "To process and learn from data",
  },
  {
    id: 5,
    question: "Which programming language is commonly used for data science?",
    options: ["Java", "C#", "Python", "Ruby"],
    correctAnswer: "Python",
  },
  {
    id: 6,
    question: "What does AR stand for in technology?",
    options: ["Artificial Reality", "Augmented Reality", "Advanced Rendering", "Automated Response"],
    correctAnswer: "Augmented Reality",
  },
  {
    id: 7,
    question: "Which of the following is a popular framework for building web applications?",
    options: ["TensorFlow", "React", "Arduino", "Unity"],
    correctAnswer: "React",
  },
  {
    id: 8,
    question: "What is the main advantage of cloud computing?",
    options: [
      "Increased security risks",
      "Limited scalability",
      "Reduced need for physical infrastructure",
      "Slower processing speeds",
    ],
    correctAnswer: "Reduced need for physical infrastructure",
  },
  {
    id: 9,
    question: "Which technology is used for creating immersive 3D environments?",
    options: ["Virtual Reality", "Blockchain", "Big Data", "Quantum Computing"],
    correctAnswer: "Virtual Reality",
  },
  {
    id: 10,
    question: "What is the purpose of a smart contract in blockchain?",
    options: [
      "To mine cryptocurrency",
      "To create digital art",
      "To automate agreements without intermediaries",
      "To secure wireless networks",
    ],
    correctAnswer: "To automate agreements without intermediaries",
  },
]

// Leaderboard data
const leaderboardData = [
  { name: "Aditya Sharma", score: 10, time: "2:15" },
  { name: "Priya Patel", score: 9, time: "2:30" },
  { name: "Rahul Verma", score: 9, time: "2:45" },
  { name: "Neha Singh", score: 8, time: "3:10" },
  { name: "Vikram Reddy", score: 8, time: "3:25" },
  { name: "Divya Sharma", score: 7, time: "2:50" },
  { name: "Arjun Nair", score: 7, time: "3:05" },
  { name: "Meera Iyer", score: 6, time: "2:40" },
]

// Quiz states
type QuizState = "start" | "quiz" | "result"

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>("start")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(quizQuestions.length).fill(""))
  const [score, setScore] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [quizStartTime, setQuizStartTime] = useState(0)
  const [userName, setUserName] = useState("")

  // Start the quiz
  const startQuiz = () => {
    if (!userName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to start the quiz.",
        variant: "destructive",
      })
      return
    }

    setQuizState("quiz")
    setCurrentQuestion(0)
    setSelectedAnswers(Array(quizQuestions.length).fill(""))
    setScore(0)
    setQuizStartTime(Date.now())

    // Start timer
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    // Store timer ID in a ref to clear it later
    return () => clearInterval(timer)
  }

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestion] = answer
    setSelectedAnswers(newSelectedAnswers)
  }

  // Move to next question
  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // End quiz
      const newScore = selectedAnswers.reduce((total, answer, index) => {
        return answer === quizQuestions[index].correctAnswer ? total + 1 : total
      }, 0)

      setScore(newScore)
      setTimeSpent(Math.floor((Date.now() - quizStartTime) / 1000))
      setQuizState("result")
    }
  }

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Reset quiz
  const resetQuiz = () => {
    setQuizState("start")
    setCurrentQuestion(0)
    setSelectedAnswers(Array(quizQuestions.length).fill(""))
    setScore(0)
    setTimeSpent(0)
  }

  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">ISE Tech Quiz</h1>
        <p className="text-xl text-muted-foreground">
          Test your knowledge of the latest technology trends and win exciting prizes!
        </p>
      </div>

      {quizState === "start" && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Welcome to the ISE Tech Quiz!</CardTitle>
            <CardDescription>
              Answer 10 questions about technology to test your knowledge. The top scorers will win exciting prizes!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Enter Your Name</Label>
              <input
                id="name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="John Doe"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Quiz Rules:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>The quiz consists of 10 multiple-choice questions.</li>
                <li>Each correct answer earns you 1 point.</li>
                <li>There is no negative marking for wrong answers.</li>
                <li>Your score and time taken will be recorded for the leaderboard.</li>
                <li>Top performers will be eligible for prizes at the event.</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={startQuiz} className="w-full">
              Start Quiz
            </Button>
          </CardFooter>
        </Card>
      )}

      {quizState === "quiz" && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                Question {currentQuestion + 1} of {quizQuestions.length}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeSpent)}</span>
              </div>
            </div>
            <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <h3 className="text-lg font-medium">{quizQuestions[currentQuestion].question}</h3>

            <RadioGroup value={selectedAnswers[currentQuestion]} onValueChange={handleAnswerSelect}>
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button onClick={nextQuestion} className="w-full" disabled={!selectedAnswers[currentQuestion]}>
              {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {quizState === "result" && (
        <div className="space-y-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
              <CardDescription>Thank you for participating in the ISE Tech Quiz, {userName}!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{score}</div>
                    <div className="text-sm text-muted-foreground">out of {quizQuestions.length}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Time Taken</div>
                  <div className="text-xl font-semibold flex items-center justify-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    {formatTime(timeSpent)}
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                  <div className="text-xl font-semibold flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Question Review:</h3>
                <div className="space-y-2">
                  {quizQuestions.map((question, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {selectedAnswers[index] === question.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium">{question.question}</p>
                        <p className="text-sm text-muted-foreground">
                          Your answer:{" "}
                          <span
                            className={
                              selectedAnswers[index] === question.correctAnswer ? "text-green-500" : "text-red-500"
                            }
                          >
                            {selectedAnswers[index] || "Not answered"}
                          </span>
                        </p>
                        {selectedAnswers[index] !== question.correctAnswer && (
                          <p className="text-sm text-green-500">Correct answer: {question.correctAnswer}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button onClick={resetQuiz} className="w-full">
                Take Quiz Again
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Your score has been recorded. Check the leaderboard below to see your ranking!
              </p>
            </CardFooter>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-primary" />
                Quiz Leaderboard
              </CardTitle>
              <CardDescription>Top performers will be eligible for prizes at the event.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Rank</th>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-center py-3 px-4">Score</th>
                      <th className="text-center py-3 px-4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((entry, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          {index + 1 <= 3 ? (
                            <div className="flex items-center gap-1">
                              <Award
                                className={`h-5 w-5 ${
                                  index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : "text-amber-600"
                                }`}
                              />
                              {index + 1}
                            </div>
                          ) : (
                            index + 1
                          )}
                        </td>
                        <td className="py-3 px-4">{entry.name}</td>
                        <td className="py-3 px-4 text-center">
                          {entry.score}/{quizQuestions.length}
                        </td>
                        <td className="py-3 px-4 text-center">{entry.time}</td>
                      </tr>
                    ))}
                    {quizState === "result" && (
                      <tr className="bg-primary/10">
                        <td className="py-3 px-4">-</td>
                        <td className="py-3 px-4">{userName} (You)</td>
                        <td className="py-3 px-4 text-center">
                          {score}/{quizQuestions.length}
                        </td>
                        <td className="py-3 px-4 text-center">{formatTime(timeSpent)}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Prizes Section */}
      <section className="py-12 bg-muted/50 rounded-lg">
        <div className="container space-y-8">
          <h2 className="text-3xl font-bold text-center">Win Exciting Prizes!</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Top performers in the ISE Tech Quiz will be eligible for amazing prizes at the Open House event.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>First Prize</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Smart Watch + Certificate of Excellence</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Second Prize</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Wireless Earbuds + Certificate of Merit</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Third Prize</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Power Bank + Certificate of Participation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}


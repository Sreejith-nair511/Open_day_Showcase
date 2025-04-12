"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Clock, CheckCircle, XCircle, AlertCircle, Lightbulb, CodeIcon } from "lucide-react"
import CodeEditor from "@/components/code-editor"
import { practiceProblems } from "@/data/practice-problems"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

export default function PracticeProblemPage() {
  const params = useParams()
  const router = useRouter()
  const problemId = Number(params.id)

  const [problem, setProblem] = useState(practiceProblems.find((p) => p.id === problemId))
  const [language, setLanguage] = useState<"javascript" | "python" | "cpp">("javascript")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle")
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds

  useEffect(() => {
    if (!problem) {
      router.push("/practice")
      return
    }

    setCode(problem.starterCode[language])

    // Set up timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [problem, language, router])

  if (!problem) {
    return null
  }

  const handleRunCode = () => {
    setStatus("running")
    setOutput("Running tests...")
    setAttempts((prev) => prev + 1)

    // Simulate code execution
    setTimeout(() => {
      if (code.includes(problem.solution[language].substring(0, 50))) {
        setStatus("success")
        let outputText = "All test cases passed!\n\n"
        problem.testCases.forEach((testCase, index) => {
          outputText += `Test Case ${index + 1}: ✓\n`
          outputText += `Input: ${JSON.stringify(testCase.input)}\n`
          outputText += `Expected: ${JSON.stringify(testCase.output)}\n`
          outputText += `Output: ${JSON.stringify(testCase.output)}\n\n`
        })
        setOutput(outputText)
        toast({
          title: "Success!",
          description: "Your solution passed all test cases.",
          variant: "default",
        })
      } else {
        setStatus("error")
        const failedTestCase = problem.testCases[Math.floor(Math.random() * problem.testCases.length)]
        setOutput(
          `Test case failed!\n\nInput: ${JSON.stringify(failedTestCase.input)}\nExpected: ${JSON.stringify(failedTestCase.output)}\nGot: ${JSON.stringify(Math.random() > 0.5 ? failedTestCase.output : "incorrect output")}`,
        )

        if (attempts >= 2 && !showHints) {
          toast({
            title: "Need help?",
            description: "You can view hints after 3 attempts.",
            variant: "default",
          })
        }
      }
    }, 1500)
  }

  const getStatusIcon = () => {
    switch (status) {
      case "running":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <Link href="/practice">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{problem.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className={
                    problem.difficulty === "easy"
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : problem.difficulty === "medium"
                        ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                  }
                >
                  {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">Solved by {problem.solvedBy} users</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              disabled={attempts < 3 && !showHints}
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {showHints ? "Hide Hints" : "Show Hints"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader className="p-4 border-b">
              <Tabs defaultValue="problem" className="w-full">
                <TabsList className="grid grid-cols-2 w-full max-w-md">
                  <TabsTrigger value="problem">Problem</TabsTrigger>
                  <TabsTrigger value="solution" disabled={!showSolution}>
                    Solution
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="problem" className="mt-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p>{problem.problemStatement}</p>

                    <h4>Examples:</h4>
                    {problem.examples.map((example, index) => (
                      <div key={index} className="bg-muted/50 p-3 rounded-md my-2">
                        <p>
                          <strong>Input:</strong> {example.input}
                        </p>
                        <p>
                          <strong>Output:</strong> {example.output}
                        </p>
                      </div>
                    ))}

                    <h4>Constraints:</h4>
                    <ul>
                      {problem.constraints.map((constraint, index) => (
                        <li key={index}>{constraint}</li>
                      ))}
                    </ul>

                    {showHints && (
                      <>
                        <h4>Hints:</h4>
                        <div className="bg-primary/5 p-3 rounded-md my-2 border border-primary/20">
                          <ul>
                            {problem.hints.map((hint, index) => (
                              <li key={index}>{hint}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="solution" className="mt-4">
                  {showSolution ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <h4>Solution:</h4>
                      <div className="bg-muted p-3 rounded-md my-2 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                        {problem.solution[language]}
                      </div>

                      <h4>Time Complexity:</h4>
                      <p>{problem.timeComplexity}</p>

                      <h4>Space Complexity:</h4>
                      <p>{problem.spaceComplexity}</p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p>Solution will be available after multiple attempts or when you solve the problem.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardHeader>

            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 h-[500px]">
                {/* Code Editor */}
                <div className="border-r h-full flex flex-col">
                  <div className="p-2 border-b bg-muted/50 flex items-center justify-between">
                    <div className="flex items-center">
                      <CodeIcon className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-medium text-sm">Code Editor</span>
                    </div>
                    <Tabs
                      defaultValue={language}
                      onValueChange={(value) => setLanguage(value as any)}
                      className="w-auto"
                    >
                      <TabsList className="h-8">
                        <TabsTrigger value="javascript" className="px-2 py-1 text-xs">
                          JavaScript
                        </TabsTrigger>
                        <TabsTrigger value="python" className="px-2 py-1 text-xs">
                          Python
                        </TabsTrigger>
                        <TabsTrigger value="cpp" className="px-2 py-1 text-xs">
                          C++
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="flex-1">
                    <CodeEditor language={language} value={code} onChange={setCode} />
                  </div>
                </div>

                {/* Console Output */}
                <div className="p-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Console Output</h3>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon()}
                      <span className="text-sm">
                        {status === "idle"
                          ? "Ready"
                          : status === "running"
                            ? "Running..."
                            : status === "success"
                              ? "Success!"
                              : "Failed"}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 bg-muted/50 rounded-md p-3 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
                    {output || "// Output will appear here"}
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setOutput("")}>
                      Clear
                    </Button>
                    <Button onClick={handleRunCode}>
                      <Play className="h-4 w-4 mr-2" />
                      Run Tests
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Problem Info */}
          <Card>
            <CardHeader>
              <CardTitle>Problem Info</CardTitle>
              <CardDescription>Details and statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Category</h4>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {problem.category.charAt(0).toUpperCase() + problem.category.slice(1)}
                </Badge>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Complexity</h4>
                <p className="text-sm text-muted-foreground">Time: {problem.timeComplexity}</p>
                <p className="text-sm text-muted-foreground">Space: {problem.spaceComplexity}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Your Attempts</h4>
                <p className="text-sm text-muted-foreground">{attempts} attempts made</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setShowSolution(!showSolution)}
                disabled={attempts < 5 && status !== "success" && !showSolution}
              >
                {showSolution ? "Hide Solution" : "Show Solution"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

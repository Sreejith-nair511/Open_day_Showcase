"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, CheckCircle, XCircle, AlertCircle, Trophy, ArrowRight } from "lucide-react"
import CodeEditor from "@/components/code-editor"
import LeaderboardWidget from "@/components/leaderboard-widget"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"

export default function ChallengePage() {
  const [activeTab, setActiveTab] = useState("easy")
  const [output, setOutput] = useState("")
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [code, setCode] = useState(`function reverseArray(arr) {
  // Your code here
  
  return arr;
}

// Example usage
console.log(reverseArray([1, 2, 3, 4, 5]));`)

  useEffect(() => {
    // Set up timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          toast({
            title: "Time's up!",
            description: "Your time for this challenge has ended.",
            variant: "destructive",
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleRunCode = () => {
    setStatus("running")
    setOutput("Running tests...")

    // Simulate code execution
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setStatus("success")
        setOutput("All test cases passed!\n\nTest Case 1: ✓\nTest Case 2: ✓\nTest Case 3: ✓")
        toast({
          title: "Success!",
          description: "Your solution passed all test cases.",
          variant: "default",
        })
      } else {
        setStatus("error")
        setOutput("Test Case 2 failed!\nExpected: [1, 2, 3]\nGot: [1, 3, 2]")
        toast({
          title: "Test failed",
          description: "Check your solution and try again.",
          variant: "destructive",
        })
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

  const challenges = {
    easy: {
      title: "Reverse Array",
      description: "Implement a function to reverse an array without using built-in methods",
      problemStatement: `Write a function \`reverseArray\` that takes an array of integers as input and returns a new array with the elements in reverse order.

**Note:** You cannot use built-in methods like \`reverse()\`, \`map()\`, or \`reduce()\`.

**Example:**
\`\`\`
Input: [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]
\`\`\`

**Constraints:**
- The array length will be between 1 and 1000
- Array elements will be integers between -1000 and 1000`,
      code: `function reverseArray(arr) {
  // Your code here
  
  return arr;
}

// Example usage
console.log(reverseArray([1, 2, 3, 4, 5]));`,
    },
    medium: {
      title: "Find Missing Number",
      description: "Find the missing number in an array containing n distinct numbers in range [0, n]",
      problemStatement: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.

**Example:**
\`\`\`
Input: [3, 0, 1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0, 3]. 2 is the missing number.
\`\`\`

**Constraints:**
- n == nums.length
- 1 <= n <= 10^4
- 0 <= nums[i] <= n
- All the numbers of nums are unique`,
      code: `function findMissingNumber(nums) {
  // Your code here
  
  return 0;
}

// Example usage
console.log(findMissingNumber([3, 0, 1]));`,
    },
    hard: {
      title: "Longest Palindromic Substring",
      description: "Find the longest palindromic substring in a given string",
      problemStatement: `Given a string \`s\`, return the longest palindromic substring in \`s\`.

A palindrome is a string that reads the same backward as forward.

**Example:**
\`\`\`
Input: "babad"
Output: "bab" or "aba" (both are valid)
\`\`\`

**Constraints:**
- 1 <= s.length <= 1000
- s consists of only lowercase English letters`,
      code: `function longestPalindrome(s) {
  // Your code here
  
  return "";
}

// Example usage
console.log(longestPalindrome("babad"));`,
    },
  }

  useEffect(() => {
    setCode(challenges[activeTab as keyof typeof challenges].code)
    setOutput("")
    setStatus("idle")
  }, [activeTab])

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Challenge Zone</h1>
            <p className="text-muted-foreground">Solve coding challenges and compete with others</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              <Trophy className="h-4 w-4 mr-1" />
              <span>Rank: #42</span>
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="easy" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="easy">Easy</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="hard">Hard</TabsTrigger>
          </TabsList>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{challenges[activeTab as keyof typeof challenges].title}</CardTitle>
                    <CardDescription>{challenges[activeTab as keyof typeof challenges].description}</CardDescription>
                  </div>
                  <Badge
                    variant={activeTab === "easy" ? "default" : activeTab === "medium" ? "secondary" : "destructive"}
                  >
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[600px]">
                  {/* Problem Statement */}
                  <div className="border-r border-b md:border-b-0 p-4 overflow-y-auto">
                    <h3 className="font-medium mb-4">Problem Statement</h3>
                    <div className="prose prose-sm dark:prose-invert">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: challenges[activeTab as keyof typeof challenges].problemStatement
                            .replace(/\n/g, "<br>")
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/`(.*?)`/g, "<code>$1</code>")
                            .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>"),
                        }}
                      />
                    </div>
                  </div>

                  {/* Code Editor */}
                  <div className="border-r lg:col-span-1 h-full">
                    <CodeEditor language="javascript" value={code} onChange={setCode} />
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

            {/* Leaderboard and Mascot Widget */}
            <div className="space-y-6">
              {/* Mascot Character */}
              <Card className="bg-yellow-100/20 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800/30">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src="/images/pixel-character.png"
                      alt="Pixel Character"
                      width={60}
                      height={90}
                      className="absolute bottom-0"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Tip from Pixel Friend</h3>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      {activeTab === "easy"
                        ? "Try using a for loop that starts from the end of the array!"
                        : activeTab === "medium"
                          ? "Think about using the sum formula for numbers from 0 to n."
                          : "Consider expanding around centers for each possible palindrome position."}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard Widget */}
              <Card>
                <CardHeader>
                  <CardTitle>Leaderboard</CardTitle>
                  <CardDescription>Top performers</CardDescription>
                </CardHeader>
                <CardContent>
                  <LeaderboardWidget />
                </CardContent>
                <div className="px-6 pb-4">
                  <Button variant="outline" className="w-full">
                    View Full Leaderboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Users, Code, CheckCircle, XCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const users = [
    { id: "COD-1234", name: "Alex Chen", status: "active", submissions: 5, score: 420 },
    { id: "COD-2345", name: "Priya Sharma", status: "submitted", submissions: 8, score: 650 },
    { id: "COD-3456", name: "Marcus Johnson", status: "dnf", submissions: 2, score: 120 },
    { id: "COD-4567", name: "Sarah Williams", status: "active", submissions: 6, score: 480 },
    { id: "COD-5678", name: "David Lee", status: "submitted", submissions: 7, score: 590 },
  ]

  const questions = [
    {
      id: 1,
      title: "Array Reversal",
      difficulty: "easy",
      solved: 78,
      avgTime: "2:45",
      commonError: "Off-by-one errors",
    },
    { id: 2, title: "Fix the Loop", difficulty: "easy", solved: 65, avgTime: "3:12", commonError: "Infinite loops" },
    {
      id: 3,
      title: "Fibonacci Sequence",
      difficulty: "medium",
      solved: 42,
      avgTime: "5:30",
      commonError: "Stack overflow",
    },
    {
      id: 4,
      title: "Optimize the Algorithm",
      difficulty: "hard",
      solved: 28,
      avgTime: "8:15",
      commonError: "Time limit exceeded",
    },
  ]

  const submissions = [
    { id: "SUB-1234", userId: "COD-1234", questionId: 1, status: "passed", time: "2:12", score: 95 },
    { id: "SUB-2345", userId: "COD-2345", questionId: 2, status: "passed", time: "3:05", score: 85 },
    { id: "SUB-3456", userId: "COD-3456", questionId: 1, status: "failed", time: "4:30", score: 0 },
    { id: "SUB-4567", userId: "COD-4567", questionId: 3, status: "passed", time: "5:45", score: 75 },
    { id: "SUB-5678", userId: "COD-5678", questionId: 4, status: "failed", time: "7:20", score: 0 },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            Active
          </Badge>
        )
      case "submitted":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Submitted
          </Badge>
        )
      case "dnf":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            DNF
          </Badge>
        )
      case "passed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Passed
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, questions, and view analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Users", value: "248", icon: <Users className="h-5 w-5 text-primary" /> },
            { title: "Active Now", value: "124", icon: <Clock className="h-5 w-5 text-primary" /> },
            { title: "Submissions", value: "1,842", icon: <Code className="h-5 w-5 text-primary" /> },
            { title: "Completion Rate", value: "68%", icon: <CheckCircle className="h-5 w-5 text-primary" /> },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="p-2 rounded-md bg-primary/10">{stat.icon}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="users">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="users" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submissions</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono">{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>{user.submissions}</TableCell>
                          <TableCell>{user.score}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Question Analytics</h3>
                <Button>Add Question</Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Solved %</TableHead>
                        <TableHead>Avg Time</TableHead>
                        <TableHead>Common Error</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {questions.map((question) => (
                        <TableRow key={question.id}>
                          <TableCell>{question.id}</TableCell>
                          <TableCell>{question.title}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                question.difficulty === "easy"
                                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                                  : question.difficulty === "medium"
                                    ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                    : "bg-red-500/10 text-red-500 border-red-500/20"
                              }
                            >
                              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={question.solved} className="h-2 w-20" />
                              <span className="text-sm">{question.solved}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{question.avgTime}</TableCell>
                          <TableCell>{question.commonError}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submissions" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Recent Submissions</h3>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Question</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-mono">{submission.id}</TableCell>
                          <TableCell className="font-mono">{submission.userId}</TableCell>
                          <TableCell>{submission.questionId}</TableCell>
                          <TableCell>
                            {submission.status === "passed" ? (
                              <div className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                <span>Passed</span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <XCircle className="h-4 w-4 text-red-500 mr-1" />
                                <span>Failed</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>{submission.time}</TableCell>
                          <TableCell>{submission.score}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View Code
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

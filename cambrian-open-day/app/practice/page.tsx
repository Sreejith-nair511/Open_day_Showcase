"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowRight, Eye, BookOpen } from "lucide-react"
import Link from "next/link"
import { practiceProblems } from "@/data/practice-problems"
import Image from "next/image"

export default function PracticePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const categories = [
    { id: "all", label: "All" },
    { id: "algorithms", label: "Algorithms" },
    { id: "loops", label: "Loops" },
    { id: "recursion", label: "Recursion" },
    { id: "debugging", label: "Debugging" },
    { id: "dataStructures", label: "Data Structures" },
    { id: "optimization", label: "Optimization" },
  ]

  const difficultyColors = {
    easy: "bg-green-500/10 text-green-500 border-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    hard: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  const filteredProblems = practiceProblems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeTab === "all" || problem.category === activeTab
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Debug Lab</h1>
          <p className="text-xl text-muted-foreground">Practice your coding skills with our collection of challenges</p>
        </div>

        <div className="flex flex-col space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="overflow-x-auto">
              <TabsList className="h-auto flex-wrap">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="px-3 py-1.5">
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Mascot Character */}
          <div className="relative w-full h-40 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-lg overflow-hidden mb-6">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <Image src="/images/pixel-character.png" alt="Pixel Character" width={80} height={120} />
            </div>
            <div className="absolute top-4 left-4 right-4 text-center md:text-left">
              <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">Ready to debug?</h3>
              <p className="text-yellow-700 dark:text-yellow-400 max-w-md">
                Our pixel friend is waiting for you to solve these challenges!
              </p>
            </div>
          </div>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map((problem) => (
              <Card
                key={problem.id}
                className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="p-2 rounded-md bg-primary/10">
                      {<problem.icon className="h-5 w-5 text-primary" />}
                    </div>
                    <Badge
                      variant="outline"
                      className={difficultyColors[problem.difficulty as keyof typeof difficultyColors]}
                    >
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2">{problem.title}</CardTitle>
                  <CardDescription>{problem.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {problem.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Solved by {problem.solvedBy} users</p>
                </CardContent>
                <CardFooter className="bg-muted/30 flex justify-between">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Hints
                  </Button>
                  <Link href={`/practice/${problem.id}`}>
                    <Button size="sm">
                      Solve
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProblems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No problems found matching your criteria.</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("")
                  setActiveTab("all")
                }}
              >
                Clear filters
              </Button>
            </div>
          )}

          {/* Practice Badge */}
          <div className="mt-8 text-center">
            <Card className="inline-block max-w-md">
              <CardHeader>
                <CardTitle>Your Practice Score</CardTitle>
                <CardDescription>Keep practicing to improve your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary flex items-center justify-center">
                    <span className="text-2xl font-bold">42</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  You've solved 2 out of {practiceProblems.length} practice problems. Keep going!
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Continue Practice
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

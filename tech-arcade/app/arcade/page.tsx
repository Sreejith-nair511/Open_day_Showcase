"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { GameCard } from "@/components/game-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

type Game = {
  id: string
  title: string
  description: string
  image: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
}

export default function ArcadePage() {
  const [games, setGames] = useState<Game[]>([])
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useMobile()

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("arcade-user")
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to access the arcade",
        variant: "destructive",
      })
      router.push("/register")
      return
    }

    // In a real app, this would be an API call
    const mockGames: Game[] = [
      {
        id: "mind-reader",
        title: "AI Mind Reader",
        description: "Can the AI guess what you're thinking? Test your mental defenses!",
        image: "/placeholder.svg?height=200&width=400",
        difficulty: "Easy",
        category: "AI",
      },
      {
        id: "racing",
        title: "Gesture-Controlled Racing",
        description: "Race against time using just your hand movements!",
        image: "/placeholder.svg?height=200&width=400",
        difficulty: "Medium",
        category: "Motion",
      },
      {
        id: "escape-room",
        title: "Cybersecurity Escape Room",
        description: "Crack codes, decrypt messages, and escape before time runs out!",
        image: "/placeholder.svg?height=200&width=400",
        difficulty: "Hard",
        category: "Security",
      },
      {
        id: "drawing",
        title: "AI vs Human Drawing",
        description: "Draw shapes and see if the AI can guess what you drew!",
        image: "/placeholder.svg?height=200&width=400",
        difficulty: "Easy",
        category: "AI",
      },
      {
        id: "code-roulette",
        title: "Code Roulette",
        description: "Spin the wheel and solve random coding challenges against the clock!",
        image: "/placeholder.svg?height=200&width=400",
        difficulty: "Hard",
        category: "Coding",
      },
      {
        id: "vr-maze",
        title: "VR Maze Challenge",
        description: "Navigate through a complex 3D maze using head movements!",
        image: "/placeholder.svg?height=200&width=400",
        difficulty: "Medium",
        category: "VR",
      },
      {
        id: "ar-hunt",
        title: "AR Treasure Hunt",
        description: "Scan QR codes to find clues and solve the mystery!",
        image: "/placeholder.svg?height=200&width=400",
        difficulty: "Medium",
        category: "AR",
      },
    ]

    setGames(mockGames)
    setFilteredGames(mockGames)
  }, [router, toast])

  useEffect(() => {
    let result = games

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (game) =>
          game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply difficulty filter
    if (difficultyFilter !== "all") {
      result = result.filter((game) => game.difficulty.toLowerCase() === difficultyFilter.toLowerCase())
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((game) => game.category === categoryFilter)
    }

    setFilteredGames(result)
  }, [searchQuery, difficultyFilter, categoryFilter, games])

  // Get unique categories
  const categories = Array.from(new Set(games.map((game) => game.category)))

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Tech Arcade</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">Choose a game and start playing!</p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl mt-8">
              {/* Desktop filters */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search games..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty-filter" className="sr-only">
                    Filter by difficulty
                  </Label>
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger id="difficulty-filter">
                      <SelectValue placeholder="Filter by difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Difficulties</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category-filter" className="sr-only">
                    Filter by category
                  </Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger id="category-filter">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mobile filters */}
              <div className="md:hidden flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search games..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filter Games</SheetTitle>
                      <SheetDescription>Filter games by difficulty and category</SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile-difficulty">Difficulty</Label>
                        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                          <SelectTrigger id="mobile-difficulty">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Difficulties</SelectItem>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile-category">Category</Label>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger id="mobile-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} {...game} />
                ))}
              </div>
              {filteredGames.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No games found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


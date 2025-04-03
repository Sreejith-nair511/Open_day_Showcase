import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { CountdownTimer } from "@/components/countdown-timer"
import { LeaderboardPreview } from "@/components/leaderboard-preview"
import { GameCard } from "@/components/game-card"
import { GamepadIcon as GameController, Calendar, MapPin, Users, Cpu, Code, Gamepad2, Rocket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const games = [
    {
      id: "mind-reader",
      title: "AI Mind Reader",
      description: "Can the AI guess what you're thinking? Test your mental defenses!",
      image: "/placeholder.svg?height=200&width=400",
      difficulty: "Easy" as const,
    },
    {
      id: "racing",
      title: "Gesture-Controlled Racing",
      description: "Race against time using just your hand movements!",
      image: "/placeholder.svg?height=200&width=400",
      difficulty: "Medium" as const,
    },
    {
      id: "escape-room",
      title: "Cybersecurity Escape Room",
      description: "Crack codes, decrypt messages, and escape before time runs out!",
      image: "/placeholder.svg?height=200&width=400",
      difficulty: "Hard" as const,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Tech Arcade @ Cambrian Open House 2025
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Experience the future of gaming at Cambridge Institute of Technology's biggest innovation showcase.
                    FREE ENTRY!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/register">Register Now</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/arcade">
                      <GameController className="mr-2 h-4 w-4" />
                      Explore Games
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mx-0">
                <CountdownTimer />
              </div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Event Details</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Join us for a day of innovation, learning, and fun at the Cambridge Institute of Technology.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 mt-8">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <Calendar className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Date & Time</h3>
                <p className="text-center text-muted-foreground">
                  April 19, 2025
                  <br />
                  9:00 AM - 6:00 PM
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <MapPin className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Location</h3>
                <p className="text-center text-muted-foreground">
                  Cambridge Institute of Technology
                  <br />
                  123 Innovation Drive
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <Users className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Attendance</h3>
                <p className="text-center text-muted-foreground">
                  Free Entry
                  <br />
                  Open to All
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Highlights */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Experience Highlights</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Discover what makes Cambrian Open House 2025 the biggest innovation showcase of the year.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Rocket className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Advanced Research</h3>
                  <p className="text-muted-foreground">Cutting-edge student and faculty projects on display.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Code className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Skill Development</h3>
                  <p className="text-muted-foreground">
                    Hands-on workshops and technical challenges for all skill levels.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Cpu className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Industry Collaborations</h3>
                  <p className="text-muted-foreground">See startups and industry partnerships in action.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Gamepad2 className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Tech Arcade</h3>
                  <p className="text-muted-foreground">
                    A fully immersive gaming experience with cutting-edge technology.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Games */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Games</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Check out some of our exciting games available at the Tech Arcade.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 mt-8">
              {games.map((game) => (
                <GameCard key={game.id} {...game} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild size="lg">
                <Link href="/arcade">View All Games</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Leaderboard Preview */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Top Players</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  See who's leading the competition at the Tech Arcade.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-2xl mt-8">
              <LeaderboardPreview />
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Cambridge Institute of Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


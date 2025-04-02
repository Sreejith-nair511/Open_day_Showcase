import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CountdownTimer from "@/components/countdown-timer"
import Carousel from "@/components/carousel"
import RegistrationForm from "@/components/registration-form"
import { ArrowRight, Award, BookOpen, Code, Lightbulb, Users } from "lucide-react"

// Featured projects data
const featuredProjects = [
  {
    id: 1,
    title: "AI-Powered Health Diagnostics",
    description: "Machine learning model for early disease detection using medical imaging.",
    category: "AI/ML",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Smart Campus IoT Network",
    description: "IoT system for monitoring and optimizing energy usage across campus buildings.",
    category: "IoT",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Blockchain-based Academic Credentials",
    description: "Secure and verifiable academic credential system using blockchain technology.",
    category: "Blockchain",
    image: "/placeholder.svg?height=200&width=400",
  },
]

// Recent achievements data
const recentAchievements = [
  {
    id: 1,
    title: "GSSS Hackathon",
    description: "First place in the national-level hackathon with our AI-driven solution.",
    position: "Winner",
  },
  {
    id: 2,
    title: "JSS Hackathon",
    description: "Secured top 3 position with our innovative blockchain application.",
    position: "Top 3",
  },
  {
    id: 3,
    title: "Microsoft AI Summit",
    description: "Selected for exclusive program among thousands of applicants.",
    position: "Selected",
  },
]

export default function HomePage() {
  // Create carousel items for achievements
  const achievementItems = recentAchievements.map((achievement) => (
    <Card key={achievement.id} className="h-full">
      <CardHeader>
        <CardTitle>{achievement.title}</CardTitle>
        <CardDescription>{achievement.position}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{achievement.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
          <Link href="/achievements">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  ))

  // Create carousel items for projects
  const projectItems = featuredProjects.map((project) => (
    <Card key={project.id} className="h-full">
      <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-48 object-cover" />
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{project.title}</CardTitle>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{project.category}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p>{project.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
          <Link href="/projects">
            Explore Project <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  ))

  return (
    <div className="container py-12 space-y-16">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">ISE Department Showcase</h1>
          <p className="text-xl text-muted-foreground">
            Explore cutting-edge innovations, achievements, and student-led breakthroughs at the Cambrian Open House
            2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/projects">Explore Projects</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/schedule">View Schedule</Link>
            </Button>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-semibold">📅 April 19, 2025</span>
            <span>|</span>
            <span>📍 Cambridge Institute of Technology</span>
            <span>|</span>
            <span>🎟 FREE ENTRY</span>
          </div>
        </div>
        <div>
          <CountdownTimer />
        </div>
      </section>

      {/* Department Introduction */}
      <section className="py-12 bg-muted/50 rounded-lg">
        <div className="container space-y-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">About ISE Department</h2>
            <p className="text-muted-foreground">
              The Information Science & Engineering Department at Cambridge Institute of Technology is dedicated to
              fostering innovation, research, and technological advancement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Lightbulb className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  To be a center of excellence in Information Science & Engineering education, research, and innovation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  To provide quality education that prepares students for successful careers in the rapidly evolving
                  field of information technology.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Our Impact</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Producing industry-ready graduates who contribute to technological advancements and societal
                  development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Highlight */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Recent Achievements</h2>
          <Button variant="outline" asChild>
            <Link href="/achievements">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Carousel items={achievementItems} className="h-80" />
      </section>

      {/* Featured Projects */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Button variant="outline" asChild>
            <Link href="/projects">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Carousel items={projectItems} className="h-96" />
      </section>

      {/* Registration Form */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 bg-muted/50 rounded-lg">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Register for Updates</h2>
          <p className="text-muted-foreground">
            Stay informed about the latest updates, schedule changes, and exclusive content for the ISE Open House 2025.
          </p>
          <div className="flex items-center gap-4">
            <Award className="h-8 w-8 text-primary" />
            <p>Receive early access to workshop registrations</p>
          </div>
          <div className="flex items-center gap-4">
            <Code className="h-8 w-8 text-primary" />
            <p>Get notified about special tech demonstrations</p>
          </div>
        </div>
        <div>
          <RegistrationForm />
        </div>
      </section>
    </div>
  )
}


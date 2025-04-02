import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, Star, ArrowUpDown } from "lucide-react"

// Hackathon achievements data
const hackathonAchievements = [
  {
    id: 1,
    name: "GSSS Hackathon",
    position: "Winner",
    year: 2024,
    team: ["Aditya Sharma", "Priya Patel", "Rahul Verma"],
    description: "Developed an AI-driven solution for healthcare diagnostics that won first place.",
    image: "/placeholder.svg?height=200&width=400",
    rank: 1,
  },
  {
    id: 2,
    name: "JSS Hackathon",
    position: "Top 3",
    year: 2024,
    team: ["Neha Singh", "Vikram Reddy", "Sanjay Kumar"],
    description: "Created a blockchain-based solution for secure academic credentials verification.",
    image: "/placeholder.svg?height=200&width=400",
    rank: 3,
  },
  {
    id: 3,
    name: "BITS Pilani Hackathon",
    position: "Top 50",
    year: 2023,
    team: ["Arjun Nair", "Divya Sharma", "Karthik Menon"],
    description: "Developed a machine learning model for predictive maintenance in manufacturing.",
    image: "/placeholder.svg?height=200&width=400",
    rank: 50,
  },
  {
    id: 4,
    name: "MVJCE Hackathon",
    position: "8th Position",
    year: 2023,
    team: ["Rohan Joshi", "Ananya Desai", "Varun Kapoor"],
    description: "Built a smart city solution for traffic management and pollution monitoring.",
    image: "/placeholder.svg?height=200&width=400",
    rank: 8,
  },
  {
    id: 5,
    name: "Satwa Hackathon",
    position: "Top 10",
    year: 2023,
    team: ["Meera Iyer", "Sameer Khan", "Tanya Gupta"],
    description: "Developed a sustainable agriculture monitoring system using IoT sensors.",
    image: "/placeholder.svg?height=200&width=400",
    rank: 10,
  },
  {
    id: 6,
    name: "Atria CICADA Hackathon",
    position: "Top 10",
    year: 2022,
    team: ["Ravi Kumar", "Sneha Reddy", "Ajay Nair"],
    description: "Created an AR-based educational platform for interactive learning.",
    image: "/placeholder.svg?height=200&width=400",
    rank: 10,
  },
]

// Other achievements data
const otherAchievements = [
  {
    id: 1,
    name: "DFF Sundarban Film Festival",
    position: "Winner",
    year: 2024,
    team: ["Kavita Menon", "Deepak Sharma"],
    description: "Won first place for a documentary on environmental conservation using drone technology.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    name: "Google Developer Student Club (GDSC)",
    position: "Active Participation",
    year: 2023,
    team: ["ISE Department"],
    description: "Recognized for active participation and contribution to GDSC events and workshops.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    name: "Microsoft AI Summit",
    position: "Selected for Exclusive Program",
    year: 2023,
    team: ["Aryan Patel", "Nisha Verma", "Kunal Singh"],
    description: "Selected among thousands of applicants for Microsoft's exclusive AI mentorship program.",
    image: "/placeholder.svg?height=200&width=400",
  },
]

// Top performers data
const topPerformers = [
  {
    id: 1,
    name: "Aditya Sharma",
    achievements: 3,
    specialization: "AI/ML",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Priya Patel",
    achievements: 3,
    specialization: "Blockchain",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Neha Singh",
    achievements: 2,
    specialization: "Web Development",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Vikram Reddy",
    achievements: 2,
    specialization: "IoT",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function AchievementsPage() {
  return (
    <div className="container py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Achievements Hall</h1>
        <p className="text-xl text-muted-foreground">
          Celebrating the remarkable accomplishments of our students and faculty in various competitions and events.
        </p>
      </div>

      <Tabs defaultValue="hackathons" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
          <TabsTrigger value="other">Other Achievements</TabsTrigger>
          <TabsTrigger value="performers">Top Performers</TabsTrigger>
        </TabsList>

        <TabsContent value="hackathons" className="space-y-8 pt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Hackathon Leaderboard
            </h2>
            <Button variant="outline" className="gap-2">
              <ArrowUpDown className="h-4 w-4" />
              Sort by Rank
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathonAchievements.map((achievement) => (
              <Card key={achievement.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={achievement.image || "/placeholder.svg"}
                    alt={achievement.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full font-medium text-sm">
                    Rank: {achievement.rank}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{achievement.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="font-semibold text-primary">{achievement.position}</span>
                    <span>•</span>
                    <span>{achievement.year}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{achievement.description}</p>
                  <div>
                    <h4 className="font-medium mb-1">Team Members:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {achievement.team.map((member, index) => (
                        <li key={index}>{member}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="other" className="space-y-8 pt-6">
          <div className="flex items-center gap-2">
            <Medal className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Other Recognitions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherAchievements.map((achievement) => (
              <Card key={achievement.id} className="overflow-hidden">
                <img
                  src={achievement.image || "/placeholder.svg"}
                  alt={achievement.name}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{achievement.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="font-semibold text-primary">{achievement.position}</span>
                    <span>•</span>
                    <span>{achievement.year}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{achievement.description}</p>
                  <div>
                    <h4 className="font-medium mb-1">Team Members:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {achievement.team.map((member, index) => (
                        <li key={index}>{member}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performers" className="space-y-8 pt-6">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Top Performers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPerformers.map((performer) => (
              <Card key={performer.id}>
                <CardHeader className="text-center">
                  <div className="mx-auto rounded-full overflow-hidden w-24 h-24 mb-4">
                    <img
                      src={performer.image || "/placeholder.svg"}
                      alt={performer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle>{performer.name}</CardTitle>
                  <CardDescription>{performer.specialization}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
                    <Award className="h-4 w-4" />
                    <span>{performer.achievements} Achievements</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Video Testimonials */}
      <section className="space-y-8 pt-8">
        <h2 className="text-2xl font-bold">Video Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Faculty Testimonial Video</p>
          </div>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Student Testimonial Video</p>
          </div>
        </div>
      </section>
    </div>
  )
}


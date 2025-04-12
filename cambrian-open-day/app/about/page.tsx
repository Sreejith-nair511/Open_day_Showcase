import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Users, Award, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About Cambrian Open Day</h1>
          <p className="text-xl text-muted-foreground">
            A one-day interactive challenge focused on coding, debugging, and algorithmic problem-solving
          </p>
        </div>

        <div className="space-y-12">
          {/* Mission Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Cambrian Open Day was created to promote practical coding ability through fun, competitive tasks. We
              believe that the best way to learn is by doing, and the best way to improve is by challenging yourself.
            </p>
            <p className="text-lg text-muted-foreground">
              Our challenges are designed to simulate real-world scenarios that developers face daily. By participating,
              you'll not only sharpen your technical skills but also learn how to think critically and solve problems
              efficiently under pressure.
            </p>
          </section>

          {/* Event Details */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Event Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Date & Time</CardTitle>
                    <CardDescription>When it's happening</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Date:</strong> April 20th, 2025
                  </p>
                  <p>
                    <strong>Time:</strong> 10:00 AM – 4:00 PM
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Location</CardTitle>
                    <CardDescription>Where to find us</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Venue:</strong> Cambrian Innovation Hub
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Tech Avenue, Innovation District
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Eligibility</CardTitle>
                    <CardDescription>Who can participate</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Open to all students and coding enthusiasts, regardless of experience level.</p>
                  <p>Perfect for engineering students, budding developers, and anyone interested in programming.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Prizes</CardTitle>
                    <CardDescription>What you can win</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Certificates for all participants</li>
                    <li>Exclusive swag for top performers</li>
                    <li>Internship opportunities with sponsor companies</li>
                    <li>Fast-track interview access for top 10 finishers</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Event Flow */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Event Flow</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
              <div className="space-y-8">
                {[
                  {
                    time: "10:00 AM",
                    title: "Registration & Welcome",
                    description: "Check-in, receive your participant kit, and join the opening ceremony",
                  },
                  {
                    time: "10:30 AM",
                    title: "Warmup Round",
                    description: "Get comfortable with the platform and solve a few easy problems to warm up",
                  },
                  {
                    time: "11:30 AM",
                    title: "Main Contest - Round 1",
                    description: "Tackle the first set of challenges across all difficulty levels",
                  },
                  {
                    time: "1:00 PM",
                    title: "Lunch Break & Networking",
                    description: "Refuel and connect with fellow participants and industry mentors",
                  },
                  {
                    time: "2:00 PM",
                    title: "Main Contest - Round 2",
                    description: "Face more complex challenges with higher point values",
                  },
                  {
                    time: "3:30 PM",
                    title: "Final Round (Top 10)",
                    description: "The highest-scoring participants compete in an intense final challenge",
                  },
                  {
                    time: "4:00 PM",
                    title: "Awards & Closing",
                    description: "Celebrate achievements, distribute prizes, and network with sponsors",
                  },
                ].map((item, index) => (
                  <div key={index} className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">contact@cambrianday.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Discord</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href="/discord" className="text-primary hover:underline">
                    Join our Discord Server
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Telegram</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href="/telegram" className="text-primary hover:underline">
                    Join Telegram Group
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center pt-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Join the Challenge?</h2>
            <p className="text-muted-foreground mb-6">
              Secure your spot in the Cambrian Open Day and prepare to showcase your coding skills.
            </p>
            <Link href="/register">
              <Button size="lg">
                Register Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}

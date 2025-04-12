import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Zap, Trophy, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import CountdownTimer from "@/components/countdown-timer"
import Image from "next/image"

export default function HomePage() {
  // April 20th, 2025
  const eventDate = new Date("2025-04-20T10:00:00")

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            {/* Event date badge */}
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <span className="font-bold">April 20th, 2025</span> • Cambrian Innovation Hub
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
              DEBUG. CODE. CONQUER.
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl font-medium text-foreground/80 max-w-3xl">
              Put your coding skills to the ultimate test in a high-pressure, real-world challenge environment
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/practice">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Start Practicing
                </Button>
              </Link>
            </div>

            {/* Countdown timer */}
            <div className="w-full mt-8">
              <h3 className="text-lg font-medium mb-4">Event Starts In</h3>
              <CountdownTimer targetDate={eventDate} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the ultimate coding challenge in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Register",
                description: "Create your account and secure your spot in the competition",
              },
              {
                icon: <Code className="h-10 w-10 text-primary" />,
                title: "Join Challenges",
                description: "Tackle real-world coding problems and debug broken code",
              },
              {
                icon: <Trophy className="h-10 w-10 text-primary" />,
                title: "Earn Points",
                description: "Score points for successful solutions and climb the leaderboard",
              },
            ].map((step, index) => (
              <Card key={index} className="bg-background border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Preview Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Test Your Skills in the Challenge Zone
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our interactive coding arena features real-world problems that will push your abilities to the limit.
                Debug broken code, optimize algorithms, and implement solutions under pressure.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Syntax-highlighted code editor",
                  "Real-time test case validation",
                  "Immediate feedback on your solutions",
                  "Live leaderboard updates",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Zap className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/challenge">
                <Button>
                  Explore Challenge Zone
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative rounded-lg overflow-hidden border border-primary/20 shadow-xl">
              <Image
                src="/images/challenge-preview.png"
                width={800}
                height={600}
                alt="Challenge Zone Preview"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6">
                <div className="text-center w-full">
                  <p className="text-sm font-medium text-primary mb-2">Challenge Zone</p>
                  <p className="text-xl font-bold">Where coding skills are put to the test</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pixel Character Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/20 to-yellow-200/10 dark:from-yellow-900/10 dark:to-yellow-800/5 z-0" />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <div className="relative w-64 h-64 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                <Image
                  src="/images/pixel-character.png"
                  width={120}
                  height={180}
                  alt="Pixel Character"
                  className="absolute bottom-0"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Meet Your Coding Companion</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our pixel friend will guide you through the challenges, offering hints and encouragement as you tackle
                each problem. They'll be with you every step of the way!
              </p>
              <Link href="/practice">
                <Button>
                  Start Practicing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Participants Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from past participants about their Cambrian Open Day experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote:
                  "The debugging challenges were incredibly realistic. I learned more in one day than in weeks of classroom exercises.",
                name: "Alex Chen",
                role: "Computer Science Student",
              },
              {
                quote:
                  "The competitive atmosphere pushed me to think faster and more efficiently. Great preparation for technical interviews!",
                name: "Priya Sharma",
                role: "Software Engineering Major",
              },
              {
                quote:
                  "As a self-taught developer, this event gave me confidence that my skills are industry-ready. The mentors were incredibly helpful.",
                name: "Marcus Johnson",
                role: "Coding Bootcamp Graduate",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-background border-primary/20">
                <CardContent className="p-6">
                  <div className="text-primary mb-4">"</div>
                  <p className="mb-6 text-foreground/90">{testimonial.quote}</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background z-0" />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Prove Your Coding Skills?</h2>
            <p className="text-lg text-muted-foreground">
              Join hundreds of developers on April 20th, 2025 for a day of coding, learning, and competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

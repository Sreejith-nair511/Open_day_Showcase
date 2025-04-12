import { ArrowRight, Code, Terminal, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 z-0" />

      <div className="container relative z-10 px-4 py-16 md:py-24 lg:py-32 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
            CODE. DEBUG. CONQUER.
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 max-w-3xl">
            Put your coding skills to the ultimate test in a high-pressure, real-world challenge environment
          </p>

          {/* Date badge */}
          <div className="inline-flex items-center rounded-full border border-violet-600/30 bg-violet-50 dark:bg-violet-950/30 px-4 py-2 text-sm font-medium text-violet-700 dark:text-violet-300">
            <span className="font-bold">April 20th, 2025</span> • Cambrian Innovation Hub
          </div>

          {/* Introduction paragraph */}
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
            The Cambrian Open Day is not your average coding competition. It's an immersive, one-day challenge that
            simulates real-world development scenarios where your ability to debug, optimize, and implement solutions
            matters more than just writing code quickly. Face authentic engineering problems that test your practical
            skills in a competitive yet collaborative environment.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mt-4">
            <Card className="border-violet-200 dark:border-violet-900 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="rounded-full p-2 bg-violet-100 dark:bg-violet-900/30">
                  <Code className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold">Real-World Challenges</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Fix buggy code, optimize algorithms, and solve problems that mirror industry scenarios
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-violet-200 dark:border-violet-900 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="rounded-full p-2 bg-violet-100 dark:bg-violet-900/30">
                  <Terminal className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold">Live Debugging</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Tackle unexpected issues and demonstrate your troubleshooting skills under pressure
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-violet-200 dark:border-violet-900 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="rounded-full p-2 bg-violet-100 dark:bg-violet-900/30">
                  <Zap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold">Immediate Feedback</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get real-time results and learn from industry experts as you progress
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-violet-200 dark:border-violet-900 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="rounded-full p-2 bg-violet-100 dark:bg-violet-900/30">
                  <svg
                    className="h-5 w-5 text-violet-600 dark:text-violet-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 8L8 16M8 8L16 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold">Competitive Edge</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Stand out to potential employers by proving your skills in a high-stakes environment
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key features list */}
          <div className="w-full max-w-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-xl p-6 border border-violet-200 dark:border-violet-900">
            <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">What to Expect:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-violet-600 dark:text-violet-400">•</span>
                <span className="text-slate-700 dark:text-slate-300">
                  Algorithm optimization challenges that test your logical thinking
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-violet-600 dark:text-violet-400">•</span>
                <span className="text-slate-700 dark:text-slate-300">
                  Real-time debugging sessions with broken code that needs fixing
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-violet-600 dark:text-violet-400">•</span>
                <span className="text-slate-700 dark:text-slate-300">
                  Immediate feedback on your solutions' efficiency and correctness
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-violet-600 dark:text-violet-400">•</span>
                <span className="text-slate-700 dark:text-slate-300">
                  Networking opportunities with industry professionals and like-minded peers
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-violet-600 dark:text-violet-400">•</span>
                <span className="text-slate-700 dark:text-slate-300">
                  Prizes and recognition for top performers in various categories
                </span>
              </li>
            </ul>
          </div>

          {/* Call to action */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
            >
              Prove Your Skills
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-900/30"
            >
              Learn More
            </Button>
          </div>

          {/* Cambrian branding */}
          <p className="text-sm text-slate-500 dark:text-slate-400 pt-8 border-t border-slate-200 dark:border-slate-800 w-full max-w-2xl">
            Cambrian is a forward-thinking, innovation-driven space that values practical coding ability and sharp
            thinking. Our Open Day challenges reflect the real-world problems developers face daily.
          </p>
        </div>
      </div>
    </div>
  )
}

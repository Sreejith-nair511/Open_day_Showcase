import Link from "next/link"
import { Terminal, Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Terminal className="h-5 w-5 text-primary" />
              <span className="font-bold">Cambrian Open Day</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Debug. Code. Conquer. Join the ultimate coding challenge on April 20th, 2025.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Event</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-muted-foreground hover:text-primary">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/prizes" className="text-muted-foreground hover:text-primary">
                  Prizes
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Challenges</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/challenge" className="text-muted-foreground hover:text-primary">
                  Challenge Zone
                </Link>
              </li>
              <li>
                <Link href="/practice" className="text-muted-foreground hover:text-primary">
                  Debug Lab
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-muted-foreground hover:text-primary">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-muted-foreground hover:text-primary">
                  Rules
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">contact@cambrianday.com</span>
              </li>
              <li>
                <Link href="/discord" className="text-muted-foreground hover:text-primary">
                  Join Discord
                </Link>
              </li>
              <li>
                <Link href="/telegram" className="text-muted-foreground hover:text-primary">
                  Telegram Group
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Cambrian Open Day. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GamepadIcon as GameController, Home, Trophy, UserPlus } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      href: "/register",
      label: "Register",
      active: pathname === "/register",
      icon: <UserPlus className="h-4 w-4 mr-2" />,
    },
    {
      href: "/arcade",
      label: "Arcade",
      active: pathname === "/arcade",
      icon: <GameController className="h-4 w-4 mr-2" />,
    },
    {
      href: "/leaderboard",
      label: "Leaderboard",
      active: pathname === "/leaderboard",
      icon: <Trophy className="h-4 w-4 mr-2" />,
    },
  ]

  return (
    <nav className="flex items-center space-x-2 lg:space-x-4">
      {routes.map((route) => (
        <Button key={route.href} variant={route.active ? "default" : "ghost"} size="sm" asChild>
          <Link href={route.href} className="flex items-center">
            {route.icon}
            {route.label}
          </Link>
        </Button>
      ))}
    </nav>
  )
}


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function useGameState(gameName: string) {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("arcade-user")
    if (!storedUser) {
      toast({
        title: "Login required",
        description: "Please login to play games",
        variant: "destructive",
      })
      router.push("/register")
      return
    }

    setUser(JSON.parse(storedUser))
    setIsLoading(false)
  }, [router, toast])

  const saveScore = async (score: number) => {
    if (!user) return

    try {
      const response = await fetch("/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          game: gameName,
          score,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Score saved!",
          description: `You scored ${score} points in ${gameName}`,
        })
      } else {
        toast({
          title: "Error saving score",
          description: data.message || "Please try again",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error saving score",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  return { user, isLoading, saveScore }
}


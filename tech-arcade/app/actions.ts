"use server"

import { revalidatePath } from "next/cache"

type User = {
  id: string
  name: string
  email: string
  phone: string
}

// In a real app, this would be a database
const users: User[] = []

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string

  if (!name || !email) {
    return { success: false, message: "Name and email are required" }
  }

  // Generate a unique player ID
  const id = `P${Math.floor(100000 + Math.random() * 900000)}`

  const newUser = { id, name, email, phone }
  users.push(newUser)

  revalidatePath("/")
  return { success: true, user: newUser }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("login-email") as string
  const playerId = formData.get("player-id") as string

  if (!email || !playerId) {
    return { success: false, message: "Email and player ID are required" }
  }

  const user = users.find((u) => u.email === email && u.id === playerId)

  if (!user) {
    return { success: false, message: "Invalid email or player ID" }
  }

  revalidatePath("/")
  return { success: true, user }
}

// In a real app, this would be a database
const scores: { userId: string; game: string; score: number; date: string }[] = []

export async function saveScore(userId: string, game: string, score: number) {
  const date = new Date().toISOString()
  scores.push({ userId, game, score, date })
  revalidatePath("/leaderboard")
  return { success: true }
}

export async function getLeaderboard(game?: string) {
  let filteredScores = scores

  if (game) {
    filteredScores = scores.filter((s) => s.game === game)
  }

  // Sort by score (highest first)
  filteredScores.sort((a, b) => b.score - a.score)

  // Get top 15
  const topScores = filteredScores.slice(0, 15)

  // Get user details for each score
  const leaderboard = topScores.map((score) => {
    const user = users.find((u) => u.id === score.userId)
    return {
      id: score.userId,
      name: user ? user.name : "Unknown Player",
      score: score.score,
      game: score.game,
      date: score.date,
    }
  })

  return { success: true, leaderboard }
}


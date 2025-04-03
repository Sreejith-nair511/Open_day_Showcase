import { NextResponse } from "next/server"
import { saveScore } from "@/app/actions"

export async function POST(request: Request) {
  const body = await request.json()
  const { userId, game, score } = body

  if (!userId || !game || score === undefined) {
    return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
  }

  const result = await saveScore(userId, game, score)

  return NextResponse.json(result)
}


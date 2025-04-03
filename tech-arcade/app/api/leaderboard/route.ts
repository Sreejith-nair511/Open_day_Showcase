import { NextResponse } from "next/server"
import { getLeaderboard } from "@/app/actions"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const game = searchParams.get("game") || undefined

  const result = await getLeaderboard(game)

  return NextResponse.json(result)
}


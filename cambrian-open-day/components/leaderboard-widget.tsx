import { Trophy, Medal } from "lucide-react"

export default function LeaderboardWidget() {
  const leaderboardData = [
    { rank: 1, name: "codemaster42", score: 950, avatar: "CM" },
    { rank: 2, name: "debugQueen", score: 920, avatar: "DQ" },
    { rank: 3, name: "algorithmKing", score: 890, avatar: "AK" },
    { rank: 4, name: "byteCoder", score: 850, avatar: "BC" },
    { rank: 5, name: "hackNinja", score: 820, avatar: "HN" },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4 text-yellow-500" />
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />
      case 3:
        return <Medal className="h-4 w-4 text-amber-700" />
      default:
        return <span className="text-sm font-medium">{rank}</span>
    }
  }

  return (
    <div className="space-y-4">
      {leaderboardData.map((user) => (
        <div key={user.rank} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-6">{getRankIcon(user.rank)}</div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                {user.avatar}
              </div>
              <span className="font-medium">{user.name}</span>
            </div>
          </div>
          <span className="font-mono">{user.score}</span>
        </div>
      ))}
      <div className="pt-4 border-t">
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-6">
              <span className="text-sm font-medium">42</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                YO
              </div>
              <span className="font-medium">You</span>
            </div>
          </div>
          <span className="font-mono">580</span>
        </div>
      </div>
    </div>
  )
}

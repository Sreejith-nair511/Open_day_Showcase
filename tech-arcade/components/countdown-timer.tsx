"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const eventDate = new Date("April 19, 2025 09:00:00").getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate - now

      if (distance < 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Event Starts In</h2>
      <div className="grid grid-cols-4 gap-4">
        <TimeCard value={timeLeft.days} label="Days" />
        <TimeCard value={timeLeft.hours} label="Hours" />
        <TimeCard value={timeLeft.minutes} label="Minutes" />
        <TimeCard value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  )
}

function TimeCard({ value, label }: { value: number; label: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-4">
        <span className="text-3xl font-bold">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </CardContent>
    </Card>
  )
}


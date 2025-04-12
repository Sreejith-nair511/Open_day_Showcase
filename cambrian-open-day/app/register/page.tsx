"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Check, Users } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    college: "",
    year: "",
    github: "",
    joinDiscord: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, joinDiscord: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-md mx-auto">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Register for Cambrian Open Day</h1>
              <p className="text-muted-foreground">Join us on April 20th, 2025 for a day of coding challenges</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Registration Form</CardTitle>
                <CardDescription>Fill out the form below to secure your spot</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="college">College/University</Label>
                    <Input
                      id="college"
                      name="college"
                      placeholder="Tech University"
                      required
                      value={formState.college}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Year of Study</Label>
                    <Input
                      id="year"
                      name="year"
                      placeholder="3rd Year"
                      value={formState.year}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Username (Optional)</Label>
                    <Input
                      id="github"
                      name="github"
                      placeholder="johndoe"
                      value={formState.github}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="discord" checked={formState.joinDiscord} onCheckedChange={handleCheckboxChange} />
                    <Label htmlFor="discord" className="text-sm font-normal">
                      Join our Discord server for updates and announcements
                    </Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register Now"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>248 users registered so far</span>
              </div>
            </div>
          </>
        ) : (
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Registration Successful!</CardTitle>
              <CardDescription>You're all set for Cambrian Open Day 2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Thank you for registering, {formState.name}! We've sent a confirmation email to {formState.email} with
                all the details.
              </p>
              <div className="rounded-md bg-muted p-4">
                <p className="font-medium">Your Participant ID</p>
                <p className="font-mono text-xl mt-1">COD-{Math.floor(1000 + Math.random() * 9000)}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Make sure to save your participant ID. You'll need it on the event day.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Link href="/practice" className="w-full">
                <Button className="w-full">
                  Start Practicing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, BookOpen, Cpu, Lightbulb, Gamepad2 } from "lucide-react"

// Event schedule data
const events = [
  {
    id: 1,
    title: "Opening Ceremony",
    description: "Welcome address by the Head of Department and Dean of Cambridge Institute of Technology.",
    time: "09:00 AM - 10:00 AM",
    venue: "Main Auditorium",
    type: "Keynote",
    day: "day1",
    speakers: ["Dr. Rajesh Kumar, HOD", "Dr. Priya Sharma, Dean"],
  },
  {
    id: 2,
    title: "Future of AI in Healthcare",
    description: "Keynote session on how artificial intelligence is transforming healthcare diagnostics and treatment.",
    time: "10:30 AM - 11:30 AM",
    venue: "Seminar Hall 1",
    type: "Keynote",
    day: "day1",
    speakers: ["Dr. Anil Gupta, Microsoft Research"],
  },
  {
    id: 3,
    title: "Hands-on Machine Learning Workshop",
    description: "Interactive workshop on building and training machine learning models for real-world applications.",
    time: "12:00 PM - 02:00 PM",
    venue: "Lab 101",
    type: "Workshop",
    day: "day1",
    speakers: ["Prof. Sanjay Mehta", "Ms. Divya Reddy, Data Scientist"],
  },
  {
    id: 4,
    title: "Blockchain Technology: Beyond Cryptocurrencies",
    description: "Exploring practical applications of blockchain technology in various industries.",
    time: "02:30 PM - 03:30 PM",
    venue: "Seminar Hall 2",
    type: "Keynote",
    day: "day1",
    speakers: ["Mr. Vikram Singh, Blockchain Expert"],
  },
  {
    id: 5,
    title: "IoT Demo: Smart Campus Solutions",
    description: "Live demonstration of IoT projects developed by students for campus automation.",
    time: "04:00 PM - 05:00 PM",
    venue: "Innovation Lab",
    type: "Demo",
    day: "day1",
    speakers: ["Student Project Teams"],
  },
  {
    id: 6,
    title: "Web3 Development Workshop",
    description: "Hands-on session on building decentralized applications using Web3 technologies.",
    time: "09:30 AM - 11:30 AM",
    venue: "Lab 102",
    type: "Workshop",
    day: "day2",
    speakers: ["Prof. Rahul Verma", "Mr. Arjun Nair, Web3 Developer"],
  },
  {
    id: 7,
    title: "AR/VR: Immersive Learning Experiences",
    description: "Keynote on how augmented and virtual reality are transforming education.",
    time: "12:00 PM - 01:00 PM",
    venue: "Seminar Hall 1",
    type: "Keynote",
    day: "day2",
    speakers: ["Dr. Meera Iyer, AR/VR Specialist"],
  },
  {
    id: 8,
    title: "Tech Quiz Competition",
    description: "Test your knowledge of the latest technology trends and win exciting prizes.",
    time: "02:00 PM - 03:30 PM",
    venue: "Main Auditorium",
    type: "Game",
    day: "day2",
    speakers: ["Quiz Master: Prof. Karthik Menon"],
  },
  {
    id: 9,
    title: "Industry-Academia Panel Discussion",
    description: "Bridging the gap between academic curriculum and industry requirements.",
    time: "04:00 PM - 05:00 PM",
    venue: "Seminar Hall 2",
    type: "Panel",
    day: "day2",
    speakers: ["Industry Leaders and Faculty Members"],
  },
  {
    id: 10,
    title: "Closing Ceremony & Award Distribution",
    description: "Concluding the event with recognition of outstanding projects and participants.",
    time: "05:30 PM - 06:30 PM",
    venue: "Main Auditorium",
    type: "Ceremony",
    day: "day2",
    speakers: ["Dr. Rajesh Kumar, HOD", "Chief Guest: Mr. Sunil Mittal, CEO, TechInnovate"],
  },
]

// Event type icons mapping
const eventTypeIcons = {
  Keynote: <Lightbulb className="h-5 w-5" />,
  Workshop: <BookOpen className="h-5 w-5" />,
  Demo: <Cpu className="h-5 w-5" />,
  Game: <Gamepad2 className="h-5 w-5" />,
  Panel: <Users className="h-5 w-5" />,
  Ceremony: <Calendar className="h-5 w-5" />,
}

export default function SchedulePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  // Get unique event types
  const eventTypes = [...new Set(events.map((event) => event.type))]

  // Filter events based on selected type
  const getFilteredEvents = (day: string) => {
    return events
      .filter((event) => event.day === day)
      .filter((event) => (selectedType ? event.type === selectedType : true))
  }

  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Event Schedule</h1>
        <p className="text-xl text-muted-foreground">
          Plan your visit to the ISE Open House 2025 with our comprehensive event schedule.
        </p>
      </div>

      {/* Event Type Filter */}
      <div className="flex flex-wrap gap-2">
        <Button variant={selectedType === null ? "default" : "outline"} onClick={() => setSelectedType(null)}>
          All Events
        </Button>
        {eventTypes.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => setSelectedType(type === selectedType ? null : type)}
          >
            {eventTypeIcons[type]}
            {type}
          </Button>
        ))}
      </div>

      {/* Day Tabs */}
      <Tabs defaultValue="day1" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="day1">Day 1 (April 19, 2025)</TabsTrigger>
          <TabsTrigger value="day2">Day 2 (April 20, 2025)</TabsTrigger>
        </TabsList>

        <TabsContent value="day1" className="space-y-6 pt-6">
          <h2 className="text-2xl font-bold">Day 1 Schedule</h2>

          <div className="space-y-4">
            {getFilteredEvents("day1").length > 0 ? (
              getFilteredEvents("day1").map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <p className="text-center py-8 text-muted-foreground">No events found for the selected filter.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="day2" className="space-y-6 pt-6">
          <h2 className="text-2xl font-bold">Day 2 Schedule</h2>

          <div className="space-y-4">
            {getFilteredEvents("day2").length > 0 ? (
              getFilteredEvents("day2").map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <p className="text-center py-8 text-muted-foreground">No events found for the selected filter.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Venue Map */}
      <section className="pt-12">
        <h2 className="text-2xl font-bold mb-6">Venue Map</h2>
        <div className="bg-muted aspect-video rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Interactive Campus Map Coming Soon</p>
        </div>
      </section>

      {/* Navigation Assistance */}
      <section className="py-8 bg-muted/50 rounded-lg">
        <div className="container space-y-6">
          <h2 className="text-2xl font-bold text-center">Navigation Assistance</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Need help finding your way around? Our volunteers will be available throughout the venue to assist you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Main Auditorium
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Located in the Main Building, Ground Floor. Follow the signs from the main entrance.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Seminar Halls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Located in the Academic Block, First Floor. Take the stairs or elevator from the main lobby.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Labs & Innovation Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Located in the Technology Block, Second Floor. Follow the blue line from the main entrance.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

interface Event {
  id: number
  title: string
  description: string
  time: string
  venue: string
  type: string
  day: string
  speakers: string[]
}

function EventCard({ event }: { event: Event }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {eventTypeIcons[event.type]}
              {event.title}
            </CardTitle>
            <CardDescription className="mt-1">{event.type}</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {event.time}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{event.description}</p>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.venue}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{event.speakers.join(", ")}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" size="sm">
            Add to Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


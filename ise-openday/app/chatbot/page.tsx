"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, User, RefreshCw } from "lucide-react"

// Chatbot FAQ data
const faqData = [
  {
    question: "What is the ISE Open House?",
    answer:
      "The ISE Open House is an exclusive showcase of innovation, achievements, and student-led breakthroughs from the Information Science & Engineering Department at Cambridge Institute of Technology. It's a chance to explore cutting-edge work, interact with industry experts, and witness the future of technology.",
  },
  {
    question: "When and where is the event?",
    answer:
      "The event will be held on April 19, 2025, at Cambridge Institute of Technology. Entry is free for all attendees.",
  },
  {
    question: "How can I register for the event?",
    answer:
      "You can register for the event by filling out the registration form on the home page of our website. You'll receive updates and important information about the event.",
  },
  {
    question: "What are the main attractions of the Open House?",
    answer:
      "The main attractions include a showcase of student projects, technical workshops, keynote sessions by industry experts, interactive demos, tech quizzes with prizes, and networking opportunities with faculty and industry professionals.",
  },
  {
    question: "Are there any workshops during the event?",
    answer:
      "Yes, there will be several hands-on technical workshops on topics like Machine Learning, Web3 Development, IoT, and more. Check the schedule page for details.",
  },
  {
    question: "Can I participate in the Tech Quiz?",
    answer:
      "The ISE Tech Quiz is open to all attendees. You can test your knowledge of the latest technology trends and win exciting prizes. Visit the Quiz page to learn more.",
  },
  {
    question: "What projects will be showcased?",
    answer:
      "Projects span various domains including AI/ML, IoT, Blockchain, Web Development, AR/VR, and Sustainable Tech. Visit the Projects page to explore the full range of innovations.",
  },
  {
    question: "Is there parking available at the venue?",
    answer: "Yes, there is ample parking available at Cambridge Institute of Technology for all attendees.",
  },
  {
    question: "Will refreshments be provided?",
    answer: "Yes, refreshments will be available throughout the event for all attendees.",
  },
  {
    question: "How can I contact the organizers?",
    answer: "You can contact the organizers via email at ise@cambrian.edu or by phone at +91 123 456 7890.",
  },
]

// Message type
interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm the ISE Open House Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Suggested questions
  const suggestedQuestions = [
    "When is the Open House?",
    "What projects will be showcased?",
    "How can I register?",
    "Are there any workshops?",
  ]

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle sending a message
  const handleSendMessage = async (content: string = input) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate API call to get response
    setTimeout(() => {
      const botResponse = getBotResponse(content)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  // Get bot response based on user input
  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Check for matches in FAQ data
    for (const faq of faqData) {
      const question = faq.question.toLowerCase()
      if (
        input.includes(question) ||
        question.includes(input) ||
        input.split(" ").some((word) => question.includes(word) && word.length > 3)
      ) {
        return faq.answer
      }
    }

    // Check for common greetings
    if (input.match(/hello|hi|hey|greetings/i)) {
      return "Hello! I'm the ISE Open House Assistant. How can I help you with information about the event?"
    }

    // Check for thanks
    if (input.match(/thanks|thank you|thx/i)) {
      return "You're welcome! Is there anything else you'd like to know about the ISE Open House?"
    }

    // Check for event date/time
    if (input.match(/when|date|time|schedule/i)) {
      return "The ISE Open House will be held on April 19, 2025, at Cambridge Institute of Technology. Check the Schedule page for the detailed program."
    }

    // Check for location
    if (input.match(/where|location|venue|place/i)) {
      return "The event will take place at Cambridge Institute of Technology. You can find directions and a venue map on the Schedule page."
    }

    // Check for registration
    if (input.match(/register|registration|sign up|join/i)) {
      return "You can register for the event by filling out the registration form on the home page. Registration is free and will give you updates about the event."
    }

    // Check for projects
    if (input.match(/project|showcase|demo|presentation/i)) {
      return "The Open House will feature various student projects in AI/ML, IoT, Blockchain, Web Development, AR/VR, and Sustainable Tech. Visit the Projects page to learn more."
    }

    // Check for workshops
    if (input.match(/workshop|session|class|learn/i)) {
      return "There will be several hands-on technical workshops during the event, including Machine Learning, Web3 Development, and IoT. Check the Schedule page for details."
    }

    // Check for quiz
    if (input.match(/quiz|competition|contest|prize/i)) {
      return "The ISE Tech Quiz is a fun competition where you can test your knowledge and win exciting prizes. Visit the Quiz page to participate or learn more."
    }

    // Default response
    return "I'm not sure I understand your question. Could you rephrase it or check out our FAQ section? You can also ask about event details, registration, projects, workshops, or the tech quiz."
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage()
  }

  // Clear chat history
  const clearChat = () => {
    setMessages([
      {
        id: "1",
        content: "Hello! I'm the ISE Open House Assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">AI Chatbot Assistant</h1>
          <p className="text-xl text-muted-foreground">Get instant answers about the ISE Open House 2025 event.</p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Bot Avatar" />
                <AvatarFallback>
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>ISE Open House Assistant</CardTitle>
                <CardDescription>Ask me anything about the event</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex gap-3 max-w-[80%]">
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot Avatar" />
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot Avatar" />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
              <Button type="button" size="icon" variant="outline" onClick={clearChat}>
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Clear chat</span>
              </Button>
            </form>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Suggested Questions</h2>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button key={index} variant="outline" onClick={() => handleSendMessage(question)}>
                {question}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqData.slice(0, 6).map((faq, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSendMessage(faq.question)}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{faq.question}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


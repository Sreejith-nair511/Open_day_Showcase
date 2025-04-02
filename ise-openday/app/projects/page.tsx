"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Code, Cpu, Globe, Database, Layers, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"

// Projects data
const projects = [
  {
    id: 1,
    title: "AI-Powered Health Diagnostics",
    description: "Machine learning model for early disease detection using medical imaging.",
    category: "AI/ML",
    team: ["Aditya Sharma", "Priya Patel"],
    image: "/placeholder.svg?height=200&width=400",
    demoAvailable: true,
    tags: ["TensorFlow", "Computer Vision", "Healthcare"],
  },
  {
    id: 2,
    title: "Smart Campus IoT Network",
    description: "IoT system for monitoring and optimizing energy usage across campus buildings.",
    category: "IoT",
    team: ["Neha Singh", "Vikram Reddy"],
    image: "/placeholder.svg?height=200&width=400",
    demoAvailable: true,
    tags: ["Arduino", "Sensors", "Energy Management"],
  },
  {
    id: 3,
    title: "Blockchain-based Academic Credentials",
    description: "Secure and verifiable academic credential system using blockchain technology.",
    category: "Blockchain",
    team: ["Rahul Verma", "Sanjay Kumar"],
    image: "/placeholder.svg?height=200&width=400",
    demoAvailable: false,
    tags: ["Ethereum", "Smart Contracts", "Education"],
  },
  {
    id: 4,
    title: "Augmented Reality Campus Tour",
    description: "AR application that provides an interactive tour of the campus facilities.",
    category: "AR/VR",
    team: ["Divya Sharma", "Arjun Nair"],
    image: "/placeholder.svg?height=200&width=400",
    demoAvailable: true,
    tags: ["Unity", "AR Foundation", "Mobile App"],
  },
  {
    id: 5,
    title: "Sustainable Agriculture Monitoring",
    description: "IoT-based system for monitoring soil health and optimizing water usage in agriculture.",
    category: "IoT",
    team: ["Meera Iyer", "Sameer Khan"],
    image: "/placeholder.svg?height=200&width=400",
    demoAvailable: true,
    tags: ["Raspberry Pi", "Sensors", "Sustainability"],
  },
  {
    id: 6,
    title: "Personalized Learning Platform",
    description: "Web application that adapts educational content based on student learning patterns.",
    category: "Web",
    team: ["Tanya Gupta", "Rohan Joshi"],
    image: "/placeholder.svg?height=200&width=400",
    demoAvailable: false,
    tags: ["React", "Node.js", "Education"],
  },
  {
    id: 7,
    title: "Natural Language Processing for Local Languages",
    description: "NLP models for understanding and processing Indian regional languages.",
    category: "AI/ML",
    team: ["Karthik Menon", "Ananya Desai"],
    image: "/placeholder.svg?height=200&width=400",
    demoAvailable: true,
    tags: ["NLP", "BERT", "Linguistics"],
  },
  {
    id: 8,
    title: "Decentralized File Storage System",
    description: "Secure and distributed file storage system using blockchain technology.",
    category: "Blockchain",
    team: ["Varun Kapoor", "Sneha Reddy"],
    image: "/placeholder.svg?height=200&width=400",
    demoAvailable: false,
    tags: ["IPFS", "Filecoin", "Storage"],
  },
]

// Category icons mapping
const categoryIcons = {
  "AI/ML": <Cpu className="h-5 w-5" />,
  IoT: <Zap className="h-5 w-5" />,
  Blockchain: <Database className="h-5 w-5" />,
  Web: <Globe className="h-5 w-5" />,
  "AR/VR": <Layers className="h-5 w-5" />,
  All: <Code className="h-5 w-5" />,
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showDemoOnly, setShowDemoOnly] = useState(false)

  // Get unique categories
  const categories = ["All", ...new Set(projects.map((project) => project.category))]

  // Filter projects based on search, category, and demo availability
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory

    const matchesDemo = !showDemoOnly || project.demoAvailable

    return matchesSearch && matchesCategory && matchesDemo
  })

  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Project Showcase</h1>
        <p className="text-xl text-muted-foreground">
          Explore cutting-edge research and innovation projects by our students and faculty.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Button
            variant={showDemoOnly ? "default" : "outline"}
            className="gap-2"
            onClick={() => setShowDemoOnly(!showDemoOnly)}
          >
            <Filter className="h-4 w-4" />
            {showDemoOnly ? "Showing Demo Only" : "Show All"}
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="flex items-center gap-2">
              {categoryIcons[category]}
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="pt-6">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden flex flex-col">
                  <div className="relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    {project.demoAvailable && (
                      <Badge className="absolute top-2 right-2" variant="secondary">
                        Live Demo Available
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      {categoryIcons[project.category]}
                      <span>{project.category}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    <p>{project.description}</p>
                    <div>
                      <h4 className="font-medium mb-1">Team:</h4>
                      <p className="text-sm text-muted-foreground">{project.team.join(", ")}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" disabled={!project.demoAvailable}>
                      {project.demoAvailable ? "View Demo" : "Demo Coming Soon"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                  setShowDemoOnly(false)
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Sustainable Tech Innovations */}
      <section className="py-12 bg-muted/50 rounded-lg mt-12">
        <div className="container space-y-8">
          <h2 className="text-3xl font-bold text-center">Sustainable Tech Innovations</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto">
            Our department is committed to developing technology solutions that address environmental challenges and
            promote sustainability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Renewable Energy Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Smart grid solutions for monitoring and optimizing renewable energy sources on campus.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Water Conservation System</CardTitle>
              </CardHeader>
              <CardContent>
                <p>IoT-based water management system that reduces wastage and promotes conservation.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>E-Waste Management Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Blockchain-based platform for tracking and managing electronic waste recycling.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"

export default function Page() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      title: "Daily Editorials",
      description: "Comprehensive analysis of current affairs with expert insights",
      icon: "📰",
    },
    {
      title: "Smart Quizzes",
      description: "AI-generated questions based on editorial content",
      icon: "🧠",
    },
    {
      title: "Progress Tracking",
      description: "Visual calendar to track your daily learning journey",
      icon: "📊",
    },
    {
      title: "Vocabulary Builder",
      description: "Bilingual definitions and contextual examples",
      icon: "📚",
    },
  ]

  const stats = [
    { value: "500+", label: "Daily Readers", company: "SSC Aspirants" },
    { value: "95%", label: "Success Rate", company: "Previous Year" },
    { value: "50+", label: "Topics Covered", company: "Monthly" },
    { value: "24/7", label: "Access Available", company: "Study Anytime" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">SSC Prep</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/editorials" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/calendar" className="text-muted-foreground hover:text-foreground transition-colors">
                Calendar
              </Link>
              <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                Profile
              </Link>
               <Link href="/pyqs" className="text-muted-foreground hover:text-foreground transition-colors">
                PYQs
              </Link>
            </nav>
            <div className="flex space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Import Progress
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance mb-6">
                The complete platform to ace your <span className="text-primary">SSC exams.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Your comprehensive toolkit to stop struggling and start succeeding. Master current affairs, build
                vocabulary, and track progress with our student-friendly platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/editorials">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Start Learning
                  </button>
                </Link>
                <Link href="/calendar">
                  <button className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors">
                    View Progress
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Today's Progress</h3>
                  <span className="text-sm text-muted-foreground">Sep 25, 2025</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Editorial Reading</span>
                    <div className="w-24 h-2 bg-secondary rounded-full">
                      <div className="w-3/4 h-2 bg-primary rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quiz Completion</span>
                    <div className="w-24 h-2 bg-secondary rounded-full">
                      <div className="w-1/2 h-2 bg-primary rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vocabulary</span>
                    <div className="w-24 h-2 bg-secondary rounded-full">
                      <div className="w-5/6 h-2 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                Master your preparation. <span className="text-primary">Track your progress.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                The platform for rapid progress. Let your focus stay on learning instead of managing study materials
                with automated progress tracking, built-in testing, and integrated vocabulary building.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      activeFeature === index ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{features[activeFeature].icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{features[activeFeature].title}</h3>
                  <p className="text-muted-foreground">{features[activeFeature].description}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <span className="text-sm">Feature Demo</span>
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <span className="text-sm">Interactive Elements</span>
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Ready to transform your SSC preparation?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Join thousands of successful candidates who have used our platform to achieve their civil service dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/editorials">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Start Learning Today
              </button>
            </Link>
            <button className="px-8 py-4 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors">
              Export Progress
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold">SSC Prep</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your comprehensive platform for SSC and civil service exam preparation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/editorials" className="hover:text-foreground transition-colors">
                    Daily Editorials
                  </Link>
                </li>
                <li>
                  <Link href="/calendar" className="hover:text-foreground transition-colors">
                    Progress Calendar
                  </Link>
                </li>
                <li>
                  <Link href="/notes" className="hover:text-foreground transition-colors">
                    Notes & Bookmarks
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="hover:text-foreground transition-colors">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Quiz Generator</li>
                <li>Vocabulary Builder</li>
                <li>Progress Tracking</li>
                <li>Import/Export Data</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Study Tips</li>
                <li>Exam Updates</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 SSC Prep. All rights reserved. Built for students, by students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

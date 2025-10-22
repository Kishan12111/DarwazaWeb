"use client"

import { useState } from "react"
import Link from "next/link"

export default function Page() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      title: "GATE PYQ Analysis",
      description:
        "Access topic-wise previous year questions with solutions, difficulty levels, and trend analysis to understand exam patterns deeply.",
      icon: "📘",
    },
    {
      title: "Smart Practice Mode",
      description:
        "Solve PYQs like a live test, with AI-powered hints, instant evaluation, and subject filters for focused revision.",
      icon: "⚡",
    },
    {
      title: "Performance Tracking",
      description:
        "Monitor your accuracy, weak topics, and time management with interactive analytics and progress visualization.",
      icon: "📊",
    },
    {
      title: "Resource Integration",
      description:
        "Quickly link PYQs with standard textbooks, reference notes, and related theory for efficient concept brushing.",
      icon: "🧩",
    },
  ]

  const stats = [
    { value: "10,000+", label: "PYQs Available", company: "All GATE Subjects" },
    { value: "25+", label: "Years Covered", company: "2000–2025" },
    { value: "99%", label: "Authenticity", company: "Verified by Experts" },
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
                <span className="text-primary-foreground font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold">GATE PYQ Hub</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/pyqs" className="text-muted-foreground hover:text-foreground transition-colors">
                PYQs
              </Link>
              <Link href="/subjects" className="text-muted-foreground hover:text-foreground transition-colors">
                Subjects
              </Link>
              <Link href="/progress" className="text-muted-foreground hover:text-foreground transition-colors">
                Progress
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </nav>
            <div className="flex space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Import Progress
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Start Practicing
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
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Crack <span className="text-primary">GATE</span> with Precision —
                <br /> One PYQ at a Time.
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Stop juggling PDFs and random notes. Access organized, topic-wise GATE PYQs, track your improvement, and
                prepare smarter with AI-powered insights — all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pyqs">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Start Solving PYQs
                  </button>
                </Link>
                <Link href="/progress">
                  <button className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors">
                    View Analytics
                  </button>
                </Link>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Example Snapshot</h3>
              <div className="space-y-3">
                <div className="p-3 bg-secondary rounded-lg flex justify-between items-center">
                  <span>Network Theorems (2022)</span>
                  <span className="text-primary font-medium">Correct: 85%</span>
                </div>
                <div className="p-3 bg-secondary rounded-lg flex justify-between items-center">
                  <span>Signals & Systems (2021)</span>
                  <span className="text-primary font-medium">Correct: 78%</span>
                </div>
                <div className="p-3 bg-secondary rounded-lg flex justify-between items-center">
                  <span>Analog Circuits (2023)</span>
                  <span className="text-primary font-medium">Correct: 92%</span>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Study Smarter, Not Harder.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                GATE preparation doesn’t have to be chaotic. This website helps you organize, analyze, and master every
                topic by connecting PYQs, insights, and analytics into one clean experience.
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
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{features[activeFeature].icon}</div>
                <h3 className="text-xl font-semibold mb-2">{features[activeFeature].title}</h3>
                <p className="text-muted-foreground">{features[activeFeature].description}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm">Interactive Mode</span>
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm">Smart Insights</span>
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to level up your GATE preparation?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of aspirants who use GATE PYQ Hub to analyze, learn, and perfect their exam strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pyqs">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Start Practicing Now
              </button>
            </Link>
            <button className="px-8 py-4 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors">
              Track My Progress
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
                  <span className="text-primary-foreground font-bold text-lg">G</span>
                </div>
                <span className="text-xl font-bold">GATE PYQ Hub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted preparation companion for mastering GATE with data-driven learning and analysis.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/pyqs" className="hover:text-foreground">PYQs</Link></li>
                <li><Link href="/subjects" className="hover:text-foreground">Subjects</Link></li>
                <li><Link href="/progress" className="hover:text-foreground">Progress</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Smart Filters</li>
                <li>AI Insights</li>
                <li>Trend Graphs</li>
                <li>Topic Analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>FAQs</li>
                <li>Exam Updates</li>
                <li>Community</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 GATE PYQ Hub. All rights reserved. Built for engineers, by engineers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

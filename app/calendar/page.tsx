"use client"

import { useState } from "react"
import Link from "next/link"
import CalendarSidebar from "../../components/CalendarSidebar"
import ProgressBar from "../../components/ProgressBar"

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">SSC Prep</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/editorials" className="text-muted-foreground hover:text-foreground transition-colors">
                Editorials
              </Link>
              <Link href="/calendar" className="text-primary font-medium">
                Calendar
              </Link>
              <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                Profile
              </Link>
            </nav>
            <div className="flex space-x-4">
              <Link href="/bookmarks">
                <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  My Notes
                </button>
              </Link>
              <Link href="/editorials">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  Start Learning
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Progress Calendar</h1>
            <p className="text-lg text-muted-foreground">
              Track your daily learning progress and maintain your study streak.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Progress Overview */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <ProgressBar type="daily" />
                <ProgressBar type="weekly" />
              </div>

              {/* Study Insights */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Study Insights</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Best Study Days</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Monday</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-secondary rounded-full">
                            <div className="w-3/4 h-2 bg-primary rounded-full" />
                          </div>
                          <span className="text-xs text-muted-foreground">75%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Tuesday</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-secondary rounded-full">
                            <div className="w-4/5 h-2 bg-primary rounded-full" />
                          </div>
                          <span className="text-xs text-muted-foreground">80%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Wednesday</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-secondary rounded-full">
                            <div className="w-3/5 h-2 bg-primary rounded-full" />
                          </div>
                          <span className="text-xs text-muted-foreground">60%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Study Categories</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Governance</span>
                        <span className="text-xs text-muted-foreground">12 articles</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Environment</span>
                        <span className="text-xs text-muted-foreground">8 articles</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Education</span>
                        <span className="text-xs text-muted-foreground">6 articles</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-2xl mb-2">🔥</div>
                    <div className="font-medium">7-Day Streak</div>
                    <div className="text-xs text-muted-foreground">Keep it up!</div>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-2xl mb-2">📚</div>
                    <div className="font-medium">Quiz Master</div>
                    <div className="text-xs text-muted-foreground">10 perfect scores</div>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-2xl mb-2">⭐</div>
                    <div className="font-medium">Early Bird</div>
                    <div className="text-xs text-muted-foreground">Morning studies</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Sidebar */}
            <div className="lg:col-span-1">
              <CalendarSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold">SSC Prep</span>
          </div>
          <p className="text-sm text-muted-foreground">Track your progress and achieve your SSC exam goals.</p>
        </div>
      </footer>
    </div>
  )
}

import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div>
         <header className="border-b border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">D</span>
                    </div>
                    <span className="text-xl font-bold">Darwaza</span>
                  </div>
                  <nav className="hidden md:flex space-x-8">
                    <Link href="/editorials" className="text-muted-foreground hover:text-foreground transition-colors">
Paper                    </Link>
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
    </div>
  )
}

export default Header

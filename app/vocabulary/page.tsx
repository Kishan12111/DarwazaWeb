import Link from "next/link"

export default function VocabularyPage() {
  const vocabularyWords = [
    {
      word: "Governance",
      meaning: "The action or manner of governing a state, organization, etc.",
      context: "Good governance is essential for economic development.",
      category: "Politics",
    },
    {
      word: "Sustainable",
      meaning: "Able to be maintained at a certain rate or level without depleting resources.",
      context: "Sustainable development meets present needs without compromising future generations.",
      category: "Environment",
    },
    {
      word: "Bureaucracy",
      meaning:
        "A system of government in which decisions are made by state officials rather than elected representatives.",
      context: "The bureaucracy plays a crucial role in policy implementation.",
      category: "Administration",
    },
  ]

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
              <Link href="/calendar" className="text-muted-foreground hover:text-foreground transition-colors">
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Vocabulary Builder</h1>
            <p className="text-lg text-muted-foreground">
              Expand your vocabulary with words commonly used in SSC exams and editorial content.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search vocabulary..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">All Categories</option>
              <option value="politics">Politics</option>
              <option value="environment">Environment</option>
              <option value="administration">Administration</option>
              <option value="economics">Economics</option>
            </select>
          </div>

          {/* Vocabulary Grid */}
          <div className="grid gap-6">
            {vocabularyWords.map((item, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{item.word}</h3>
                    <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-foreground mb-3">{item.meaning}</p>
                <div className="bg-secondary p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Example:</p>
                  <p className="text-sm italic">"{item.context}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add More Button */}
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Load More Words
            </button>
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
          <p className="text-sm text-muted-foreground">Build your vocabulary and improve your language skills.</p>
        </div>
      </footer>
    </div>
  )
}

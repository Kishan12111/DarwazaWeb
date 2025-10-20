import Header from "@/components/Header"
import Link from "next/link"

export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">My Bookmarks & Notes</h1>
            <p className="text-lg text-muted-foreground">
              Access your saved articles, notes, and important vocabulary.
            </p>
          </div>

          <div className="grid gap-6">
            {/* Bookmarked Articles */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Bookmarked Articles</h2>
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-lg font-medium mb-2">No bookmarks yet</h3>
                <p className="text-muted-foreground mb-4">Start bookmarking articles to access them quickly later.</p>
                <Link href="/editorials">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    Browse Editorials
                  </button>
                </Link>
              </div>
            </div>

            {/* Personal Notes */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Personal Notes</h2>
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-medium mb-2">No notes yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create notes while reading articles to enhance your learning.
                </p>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                  Create First Note
                </button>
              </div>
            </div>

            {/* Vocabulary */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Saved Vocabulary</h2>
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📖</div>
                <h3 className="text-lg font-medium mb-2">No vocabulary saved</h3>
                <p className="text-muted-foreground mb-4">
                  Save important words and their meanings for quick reference.
                </p>
                <Link href="/vocabulary">
                  <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                    Explore Vocabulary
                  </button>
                </Link>
              </div>
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
          <p className="text-sm text-muted-foreground">Organize your learning materials and track your progress.</p>
        </div>
      </footer>
    </div>
  )
}

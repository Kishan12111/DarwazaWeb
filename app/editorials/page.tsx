import { getAllEditorials } from "../../utils/contentParser"
import EditorialCard from "../../components/EditorialCard"
import Link from "next/link"

export default async function EditorialsPage() {
  const editorials = getAllEditorials()
  const categories = [...new Set(editorials.map((e) => e.frontmatter.category))].filter(Boolean)
  const allTags = [...new Set(editorials.flatMap((e) => e.frontmatter.tags || []))].filter(Boolean)

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
              <Link href="/editorials" className="text-primary font-medium">
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
              <Link href="/bookmarks">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  Bookmarks
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Daily Editorial Analysis</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Comprehensive analysis of current affairs with expert insights, vocabulary building, and interactive
              quizzes to enhance your SSC preparation.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{editorials.length}</div>
              <div className="text-sm text-muted-foreground">Total Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{allTags.length}</div>
              <div className="text-sm text-muted-foreground">Topics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 8).map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 border border-border rounded-full text-sm hover:border-primary hover:text-primary transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Grid */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {editorials.map((editorial) => (
              <EditorialCard key={editorial.slug} editorial={editorial} />
            ))}
          </div>

          {editorials.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">No editorials found</h3>
              <p className="text-muted-foreground">Check back soon for new editorial content and analysis.</p>
            </div>
          )}
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
          <p className="text-sm text-muted-foreground">
            Empowering students with comprehensive editorial analysis and exam preparation tools.
          </p>
        </div>
      </footer>
    </div>
  )
}

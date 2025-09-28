import Link from "next/link"
import UserProfile from "../../components/UserProfile"
import { getAllEditorials } from "../../utils/contentParser"
import EditorialCard from "../../components/EditorialCard"

export default function ProfilePage() {
    const editorials = getAllEditorials()
    const categories = [...new Set(editorials.map((e) => e.frontmatter.category))].filter(Boolean)
  const allTags = [...new Set(editorials.flatMap((e) => e.frontmatter.tags || []))].filter(Boolean)
  
  return (
    <div>
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
      <UserProfile />
      </div>
  )
}

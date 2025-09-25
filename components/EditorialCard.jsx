import Link from "next/link"
import { formatDate, getReadingTime } from "../utils/contentParser"

export default function EditorialCard({ editorial }) {
  const { slug, frontmatter, content } = editorial
  const readingTime = getReadingTime(content)

  return (
    <article className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            {frontmatter.category}
          </span>
          <span className="text-sm text-muted-foreground">{readingTime} min read</span>
        </div>
        <time className="text-sm text-muted-foreground">{formatDate(frontmatter.date)}</time>
      </div>

      <Link href={`/editorials/${slug}`}>
        <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors cursor-pointer text-balance">
          {frontmatter.title}
        </h2>
      </Link>

      <p className="text-muted-foreground mb-4 text-pretty line-clamp-3">
        {content.substring(0, 200).replace(/[#*]/g, "")}...
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/editorials/${slug}`}>
          <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
            Read More →
          </button>
        </Link>
      </div>
    </article>
  )
}

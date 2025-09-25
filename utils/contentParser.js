import fs from "fs"
import path from "path"
import matter from "gray-matter"

export const getEditorialSlugs = () => {
  const contentDirectory = path.join(process.cwd(), "content")

  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(contentDirectory)
  return filenames.filter((name) => name.endsWith(".md")).map((name) => name.replace(/\.md$/, ""))
}

export const getEditorialBySlug = (slug) => {
  const contentDirectory = path.join(process.cwd(), "content")
  const fullPath = path.join(contentDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    frontmatter: data,
    content,
  }
}

export const getAllEditorials = () => {
  const slugs = getEditorialSlugs()
  const editorials = slugs
    .map((slug) => getEditorialBySlug(slug))
    .filter(Boolean)
    .sort((a, b) => {
      // Sort by date descending (newest first)
      return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    })

  return editorials
}

export const getEditorialsByCategory = (category) => {
  const allEditorials = getAllEditorials()
  return allEditorials.filter((editorial) => editorial.frontmatter.category?.toLowerCase() === category.toLowerCase())
}

export const getEditorialsByTag = (tag) => {
  const allEditorials = getAllEditorials()
  return allEditorials.filter((editorial) =>
    editorial.frontmatter.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
  )
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const getReadingTime = (content) => {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(words / wordsPerMinute)
  return readingTime
}

"use client"

import { useState, useEffect } from "react"
import { formatDate, getReadingTime } from "../utils/contentParser"
import { getStorageItem, setStorageItem, STORAGE_KEYS, updateProgress } from "../utils/localStorageHelpers"

export default function EditorialReader({ editorial, vocabData }) {
  const { slug, frontmatter, content } = editorial
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [showVocabTooltip, setShowVocabTooltip] = useState(null)
  const [vocabLanguage, setVocabLanguage] = useState("eng")

  const readingTime = getReadingTime(content)

  useEffect(() => {
    // Check if bookmarked
    const bookmarks = getStorageItem(STORAGE_KEYS.BOOKMARKS, [])
    setIsBookmarked(bookmarks.includes(slug))

    // Track reading progress
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(progress, 100))

      // Mark as attempted when 25% read, completed when 80% read
      if (progress > 25 && progress < 80) {
        updateProgress(slug, "attempted")
      } else if (progress >= 80) {
        updateProgress(slug, "completed")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [slug])

  const toggleBookmark = () => {
    const bookmarks = getStorageItem(STORAGE_KEYS.BOOKMARKS, [])
    let newBookmarks

    if (isBookmarked) {
      newBookmarks = bookmarks.filter((b) => b !== slug)
    } else {
      newBookmarks = [...bookmarks, slug]
    }

    setStorageItem(STORAGE_KEYS.BOOKMARKS, newBookmarks)
    setIsBookmarked(!isBookmarked)
  }

  const highlightVocabulary = (text) => {
    if (!vocabData) return text

    let highlightedText = text
    Object.keys(vocabData).forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi")
      highlightedText = highlightedText.replace(
        regex,
        `<span class="vocab-word cursor-pointer underline decoration-dotted decoration-primary hover:bg-primary/10 transition-colors" data-word="${word.toLowerCase()}">$&</span>`,
      )
    })

    return highlightedText
  }

  const handleVocabClick = (e) => {
    if (e.target.classList.contains("vocab-word")) {
      const word = e.target.dataset.word
      setShowVocabTooltip({ word, element: e.target })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-secondary z-50">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readingProgress}%` }} />
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {frontmatter.category}
            </span>
            <span className="text-sm text-muted-foreground">{readingTime} min read</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setVocabLanguage(vocabLanguage === "eng" ? "hin" : "eng")}
              className="px-3 py-1 border border-border rounded-lg text-sm hover:border-primary transition-colors"
            >
              {vocabLanguage === "eng" ? "हिंदी" : "English"}
            </button>
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked ? "bg-primary text-primary-foreground" : "border border-border hover:border-primary"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill={isBookmarked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{frontmatter.title}</h1>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
          <time>{formatDate(frontmatter.date)}</time>
          <div className="flex space-x-2">
            {frontmatter.tags?.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-secondary rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article
        className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
        onClick={handleVocabClick}
        dangerouslySetInnerHTML={{
          __html: highlightVocabulary(
            content
              .replace(/^---[\s\S]*?---/, "") // Remove frontmatter
              .replace(/^# .+$/m, ""), // Remove first heading (already shown as title)
          ),
        }}
      />

      {/* Vocabulary Tooltip */}
      {showVocabTooltip && vocabData[showVocabTooltip.word] && (
        <div className="fixed z-50 bg-popover border border-border rounded-lg p-4 shadow-lg max-w-sm">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold capitalize">{showVocabTooltip.word}</h4>
            <button onClick={() => setShowVocabTooltip(null)} className="text-muted-foreground hover:text-foreground">
              ×
            </button>
          </div>
          <p className="text-sm mb-2">
            <strong>Definition:</strong> {vocabData[showVocabTooltip.word][vocabLanguage]}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Example:</strong> {vocabData[showVocabTooltip.word].example}
          </p>
        </div>
      )}

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Reading Progress: {Math.round(readingProgress)}%</div>
          <div className="flex space-x-4">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Share Article
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Print</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

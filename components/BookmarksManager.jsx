"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const BookmarksManager = () => {
  const [bookmarks, setBookmarks] = useState([])
  const [notes, setNotes] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    // Load bookmarks and notes from localStorage
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "{}")
    setBookmarks(savedBookmarks)
    setNotes(savedNotes)
  }, [])

  const removeBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id)
    setBookmarks(updatedBookmarks)
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
  }

  const updateNote = (id, noteText) => {
    const updatedNotes = { ...notes, [id]: noteText }
    setNotes(updatedNotes)
    localStorage.setItem("notes", JSON.stringify(updatedNotes))
  }

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" ||
      bookmark.type === selectedCategory ||
      (selectedCategory === "with_notes" && notes[bookmark.id])
    return matchesSearch && matchesCategory
  })

  const categories = ["all", "editorial", "quiz", "with_notes"]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Bookmarks & Notes</h1>
        <p className="text-gray-400">Manage your saved content and personal notes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-1">Total Bookmarks</h3>
          <p className="text-2xl font-bold text-blue-400">{bookmarks.length}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-1">With Notes</h3>
          <p className="text-2xl font-bold text-green-400">{Object.keys(notes).length}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-1">Editorials</h3>
          <p className="text-2xl font-bold text-purple-400">{bookmarks.filter((b) => b.type === "editorial").length}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search bookmarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.replace("_", " ").charAt(0).toUpperCase() + category.replace("_", " ").slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-4">
        {filteredBookmarks.map((bookmark) => (
          <div key={bookmark.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      bookmark.type === "editorial"
                        ? "bg-blue-600 text-white"
                        : bookmark.type === "quiz"
                          ? "bg-green-600 text-white"
                          : "bg-gray-600 text-white"
                    }`}
                  >
                    {bookmark.type}
                  </span>
                  <span className="text-gray-400 text-sm">{bookmark.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{bookmark.title}</h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{bookmark.content}</p>
                {bookmark.url && (
                  <Link href={bookmark.url} className="text-blue-400 hover:text-blue-300 text-sm underline">
                    View Original
                  </Link>
                )}
              </div>
              <button
                onClick={() => removeBookmark(bookmark.id)}
                className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                title="Remove bookmark"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Notes Section */}
            <div className="border-t border-gray-700 pt-3">
              <label className="block text-sm font-medium text-gray-300 mb-2">Personal Notes:</label>
              <textarea
                value={notes[bookmark.id] || ""}
                onChange={(e) => updateNote(bookmark.id, e.target.value)}
                placeholder="Add your notes about this content..."
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                rows="3"
              />
            </div>
          </div>
        ))}
      </div>

      {filteredBookmarks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">
            {bookmarks.length === 0
              ? "No bookmarks yet. Start bookmarking content while reading!"
              : "No bookmarks found matching your criteria."}
          </p>
        </div>
      )}
    </div>
  )
}

export default BookmarksManager

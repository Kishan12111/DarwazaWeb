"use client"

import { useState, useEffect } from "react"
import { updateUserStats } from "../utils/gamificationHelpers"

const VocabularyManager = () => {
  const [learnedWords, setLearnedWords] = useState([])
  const [bookmarkedWords, setBookmarkedWords] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [vocab, setVocab] = useState([])

  useEffect(() => {
    // Load vocabulary data
    fetch("/data/vocab.json")
      .then((res) => res.json())
      .then((data) => setVocab(data))
      .catch((err) => console.error("Error loading vocabulary:", err))

    // Load user progress
    const learned = JSON.parse(localStorage.getItem("learnedWords") || "[]")
    const bookmarked = JSON.parse(localStorage.getItem("bookmarkedWords") || "[]")
    setLearnedWords(learned)
    setBookmarkedWords(bookmarked)
  }, [])

  const markAsLearned = (word) => {
    if (!learnedWords.includes(word)) {
      const newLearned = [...learnedWords, word]
      setLearnedWords(newLearned)
      localStorage.setItem("learnedWords", JSON.stringify(newLearned))
      updateUserStats("vocab_learned")
    }
  }

  const toggleBookmark = (word) => {
    const newBookmarked = bookmarkedWords.includes(word)
      ? bookmarkedWords.filter((w) => w !== word)
      : [...bookmarkedWords, word]
    setBookmarkedWords(newBookmarked)
    localStorage.setItem("bookmarkedWords", JSON.stringify(newBookmarked))
  }

  const filteredVocab = vocab.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "learned" && learnedWords.includes(item.word)) ||
      (selectedCategory === "bookmarked" && bookmarkedWords.includes(item.word))
    return matchesSearch && matchesCategory
  })

  const categories = ["all", "learned", "bookmarked"]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Vocabulary Builder</h1>
        <p className="text-gray-400">Expand your vocabulary for better comprehension</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-1">Words Learned</h3>
          <p className="text-2xl font-bold text-blue-400">{learnedWords.length}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-1">Bookmarked</h3>
          <p className="text-2xl font-bold text-yellow-400">{bookmarkedWords.length}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-1">Total Available</h3>
          <p className="text-2xl font-bold text-green-400">{vocab.length}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search vocabulary..."
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
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Vocabulary List */}
      <div className="space-y-4">
        {filteredVocab.map((item, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1">{item.word}</h3>
                <p className="text-gray-300 mb-2">{item.meaning}</p>
                {item.example && <p className="text-gray-400 italic text-sm">Example: {item.example}</p>}
                {item.synonyms && <p className="text-blue-400 text-sm mt-2">Synonyms: {item.synonyms.join(", ")}</p>}
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => toggleBookmark(item.word)}
                  className={`p-2 rounded-lg transition-colors ${
                    bookmarkedWords.includes(item.word)
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  title="Bookmark"
                >
                  ★
                </button>
                <button
                  onClick={() => markAsLearned(item.word)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    learnedWords.includes(item.word)
                      ? "bg-green-600 text-white cursor-default"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  disabled={learnedWords.includes(item.word)}
                >
                  {learnedWords.includes(item.word) ? "Learned" : "Mark as Learned"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVocab.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No vocabulary words found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default VocabularyManager

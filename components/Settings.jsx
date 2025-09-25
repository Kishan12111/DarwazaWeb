"use client"

import { useState, useEffect } from "react"

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: "dark",
    notifications: true,
    autoBookmark: false,
    quizDifficulty: "medium",
    dailyGoal: 3,
    showVocabTooltips: true,
    fontSize: "medium",
  })

  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = JSON.parse(localStorage.getItem("userSettings") || "{}")
    setSettings((prev) => ({ ...prev, ...savedSettings }))
  }, [])

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem("userSettings", JSON.stringify(newSettings))
  }

  const exportData = () => {
    setIsExporting(true)
    try {
      const userData = {
        settings,
        userStats: JSON.parse(localStorage.getItem("userStats") || "{}"),
        bookmarks: JSON.parse(localStorage.getItem("bookmarks") || "[]"),
        notes: JSON.parse(localStorage.getItem("notes") || "{}"),
        learnedWords: JSON.parse(localStorage.getItem("learnedWords") || "[]"),
        bookmarkedWords: JSON.parse(localStorage.getItem("bookmarkedWords") || "[]"),
        exportDate: new Date().toISOString(),
      }

      const dataStr = JSON.stringify(userData, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `ssc-exam-prep-backup-${new Date().toISOString().split("T")[0]}.json`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export failed. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const importData = (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsImporting(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const userData = JSON.parse(e.target.result)

        // Validate the data structure
        if (!userData.exportDate) {
          throw new Error("Invalid backup file format")
        }

        // Import data
        if (userData.settings) localStorage.setItem("userSettings", JSON.stringify(userData.settings))
        if (userData.userStats) localStorage.setItem("userStats", JSON.stringify(userData.userStats))
        if (userData.bookmarks) localStorage.setItem("bookmarks", JSON.stringify(userData.bookmarks))
        if (userData.notes) localStorage.setItem("notes", JSON.stringify(userData.notes))
        if (userData.learnedWords) localStorage.setItem("learnedWords", JSON.stringify(userData.learnedWords))
        if (userData.bookmarkedWords) localStorage.setItem("bookmarkedWords", JSON.stringify(userData.bookmarkedWords))

        alert("Data imported successfully! Please refresh the page to see changes.")
      } catch (error) {
        console.error("Import failed:", error)
        alert("Import failed. Please check the file format and try again.")
      } finally {
        setIsImporting(false)
      }
    }
    reader.readAsText(file)
  }

  const clearAllData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      localStorage.clear()
      alert("All data cleared. Please refresh the page.")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Customize your learning experience</p>
      </div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Appearance</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => updateSetting("theme", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Font Size</label>
              <select
                value={settings.fontSize}
                onChange={(e) => updateSetting("fontSize", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>

        {/* Learning Settings */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Learning Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Quiz Difficulty</label>
              <select
                value={settings.quizDifficulty}
                onChange={(e) => updateSetting("quizDifficulty", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Daily Reading Goal</label>
              <input
                type="number"
                min="1"
                max="10"
                value={settings.dailyGoal}
                onChange={(e) => updateSetting("dailyGoal", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <p className="text-gray-400 text-sm mt-1">Number of editorials to read daily</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">Show Vocabulary Tooltips</label>
                <p className="text-gray-400 text-sm">Display word meanings on hover</p>
              </div>
              <button
                onClick={() => updateSetting("showVocabTooltips", !settings.showVocabTooltips)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.showVocabTooltips ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.showVocabTooltips ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-300">Auto-bookmark Quiz Results</label>
                <p className="text-gray-400 text-sm">Automatically save quiz results for review</p>
              </div>
              <button
                onClick={() => updateSetting("autoBookmark", !settings.autoBookmark)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoBookmark ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoBookmark ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Data Management</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Export Data</h3>
              <p className="text-gray-400 text-sm mb-3">Download all your progress, bookmarks, and settings</p>
              <button
                onClick={exportData}
                disabled={isExporting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isExporting ? "Exporting..." : "Export Data"}
              </button>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Import Data</h3>
              <p className="text-gray-400 text-sm mb-3">Restore your data from a backup file</p>
              <input
                type="file"
                accept=".json"
                onChange={importData}
                disabled={isImporting}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Clear All Data</h3>
              <p className="text-gray-400 text-sm mb-3">Remove all stored data (cannot be undone)</p>
              <button
                onClick={clearAllData}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

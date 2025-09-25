// Local storage helper functions for SSC platform
export const STORAGE_KEYS = {
  PROGRESS: "ssc_progress",
  NOTES: "ssc_notes",
  BOOKMARKS: "ssc_bookmarks",
  LEADERBOARD: "ssc_leaderboard",
  VOCAB_SETTINGS: "ssc_vocab_settings",
}

export const getStorageItem = (key, defaultValue = null) => {
  if (typeof window === "undefined") return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading from localStorage key ${key}:`, error)
    return defaultValue
  }
}

export const setStorageItem = (key, value) => {
  if (typeof window === "undefined") return false

  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error writing to localStorage key ${key}:`, error)
    return false
  }
}

export const removeStorageItem = (key) => {
  if (typeof window === "undefined") return false

  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing localStorage key ${key}:`, error)
    return false
  }
}

// Progress tracking helpers
export const updateProgress = (slug, status, score = null) => {
  const progress = getStorageItem(STORAGE_KEYS.PROGRESS, {})
  const today = new Date().toISOString().split("T")[0]

  if (!progress[today]) {
    progress[today] = {}
  }

  progress[today][slug] = {
    status, // 'completed', 'attempted', 'missed'
    score,
    timestamp: new Date().toISOString(),
  }

  setStorageItem(STORAGE_KEYS.PROGRESS, progress)

  // Update leaderboard points
  updateLeaderboardPoints(status, score)
}

export const getProgressForDate = (date) => {
  const progress = getStorageItem(STORAGE_KEYS.PROGRESS, {})
  return progress[date] || {}
}

export const updateLeaderboardPoints = (action, score = null) => {
  const leaderboard = getStorageItem(STORAGE_KEYS.LEADERBOARD, {
    totalPoints: 0,
    streak: 0,
    lastActivity: null,
    badges: [],
  })

  const today = new Date().toISOString().split("T")[0]
  let points = 0

  switch (action) {
    case "completed":
      points = 10
      break
    case "attempted":
      points = 5
      break
    case "quiz_perfect":
      points = 20
      break
    case "quiz_good":
      points = 15
      break
    case "quiz_average":
      points = 10
      break
    default:
      points = 0
  }

  if (score !== null) {
    points += Math.floor(score / 10) // Bonus points based on quiz score
  }

  leaderboard.totalPoints += points

  // Update streak
  if (leaderboard.lastActivity) {
    const lastDate = new Date(leaderboard.lastActivity)
    const currentDate = new Date(today)
    const daysDiff = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24))

    if (daysDiff === 1) {
      leaderboard.streak += 1
    } else if (daysDiff > 1) {
      leaderboard.streak = 1
    }
  } else {
    leaderboard.streak = 1
  }

  leaderboard.lastActivity = today

  setStorageItem(STORAGE_KEYS.LEADERBOARD, leaderboard)
}

// Export/Import functionality
export const exportAllData = () => {
  const data = {
    progress: getStorageItem(STORAGE_KEYS.PROGRESS, {}),
    notes: getStorageItem(STORAGE_KEYS.NOTES, {}),
    bookmarks: getStorageItem(STORAGE_KEYS.BOOKMARKS, []),
    leaderboard: getStorageItem(STORAGE_KEYS.LEADERBOARD, {}),
    vocabSettings: getStorageItem(STORAGE_KEYS.VOCAB_SETTINGS, {}),
    exportDate: new Date().toISOString(),
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `ssc-prep-data-${new Date().toISOString().split("T")[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const importAllData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)

        if (data.progress) setStorageItem(STORAGE_KEYS.PROGRESS, data.progress)
        if (data.notes) setStorageItem(STORAGE_KEYS.NOTES, data.notes)
        if (data.bookmarks) setStorageItem(STORAGE_KEYS.BOOKMARKS, data.bookmarks)
        if (data.leaderboard) setStorageItem(STORAGE_KEYS.LEADERBOARD, data.leaderboard)
        if (data.vocabSettings) setStorageItem(STORAGE_KEYS.VOCAB_SETTINGS, data.vocabSettings)

        resolve(data)
      } catch (error) {
        reject(new Error("Invalid JSON file"))
      }
    }

    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsText(file)
  })
}

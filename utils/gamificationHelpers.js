// Gamification system for tracking achievements, badges, and streaks
export const ACHIEVEMENTS = {
  FIRST_QUIZ: { id: "first_quiz", name: "Quiz Master", description: "Complete your first quiz", icon: "🎯" },
  PERFECT_SCORE: { id: "perfect_score", name: "Perfect Score", description: "Score 100% on a quiz", icon: "⭐" },
  STREAK_7: { id: "streak_7", name: "Week Warrior", description: "Maintain a 7-day study streak", icon: "🔥" },
  STREAK_30: { id: "streak_30", name: "Monthly Master", description: "Maintain a 30-day study streak", icon: "👑" },
  VOCAB_50: { id: "vocab_50", name: "Word Collector", description: "Learn 50 vocabulary words", icon: "📚" },
  VOCAB_200: { id: "vocab_200", name: "Vocabulary Expert", description: "Learn 200 vocabulary words", icon: "🎓" },
  EDITORIAL_10: { id: "editorial_10", name: "News Reader", description: "Read 10 editorials", icon: "📰" },
  EDITORIAL_50: { id: "editorial_50", name: "Editorial Expert", description: "Read 50 editorials", icon: "📖" },
}

export const BADGE_LEVELS = {
  BRONZE: { name: "Bronze", color: "text-amber-600", bgColor: "bg-amber-100" },
  SILVER: { name: "Silver", color: "text-gray-600", bgColor: "bg-gray-100" },
  GOLD: { name: "Gold", color: "text-yellow-600", bgColor: "bg-yellow-100" },
  PLATINUM: { name: "Platinum", color: "text-purple-600", bgColor: "bg-purple-100" },
}

export const calculateLevel = (totalPoints) => {
  if (totalPoints >= 5000) return { level: "Platinum", ...BADGE_LEVELS.PLATINUM }
  if (totalPoints >= 2000) return { level: "Gold", ...BADGE_LEVELS.GOLD }
  if (totalPoints >= 500) return { level: "Silver", ...BADGE_LEVELS.SILVER }
  return { level: "Bronze", ...BADGE_LEVELS.BRONZE }
}

export const calculatePoints = (activity) => {
  const pointsMap = {
    quiz_completed: 10,
    quiz_perfect: 25,
    editorial_read: 5,
    vocab_learned: 2,
    daily_streak: 15,
  }
  return pointsMap[activity] || 0
}

export const checkAchievements = (userStats) => {
  const newAchievements = []
  const currentAchievements = userStats.achievements || []

  // Check each achievement
  Object.values(ACHIEVEMENTS).forEach((achievement) => {
    if (!currentAchievements.includes(achievement.id)) {
      let earned = false

      switch (achievement.id) {
        case "first_quiz":
          earned = userStats.quizzesCompleted >= 1
          break
        case "perfect_score":
          earned = userStats.perfectScores >= 1
          break
        case "streak_7":
          earned = userStats.currentStreak >= 7
          break
        case "streak_30":
          earned = userStats.currentStreak >= 30
          break
        case "vocab_50":
          earned = userStats.vocabLearned >= 50
          break
        case "vocab_200":
          earned = userStats.vocabLearned >= 200
          break
        case "editorial_10":
          earned = userStats.editorialsRead >= 10
          break
        case "editorial_50":
          earned = userStats.editorialsRead >= 50
          break
      }

      if (earned) {
        newAchievements.push(achievement)
      }
    }
  })

  return newAchievements
}

export const updateUserStats = (activity, additionalData = {}) => {
  const currentStats = JSON.parse(localStorage.getItem("userStats") || "{}")
  const defaultStats = {
    totalPoints: 0,
    quizzesCompleted: 0,
    perfectScores: 0,
    editorialsRead: 0,
    vocabLearned: 0,
    currentStreak: 0,
    longestStreak: 0,
    achievements: [],
    lastActiveDate: null,
  }

  const userStats = { ...defaultStats, ...currentStats }
  const points = calculatePoints(activity)
  userStats.totalPoints += points

  // Update specific stats based on activity
  switch (activity) {
    case "quiz_completed":
      userStats.quizzesCompleted += 1
      if (additionalData.score === 100) {
        userStats.perfectScores += 1
        userStats.totalPoints += calculatePoints("quiz_perfect")
      }
      break
    case "editorial_read":
      userStats.editorialsRead += 1
      break
    case "vocab_learned":
      userStats.vocabLearned += 1
      break
    case "daily_streak":
      userStats.currentStreak += 1
      userStats.longestStreak = Math.max(userStats.longestStreak, userStats.currentStreak)
      break
  }

  // Check for new achievements
  const newAchievements = checkAchievements(userStats)
  if (newAchievements.length > 0) {
    userStats.achievements = [...userStats.achievements, ...newAchievements.map((a) => a.id)]
  }

  userStats.lastActiveDate = new Date().toISOString().split("T")[0]
  localStorage.setItem("userStats", JSON.stringify(userStats))

  return { userStats, newAchievements, pointsEarned: points }
}

export const getUserStats = () => {
  const defaultStats = {
    totalPoints: 0,
    quizzesCompleted: 0,
    perfectScores: 0,
    editorialsRead: 0,
    vocabLearned: 0,
    currentStreak: 0,
    longestStreak: 0,
    achievements: [],
    lastActiveDate: null,
  }

  return { ...defaultStats, ...JSON.parse(localStorage.getItem("userStats") || "{}") }
}

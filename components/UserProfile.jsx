"use client"

import { useState, useEffect } from "react"
import { getUserStats, calculateLevel, ACHIEVEMENTS } from "../utils/gamificationHelpers"

const UserProfile = () => {
  const [userStats, setUserStats] = useState(null)
  const [userLevel, setUserLevel] = useState(null)

  useEffect(() => {
    const stats = getUserStats()
    const level = calculateLevel(stats.totalPoints)
    setUserStats(stats)
    setUserLevel(level)
  }, [])

  if (!userStats) return <div>Loading...</div>

  const earnedAchievements = userStats.achievements
    .map((id) => Object.values(ACHIEVEMENTS).find((achievement) => achievement.id === id))
    .filter(Boolean)

  const progressToNextLevel = () => {
    const currentPoints = userStats.totalPoints
    if (currentPoints >= 5000) return 100
    if (currentPoints >= 2000) return ((currentPoints - 2000) / 3000) * 100
    if (currentPoints >= 500) return ((currentPoints - 500) / 1500) * 100
    return (currentPoints / 500) * 100
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
        <p className="text-gray-400">Track your learning progress and achievements</p>
      </div>

      {/* Level and Points */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{userLevel?.level} Level</h2>
            <p className="text-gray-400">{userStats.totalPoints} total points</p>
          </div>
          <div className={`px-4 py-2 rounded-full ${userLevel?.bgColor} ${userLevel?.color} font-semibold`}>
            {userLevel?.level}
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressToNextLevel()}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-blue-400">{userStats.quizzesCompleted}</h3>
          <p className="text-gray-400 text-sm">Quizzes Completed</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-green-400">{userStats.editorialsRead}</h3>
          <p className="text-gray-400 text-sm">Editorials Read</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-purple-400">{userStats.vocabLearned}</h3>
          <p className="text-gray-400 text-sm">Words Learned</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-orange-400">{userStats.currentStreak}</h3>
          <p className="text-gray-400 text-sm">Current Streak</p>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Achievements ({earnedAchievements.length})</h2>
        {earnedAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {earnedAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <h3 className="font-semibold text-white">{achievement.name}</h3>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No achievements yet. Keep studying to unlock them!</p>
        )}
      </div>
    </div>
  )
}

export default UserProfile

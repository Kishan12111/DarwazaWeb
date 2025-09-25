"use client"

import { useState, useEffect } from "react"
import { getStorageItem, STORAGE_KEYS } from "../utils/localStorageHelpers"

export default function ProgressBar({ type = "daily", className = "" }) {
  const [progress, setProgress] = useState({
    completed: 0,
    attempted: 0,
    total: 0,
    streak: 0,
    points: 0,
  })

  useEffect(() => {
    const progressData = getStorageItem(STORAGE_KEYS.PROGRESS, {})
    const leaderboardData = getStorageItem(STORAGE_KEYS.LEADERBOARD, {
      totalPoints: 0,
      streak: 0,
    })

    if (type === "daily") {
      const today = new Date().toISOString().split("T")[0]
      const todayProgress = progressData[today] || {}
      const activities = Object.values(todayProgress)

      setProgress({
        completed: activities.filter((a) => a.status === "completed").length,
        attempted: activities.filter((a) => a.status === "attempted").length,
        total: Math.max(activities.length, 3), // Assume at least 3 daily activities
        streak: leaderboardData.streak || 0,
        points: leaderboardData.totalPoints || 0,
      })
    } else if (type === "weekly") {
      // Calculate weekly progress
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)

      let weeklyCompleted = 0
      let weeklyAttempted = 0
      let weeklyTotal = 0

      Object.entries(progressData).forEach(([date, dayProgress]) => {
        const progressDate = new Date(date)
        if (progressDate >= weekAgo) {
          const activities = Object.values(dayProgress)
          weeklyCompleted += activities.filter((a) => a.status === "completed").length
          weeklyAttempted += activities.filter((a) => a.status === "attempted").length
          weeklyTotal += activities.length
        }
      })

      setProgress({
        completed: weeklyCompleted,
        attempted: weeklyAttempted,
        total: Math.max(weeklyTotal, 21), // 3 activities × 7 days
        streak: leaderboardData.streak || 0,
        points: leaderboardData.totalPoints || 0,
      })
    }
  }, [type])

  const completionPercentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0
  const attemptPercentage = progress.total > 0 ? ((progress.completed + progress.attempted) / progress.total) * 100 : 0

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{type === "daily" ? "Today's Progress" : "Weekly Progress"}</h3>
        <div className="text-sm text-muted-foreground">
          {progress.completed}/{progress.total} completed
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Completion Rate</span>
            <span className="text-sm text-muted-foreground">{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Activity Rate</span>
            <span className="text-sm text-muted-foreground">{Math.round(attemptPercentage)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${attemptPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">{progress.completed}</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-500">{progress.attempted}</div>
          <div className="text-xs text-muted-foreground">Attempted</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{progress.streak}</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </div>
      </div>

      {/* Points Display */}
      <div className="mt-4 pt-4 border-t border-border text-center">
        <div className="text-lg font-semibold text-primary">{progress.points} Points</div>
        <div className="text-xs text-muted-foreground">Total Earned</div>
      </div>
    </div>
  )
}

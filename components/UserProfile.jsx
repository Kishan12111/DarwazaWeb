"use client"

import { useState, useEffect } from "react"
import { getUserStats, calculateLevel, ACHIEVEMENTS } from "../utils/gamificationHelpers"

const generateLeaderboardData = (currentUserStats) => {
  const mockUsers = [
    { name: "Priya Sharma", points: 5200, level: "Platinum", streak: 45, avatar: "👩‍🎓" },
    { name: "Rahul Kumar", points: 4800, level: "Gold", streak: 32, avatar: "👨‍💼" },
    { name: "Anjali Singh", points: 4500, level: "Gold", streak: 28, avatar: "👩‍💻" },
    { name: "Vikram Patel", points: 3200, level: "Gold", streak: 21, avatar: "👨‍🎓" },
    { name: "Sneha Gupta", points: 2800, level: "Gold", streak: 19, avatar: "👩‍🔬" },
    { name: "Arjun Reddy", points: 2400, level: "Silver", streak: 15, avatar: "👨‍🏫" },
    { name: "Kavya Nair", points: 2100, level: "Silver", streak: 12, avatar: "👩‍⚖️" },
    { name: "Rohit Jain", points: 1800, level: "Silver", streak: 10, avatar: "👨‍💻" },
    { name: "Meera Das", points: 1500, level: "Silver", streak: 8, avatar: "👩‍🎨" },
    { name: "Karan Singh", points: 1200, level: "Bronze", streak: 6, avatar: "👨‍🔧" },
  ]

  // Add current user to the list
  const currentUser = {
    name: "You",
    points: currentUserStats.totalPoints,
    level: calculateLevel(currentUserStats.totalPoints).level,
    streak: currentUserStats.currentStreak,
    avatar: "🎯",
    isCurrentUser: true,
  }

  const allUsers = [...mockUsers, currentUser]
  return allUsers
    .sort((a, b) => b.points - a.points)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }))
}

const UserProfile = () => {
  const [userStats, setUserStats] = useState(null)
  const [userLevel, setUserLevel] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const stats = getUserStats()
    const level = calculateLevel(stats.totalPoints)
    const leaderboardData = generateLeaderboardData(stats)

    setUserStats(stats)
    setUserLevel(level)
    setLeaderboard(leaderboardData)
  }, [])

  if (!userStats)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )

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

  const currentUserRank = leaderboard.find((user) => user.isCurrentUser)?.rank || 0

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Your Profile</h1>
              <p className="text-muted-foreground mt-1">Track your learning progress and achievements</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`px-4 py-2 rounded-full ${userLevel?.bgColor} ${userLevel?.color} font-semibold text-sm`}>
                {userLevel?.level}
              </div>
              <div className="text-sm text-muted-foreground">Rank #{currentUserRank}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-secondary rounded-lg p-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "overview"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "leaderboard"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Leaderboard
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Level and Points */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{userLevel?.level} Level</h2>
                  <p className="text-muted-foreground">{userStats.totalPoints} total points</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Global Rank</div>
                  <div className="text-2xl font-bold text-primary">#{currentUserRank}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to next level</span>
                  <span>{Math.round(progressToNextLevel())}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progressToNextLevel()}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">{userStats.quizzesCompleted}</h3>
                <p className="text-muted-foreground text-sm">Quizzes Completed</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">{userStats.editorialsRead}</h3>
                <p className="text-muted-foreground text-sm">Editorials Read</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">{userStats.vocabLearned}</h3>
                <p className="text-muted-foreground text-sm">Words Learned</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">{userStats.currentStreak}</h3>
                <p className="text-muted-foreground text-sm">Current Streak</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Achievements ({earnedAchievements.length})</h2>
              {earnedAchievements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {earnedAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-secondary rounded-lg">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-semibold">{achievement.name}</h3>
                        <p className="text-muted-foreground text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🏆</div>
                  <p className="text-muted-foreground">No achievements yet. Keep studying to unlock them!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Global Leaderboard</h2>
              <div className="space-y-3">
                {leaderboard.slice(0, 10).map((user, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                      user.isCurrentUser
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-white"
                            : index === 1
                              ? "bg-gray-400 text-white"
                              : index === 2
                                ? "bg-amber-600 text-white"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.rank}
                      </div>
                      <div className="text-2xl">{user.avatar}</div>
                      <div>
                        <h3 className={`font-semibold ${user.isCurrentUser ? "text-primary" : ""}`}>{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.level} Level</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{user.points.toLocaleString()} pts</div>
                      <div className="text-sm text-muted-foreground">{user.streak} day streak</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {currentUserRank > 10 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-4">Your Position</h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                      {currentUserRank}
                    </div>
                    <div className="text-2xl">🎯</div>
                    <div>
                      <h3 className="font-semibold text-primary">You</h3>
                      <p className="text-sm text-muted-foreground">{userLevel?.level} Level</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{userStats.totalPoints.toLocaleString()} pts</div>
                    <div className="text-sm text-muted-foreground">{userStats.currentStreak} day streak</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile

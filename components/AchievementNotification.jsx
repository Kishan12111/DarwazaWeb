"use client"

import { useState, useEffect } from "react"

const AchievementNotification = ({ achievement, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{achievement.icon}</div>
          <div>
            <h3 className="font-bold text-sm">Achievement Unlocked!</h3>
            <p className="text-sm font-medium">{achievement.name}</p>
            <p className="text-xs opacity-90">{achievement.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AchievementNotification

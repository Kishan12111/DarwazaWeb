"use client"

import { useState, useEffect } from "react"
import { getStorageItem, STORAGE_KEYS } from "../utils/localStorageHelpers"

export default function CalendarSidebar({ isOpen = true, onToggle }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [progress, setProgress] = useState({})
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    const progressData = getStorageItem(STORAGE_KEYS.PROGRESS, {})
    setProgress(progressData)
  }, [])

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getDateStatus = (date) => {
    if (!date) return null

    const dateStr = date.toISOString().split("T")[0]
    const dayProgress = progress[dateStr]

    if (!dayProgress) return "missed"

    const activities = Object.values(dayProgress)
    const hasCompleted = activities.some((activity) => activity.status === "completed")
    const hasAttempted = activities.some((activity) => activity.status === "attempted")

    if (hasCompleted) return "completed"
    if (hasAttempted) return "attempted"
    return "missed"
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "attempted":
        return "bg-orange-500"
      case "missed":
        return "bg-red-500"
      default:
        return "bg-muted"
    }
  }

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const today = new Date()
  const days = getDaysInMonth(currentDate)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  if (!isOpen) {
    return (
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
        <button
          onClick={onToggle}
          className="bg-primary text-primary-foreground p-3 rounded-l-lg shadow-lg hover:bg-primary/90 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Progress Calendar</h3>
        <button onClick={onToggle} className="text-muted-foreground hover:text-foreground transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigateMonth(-1)} className="p-1 hover:bg-secondary rounded transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h4 className="font-medium">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
        <button onClick={() => navigateMonth(1)} className="p-1 hover:bg-secondary rounded transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-xs text-muted-foreground text-center p-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="aspect-square" />
          }

          const status = getDateStatus(date)
          const isToday = date.toDateString() === today.toDateString()
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

          return (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={`aspect-square text-xs rounded flex items-center justify-center transition-colors relative ${
                isSelected ? "ring-2 ring-primary" : ""
              } ${isToday ? "font-bold" : ""} hover:bg-secondary`}
            >
              <span className="relative z-10">{date.getDate()}</span>
              <div className={`absolute inset-0 rounded ${getStatusColor(status)} opacity-20`} />
              {status === "completed" && <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" />}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span>Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full" />
          <span>Attempted</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span>Missed</span>
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-4 pt-4 border-t border-border">
          <h5 className="font-medium mb-2">
            {selectedDate.toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h5>
          {progress[selectedDate.toISOString().split("T")[0]] ? (
            <div className="space-y-1 text-xs">
              {Object.entries(progress[selectedDate.toISOString().split("T")[0]]).map(([slug, activity]) => (
                <div key={slug} className="flex items-center justify-between">
                  <span className="truncate">{slug}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      activity.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : activity.status === "attempted"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-xs">No activity recorded</p>
          )}
        </div>
      )}
    </div>
  )
}

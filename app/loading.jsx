import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="animate-spin h-10 w-10 border-b-2 border-primary"></div>
    </div>
  )
}

"use client"
import React from 'react'

export default function Error({ error, reset }) {
  console.error(error)
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="max-w-xl p-6 bg-card border border-border rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="mb-4">An unexpected error occurred. You can try refreshing the page.</p>
          <div className="space-x-2">
            <button onClick={() => reset()} className="px-4 py-2 bg-primary text-primary-foreground rounded">Retry</button>
            <button onClick={() => location.reload()} className="px-4 py-2 border rounded">Reload</button>
          </div>
        </div>
      </body>
    </html>
  )
}

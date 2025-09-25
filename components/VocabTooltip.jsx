"use client"

import { useState, useEffect } from "react"

export default function VocabTooltip({ word, vocabData, language = "eng", onClose }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (!word || !vocabData[word]) return null

  const vocab = vocabData[word]

  return (
    <div
      className="fixed z-50 bg-popover border border-border rounded-lg p-4 shadow-lg max-w-sm pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        transform: "translateY(-100%)",
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold capitalize text-popover-foreground">{word}</h4>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground pointer-events-auto">
          ×
        </button>
      </div>
      <p className="text-sm mb-2 text-popover-foreground">
        <strong>Definition:</strong> {vocab[language]}
      </p>
      <p className="text-sm text-muted-foreground">
        <strong>Example:</strong> {vocab.example}
      </p>
    </div>
  )
}

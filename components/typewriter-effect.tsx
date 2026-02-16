"use client"

import { useState, useEffect, useCallback } from "react"

interface TypewriterEffectProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export function TypewriterEffect({
  words,
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 2000,
  className = "",
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const fullWord = words[currentWordIndex]

    if (!isDeleting) {
      // Typing
      const next = fullWord.slice(0, currentText.length + 1)
      setCurrentText(next)

      if (next === fullWord) {
        // Finished typing, pause then start deleting
        return pauseDuration
      }
      return typingSpeed + Math.random() * 40 // slight randomness for natural feel
    } else {
      // Deleting
      const next = fullWord.slice(0, currentText.length - 1)
      setCurrentText(next)

      if (next === "") {
        // Finished deleting, move to next word
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        return typingSpeed
      }
      return deletingSpeed
    }
  }, [currentText, currentWordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseDuration])

  useEffect(() => {
    const fullWord = words[currentWordIndex]
    // If we just finished typing the full word, set up the pause-then-delete
    if (!isDeleting && currentText === fullWord) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration)
      return () => clearTimeout(timeout)
    }

    const delay = isDeleting
      ? deletingSpeed
      : typingSpeed + Math.random() * 40

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1))
        if (currentText.length <= 1) {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      } else {
        setCurrentText(words[currentWordIndex].slice(0, currentText.length + 1))
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

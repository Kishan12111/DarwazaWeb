"use client"

import { useState } from "react"
import { generateQuizFromContent, calculateQuizScore } from "../utils/quizHelpers"
import { updateProgress } from "../utils/localStorageHelpers"

export default function QuizGenerator({ content, title, slug }) {
  const [quiz, setQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateQuiz = () => {
    setIsGenerating(true)
    // Simulate processing time for better UX
    setTimeout(() => {
      const generatedQuiz = generateQuizFromContent(content, title)
      setQuiz(generatedQuiz)
      setCurrentQuestion(0)
      setAnswers({})
      setShowResults(false)
      setResults(null)
      setIsGenerating(false)
    }, 1500)
  }

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const submitQuiz = () => {
    const quizResults = calculateQuizScore(answers, quiz)
    setResults(quizResults)
    setShowResults(true)

    // Update progress based on score
    const status =
      quizResults.percentage >= 70 ? "quiz_good" : quizResults.percentage >= 50 ? "quiz_average" : "quiz_poor"
    updateProgress(slug, status, quizResults.percentage)
  }

  const resetQuiz = () => {
    setQuiz(null)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setResults(null)
  }

  if (!quiz && !isGenerating) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">🧠</div>
        <h3 className="text-xl font-semibold mb-4">Test Your Understanding</h3>
        <p className="text-muted-foreground mb-6">
          Generate an interactive quiz based on this editorial to test your comprehension and retention.
        </p>
        <button
          onClick={generateQuiz}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Generate Quiz
        </button>
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold mb-2">Generating Quiz...</h3>
        <p className="text-muted-foreground">Analyzing content and creating personalized questions for you.</p>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="bg-card border border-border rounded-xl p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">
            {results.percentage >= 80 ? "🎉" : results.percentage >= 60 ? "👍" : "📚"}
          </div>
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <div className="text-3xl font-bold text-primary mb-2">
            {results.correct}/{results.total} ({results.percentage}%)
          </div>
          <div className="text-lg text-muted-foreground mb-6">Grade: {results.grade}</div>
        </div>

        {/* Detailed Results */}
        <div className="space-y-4 mb-6">
          {quiz.map((question, index) => {
            const userAnswer = answers[question.id]
            const isCorrect = userAnswer === question.correctAnswer

            return (
              <div key={question.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {isCorrect ? "✓" : "✗"}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">
                      Q{index + 1}: {question.question}
                    </p>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="text-muted-foreground">Your answer:</span>{" "}
                        <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                          {typeof userAnswer === "boolean" ? (userAnswer ? "True" : "False") : userAnswer}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p>
                          <span className="text-muted-foreground">Correct answer:</span>{" "}
                          <span className="text-green-600">
                            {typeof question.correctAnswer === "boolean"
                              ? question.correctAnswer
                                ? "True"
                                : "False"
                              : question.correctAnswer}
                          </span>
                        </p>
                      )}
                      <p className="text-muted-foreground text-xs">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={resetQuiz}
            className="px-6 py-3 border border-border rounded-lg font-medium hover:border-primary transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={generateQuiz}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            New Quiz
          </button>
        </div>
      </div>
    )
  }

  const question = quiz[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.length) * 100

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Question {currentQuestion + 1} of {quiz.length}
          </span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

        {question.type === "multiple-choice" ? (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  answers[question.id] === option
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    answers[question.id] === option ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}
                >
                  {answers[question.id] === option && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-full mx-auto mt-0.5" />
                  )}
                </div>
                <span>{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="flex space-x-4">
            <label
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                answers[question.id] === true ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                checked={answers[question.id] === true}
                onChange={() => handleAnswer(question.id, true)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 mr-3 ${
                  answers[question.id] === true ? "border-primary bg-primary" : "border-muted-foreground"
                }`}
              >
                {answers[question.id] === true && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full mx-auto mt-0.5" />
                )}
              </div>
              <span>True</span>
            </label>
            <label
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                answers[question.id] === false ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                checked={answers[question.id] === false}
                onChange={() => handleAnswer(question.id, false)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 mr-3 ${
                  answers[question.id] === false ? "border-primary bg-primary" : "border-muted-foreground"
                }`}
              >
                {answers[question.id] === false && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full mx-auto mt-0.5" />
                )}
              </div>
              <span>False</span>
            </label>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="px-4 py-2 border border-border rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition-colors"
        >
          Previous
        </button>

        <div className="text-sm text-muted-foreground">
          {Object.keys(answers).length}/{quiz.length} answered
        </div>

        {currentQuestion === quiz.length - 1 ? (
          <button
            onClick={submitQuiz}
            disabled={Object.keys(answers).length !== quiz.length}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

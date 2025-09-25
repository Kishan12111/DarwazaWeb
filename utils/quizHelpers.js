// Quiz generation helpers for SSC platform
export const generateQuizFromContent = (content, title) => {
  const questions = []

  // Extract facts and information from content
  const facts = extractFacts(content)
  const dates = extractDates(content)
  const numbers = extractNumbers(content)
  const properNouns = extractProperNouns(content)

  // Generate multiple choice questions
  questions.push(...generateMCQs(facts, properNouns, dates, numbers))

  // Generate true/false questions
  questions.push(...generateTrueFalse(facts, title))

  // Shuffle and limit to 10 questions
  return shuffleArray(questions).slice(0, 10)
}

const extractFacts = (content) => {
  const facts = []

  // Split content into sentences
  const sentences = content
    .replace(/[#*]/g, "") // Remove markdown formatting
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && s.length < 200)

  // Filter for factual sentences (containing numbers, dates, or specific patterns)
  sentences.forEach((sentence) => {
    if (
      /\d+/.test(sentence) || // Contains numbers
      /\b(is|are|was|were|has|have|will|established|launched|created|founded)\b/i.test(sentence) || // Factual verbs
      /\b(over|under|more than|less than|approximately|about)\b/i.test(sentence) // Quantifiers
    ) {
      facts.push(sentence)
    }
  })

  return facts.slice(0, 15) // Limit facts
}

const extractDates = (content) => {
  const dateRegex =
    /\b(19|20)\d{2}\b|\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+(19|20)\d{2}\b/gi
  return [...new Set(content.match(dateRegex) || [])]
}

const extractNumbers = (content) => {
  const numberRegex =
    /\b\d+(?:,\d{3})*(?:\.\d+)?\s*(?:crore|lakh|billion|million|thousand|%|percent|GW|MW|tonnes?|kg|km|meters?)\b/gi
  return [...new Set(content.match(numberRegex) || [])]
}

const extractProperNouns = (content) => {
  // Extract capitalized words that are likely proper nouns
  const properNounRegex = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g
  const matches = content.match(properNounRegex) || []

  // Filter out common words and keep relevant proper nouns
  const commonWords = [
    "The",
    "This",
    "That",
    "These",
    "Those",
    "India",
    "Indian",
    "Government",
    "National",
    "State",
    "Public",
    "Digital",
    "Policy",
    "Act",
    "Mission",
    "Program",
    "Scheme",
    "Initiative",
  ]

  return [...new Set(matches)].filter((word) => !commonWords.includes(word) && word.length > 3).slice(0, 20)
}

const generateMCQs = (facts, properNouns, dates, numbers) => {
  const mcqs = []

  // Generate questions from facts
  facts.slice(0, 4).forEach((fact, index) => {
    if (numbers.length > 0 && fact.includes(numbers[0])) {
      // Number-based question
      const correctAnswer = numbers[0]
      const distractors = generateNumberDistractors(correctAnswer, numbers)

      mcqs.push({
        id: `mcq_${index}`,
        type: "multiple-choice",
        question: fact.replace(correctAnswer, "______"),
        options: shuffleArray([correctAnswer, ...distractors]).slice(0, 4),
        correctAnswer: correctAnswer,
        explanation: `The correct figure mentioned in the content is ${correctAnswer}.`,
      })
    } else if (properNouns.length > 0) {
      // Proper noun based question
      const correctAnswer = properNouns.find((noun) => fact.includes(noun))
      if (correctAnswer) {
        const distractors = properNouns.filter((noun) => noun !== correctAnswer).slice(0, 3)

        mcqs.push({
          id: `mcq_${index}`,
          type: "multiple-choice",
          question: fact.replace(correctAnswer, "______"),
          options: shuffleArray([correctAnswer, ...distractors]).slice(0, 4),
          correctAnswer: correctAnswer,
          explanation: `According to the content, ${correctAnswer} is the correct answer.`,
        })
      }
    }
  })

  return mcqs
}

const generateTrueFalse = (facts, title) => {
  const trueFalse = []

  facts.slice(0, 4).forEach((fact, index) => {
    // Create true statement
    trueFalse.push({
      id: `tf_true_${index}`,
      type: "true-false",
      question: fact,
      correctAnswer: true,
      explanation: "This statement is directly mentioned in the editorial.",
    })

    // Create false statement by negation or modification
    let falseFact = fact
    if (fact.includes("increased")) {
      falseFact = fact.replace("increased", "decreased")
    } else if (fact.includes("successful")) {
      falseFact = fact.replace("successful", "unsuccessful")
    } else if (fact.includes("more than")) {
      falseFact = fact.replace("more than", "less than")
    } else {
      falseFact = `${fact.split(" ").slice(0, -3).join(" ")} is not mentioned in the content.`
    }

    trueFalse.push({
      id: `tf_false_${index}`,
      type: "true-false",
      question: falseFact,
      correctAnswer: false,
      explanation: "This statement contradicts or is not supported by the information in the editorial.",
    })
  })

  return trueFalse.slice(0, 6) // Limit to 6 T/F questions
}

const generateNumberDistractors = (correct, allNumbers) => {
  const distractors = []
  const correctNum = Number.parseFloat(correct.replace(/[^\d.]/g, ""))

  // Generate plausible distractors
  distractors.push(`${Math.floor(correctNum * 0.8)}${correct.replace(/[\d.]/g, "")}`)
  distractors.push(`${Math.floor(correctNum * 1.2)}${correct.replace(/[\d.]/g, "")}`)
  distractors.push(`${Math.floor(correctNum * 0.5)}${correct.replace(/[\d.]/g, "")}`)

  // Add other numbers from content as distractors
  allNumbers.forEach((num) => {
    if (num !== correct && distractors.length < 6) {
      distractors.push(num)
    }
  })

  return distractors.slice(0, 3)
}

const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const calculateQuizScore = (answers, questions) => {
  let correct = 0
  const total = questions.length

  questions.forEach((question) => {
    const userAnswer = answers[question.id]
    if (userAnswer === question.correctAnswer) {
      correct++
    }
  })

  return {
    correct,
    total,
    percentage: Math.round((correct / total) * 100),
    grade: getGrade(correct / total),
  }
}

const getGrade = (ratio) => {
  if (ratio >= 0.9) return "Excellent"
  if (ratio >= 0.8) return "Very Good"
  if (ratio >= 0.7) return "Good"
  if (ratio >= 0.6) return "Average"
  return "Needs Improvement"
}

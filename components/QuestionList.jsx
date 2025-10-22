"use client"
import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from "../convex/_generated/api.js";
import LatexRenderer from './LatexRenderer';
import Header from './Header.jsx';
// import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SUBJECT_CODES = ['EE', 'EC', 'CS', 'ME', 'CE', 'CH', 'BT', 'PH', 'CY', 'MA'];
const YEARS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
const TOPICS = ['Math', 'Aptitude', 'Technical', 'General Knowledge', 'Reasoning'];

export default function QuestionList( { subjectCode, year } ) {
  const [filters, setFilters] = useState({ searchText: '', subjectCode: subjectCode || '', year: year || '', topic: '' });
  const [search, setSearch] = useState(false);
  // Removed local darkMode state; now using global theme

  const questions = useQuery(api.fetchQuestions.searchQuestions, filters);

  // Removed useEffect for darkMode; handled globally

  const handleFilterChange = (field, value) => setFilters(prev => ({ ...prev, [field]: value }));
  const clearFilters = () => setFilters({ searchText: '', subjectCode: '', year: '', topic: '' });

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      {/* Dark mode toggle button moved to global header/layout */}

      <div className="space-y-6 px-6 md:px-12 py-8">
        <button
          onClick={() => setSearch(!search)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          {search ? 'Close Search' : 'Search Questions'}
        </button>

        {search && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Search Questions</h2>
            <input
              type="text"
              value={filters.searchText}
              onChange={(e) => handleFilterChange('searchText', e.target.value)}
              placeholder="Search questions..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[{ value: filters.subjectCode, options: SUBJECT_CODES, placeholder: 'All Subjects', field: 'subjectCode' },
                { value: filters.year, options: YEARS, placeholder: 'All Years', field: 'year' },
                { value: filters.topic, options: TOPICS, placeholder: 'All Topics', field: 'topic' }
              ].map((filter, idx) => (
                <select
                  key={idx}
                  value={filter.value}
                  onChange={(e) => handleFilterChange(filter.field, e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">{filter.placeholder}</option>
                  {filter.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ))}
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {questions === undefined ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="mt-3 text-gray-600 dark:text-gray-300">Loading questions...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-300">
              <p>No questions found matching your criteria.</p>
            </div>
          ) : (
            <AnimatePresence>
              {questions.map((question, index) => (
                <motion.div
                  key={question._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <QuestionCard question={question} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

function QuestionCard({ question }) {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition hover:shadow-2xl">
      <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-gradient-to-r from-blue-200 to-blue-400 dark:from-blue-700 dark:to-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded font-semibold">{question.subjectCode}</span>
          <span className="px-2 py-1 bg-gradient-to-r from-green-200 to-green-400 dark:from-green-700 dark:to-green-900 text-green-800 dark:text-green-200 text-xs rounded font-semibold">{question.year}</span>
          <span className="px-2 py-1 bg-gradient-to-r from-purple-200 to-purple-400 dark:from-purple-700 dark:to-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded font-semibold">{question.topic}</span>
          {question.questionId && <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded font-mono">ID: {question.questionId}</span>}
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(question._creationTime).toLocaleDateString()}</span>
      </div>

      <div className="mb-4"><LatexRenderer text={question.questionText} /></div>

      {question.questionImageUrl && <img src={question.questionImageUrl} alt="Question" className="max-w-full h-auto rounded-lg border dark:border-gray-700 mb-4" style={{ maxHeight: '300px' }} />}

      {question.options.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Options:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options.map(option => (
              <div key={option.label} className="flex items-start gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <span className="font-medium text-gray-700 dark:text-gray-300 mt-1">{option.label.toUpperCase()}.</span>
                <div className="flex-1">
                  {option.text && <div className="mb-2"><LatexRenderer text={option.text} /></div>}
                  {option.imageUrl && <img src={option.imageUrl} alt={`Option ${option.label}`} className="max-w-full h-auto rounded-lg border dark:border-gray-700" style={{ maxHeight: '150px' }} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition"
        >
          {showAnswer ? 'Hide' : 'Show'} Answer
          <svg className={`w-4 h-4 transform transition-transform ${showAnswer ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAnswer && (
          <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Answer Type:</span>
              <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs rounded">{question.answerType === 'ai' ? 'AI-generated' : question.answerType === 'human' ? 'Human-generated' : 'Video solution'}</span>
            </div>
            {question.answerType === 'video' ? (
              <a href={question.answerContent} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">{question.answerContent}</a>
            ) : (
              <div className="text-gray-700 dark:text-gray-200"><LatexRenderer text={question.answerContent} /></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function Questions_Instructor() {
  const [questions] = useState([
    { id: 1, text: 'Question 1: Basic Concepts', difficulty: 'Easy', correctRate: '85%', discriminator: '0.42' },
    { id: 2, text: 'Question 2: Problem Solving', difficulty: 'Medium', correctRate: '65%', discriminator: '0.58' },
    { id: 3, text: 'Question 3: Advanced Theory', difficulty: 'Hard', correctRate: '42%', discriminator: '0.71' },
    { id: 4, text: 'Question 4: Practical Application', difficulty: 'Medium', correctRate: '58%', discriminator: '0.63' },
  ]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Question Bank</h3>
          <p className="mt-1 text-sm text-gray-500 max-w-2xl">All questions with performance metrics</p>
        </div>
        <button
          onClick={() => alert('Add New Question clicked!')}
          className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-sm text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-1"
        >
          Add New Question
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Correct Rate
              </th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Discriminator
              </th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {questions.map((question) => (
              <tr key={question.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{question.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{question.text}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      question.difficulty === 'Easy'
                        ? 'bg-green-100 text-green-800'
                        : question.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {question.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{question.correctRate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{question.discriminator}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert(`Edit question ${question.id}`)}
                      className="p-2 text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
                      title="Edit"
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      onClick={() => alert(`Delete question ${question.id}`)}
                      className="p-2 text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

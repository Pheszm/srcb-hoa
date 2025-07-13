import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function Exams_Instructor() {
  const [exams] = useState([
    { id: 1, title: 'Midterm Exam', date: '2023-11-15', participants: 85, avgScore: 72.5, status: 'completed' },
    { id: 2, title: 'Final Exam', date: '2023-12-20', participants: 78, avgScore: 65.3, status: 'upcoming' },
    { id: 3, title: 'Quiz 1', date: '2023-10-10', participants: 92, avgScore: 81.2, status: 'completed' },
    { id: 4, title: 'Quiz 2', date: '2023-11-05', participants: 89, avgScore: 68.7, status: 'completed' },
  ]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Assessments Management</h3>
          <p className="mt-1 text-sm text-gray-500 max-w-2xl">
            Create and manage all assessments
          </p>
        </div>
        <button
          onClick={() => alert('Create New Exam clicked!')}
          className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-sm text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-1"
        >
          Create New Exam
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Participants</th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Avg. Score</th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.participants}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.avgScore}%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      exam.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {exam.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert(`Edit exam ${exam.id}`)}
                      className="p-2 text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
                      title="Edit Exam"
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      onClick={() => alert(`Delete exam ${exam.id}`)}
                      className="p-2 text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
                      title="Delete Exam"
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

import React, { useState } from 'react';
import { FiEye } from 'react-icons/fi';

export default function Students_Instructor() {
  const [students] = useState([
    { id: 1, name: 'John Doe', lastAttempt: '2023-11-15', avgScore: 78.5, completionRate: '92%' },
    { id: 2, name: 'Jane Smith', lastAttempt: '2023-11-15', avgScore: 85.2, completionRate: '100%' },
    { id: 3, name: 'Alex Johnson', lastAttempt: '2023-11-14', avgScore: 65.8, completionRate: '85%' },
    { id: 4, name: 'Sarah Williams', lastAttempt: '2023-11-13', avgScore: 72.1, completionRate: '95%' },
    { id: 5, name: 'Michael Brown', lastAttempt: '2023-11-12', avgScore: 69.3, completionRate: '88%' },
  ]);



    const [students2, setStudents] = useState([]);
    const fetchStudents = async () => {
        try {
            const response = await fetch('/api/Student_API/Student_CRUD');
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const data = await response.json();
            setStudents(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Students Performance</h3>
          <p className="mt-1 text-sm text-gray-500 max-w-2xl">
            Detailed view of student performance across exams
          </p>
        </div>
        <button
          onClick={() => alert('Add Student clicked!')}
          className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-sm text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-1"
        >
          Add Student
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Last Attempt
              </th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Avg. Score
              </th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Completion Rate
              </th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold uppercase">
                        {student.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastAttempt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.avgScore}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.completionRate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert(`View details of ${student.name}`)}
                      className="p-2 text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
                      title="View Details"
                    >
                      <FiEye size={20} />
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

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function Overview_Instructor() {
  // Local mock data
  const exams = [
    { id: 1, title: 'Midterm Exam', avgScore: 72.5 },
    { id: 2, title: 'Final Exam', avgScore: 65.3 },
    { id: 3, title: 'Quiz 1', avgScore: 81.2 },
    { id: 4, title: 'Quiz 2', avgScore: 68.7 },
  ];

  const students = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alex Johnson' },
    { id: 4, name: 'Sarah Williams' },
    { id: 5, name: 'Michael Brown' },
  ];

  const questions = [
    { id: 1, difficulty: 'Easy' },
    { id: 2, difficulty: 'Medium' },
    { id: 3, difficulty: 'Hard' },
    { id: 4, difficulty: 'Medium' },
  ];

  const performanceCanvasRef = useRef(null);
  const difficultyCanvasRef = useRef(null);

  useEffect(() => {
    // Chart instances
    let performanceChart;
    let difficultyChart;

    if (performanceCanvasRef.current) {
      performanceChart = new Chart(performanceCanvasRef.current.getContext('2d'), {
        type: 'bar',
        data: {
          labels: exams.map(e => e.title),
          datasets: [{
            label: 'Average Score',
            data: exams.map(e => e.avgScore),
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, max: 100, title: { display: true, text: 'Score (%)' }}
          },
          plugins: { legend: { position: 'top' } }
        }
      });
    }

    if (difficultyCanvasRef.current) {
      // Count difficulties
      const counts = { Easy: 0, Medium: 0, Hard: 0 };
      questions.forEach(q => { counts[q.difficulty] = (counts[q.difficulty] || 0) + 1; });

      difficultyChart = new Chart(difficultyCanvasRef.current.getContext('2d'), {
        type: 'pie',
        data: {
          labels: ['Easy', 'Medium', 'Hard'],
          datasets: [{
            data: [counts.Easy, counts.Medium, counts.Hard],
            backgroundColor: [
              'rgba(74, 222, 128, 0.6)',
              'rgba(250, 204, 21, 0.6)',
              'rgba(248, 113, 113, 0.6)',
            ],
            borderColor: [
              'rgba(74, 222, 128, 1)',
              'rgba(250, 204, 21, 1)',
              'rgba(248, 113, 113, 1)',
            ],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }

    return () => {
      if (performanceChart) performanceChart.destroy();
      if (difficultyChart) difficultyChart.destroy();
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Exams */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="px-4 py-5 sm:p-6 flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <div className="ml-5">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Exams</dt>
              <dd className="text-2xl font-semibold text-gray-900">{exams.length}</dd>
            </div>
          </div>
        </div>

        {/* Total Students */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="px-4 py-5 sm:p-6 flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <div className="ml-5">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
              <dd className="text-2xl font-semibold text-gray-900">{students.length}</dd>
            </div>
          </div>
        </div>

        {/* Avg Exam Score */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="px-4 py-5 sm:p-6 flex items-center">
            <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <div className="ml-5">
              <dt className="text-sm font-medium text-gray-500 truncate">Avg. Exam Score</dt>
              <dd className="text-2xl font-semibold text-gray-900">
                {(exams.reduce((acc, e) => acc + e.avgScore, 0)/exams.length).toFixed(1)}%
              </dd>
            </div>
          </div>
        </div>

        {/* Total Questions */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="px-4 py-5 sm:p-6 flex items-center">
            <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
            </div>
            <div className="ml-5">
              <dt className="text-sm font-medium text-gray-500 truncate">Questions</dt>
              <dd className="text-2xl font-semibold text-gray-900">{questions.length}</dd>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Exam Performance</h3>
          <div className="h-64">
            <canvas ref={performanceCanvasRef}></canvas>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Question Difficulty Distribution</h3>
          <div className="h-64">
            <canvas ref={difficultyCanvasRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

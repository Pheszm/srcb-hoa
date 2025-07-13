import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function Analytics_Instructor() {
  // Mock data for charts
  const timeSeriesData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    completions: [12, 19, 15, 27, 23, 32],
    averageScores: [65, 59, 72, 68, 75, 70]
  };

  const examPerformanceData = [
    { title: 'Midterm Exam', avgScore: 72.5 },
    { title: 'Final Exam', avgScore: 65.3 },
    { title: 'Quiz 1', avgScore: 81.2 },
    { title: 'Quiz 2', avgScore: 68.7 }
  ];

  const questionDifficultyData = {
    easy: 35,
    medium: 45,
    hard: 20
  };

  const scoreDistributionData = {
    labels: ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'],
    counts: [2, 5, 12, 18, 8]
  };

  // Refs for canvas elements
  const timeSeriesCanvasRef = useRef(null);
  const performanceCanvasRef = useRef(null);
  const difficultyCanvasRef = useRef(null);
  const scoreDistributionCanvasRef = useRef(null);

  useEffect(() => {
    let timeSeriesChart, performanceChart, difficultyChart, scoreDistributionChart;

    // Time Series Chart (Line)
    if (timeSeriesCanvasRef.current) {
      const ctx = timeSeriesCanvasRef.current.getContext('2d');
      timeSeriesChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: timeSeriesData.labels,
          datasets: [
            {
              label: 'Assessments Completions',
              data: timeSeriesData.completions,
              borderColor: 'rgb(0, 4, 230)',
              backgroundColor: 'rgba(0, 4, 255, 0.6)',
              fill: false,
              tension: 0.1,
            },
            {
              label: 'Average Score',
              data: timeSeriesData.averageScores,
              borderColor: 'rgba(245, 158, 11, 1)',
              backgroundColor: 'rgba(245, 158, 11, 0.6)',
              fill: false,
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Value',
              }
            }
          },
          plugins: {
            legend: { position: 'top' }
          }
        }
      });
    }

    // Exam Performance Chart (Bar)
    if (performanceCanvasRef.current) {
      const ctx = performanceCanvasRef.current.getContext('2d');
      performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: examPerformanceData.map(e => e.title),
          datasets: [{
            label: 'Average Score',
            data: examPerformanceData.map(e => e.avgScore),
            backgroundColor: 'rgba(17, 41, 179, 0.6)',
            borderColor: 'rgb(18, 74, 164)',
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Score (%)',
              }
            }
          },
          plugins: {
            legend: { position: 'top' }
          }
        }
      });
    }

    // Question Difficulty Chart (Pie)
    if (difficultyCanvasRef.current) {
      const ctx = difficultyCanvasRef.current.getContext('2d');
      difficultyChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Easy', 'Medium', 'Hard'],
          datasets: [{
            data: [questionDifficultyData.easy, questionDifficultyData.medium, questionDifficultyData.hard],
            backgroundColor: [
              'rgba(74, 222, 128, 0.6)',
              'rgba(250, 204, 21, 0.6)',
              'rgba(248, 113, 113, 0.6)'
            ],
            borderColor: [
              'rgba(74, 222, 128, 1)',
              'rgba(250, 204, 21, 1)',
              'rgba(248, 113, 113, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }

    // Student Score Distribution Chart (Bar)
    if (scoreDistributionCanvasRef.current) {
      const ctx = scoreDistributionCanvasRef.current.getContext('2d');
      scoreDistributionChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: scoreDistributionData.labels,
          datasets: [{
            label: 'Number of Students',
            data: scoreDistributionData.counts,
            backgroundColor: 'rgba(0, 38, 208, 0.6)',
            borderColor: 'rgb(13, 5, 151)',
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Number of Students' } },
            x: { title: { display: true, text: 'Score Range' } }
          },
          plugins: { legend: { position: 'top' } }
        }
      });
    }

    // Cleanup charts on unmount
    return () => {
      if (timeSeriesChart) timeSeriesChart.destroy();
      if (performanceChart) performanceChart.destroy();
      if (difficultyChart) difficultyChart.destroy();
      if (scoreDistributionChart) scoreDistributionChart.destroy();
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Performance Over Time */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Over Time</h3>
        <div className="h-96">
          <canvas ref={timeSeriesCanvasRef}></canvas>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Exam Performance Comparison */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Assessments Performance Comparison</h3>
          <div className="h-64">
            <canvas ref={performanceCanvasRef}></canvas>
          </div>
        </div>

        {/* Question Difficulty Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Question Difficulty Distribution</h3>
          <div className="h-64">
            <canvas ref={difficultyCanvasRef}></canvas>
          </div>
        </div>
      </div>

      {/* Student Score Distribution */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Student Score Distribution</h3>
        <div className="h-64">
          <canvas ref={scoreDistributionCanvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { FiUsers, FiBook, FiUser, FiPieChart, FiCalendar, FiBell } from 'react-icons/fi';


export default function DashboardPage() {
  // Sample data for dashboard cards
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 1245,
    activeStudents: 1023,
    totalPrograms: 4,
    activePrograms: 3,
    totalStaff: 28,
    activeStaff: 25,
  });

  // Sample data for recent activities
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: "New student enrolled", program: "BSIT", time: "10 mins ago" },
    { id: 2, action: "Program updated", program: "BSHM", time: "25 mins ago" },
    { id: 3, action: "Staff account created", program: "", time: "1 hour ago" },
    { id: 4, action: "Student status changed", program: "BSBA", time: "2 hours ago" },
  ]);

  // Sample data for statistics
  const [programDistribution, setProgramDistribution] = useState([
    { program: "BSIT", students: 420 },
    { program: "BSHM", students: 380 },
    { program: "BSBA", students: 280 },
    { program: "BSCRIM", students: 165 },
  ]);

  return (
    <div className="px-4 md:px-0">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Students Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Students</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.totalStudents}</h3>
              <div className="flex items-center mt-2">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {dashboardData.activeStudents} Active
                </span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiUsers size={24} />
            </div>
          </div>
        </div>

        {/* Programs Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Degree Programs</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.totalPrograms}</h3>
              <div className="flex items-center mt-2">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {dashboardData.activePrograms} Active
                </span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FiBook size={24} />
            </div>
          </div>
        </div>

        {/* Staff Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Staff Members</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.totalStaff}</h3>
              <div className="flex items-center mt-2">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {dashboardData.activeStaff} Active
                </span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              <FiUser size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Program Distribution */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Program Distribution</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          
          <div className="space-y-4">
            {programDistribution.map((item) => (
              <div key={item.program} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.program}</span>
                  <span className="text-gray-500">{item.students} students</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-800 h-2.5 rounded-full" 
                    style={{ width: `${(item.students / dashboardData.activeStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="p-1.5 rounded-full bg-gray-100 text-gray-600 mt-1">
                  <FiCalendar size={14} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  {activity.program && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full mr-2">
                      {activity.program}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
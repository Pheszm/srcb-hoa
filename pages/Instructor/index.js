import { useState } from 'react';
import Overview from "./Overview_Instructor";
import Analytics from "./Analytics_Instructor";
import Exams from "./Assessments_Instructor";
import Students from "./Students_Instructor";
import Questions from "./Questions_Instructor"; 
import * as AiIcons_md from "react-icons/md";




export default function Instructor() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-white">
      <title>Instructor | HED Online Assessment</title>
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center relative">
            <img className="h-20 py-3" src="Assets/SRCB_Logo.png" />
            <div className="flex items-center justify-end gap-2 absolute w-full">
              <span className="text-gray-600">Liezel E. Rodrigo</span>
              <div
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="relative h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center text-white font-semibold cursor-pointer"
              >
                P
              </div>

              {/* Profile Menu */}
              <div
                className={`absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-sm z-10 overflow-hidden transform transition-all duration-200 ease-out ${
                  isProfileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <AiIcons_md.MdSettings size={20} />
                  Profile Settings
                </button>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <AiIcons_md.MdExitToApp size={20} />
                  Logout
                </button>
              </div>
            </div>
          </div>

        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 overflow-y-auto pt-3">
          <nav className="flex space-x-8">
            {['overview', 'Assessments', 'students', 'questions', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Render Active Tab */}
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'Assessments' && <Exams />}
        {activeTab === 'students' && <Students />}
        {activeTab === 'questions' && <Questions />}
        {activeTab === 'analytics' && <Analytics />}
      </main>
    </div>
  );
}

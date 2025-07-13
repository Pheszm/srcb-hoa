import { useState } from 'react';
import * as AiIcons_fi from "react-icons/fi";

export default function AssessmentsPage() {
    const [assessments, setAssessments] = useState([
        { assessment: "Midterm Exam", subject: "ITP 307", dueDate: "11:00 AM | 2025-07-10" },
        { assessment: "Quiz 4", subject: "ITP 401", dueDate: "8:00 AM | 2025-07-15" },
        { assessment: "Final Exam", subject: "ITP 307", dueDate: "3:00 PM | 2025-07-20" },
        { assessment: "Quiz 3", subject: "ITP 401", dueDate: "5:00 PM | 2025-07-12" }
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter + Search
    const filteredAssessments = assessments.filter(item => 
        item.assessment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAssessments.length / itemsPerPage);
    const currentAssessments = filteredAssessments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleFilterChange = () => setCurrentPage(1);


    const handleRowClick = (assessment) => {
        alert(`${assessment.assessment} (${assessment.subject})`);
    };

    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="mb-6 w-full flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h1 className="text-2xl text-gray-700 font-bold mb-2 sm:mb-0">Assessments</h1>
                <div className="relative w-full sm:w-100">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <AiIcons_fi.FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search assessments or subjects..."
                        className="pl-10 pr-4 py-2 w-full text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleFilterChange();
                        }}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Assessment</th>
                            <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAssessments.map((item, index) => (
                            <tr
                                key={index}
                                tabIndex={0}
                                onClick={() => handleRowClick(item)}
                                className="border-b border-gray-200 cursor-pointer hover:bg-blue-50 focus:bg-blue-100 focus:outline-none"
                            >
                                <td className="px-6 py-4text-gray-900">{item.assessment}</td>
                                <td className="px-6 py-4 text-gray-500">{item.subject}</td>
                                <td className="px-6 py-4 text-gray-500">{item.dueDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-800'} text-white transition-colors`}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="text-blue-900 font-medium">
                    {currentPage} / {totalPages || 1}
                </span>
                <button
                    className={`px-4 py-2 rounded-lg ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-800'} text-white transition-colors`}
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    Next
                </button>
            </div>

        </div>
    );
}

import { useState } from 'react';
import * as AiIcons_fi from "react-icons/fi";
import AddingProgram from "./Forms/Add_Program";
import ViewingProgram from "./Forms/View_Program";
import UpdatingProgram from "./Forms/Update_Program";

export default function ProgramPage() {
    // Handle Modal Forms
    const [SelectedModal, setSelectedModal] = useState(""); 
    const handlePageChange = (page) => {
        setSelectedModal(page);
    };
    const handleCloseForm = () => {
        setSelectedModal("");
    };

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Filter states
    const [selectedSex, setSelectedSex] = useState("");
    const [selectedProgram, setSelectedProgram] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    // Search state
    const [searchQuery, setSearchQuery] = useState("");

    // Helper function to generate student data
    const generateStudent = (id, name, sex, program, status) => ({
        id, name, sex, program, status
    });

    const students = [
        generateStudent(1, "Gallardo, Carl Wyne S.", "Male", "BSIT", "Active"),
        generateStudent(2, "Doe, John E.", "Male", "BSHM", "Inactive"),
        generateStudent(3, "Santos, Maria Grace T.", "Female", "BSBA", "Active"),
        generateStudent(4, "Dela Cruz, Michael J.", "Male", "BSCRIM", "Inactive"),
        generateStudent(5, "Perez, Ana L.", "Female", "BSIT", "Active"),
        generateStudent(6, "Bautista, Kevin M.", "Male", "BSBA", "Active"),
        generateStudent(7, "Villanueva, John Paolo D.", "Male", "BSHM", "Active"),
        generateStudent(8, "Torres, Gina S.", "Female", "BSIT", "Inactive"),
        generateStudent(9, "Gonzales, Patrick J.", "Male", "BSBA", "Active"),
        generateStudent(10, "Lopez, Sarah B.", "Female", "BSCRIM", "Inactive"),
        generateStudent(11, "Martinez, Joseph L.", "Male", "BSIT", "Active"),
        generateStudent(12, "Castillo, Rachelle P.", "Female", "BSHM", "Inactive"),
        generateStudent(13, "Jimenez, Carlo A.", "Male", "BSBA", "Active"),
        generateStudent(14, "Ramirez, Dianne M.", "Female", "BSIT", "Inactive"),
        generateStudent(15, "Alvarez, Mark N.", "Male", "BSHM", "Active"),
        generateStudent(16, "Diaz, Erica J.", "Female", "BSBA", "Inactive"),
        generateStudent(17, "Mendoza, Victor L.", "Male", "BSIT", "Active"),
        generateStudent(18, "Chavez, Rosa F.", "Female", "BSCRIM", "Inactive"),
        generateStudent(19, "Serrano, Ariel D.", "Male", "BSBA", "Active"),
        generateStudent(20, "Ibarra, Katrina P.", "Female", "BSHM", "Active"),
        generateStudent(21, "Navarro, Julian M.", "Male", "BSIT", "Inactive"),
        generateStudent(22, "Quinto, Camila E.", "Female", "BSBA", "Active")
    ];

    // Filter students based on selected filters and search query
    const filteredStudents = students.filter((student) => {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        if (searchQuery && !student.name.toLowerCase().includes(lowerCaseSearchQuery)) {
            return false;
        }
        if (selectedSex && student.sex !== selectedSex) return false;
        if (selectedProgram && student.program !== selectedProgram) return false;
        if (selectedStatus && student.status !== selectedStatus) return false;
        return true;
    });

    // Reset to page 1 when filters change
    const handleFilterChange = () => setCurrentPage(1);

    // Pagination logic
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const currentStudents = filteredStudents.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    return (
        <div className="p-6 bg-white min-h-screen">
            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <AiIcons_fi.FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search for Student.."
                        className="pl-10 pr-4 py-2 w-full text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleFilterChange();
                        }}
                    />
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
                    <select
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        value={selectedSex}
                        onChange={(e) => {
                            setSelectedSex(e.target.value);
                            handleFilterChange();
                        }}
                    >
                        <option value="">All Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <select
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        value={selectedProgram}
                        onChange={(e) => {
                            setSelectedProgram(e.target.value);
                            handleFilterChange();
                        }}
                    >
                        <option value="">All Programs</option>
                        <option value="BSIT">BSIT</option>
                        <option value="BSHM">BSHM</option>
                        <option value="BSBA">BSBA</option>
                        <option value="BSCRIM">BSCRIM</option>
                    </select>

                    <select
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        value={selectedStatus}
                        onChange={(e) => {
                            setSelectedStatus(e.target.value);
                            handleFilterChange();
                        }}
                    >
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <button 
                        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
                        onClick={() => handlePageChange("AddProgram")}
                    >
                        Add Student +
                    </button>
                </div>
            </div>

            {/* Student Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sex</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentStudents.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.program}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.sex}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {student.status === "Active" ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            Inactive
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex gap-2">
                                        <button 
                                            className="p-2 text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
                                            onClick={() => handlePageChange("ViewProgram")}
                                            title="VIEW"
                                        >
                                            <AiIcons_fi.FiEye size={20} />
                                        </button>
                                        <button 
                                            className="p-2 text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
                                            onClick={() => handlePageChange("UpdateProgram")}
                                            title="EDIT"
                                        >
                                            <AiIcons_fi.FiEdit size={20} />
                                        </button>
                                        <button 
                                            className="p-2 text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
                                            title="REMOVE"
                                        >
                                            <AiIcons_fi.FiTrash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
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

            {/* Modals */}
            {SelectedModal === "AddProgram" && (
                <div className="BlurryBackground">
                    <AddingProgram onClose={handleCloseForm} />
                </div>
            )}

            {SelectedModal === "ViewProgram" && (
                <div className="BlurryBackground">
                    <ViewingProgram onClose={handleCloseForm} />
                </div>
            )}

            {SelectedModal === "UpdateProgram" && (
                <div className="BlurryBackground">
                    <UpdatingProgram onClose={handleCloseForm} />
                </div>
            )}
        </div>
    );
}
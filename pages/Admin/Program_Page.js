import { useState } from 'react';
import * as AiIcons_fi from "react-icons/fi";
import AddingProgram from "./Forms/Add_Program";
import ViewingProgram from "./Forms/View_Program";
import UpdatingProgram from "./Forms/Update_Program";

export default function ProgramPage() {
    const [SelectedModal, setSelectedModal] = useState(""); 
    const [programs, setPrograms] = useState([
        { title: "Bachelor of Science in Information Technology", code: "BSIT", status: "Active" },
        { title: "Bachelor of Science in Hospitality Management", code: "BSHM", status: "Active" },
        { title: "Bachelor of Science in Business Administration", code: "BSBA", status: "Active" },
        { title: "Bachelor of Science in Criminology", code: "BSCRIM", status: "Inactive" }
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handlePageChange = (page) => setSelectedModal(page);
    const handleCloseForm = () => setSelectedModal("");
    const addProgram = (newProgram) => setPrograms([...programs, newProgram]);

    // Filter + Search
    const filteredPrograms = programs.filter(program => {
        const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus ? program.status === selectedStatus : true;
        return matchesSearch && matchesStatus;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
    const currentPrograms = filteredPrograms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Reset to page 1 when filters/search change
    const handleFilterChange = () => setCurrentPage(1);

    return (
        <div className="p-6 bg-white min-h-screen">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
<div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <AiIcons_fi.FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search programs..."
                        className="pl-10 pr-4 py-2 w-full text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleFilterChange();
                        }}
                    />
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
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
                        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                        onClick={() => handlePageChange("AddProgram")}
                    >
                        Add Program +
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Code</th>
                            <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPrograms.map((program, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-6 py-4">{program.title}</td>
                                <td className="px-6 py-4">{program.code}</td>
                                <td className="px-6 py-4">
                                    {program.status === "Active" ? (
                                        <span className="inline-block bg-green-100 text-green-800 border border-green-300 rounded-full px-3 py-1 text-sm font-medium">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="inline-block bg-red-100 text-red-800 border border-red-300 rounded-full px-3 py-1 text-sm font-medium">
                                            Inactive
                                        </span>
                                    )}
                                </td> 
                                <td className="px-6 py-4">
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

            {SelectedModal === "AddProgram" && (
                <div className="BlurryBackground">
                    <AddingProgram onClose={handleCloseForm} addProgram={addProgram} />
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
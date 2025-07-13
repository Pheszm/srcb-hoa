import { useState } from 'react';
import * as AiIcons_fi from "react-icons/fi";
import AddingProgram from "./Forms/Add_Program";
import ViewingProgram from "./Forms/View_Program";
import UpdatingProgram from "./Forms/Update_Program";

export default function ProgramPage() {
    // Example staff data array
    const staffData = [
        {
            id: 1,
            name: "Liezel, Rodrigo E.",
            sex: "Female",
            status: "Active",
        },
        {
            id: 2,
            name: "John, Doe",
            sex: "Male",
            status: "Inactive",
        },
        {
            id: 3,
            name: "Sarah, Jones",
            sex: "Female",
            status: "Active",
        },
        // Add more staff records here
    ];

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
    const itemsPerPage = 5; // Number of staff per page

    // Filter states
    const [selectedSex, setSelectedSex] = useState("");  // "" for all, "Male", "Female"
    const [selectedStatus, setSelectedStatus] = useState("");  // "" for all, "Active", "Inactive"

    // Search state
    const [searchQuery, setSearchQuery] = useState("");  // The search input

    // Filter staff based on search query and selected filters
    const filteredStaff = staffData.filter((staff) => {
        // Search logic (case-insensitive)
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        if (searchQuery && !staff.name.toLowerCase().includes(lowerCaseSearchQuery)) {
            return false;
        }

        // Filter by sex
        if (selectedSex && staff.sex !== selectedSex) return false;

        // Filter by status
        if (selectedStatus && staff.status !== selectedStatus) return false;

        return true;
    });

    // Reset to page 1 when filters or search change
    const handleFilterChange = () => {
        setCurrentPage(1); // Reset to page 1
    };

    // Calculate total pages based on filtered staff
    const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

    // Get the staff data for the current page
    const currentStaff = filteredStaff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Pagination controls
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <AiIcons_fi.FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search for Staff.."
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
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
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
                        Add Staff +
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Sex</th>
                            <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentStaff.map((staff) => (
                            <tr key={staff.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{staff.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.sex}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {staff.status === "Active" ? (
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

            {/* MODAL FORMS AREA */}
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
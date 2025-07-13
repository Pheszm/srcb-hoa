import { useState } from 'react';
import { FiX } from 'react-icons/fi';


export default function DashboardPage() {
  
  return (
    <div className="px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        {/*  Subject 1 */}
          <article
            tabIndex={0}
            className="flex flex-col justify-between bg-white rounded-lg border border-gray-300 p-6 h-48
                      transition-colors duration-300 hover:bg-blue-100 focus:bg-blue-100 
                      focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <div>
              <h2 className="text-gray-600 font-bold text-2xl">System Administration and Maintenance 2</h2>
              <h3 className="text-lg text-gray-500">ITP 307</h3>
            </div>

            <div className="flex items-center mt-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                Mike Jun Zaballero
              </span>
            </div>
          </article>




        {/*  Subject 2 */}
          <article
            tabIndex={0}
            className="flex flex-col justify-between bg-white rounded-lg border border-gray-300 p-6 h-48
                      transition-colors duration-300 hover:bg-blue-100 focus:bg-blue-100 
                      focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <div>
              <h2 className="text-gray-600 font-bold text-2xl">Information Security 2</h2>
              <h3 className="text-lg text-gray-500">ITP 401</h3>
            </div>

            <div className="flex items-center mt-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                Rodel James Tamayo
              </span>
            </div>
          </article>




        {/*  Subject 3 */}
          <article
            tabIndex={0}
            className="group flex items-center justify-center bg-white rounded-lg border border-gray-300 p-6 h-48
                      transition-colors duration-300 hover:bg-blue-100 focus:bg-blue-100 
                      focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full text-blue-800 text-4xl
                            transition-colors duration-300 bg-blue-100
                            group-hover:bg-blue-300 group-focus:bg-blue-300 
                            group-hover:text-blue-400 group-focus:text-blue-400"
            >
              +
            </div>
          </article>



      </div>
    </div>
  );
}
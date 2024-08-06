// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import Sidebartype from './Sidebartype';
// // import { IoIosNotificationsOutline } from 'react-icons/io';

// // const ResolvedQueries: React.FC = () => {
// //   const [resolvedQueries, setResolvedQueries] = useState<any[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setErrorMessage] = useState<string>('');
// //   const [currentPage, setCurrentPage] = useState<number>(1);
// //   const queriesPerPage: number = 10; // Use constant instead of state for queriesPerPage
// //   const [totalQueries, setTotalQueries] = useState<number>(0);

// //   const totalPages = Math.ceil(totalQueries / queriesPerPage);
// //   const maxVisiblePages = 5;

// //   useEffect(() => {
// //     fetchResolvedQueries();
// //   }, [currentPage]);

// //   const fetchResolvedQueries = async () => {
// //     const accessToken = localStorage.getItem('accessToken');

// //     if (!accessToken) {
// //       console.error('No access token found');
// //       setErrorMessage('Access token is missing');
// //       setLoading(false);
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const response = await axios.post(
// //         'https://fintech.oxyloans.com/oxyloans/v1/user/testqueryDetailsBasedOnPrimaryType',
// //         {
// //           pageNo: currentPage,
// //           pageSize: queriesPerPage,
// //           status: 'Completed',
// //           primaryType: 'LENDER'
// //         },
// //         {
// //           headers: {
// //             'accessToken': accessToken,
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );

// //       setResolvedQueries(response.data.listOfUserQueryDetailsResponseDto);
// //       setTotalQueries(response.data.lenderCount);
// //       setErrorMessage('');
// //     } catch (err: any) {
// //       if (err.response) {
// //         console.error('Error fetching resolved queries:', err.response.data);
// //         setErrorMessage(`Failed to fetch resolved queries: ${err.response.status} ${err.response.statusText}`);
// //       } else if (err.request) {
// //         console.error('Error fetching resolved queries: No response received', err.request);
// //         setErrorMessage('Failed to fetch resolved queries: No response received.');
// //       } else {
// //         console.error('Error fetching resolved queries:', err.message);
// //         setErrorMessage(`Failed to fetch resolved queries: ${err.message}`);
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handlePageChange = (pageNumber: number) => {
// //     if (pageNumber >= 1 && pageNumber <= totalPages) {
// //       setCurrentPage(pageNumber);
// //     }
// //   };

// //   const handleFirstPage = () => {
// //     setCurrentPage(1);
// //   };

// //   const handleLastPage = () => {
// //     setCurrentPage(totalPages);
// //   };

// //   const getVisiblePages = () => {
// //     const halfVisible = Math.floor(maxVisiblePages / 2);
// //     let startPage = Math.max(1, currentPage - halfVisible);
// //     let endPage = Math.min(totalPages, currentPage + halfVisible);

// //     if (currentPage - halfVisible < 1) {
// //       endPage = Math.min(totalPages, endPage + (halfVisible - currentPage + 1));
// //     }
// //     if (currentPage + halfVisible > totalPages) {
// //       startPage = Math.max(1, startPage - (currentPage + halfVisible - totalPages));
// //     }

// //     const pages = [];
// //     for (let i = startPage; i <= endPage; i++) {
// //       pages.push(i);
// //     }

// //     return pages;
// //   };

// //   return (
// //     <div className="flex h-screen">
// //       <Sidebartype /> {/* Assuming Sidebar component is correctly imported and used */}

// //       <div className="flex-1 flex flex-col">
// //         {/* Header */}
// //         <header className="bg-gray-800 text-white p-4 flex items-center">
// //           <h1 className="text-xl">Lender Wallet Transactions</h1>
// //           <div className="ml-auto">
// //             {/* Notification Icon */}
// //             <IoIosNotificationsOutline className="text-2xl cursor-pointer hover:text-gray-400" />
// //             {/* Add more elements or icons as needed */}
// //           </div>
// //         </header>

// //         <div className="flex-1 p-4">
// //           <section className="content-header mb-6">
// //             <div className="flex justify-between items-center">
// //               <h3 className="text-xl font-semibold">Resolved Queries</h3>
// //               <div className="flex space-x-4">
// //                 {/* Use Link or NavLink from react-router-dom for internal links */}
// //                 <a href="/resolvedqueries">
// //                   <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600">
// //                     Resolved Lender Queries
// //                   </button>
// //                 </a>
// //               </div>
// //             </div>
// //             {/* Use proper conditional rendering for alerts */}
// //             {resolvedQueries.length > 0 && (
// //               <div className="alert alert-success mt-4" role="alert">
// //                 <strong>Deal Closed successfully.</strong>
// //               </div>
// //             )}
// //           </section>

// //           <section className="content">
// //             <div className="bg-white shadow-md rounded-lg overflow-hidden">
// //               <div className="p-4">
// //                 <div className="flex justify-between mb-4">
// //                   {/* Display total number of queries */}
// //                   <b>No of Lender Resolved queries: {totalQueries}</b>
// //                   <div className="flex space-x-2">
// //                     {/* Buttons for navigating pages */}
// //                     <button
// //                       className="btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400"
// //                       onClick={handleFirstPage}
// //                       disabled={currentPage === 1}
// //                     >
// //                       &lt;&lt;
// //                     </button>
// //                     <button
// //                       className="btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400"
// //                       onClick={() => handlePageChange(currentPage - 1)}
// //                       disabled={currentPage === 1}
// //                     >
// //                       &lt;
// //                     </button>
// //                     {getVisiblePages().map((page) => (
// //                       <button
// //                         key={page}
// //                         className={`btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400 ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
// //                         onClick={() => handlePageChange(page)}
// //                       >
// //                         {page}
// //                       </button>
// //                     ))}
// //                     <button
// //                       className="btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400"
// //                       onClick={() => handlePageChange(currentPage + 1)}
// //                       disabled={currentPage === totalPages}
// //                     >
// //                       &gt;
// //                     </button>
// //                     <button
// //                       className="btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400"
// //                       onClick={handleLastPage}
// //                       disabled={currentPage === totalPages}
// //                     >
// //                       &gt;&gt;
// //                     </button>
// //                   </div>
// //                 </div>
// //                 <div className="overflow-x-auto">
// //                   {/* Table to display resolved queries */}
// //                   <table className="table-auto w-full">
// //                     <thead>
// //                       <tr className="bg-gray-200">
// //                         <th className="p-2 border">Mobile Number & Email</th>
// //                         <th className="p-2 border">Query</th>
// //                         <th className="p-2 border">Admin Comments</th>
// //                         <th className="p-2 border">Responded On</th>
// //                         <th className="p-2 border">Status</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {/* Conditionally render based on loading, error, or data availability */}
// //                       {loading ? (
// //                         <tr>
// //                           <td colSpan={5} className="text-center p-4">Loading...</td>
// //                         </tr>
// //                       ) : error ? (
// //                         <tr>
// //                           <td colSpan={5} className="text-center p-4 text-red-500">{error}</td>
// //                         </tr>
// //                       ) : resolvedQueries.length === 0 ? (
// //                         <tr>
// //                           <td colSpan={5} className="text-center p-4">No data found</td>
// //                         </tr>
// //                       ) : (
// //                         resolvedQueries.map((query, index) => (
// //                           <tr key={index} className="hover:bg-gray-100">
// //                             <td className="p-2 border">
// //                               {/* Display relevant query details */}
// //                               <div><b>User Id:</b> {query.userId}</div>
// //                               <div><b>Mobile No:</b> {query.mobileNumber}</div>
// //                               <div><b>Email:</b> {query.email}</div>
// //                               <div><b>Ticket Id:</b> {query.ticketId}</div>
// //                               <div><b>User Name:</b> {query.name}</div>
// //                             </td>
// //                             <td className="p-2 border">{query.query}</td>
// //                             <td className="p-2 border">
// //                               <div><b>Admin Comments: </b> {query.comments}</div>
// //                               <div><b>Resolved By:</b> {query.resolvedBy}</div>
// //                             </td>
// //                             <td className="p-2 border">
// //                               <div><b>Status:</b> {query.status}</div>
// //                               <div><b>Responded On:</b> {query.respondedOn}</div>
// //                             </td>
// //                             <td className="p-2 border">
// //                               {/* Example buttons (disabled) */}
// //                               <button className="btn bg-green-500 text-white py-1 px-3 rounded-full mb-3" disabled>
// //                                 Resolved
// //                               </button><br/>
// //                               <button className="btn bg-red-500 text-white py-1 px-3 rounded-full" disabled>
// //                                 Pending
// //                               </button>
// //                             </td>
// //                           </tr>
// //                         ))
// //                       )}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </div>
// //             </div>
// //           </section>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ResolvedQueries;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebartype from './Sidebartype';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoMenu } from "react-icons/io5";
import UserImage from '../Assets/img/User.png';

const ResolvedQueries: React.FC = () => {
  const [resolvedQueries, setResolvedQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setErrorMessage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const queriesPerPage: number = 10;
  const [totalQueries, setTotalQueries] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const totalPages = Math.ceil(totalQueries / queriesPerPage);
  const maxVisiblePages = 5;

  useEffect(() => {
    fetchResolvedQueries();
  }, [currentPage]);

  const fetchResolvedQueries = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('No access token found');
      setErrorMessage('Access token is missing');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'https://fintech.oxyloans.com/oxyloans/v1/user/testqueryDetailsBasedOnPrimaryType',
        {
          pageNo: currentPage,
          pageSize: queriesPerPage,
          status: 'Completed',
          primaryType: 'LENDER'
        },
        {
          headers: {
            'accessToken': accessToken,
            'Content-Type': 'application/json'
          }
        }
      );

      setResolvedQueries(response.data.listOfUserQueryDetailsResponseDto);
      setTotalQueries(response.data.lenderCount);
      setErrorMessage('');
    } catch (err: any) {
      if (err.response) {
        console.error('Error fetching resolved queries:', err.response.data);
        setErrorMessage(`Failed to fetch resolved queries: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        console.error('Error fetching resolved queries: No response received', err.request);
        setErrorMessage('Failed to fetch resolved queries: No response received.');
      } else {
        console.error('Error fetching resolved queries:', err.message);
        setErrorMessage(`Failed to fetch resolved queries: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const getVisiblePages = () => {
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage - halfVisible < 1) {
      endPage = Math.min(totalPages, endPage + (halfVisible - currentPage + 1));
    }
    if (currentPage + halfVisible > totalPages) {
      startPage = Math.max(1, startPage - (currentPage + halfVisible - totalPages));
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handleResolve = (queryId: string) => {
    // Perform action to mark query as resolved, e.g., update backend or local state
    console.log(`Resolved query with ID ${queryId}`);
    // Example of updating local state (not persisting to backend in this example)
    const updatedQueries = resolvedQueries.map(query => {
      if (query.id === queryId) {
        return { ...query, status: 'Resolved' };
      }
      return query;
    });
    setResolvedQueries(updatedQueries);
  };

  const handlePending = (queryId: string) => {
    // Perform action to mark query as pending, e.g., update backend or local state
    console.log(`Marked query with ID ${queryId} as Pending`);
    // Example of updating local state (not persisting to backend in this example)
    const updatedQueries = resolvedQueries.map(query => {
      if (query.id === queryId) {
        return { ...query, status: 'Pending' };
      }
      return query;
    });
    setResolvedQueries(updatedQueries);
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSignOut = () => {
    // Clear authentication tokens or any other user data stored in localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    // Redirect to login page
    window.location.href = '/';
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
    {sidebarOpen && (
      <div className="w-64 bg-white border-r border-gray-300">
        <Sidebartype />
      </div>
    )}
    <div className="flex-1 flex flex-col">
      <header className="bg-green-600 text-white p-4 flex items-center">
        <button onClick={toggleSidebar} className="text-xl">
          <IoMenu className="text-2xl cursor-pointer hover:text-gray-400" />
        </button>
        <div className="ml-auto flex items-center relative">
          <IoIosNotificationsOutline className="text-2xl cursor-pointer hover:text-gray-400 hover:bg-green-900" />
          <img 
            src={UserImage} 
            alt="User" 
            className="w-8 h-7 rounded-full ml-3 cursor-pointer" 
            onClick={toggleDropdown} 
          />
     {isDropdownOpen && (
<div className="absolute top-10 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
  <div className="flex flex-col items-center p-4">
    <img 
      src={UserImage} 
      alt="User" 
      className="w-16 h-16 rounded-full mb-4"
    />
    <div className="w-full flex justify-between items-center">
      <a href="/profile" className="text-gray-900 hover:bg-gray-100 py-2 px-4 rounded-md text-left">
        Profile
      </a>
      <button 
        onClick={handleSignOut} 
        className="text-gray-900 hover:bg-gray-100 py-2 px-4 rounded-md text-right"
      >
        Signout
      </button>
    </div>
  </div>
</div>
)}

        </div>
      </header>
        <div className="flex-1 p-4">
          <section className="content-header mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Resolved Queries</h3>
              <div className="flex space-x-4">
                {/* Use Link or NavLink from react-router-dom for internal links */}
                <a href="/resolvedqueries">
                  <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600">
                    Resolved Lender Queries
                  </button>
                </a>
              </div>
            </div>
            {/* Use proper conditional rendering for alerts */}
            {resolvedQueries.length > 0 && (
              <div className="alert alert-success mt-4" role="alert">
                <strong>Deal Closed successfully.</strong>
              </div>
            )}
          </section>

          <section className="content">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between mb-4">
                  {/* Display total number of queries */}
                  <b>No of Lender Resolved queries: {totalQueries}</b>
                  <div className="flex space-x-2">
                    {/* Buttons for navigating pages */}
                    <button
                      className="btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400"
                      onClick={handleFirstPage}
                      disabled={currentPage === 1}
                    >
                      &lt;&lt;
                    </button>
                    <button
                      className="btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      &lt;
                    </button>
                    {getVisiblePages().map((page) => (
                      <button
                        key={page}
                        className={`btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400 ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      &gt;
                    </button>
                    <button
                      className="btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400"
                      onClick={handleLastPage}
                      disabled={currentPage === totalPages}
                    >
                      &gt;&gt;
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  {/* Table to display resolved queries */}
                  <table className="table-auto w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-2 border">Mobile Number & Email</th>
                        <th className="p-2 border">Query</th>
                        <th className="p-2 border">Admin Comments</th>
                        <th className="p-2 border">Responded On</th>
                        <th className="p-2 border">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Conditionally render based on loading, error, or data availability */}
                      {loading ? (
                        <tr>
                          <td colSpan={5} className="text-center p-4">Loading...</td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan={5} className="text-center p-4 text-red-500">{error}</td>
                        </tr>
                      ) : resolvedQueries.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center p-4">No data found</td>
                        </tr>
                      ) : (
                        resolvedQueries.map((query, index) => (
                          <tr key={index} className="hover:bg-gray-100">
                            <td className="p-2 border">
                              {/* Display relevant query details */}
                              <div><b>User Id:</b> {query.userId}</div>
                              <div><b>Mobile No:</b> {query.mobileNumber}</div>
                              <div><b>Email:</b> {query.email}</div>
                              <div><b>Ticket Id:</b> {query.ticketId}</div>
                              <div><b>User Name:</b> {query.name}</div>
                            </td>
                            <td className="p-2 border">{query.query}</td>
                            <td className="p-2 border">
                              <div><b>Admin Comments: </b> {query.comments}</div>
                              <div><b>Resolved By:</b> {query.resolvedBy}</div>
                            </td>
                            <td className="p-2 border">
                              <div><b>Status:</b> {query.status}</div>
                              <div><b>Responded On:</b> {query.respondedOn}</div>
                            </td>
                            <td className="p-2 border">
                              {/* Example buttons with actions */}
                              <button
                                className="btn bg-green-500 text-white py-1 px-3 rounded-full mb-3"
                                onClick={() => handleResolve(query.id)} disabled
                                // disabled={query.status === 'Resolved'}
                              >
                                Resolved
                              </button><br/>
                              <button
                                className="btn bg-red-500 text-white py-1 px-3 rounded-full"
                                onClick={() => handlePending(query.id)} disabled
                                // disabled={query.status === 'Pending'}
                              >
                                Pending
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResolvedQueries;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import Sidebartype from './components/Sidebartype';

// const ResolvedQueries: React.FC = () => {
//   const [resolvedQueries, setResolvedQueries] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setErrorMessage] = useState<string>('');
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [queriesPerPage] = useState<number>(10);
//   const [totalQueries, setTotalQueries] = useState<number>(0);

//   const totalPages = Math.ceil(totalQueries / queriesPerPage);
//   const maxVisiblePages = 5;

//   useEffect(() => {
//     fetchResolvedQueries();
//   }, [currentPage]);

//   const fetchResolvedQueries = async () => {
//     const accessToken = localStorage.getItem('accessToken');

//     if (!accessToken) {
//       console.error('No access token found');
//       setErrorMessage('Access token is missing');
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'https://fintech.oxyloans.com/oxyloans/v1/user/testqueryDetailsBasedOnPrimaryType',
//         {
//           pageNo: currentPage,
//           pageSize: queriesPerPage,
//           status: 'Completed',
//           primaryType: 'LENDER'
//         },
//         {
//           headers: {
//             'accessToken': accessToken,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       console.log(response)
//       setResolvedQueries(response.data.listOfUserQueryDetailsResponseDto);
//       setTotalQueries(response.data.lenderCount);
//       setErrorMessage('');
//     } catch (err: any) {
//       if (err.response) {
//         console.error('Error fetching resolved queries:', err.response.data);
//         setErrorMessage(   `Failed to fetch resolved queries: ${err.response.status} ${err.response.statusText}`);
//       } else if (err.request) {
//         console.error('Error fetching resolved queries: No response received', err.request);
//         setErrorMessage('Failed to fetch resolved queries: No response received.');
//       } else {
//         console.error('Error fetching resolved queries:', err.message);
//         setErrorMessage(`Failed to fetch resolved queries: ${err.message}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const handleFirstPage = () => {
//     setCurrentPage(1);
//   };

//   const handleLastPage = () => {
//     setCurrentPage(totalPages);
//   };

//   const getVisiblePages = () => {
//     const halfVisible = Math.floor(maxVisiblePages / 2);
//     let startPage = Math.max(1, currentPage - halfVisible);
//     let endPage = Math.min(totalPages, currentPage + halfVisible);

//     if (currentPage - halfVisible < 1) {
//       endPage = Math.min(totalPages, endPage + (halfVisible - currentPage + 1));
//     }
//     if (currentPage + halfVisible > totalPages) {
//       startPage = Math.max(1, startPage - (currentPage + halfVisible - totalPages));
//     }

//     const pages = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }

//     return pages;
//   };

//   return (
//     <div className="container mx-auto">
//       <div className="py-4">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex">
//             {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
//               <button
//                 key={page}
//                 className={`btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400 ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
//                 onClick={() => handlePageChange(page)}
//               >
//                 {page}
//               </button>
//             ))}
//           </div>
//           <div className="flex">
//             <button
//               className="btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400"
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               &gt;
//             </button>
//             <button
//               className="btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400"
//               onClick={handleLastPage}
//               disabled={currentPage === totalPages}
//             >
//               &gt;&gt;
//             </button>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-2 border">Mobile Number & Email</th>
//                 <th className="p-2 border">Query</th>
//                 <th className="p-2 border">Admin Comments</th>
//                 <th className="p-2 border">Responded On</th>
//                 <th className="p-2 border">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="text-center p-4">Loading...</td>
//                 </tr>
//               ) : error ? (
//                 <tr>
//                   <td colSpan={5} className="text-center p-4 text-red-500">{error}</td>
//                 </tr>
//               ) : resolvedQueries.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="text-center p-4">No data found</td>
//                 </tr>
//               ) : (
//                 resolvedQueries.map((query, index) => (
//                   <tr key={index} className="hover:bg-gray-100">
//                     <td className="p-2 border">
//                       <div><b>User Id:</b> {query.userId}</div>
//                       <div><b>Mobile No:</b> {query.mobileNumber}</div>
//                       <div><b>Email:</b> {query.email}</div>
//                       <div><b>Ticket Id:</b> {query.ticketId}</div>
//                       <div><b>User Name:</b> {query.name}</div>
//                     </td>
//                     <td className="p-2 border">{query.query}</td>
//                     <td className="p-2 border">
//                       <div><b>Admin Comments:</b> {query.comments}</div>
//                       <div><b>Resolved By:</b> {query.resolvedBy}</div>
//                     </td>
//                     <td className="p-2 border">
//                       <div style={{ color: "blue" }}><b>Status:</b> {query.status}</div>
//                       <div><b>Responded On:</b> {query.respondedOn}</div>
//                     </td>
//                     <td className="p-2 border">
//                       <button className="btn bg-green-500 text-white py-1 px-3 rounded-full mb-3" disabled>
//                         Resolved
//                       </button><br />
//                       <button className="btn bg-red-500 text-white py-1 px-3 rounded-full" disabled>
//                         Pending
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResolvedQueries;
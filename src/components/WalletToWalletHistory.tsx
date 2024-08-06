


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidebartype from './Sidebartype';

// import { IoMenu } from "react-icons/io5";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import UserImage from '../Assets/img/User.png';


// const WalletToWalletHistory: React.FC = () => {
//   const [transactions, setTransactions] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [queriesPerPage] = useState<number>(10);
//   const [totalQueries, setTotalQueries] = useState<number>(0);

//   const totalPages = Math.ceil(totalQueries / queriesPerPage);
//   const maxVisiblePages = 5;

//   useEffect(() => {
//     fetchTransactions();
//   }, [currentPage]);

//   const fetchTransactions = async () => {
//     const accessToken = localStorage.getItem('accessToken');

//     if (!accessToken) {
//       console.error('No access token found');
//       setError('Access token is missing');
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'https://fintech.oxyloans.com/oxyloans/v1/user/wallet_to_wallet_initiated_transfer',
//         {
//           pageNo: currentPage,
//           pageSize: queriesPerPage,
//           userType: "TEST"
//         },
//         {
//           headers: {
//             'accessToken': accessToken,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       console.log(response.data)
//       setTransactions(response.data.walletTransferLenderToLenderResponseDto);
//       setTotalQueries(response.data.totalCount);
//       setError('');
//     } catch (err: any) {
//       if (err.response) {
//         console.error('Error fetching transactions:', err.response.data);
//         setError(`Failed to fetch transactions: ${err.response.status} ${err.response.statusText}`);
//       } else if (err.request) {
//         console.error('Error fetching transactions: No response received', err.request);
//         setError('Failed to fetch transactions: No response received.');
//       } else {
//         console.error('Error fetching transactions:', err.message);
//         setError(`Failed to fetch transactions: ${err.message}`);
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
//     <div className="flex h-screen">
//     {/* Sidebar */}
//     <Sidebartype />

//     {/* Main Content */}
//     <div className="flex-1 flex flex-col">
//       {/* Header */}
//       <header className="bg-green-600 text-white p-4 flex items-center">
//         <h1 className="text-xl"><IoMenu className="text-2xl cursor-pointer hover:text-gray-400" /></h1>
//         <div className="ml-auto flex items-center">
//           {/* Notification Icon */}
//           <IoIosNotificationsOutline className="text-2xl cursor-pointer hover:text-gray-400 hover:bg-green-900" />
//           {/* User Image */}
//           <img src={UserImage} alt="User" className="w-8 h-7 rounded-full ml-3" />
//         </div>
//       </header>

//         <main className="p-4 flex-1">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Wallet to Wallet</h2>
//             <div className="flex justify-center items-center space-x-2">
//               <button
//                 className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
//                 onClick={handleFirstPage}
//                 disabled={currentPage === 1}
//               >
//                 &lt;&lt;
//               </button>
//               <button
//                 className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 &lt;
//               </button>
//               {getVisiblePages().map((page) => (
//                 <button
//                   key={page}
//                   className={`py-1 px-3 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
//                   onClick={() => handlePageChange(page)}
//                 >
//                   {page}
//                 </button>
//               ))}
//               <button
//                 className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 &gt;
//               </button>
//               <button
//                 className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
//                 onClick={handleLastPage}
//                 disabled={currentPage === totalPages}
//               >
//                 &gt;&gt;
//               </button>
//             </div>
//           </div>
//           {loading ? (
//             <p>Loading...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : (
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead>
//                 <tr>
//                   <th className="py-2 border border-gray-300">Sender Info</th>
//                   <th className="py-2 border border-gray-300">Receiver Info</th>
//                   <th className="py-2 border border-gray-300">Requested Info</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {transactions.length === 0 ? (
//                   <tr>
//                     <td colSpan={3} className="text-center py-4 border border-gray-300">
//                       No Data found!
//                     </td>
//                   </tr>
//                 ) : (
//                   transactions.map((transaction) => (
//                     <tr key={transaction.id}>
//                       <td className="py-2 border border-gray-300">
//                         <b>Name:</b> {transaction.senderName}
//                         <br />
//                         <b>Id:</b> LR {transaction.senderId}
//                       </td>
//                       <td className="py-2 border border-gray-300">
//                         <b>Name:</b> {transaction.receiverName}
//                         <br />
//                         <b>Id:</b> LR {transaction.receiverId}
//                       </td>
//                       <td className="py-2 border border-gray-300">
//                         <b>Amount:</b> {transaction.amount}
//                         <br />
//                         <b>Request Date:</b> {transaction.requestedDate}
//                         <br />
//                         <b>Status:</b> {transaction.status}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default WalletToWalletHistory;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import Sidebartype from './Sidebartype';
import UserImage from '../Assets/img/User.png';


const WalletToWalletHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queriesPerPage] = useState<number>(10);
  const [totalQueries, setTotalQueries] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const totalPages = Math.ceil(totalQueries / queriesPerPage);
  const maxVisiblePages = 5;

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const fetchTransactions = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('No access token found');
      setError('Access token is missing');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'https://fintech.oxyloans.com/oxyloans/v1/user/wallet_to_wallet_initiated_transfer',
        {
          pageNo: currentPage,
          pageSize: queriesPerPage,
          userType: "TEST"
        },
        {
          headers: {
            'accessToken': accessToken,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data)
      setTransactions(response.data.walletTransferLenderToLenderResponseDto);
      setTotalQueries(response.data.totalCount);
      setError('');
    } catch (err: any) {
      if (err.response) {
        console.error('Error fetching transactions:', err.response.data);
        setError(`Failed to fetch transactions: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        console.error('Error fetching transactions: No response received', err.request);
        setError('Failed to fetch transactions: No response received.');
      } else {
        console.error('Error fetching transactions:', err.message);
        setError(`Failed to fetch transactions: ${err.message}`);
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
        <main className="p-4 flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Wallet to Wallet</h2>
            <div className="flex justify-center items-center space-x-2">
              <button
                className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
                onClick={handleFirstPage}
                disabled={currentPage === 1}
              >
                &lt;&lt;
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {getVisiblePages().map((page) => (
                <button
                  key={page}
                  className={`py-1 px-3 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
              >
                &gt;&gt;
              </button>
            </div>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 border border-gray-300">Sender Info</th>
                  <th className="py-2 border border-gray-300">Receiver Info</th>
                  <th className="py-2 border border-gray-300">Requested Info</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4 border border-gray-300">
                      No Data found!
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="py-2 border border-gray-300">
                        <b>Name:</b> {transaction.senderName}
                        <br />
                        <b>Id:</b> LR {transaction.senderId}
                      </td>
                      <td className="py-2 border border-gray-300">
                        <b>Name:</b> {transaction.receiverName}
                        <br />
                        <b>Id:</b> LR {transaction.receiverId}
                      </td>
                      <td className="py-2 border border-gray-300">
                        <b>Amount:</b> {transaction.amount}
                        <br />
                        <b>Request Date:</b> {transaction.requestedDate}
                        <br />
                        <b>Status:</b> {transaction.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
};

export default WalletToWalletHistory;


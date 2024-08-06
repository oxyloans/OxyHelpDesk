// import React, { useState } from 'react';
// import axios from 'axios';
// import Sidebartype from './Sidebartype';

// // Define the interface for an individual transaction
// interface Transaction {
//   userId: string | null;
//   name: string;
//   currentWalletAmount: string;
// }

// // Define the interface for the API response
// interface ApiResponse {
//   listOfLenderCurrentWalletBalanceResponse: Transaction[];
// }

// const Lenderstatistics: React.FC = () => {
//   const [status, setStatus] = useState<string>('GREATERTHANZERO');
//   const [userData, setUserData] = useState<ApiResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSearch = async () => {
//     const accessToken = localStorage.getItem('accessToken');

//     if (!accessToken) {
//       console.error('No access token found');
//       setError('Access token is missing');
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post<ApiResponse>(
//         'https://fintech.oxyloans.com/oxyloans/v1/user/checking-testlender-current-wallet-balance',
//         { walletAmountType: status },
//         {
//           headers: {
//             'accessToken': accessToken,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       setUserData(response.data);
//     } catch (err: any) {
//       if (err.response) {
//         console.error('Error fetching user data:', err.response.data);
//         setError(`Failed to fetch user data: ${err.response.status} ${err.response.statusText}`);
//       } else if (err.request) {
//         console.error('Error fetching user data: No response received', err.request);
//         setError('Failed to fetch user data: No response received.');
//       } else {
//         console.error('Error fetching user data:', err.message);
//         setError(`Failed to fetch user data: ${err.message}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <Sidebartype />
     
//       <div className="flex-1 p-6 bg-gray-100">
//         <div className="p-6 bg-white rounded shadow">
//           <label htmlFor="status" className="block mt-4 text-lg font-medium text-gray-700">
//             Status
//           </label>
//           <select
//             id="status"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="block w-full p-2 mt-1 border border-gray-300 rounded"
//           >
//             <option value="GREATERTHANZERO">GREATERTHANZERO</option>
//             <option value="ZERO">ZERO</option>
//             <option value="LESSTHANZERO">LESSTHANZERO</option>
//           </select>
//           <button
//             onClick={handleSearch}
//             className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
//           >
//             {loading ? 'Searching...' : 'Search'}
//           </button>
//           {error && <p className="mt-4 text-red-500">{error}</p>}
//           {userData && userData.listOfLenderCurrentWalletBalanceResponse.length > 0 ? (
//             <table className="w-full mt-6 bg-white border border-gray-200 rounded shadow">
//               <thead>
//                 <tr>
//                   <th className="p-2 text-left border-b">Lender Id</th>
//                   <th className="p-2 text-left border-b">Lender Name</th>
//                   <th className="p-2 text-left border-b">Current Wallet Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {userData.listOfLenderCurrentWalletBalanceResponse.map((data) => (
//                   <tr key={data.userId || 'N/A'}>
//                     <td className="p-2 border-b">{data.userId || 'N/A'}</td>
//                     <td className="p-2 border-b">{data.name}</td>
//                     <td className="p-2 border-b">{data.currentWalletAmount}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             !loading && <p className="mt-4 text-center">No data available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Lenderstatistics;




import React, { useState } from 'react';
import axios from 'axios';
import Sidebartype from './Sidebartype';
import { IoMenu } from "react-icons/io5";
import UserImage from '../Assets/img/User.png';


import { IoIosNotificationsOutline } from "react-icons/io";

// Define the interface for an individual transaction
interface Transaction {
  userId: string | null;
  name: string;
  currentWalletAmount: string;
}

// Define the interface for the API response
interface ApiResponse {
  listOfLenderCurrentWalletBalanceResponse: Transaction[];
}

const  LenderWallet: React.FC = () => {
  const [status, setStatus] = useState<string>('GREATERTHANZERO');
  const [userData, setUserData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSearch = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('No access token found');
      setError('Access token is missing');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<ApiResponse>(
        'https://fintech.oxyloans.com/oxyloans/v1/user/checking-testlender-current-wallet-balance',
        { walletAmountType: status },
        {
          headers: {
            'accessToken': accessToken,
            'Content-Type': 'application/json',
          },
        }
      );

      setUserData(response.data);
    } catch (err: any) {
      if (err.response) {
        console.error('Error fetching user data:', err.response.data);
        setError(`Failed to fetch user data: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        console.error('Error fetching user data: No response received', err.request);
        setError('Failed to fetch user data: No response received.');
      } else {
        console.error('Error fetching user data:', err.message);
        setError(`Failed to fetch user data: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
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


        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="p-6 bg-white rounded shadow">
            <label htmlFor="status" className="block mt-4 text-lg font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full p-2 mt-1 border border-gray-300 rounded"
            >
              <option value="GREATERTHANZERO">GREATERTHANZERO</option>
              <option value="ZERO">ZERO</option>
              <option value="LESSTHANZERO">LESSTHANZERO</option>
            </select>
            <button
              onClick={handleSearch}
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {userData && userData.listOfLenderCurrentWalletBalanceResponse.length > 0 ? (
              <table className="w-full mt-6 bg-white border border-gray-200 rounded shadow">
                <thead>
                  <tr>
                    <th className="p-2 text-left border-b">Lender Id</th>
                    <th className="p-2 text-left border-b">Lender Name</th>
                    <th className="p-2 text-left border-b">Current Wallet Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.listOfLenderCurrentWalletBalanceResponse.map((data, index) => (
                    <tr key={index}>
                      <td className="p-2 border-b">{data.userId || 'N/A'}</td>
                      <td className="p-2 border-b">{data.name}</td>
                      <td className="p-2 border-b">{data.currentWalletAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              !loading && <p className="mt-4 text-center">No data available</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default  LenderWallet;

import React, { useState } from 'react';
import axios from 'axios';
import Sidebartype from './Sidebartype';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import UserImage from '../Assets/img/User.png';



const CheckLenderDashboard: React.FC = () => {
  const [lenderId, setLenderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [transactionData, setTransactionData] = useState<any[]>([]);
  const [totalInterestEarned, setTotalInterestEarned] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const lenderDashboardCallTestadmin = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('No access token found');
      setErrorMessage('Access token is missing');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://fintech.oxyloans.com/oxyloans/v1/user/${lenderId}/testLenderDashboard`,
        {
          headers: {
            'accessToken': accessToken,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(response.data);
      setTotalInterestEarned(response.data.totalInterestEarned);
      setTransactionData(response.data.transactions); // Assuming response data has transactions array
      setErrorMessage('');
    } catch (err: any) {
      if (err.response) {
        console.error('Error fetching user data:', err.response.data);
        setErrorMessage(`Failed to fetch user data: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        console.error('Error fetching user data: No response received', err.request);
        setErrorMessage('Failed to fetch user data: No response received.');
      } else {
        console.error('Error fetching user data:', err.message);
        setErrorMessage(`Failed to fetch user data: ${err.message}`);
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

        {/* Content Wrapper */}
        <div className="content-wrapper p-6 bg-gray-50 min-h-screen">
          {/* Content Header */}
          {/* <section className="content-header mb-4">
            <h1 className="text-3xl font-semibold text-gray-700">Display Lender DASHBOARD</h1>
          </section> */}

          {/* Main Content */}
          <section className="content">
            <div className="flex justify-center space-x-4 my-4">
              {/* Input and Button */}
              <div className="text-center">
                <input
                  type="text"
                  name="lenderid"
                  className="form-control lenderid p-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 my-4"
                  placeholder="Lender ID"
                  value={lenderId}
                  onChange={(e) => setLenderId(e.target.value)}
                />
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}

                <button
                  type="button"
                  className="btn bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  onClick={lenderDashboardCallTestadmin}
                >
                  <b>Get Dashboard</b>
                </button>
              </div>
            </div>
          </section>

          {/* Dashboard Display */}
          <section className="content bg-white shadow-lg border border-solid border-gray-400 rounded-lg p-6">
            <div className="mb-4 p-4 border border-solid border-gray-300 bg-gray-100">
              <p className="text-sm text-gray-600">
                {/* Note section */}
                <span style={{ color: 'blue', backgroundColor: '#FDB0C0' }}><b>Note:</b></span> <b>Our immediate goal is to showcase your wallet transactions, interest earnings, principal returns, and principal return upon withdrawal request. In the Future, We will be adding much more meaningful details and map them to Running Loans.</b>
              </p>
            </div>

            {/* Table section */}
            <div className="w-full overflow-x-auto">
              <table className="table-auto border-collapse border-2 border-gray-400 w-full">
                <thead>
                  <tr className="bg-gray-200 text-left text-sm font-semibold">
                    <th className="p-3 border-2 border-gray-400">S.No</th>
                    <th className="p-3 border-2 border-gray-400">Date</th>
                    <th className="p-3 border-2 border-gray-400">Transaction Description</th>
                    <th className="p-3 border-2 border-gray-400">Deposits & Interest</th>
                    <th className="p-3 border-2 border-gray-400">Withdrawals & Principal Returns</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Placeholder rows */}
                  <tr className="bg-gray-100 text-sm font-medium">
                    <td colSpan={3} className="p-3 border-2 border-gray-400">My Principal - Deposits through Wallet Transactions</td>
                    <td className="p-3 border-2 border-gray-400"></td>
                    <td className="p-3 border-2 border-gray-400"></td>
                  </tr>
                  <tr className="bg-gray-100 text-sm font-medium">
                    <td colSpan={3} className="p-3 border-2 border-gray-400">My Earnings - Interest Received</td>
                    <td className="p-3 border-2 border-gray-400"></td>
                    <td className="p-3 border-2 border-gray-400"></td>
                  </tr>
                  <tr className="bg-gray-100 text-sm font-medium">
                    <td colSpan={3} className="p-3 border-2 border-gray-400">My Principal - Funds Returned upon Borrower Re-Payment</td>
                    <td className="p-3 border-2 border-gray-400"></td>
                    <td className="p-3 border-2 border-gray-400"></td>
                  </tr>
                  <tr className="bg-gray-100 text-sm font-medium">
                    <td colSpan={3} className="p-3 border-2 border-gray-400">My Principal - Funds returned upon Withdraw Request</td>
                    <td className="p-3 border-2 border-gray-400"></td>
                    <td className="p-3 border-2 border-gray-400"></td>
                  </tr>
                </tbody>
                <tfoot>
                  {/* Total Interest Earned */}
                  <tr className="bg-gray-200 text-sm font-semibold">
                    <td colSpan={3} className="p-3 border-2 border-gray-400">Total Interest Earned from April 1st 2021 - Till Date:</td>
                    <td colSpan={2} className="p-3 border-2 border-gray-400">{totalInterestEarned}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CheckLenderDashboard;

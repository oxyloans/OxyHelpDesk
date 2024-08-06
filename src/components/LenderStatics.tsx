



import React, { useState, useEffect } from 'react';
import Sidebartype from './Sidebartype';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import UserImage from '../Assets/img/User.png';

interface Deal {
  dealName: string;
  dealId: string;
  participatedAmount: number;
  rateOfInterest: number;
  dealDuration: string;
  lenderReturnType: string;
  principalReturnedStatus: string;
}

const LenderDealStatistics: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lenderName, setLenderName] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [lenderId, setLenderId] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

    const fetchDeals = async (pageNo: number) => {
    if (!accessToken) {
      setError('Access token is missing');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`https://fintech.oxyloans.com/oxyloans/v1/user/${lenderId}/totalTestLenderParticipatedDeals`, {
        method: 'POST',
        headers: {
          'accessToken': accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pageNo: pageNo, pageSize: 10 }), // Ensure the request body format aligns with the API requirements
      });
  
      console.log('Response Status:', response.status); // Debugging line
      console.log('Response Headers:', response.headers); // Debugging line
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Data:', errorData); // Debugging line
        throw new Error(errorData.errorMessage || 'Something went wrong');
      }
  
      const data = await response.json();
      console.log('Fetched Data:', data); // Debugging line
  
      setDeals(data.lenderPaticipatedResponseDto || []);
      setError("");
      // setLenderName(data.lenderName || '');
      // setMobileNumber(data.mobileNumber || '');
      // setTotalPages(Math.ceil(data.count / 10)); // Adjust if needed based on the API response
    } catch (error: any) {
      console.log('Fetch Error:', error.message); // Debugging line
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   if (lenderId) {
  //     fetchDeals(page);
  //   }
  // }, [page, lenderId]);

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
        <header className="bg-green-600 text-white p-4 flex items-center justify-between">
          <button onClick={toggleSidebar} className="text-xl">
            <IoMenu className="text-2xl cursor-pointer hover:text-gray-400" />
          </button>
          <div className="flex items-center relative">
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
        <div className="container mx-auto p-4">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Lender Deal Info</h1>
            <div>
              <button
                onClick={() => setPage(page > 1 ? page - 1 : 1)}
                disabled={page <= 1}
                className="mr-2 p-2 bg-blue-500 text-white rounded-md"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                disabled={page >= totalPages}
                className="p-2 bg-blue-500 text-white rounded-md"
              >
                Next
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="lenderId" className="block text-sm font-medium text-gray-700">Lender ID</label>
            <input
              type="text"
              id="lenderId"
              name="lenderId"
              value={lenderId}
              onChange={(e) => setLenderId(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Enter the Lender ID"
            />
            <button
              onClick={() => fetchDeals(1)}
              className="ml-4 p-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded-md">
              {error}
            </div>
          )}

          {loading && <div className="mb-4">Loading...</div>}

          {!loading && deals.length > 0 && (
            <div className="mb-4">
              <div className="mb-4">
                <b>Lender Name: <span>{lenderName}</span></b>
                <p>Mobile No: <span>{mobileNumber}</span></p>
              </div>

              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Deal Name</th>
                    <th className="border border-gray-300 px-4 py-2">Deal ID</th>
                    <th className="border border-gray-300 px-4 py-2">Participated Amount</th>
                    <th className="border border-gray-300 px-4 py-2">ROI</th>
                    <th className="border border-gray-300 px-4 py-2">Duration</th>
                    <th className="border border-gray-300 px-4 py-2">Payment Type</th>
                    <th className="border border-gray-300 px-4 py-2">Deal Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{deal.dealName}</td>
                      <td className="border border-gray-300 px-4 py-2">{deal.dealId}</td>
                      <td className="border border-gray-300 px-4 py-2">{deal.participatedAmount}</td>
                      <td className="border border-gray-300 px-4 py-2">{deal.rateOfInterest}</td>
                      <td className="border border-gray-300 px-4 py-2">{deal.dealDuration}</td>
                      <td className="border border-gray-300 px-4 py-2">{deal.lenderReturnType}</td>
                      <td className="border border-gray-300 px-4 py-2">{deal.principalReturnedStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && deals.length === 0 && !error && (
            <div className="mb-4">
              No data found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LenderDealStatistics;


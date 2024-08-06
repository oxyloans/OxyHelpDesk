import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebartype from './Sidebartype';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import UserImage from '../Assets/img/User.png';

interface WithdrawalRequest {
    userId: number;
    lenderName: string;
    dealName: string;
    dealId: number;
    amount: number;
    requestDate: string;
    accountNumber: string;
    ifsc: string;
    status: string;
    id: number;
}

const FromDeal: React.FC = () => {
    const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);
    const [userType, setUserType] = useState<string>('TEST');
    const [totalEntries, setTotalEntries] = useState<number>(0);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found');
            setError('Access token is missing');
            setLoading(false);
            return;
        }

        const fetchWithdrawalRequests = async () => {
            setLoading(true);
            try {
                const response = await axios.post(
                    'https://fintech.oxyloans.com/oxyloans/v1/user/listOfWithdrawalsRequestedByLenders',
                    {
                        pageNo: 1,
                        pageSize: 10,
                        userType: userType
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'accessToken': accessToken,
                        },
                    }
                );
                if (response.data.lenderWithdrawalFundsFromDealsResponseDto) {
                    setWithdrawalRequests(response.data.lenderWithdrawalFundsFromDealsResponseDto);
                    setTotalEntries(response.data.totalCount);
                }
            } catch (error) {
                console.error('Error fetching withdrawal requests:', error);
                setError('Error fetching withdrawal requests');
            }
            setLoading(false);
        };

        fetchWithdrawalRequests();
    }, [userType]);

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
                <div className="content-wrapper p-4">
                    <section className="content-header mb-4">
                        <h1 className="text-xl font-bold">
                            {userType} Lender Withdrawal info
                        </h1>
                    </section>
                    <section className="content">
                        <div className="box border rounded shadow p-4 bg-white">
                            <div className="box-header flex justify-between mb-4">
                                <div className="space-x-4">
                                    {(userType === 'SUPERADMIN' || userType === 'PRIMARYADMIN') && (
                                        <a href="dealWithdrawRequest?status=LIVE">
                                            <button className="btn btn-warning btn-md">
                                                View Live User <i className="fa fa-angle-double-right"></i>
                                            </button>
                                        </a>
                                    )}
                                    {(userType === 'TESTADMIN' || userType === 'MASTERADMIN') && (
                                        <a href="dealWithdrawRequest?status=TEST">
                                            <button className="btn btn-primary btn-md">
                                                View Test User <i className="fa fa-angle-double-right"></i>
                                            </button>
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="box-body">
                                <table className="table-auto w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-gray-300 p-2">LR ID & Name</th>
                                            <th className="border border-gray-300 p-2">Deal Name</th>
                                            <th className="border border-gray-300 p-2">Withdraw Amount</th>
                                            <th className="border border-gray-300 p-2">Requested on</th>
                                            <th className="border border-gray-300 p-2">Bank Details</th>
                                            <th className="border border-gray-300 p-2">Withdrawal Status</th>
                                            {userType !== 'TESTADMIN' && <th className="border border-gray-300 p-2">Actions</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {withdrawalRequests.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="text-center p-4">No User found!</td>
                                            </tr>
                                        ) : (
                                            withdrawalRequests.map(request => (
                                                <tr key={request.id}>
                                                    <td className="border border-gray-300 p-2">
                                                        LR{request.userId}
                                                        <br />
                                                        {request.lenderName}
                                                    </td>
                                                    <td className="border border-gray-300 p-2">
                                                        {request.dealName}
                                                        <br />
                                                        Deal Id : {request.dealId}
                                                    </td>
                                                    <td className="border border-gray-300 p-2">{request.amount}</td>
                                                    <td className="border border-gray-300 p-2">{request.requestDate}</td>
                                                    <td className="border border-gray-300 p-2">
                                                        AC NO: {request.accountNumber}
                                                        <br />
                                                        <span className="uppercase">IFSC: {request.ifsc}</span>
                                                    </td>
                                                    <td className={`border border-gray-300 p-2 dealApprovalStatus_${request.status}`}>
                                                        {request.status}
                                                        <br />
                                                        <br />
                                                        <a href={`h2h2WithdrawalApprove?userId=${request.id}`}>
                                                            <button
                                                                type="button"
                                                                className="btn btn-info btn-xs"
                                                                style={{ width: '100%' }}
                                                            >
                                                                <b>view Withdraw Interest</b>
                                                            </button>
                                                        </a>
                                                    </td>
                                                    {userType !== 'TESTADMIN' && (
                                                        <td className="border border-gray-300 p-2">
                                                            <div className={`w2w-block-${request.status}`} style={{ display: 'none' }}>
                                                                <button
                                                                    type="button"
                                                                    className={`btn btn-success btn-xs btn-withdraw${request.status} h2hmove_${request.status}`}
                                                                    id={`approve-${request.id}`}
                                                                    onClick={() => alert('Approve function')}
                                                                >
                                                                    <b>Approve</b>
                                                                </button>
                                                                <br />
                                                                <br />
                                                                <button
                                                                    type="button"
                                                                    className={`btn btn-danger btn-xs btn-withdraw${request.status} h2hmove_${request.status}`}
                                                                    style={{ width: '72%' }}
                                                                    onClick={() => alert('Reject function')}
                                                                >
                                                                    <b>Reject</b>
                                                                </button>
                                                            </div>
                                                            <div className={`w2w-blockShow-${request.status}`} style={{ display: 'none' }}>
                                                                {request.status}
                                                            </div>
                                                            <button
                                                                className="px-2 py-1 mt-1 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                                            >
                                                                REJECT
                                                            </button>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default FromDeal;

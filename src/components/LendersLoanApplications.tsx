import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Table, Pagination } from 'antd';
import { IoIosNotificationsOutline } from 'react-icons/io';
import Sidebartype from './Sidebartype'; // Ensure you have this component
import UserImage from '../Assets/img/User.png'; // Ensure you import your image correctly
import { IoMenu } from "react-icons/io5";

const apiBaseURL = 'https://fintech.oxyloans.com/oxyloans/v1/user/';

interface Lender {
  id: number;
  loanProcessType: string;
  groupId: string;
  groupName: string;
  referredBy: string;
  loanRequestedDate: string;
  expectedDate: string;
  walletAmount: number;
  panNumber: string;
  dob: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  utmSource: string;
  city: string;
  loanRequestAmount: number;
  rateOfInterest: number;
  email: string;
  address: string;
  userNameAccordingToBank: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  comments?: string;
}

const fetchLenders = async (page: number, searchType: string, searchValue: string): Promise<{ results: Lender[], totalCount: number }> => {
  const suserId = document.cookie.replace(/(?:(?:^|.*;\s*)sUserId\s*=\s*([^;]*).*$)|^.*$/, "$1");
  const accessToken = localStorage.getItem('accessToken');
  try {
    const postData = {
      leftOperand: {
        fieldName: 'userPrimaryType',
        fieldValue: 'LENDER',
        operator: 'EQUALS',
      },
      logicalOperator: 'AND',
      rightOperand: {
        fieldName: 'user.status',
        fieldValue: 'REGISTERED',
        operator: 'EQUALS',
      },
      page: {
        pageNo: page,
        pageSize: 10,
      },
      sortBy: 'loanRequestedDate',
      sortOrder: 'DESC',
      ...(searchType && searchValue && {
        search: {
          fieldName: searchType,
          fieldValue: searchValue,
          operator: 'CONTAINS',
        },
      }),
    };

    const response = await axios.post<{ results: Lender[], totalCount: number }>(
      `${apiBaseURL}${suserId}/loan/ADMIN/request/testsearch`,
      postData,
      {
        headers: {
          'Content-Type': 'application/json',
          'accessToken': accessToken || '',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching lenders:', error);
    return { results: [], totalCount: 0 };
  }
};

const LendersLoanApplications: React.FC = () => {
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [totalEntries, setTotalEntries] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchType, setSearchType] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchLenders(currentPage, searchType, searchValue).then(data => {
      setLenders(data.results);
      setTotalEntries(data.totalCount);
    });
  }, [currentPage, searchType, searchValue]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to page 1 on new search
    fetchLenders(1, searchType, searchValue).then(data => {
      setLenders(data.results);
      setTotalEntries(data.totalCount);
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    // Handle sign out logic here
  };

  const columns = [
    { title: 'Lender ID', dataIndex: 'id', key: 'id' },
    { title: 'Regd Date & Exp Date', dataIndex: 'loanRequestedDate', key: 'loanRequestedDate' },
    { title: 'Name & Mobile', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Email & Address', dataIndex: 'email', key: 'email' },
    // Add other columns as needed
  ];

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
        <div className="search-bar" style={{ marginBottom: 16 }}>
          <select onChange={(e) => setSearchType(e.target.value)} value={searchType}>
            <option value="">-- Choose --</option>
            <option value="id">LENDER ID</option>
            {/* Add other search types as needed */}
          </select>
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="Search"
            style={{ marginLeft: 8 }}
          />
          <Button onClick={handleSearch} style={{ marginLeft: 8 }}>Search</Button>
        </div>
        
        <Table
          dataSource={lenders}
          columns={columns}
          pagination={false} // Disable built-in pagination
          rowKey="id"
        />
        <Pagination
          current={currentPage}
          pageSize={10}
          total={totalEntries}
          onChange={handlePageChange}
          style={{ marginTop: 16 }}
        />
      </div>
    </div>
  );
};

export default LendersLoanApplications;

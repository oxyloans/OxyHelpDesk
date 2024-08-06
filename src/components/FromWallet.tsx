


import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Sidebartype from './Sidebartype';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import UserImage from '../Assets/img/User.png';

interface LenderWithdrawalRequestPayload {
  firstName: string;
  lastName: string;
  userId: number;
}

const FromWallet: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [userType, setUserType] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<string>('');
  const [userId, setUserId] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('0');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const userCookie = sessionStorage.getItem('sUserType');
    if (userCookie) {
      setUserType(userCookie);
    }

    loadLendersWithdrawalFunds();
  }, [currentPage, searchType, searchValue]);

  const loadLendersWithdrawalFunds = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.post(
        'https://fintech.oxyloans.com/oxyloans/v1/user/lenderwithdrawalfundssearch',
        {
          page: {
            pageNo: currentPage,
            pageSize: 10,
          },
          firstName: "",
          lastName: "",
          userId: searchValue,
        },
        {
          headers: {
            accessToken: `${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setData(response.data.results);
      setTotalPages(Math.ceil(response.data.totalCount / 100));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === 'searchType') {
      setSearchType(e.target.value);
    } else {
      setSearchValue(e.target.value);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    loadLendersWithdrawalFunds();
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
        <section className="content">
          <section className="content-header">
            <h1>Lender Withdrawal List</h1>
          </section>
          <br />

          <div className="mb-4 flex space-x-4">
            <select
              name="searchType"
              className="form-control p-2 border rounded"
              value={searchType}
              onChange={handleSearchChange}
            >
              <option value="">-- Choose --</option>
              <option value="lenderID">Lender ID</option>
              <option value="userName">Name</option>
            </select>
            {searchType === 'lenderID' && (
              <input
                type="text"
                name="searchValue"
                className="form-control p-2 border rounded"
                placeholder="Lender ID"
                value={searchValue}
                onChange={handleSearchChange}
              />
            )}
            {searchType === 'userName' && (
              <input
                type="text"
                name="searchValue"
                className="form-control p-2 border rounded"
                placeholder="Name"
                value={searchValue}
                onChange={handleSearchChange}
              />
            )}
            <button className="btn bg-gray-300 p-2 rounded" onClick={handleSearch}>
              <i className="fa fa-angle-double-right"></i> <b>Search</b>
            </button>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <div className="box bg-white shadow rounded p-4">
                <div className="box-header flex justify-between items-center mb-4">
                  <h3 className="box-title text-teal-600">Lender Withdrawal info</h3>
                  <div>
                    {/* Pagination */}
                    <ul className="pagination flex space-x-2">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className={`page-link ${currentPage === 1 ? 'bg-gray-200' : 'bg-teal-600 text-white'}`}
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                          <button
                            className={`page-link ${currentPage === index + 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className={`page-link ${currentPage === totalPages ? 'bg-gray-200' : 'bg-teal-600 text-white'}`}
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="box-body">
                  <table className="table table-bordered table-hover w-full">
                    <thead>
                      <tr>
                        <th className="p-2 border">LR ID & Name</th>
                        <th className="p-2 border">Withdrawal Info</th>
                        <th className="p-2 border">Status</th>
                        {!userType || userType !== 'TESTADMIN' ? <th className="p-2 border">Actions</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((item) => (
                          <tr key={item.userId}>
                            <td className="p-2 border">
                              LR{item.userId} <br />
                              {item.firstName} {item.lastName}<br />
                              <b>Email:</b> {item.email} <br />
                              <b>Mobile Number:</b> {item.mobileNumber} <br />
                            </td>
                            <td className="p-2 border">
                              Created On: {item.createdOn} <br />
                              Withdrawal Amount: {item.amount} <br />
                              Rating: {item.rating} <br />
                              Feedback: {item.feedBack}
                            </td>
                            <td className="p-2 border">
                              <b>Status:</b> {item.status} <br />
                              <b>Current Wallet:</b> {item.currentAmount} <br />
                              {item.adminComments && (
                                <>
                                  <b className={`admincomments_${item.adminComments}`}>
                                    Admin comments:
                                  </b>{' '}
                                  <span className={`admincomments_${item.adminComments}`}>
                                    {item.adminComments}
                                  </span>
                                </>
                              )}
                            </td>
                            {!userType || userType !== 'TESTADMIN' ? (
                              <td className="p-2 border">
                                <button className="btn bg-gray-300 p-2 rounded">
                                  <i className="fa fa-angle-double-right"></i> <b>Action</b>
                                </button>
                              </td>
                            ) : null}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center p-2 border">
                            No data
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modals */}
        {/* <Modal id="modal-approve-withdrawfunds" title="Are You Sure ?"> */}
        {/* Modal Content */}
        {/* </Modal> */}
        {/* Other Modals */}
      </div>
    </div>
  );
};

export default FromWallet;

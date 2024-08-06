import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Sidebar from './components/Sidebar';
// import Sidebartype from './components/Sidebartype';
import Sidebartype from './Sidebartype';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoMenu } from "react-icons/io5";
import UserImage from '../Assets/img/User.png';

interface Query {
  sNo: number;
  userNewId: string;
  mobileNumber: string;
  email: string;
  ticketId: string;
  name: string;
  query: string;
  listOfPendingQueries: {
    pendingQuereis: string;
    respondedBy: string;
    respondedOn: string;
  }[];
  fileName: string;
  status: string;
  receivedOn: string;
  resolvedBy?: string;
  id: number;
  userId: number;
}

interface ApiResponse {
  listOfUserQueryDetailsResponseDto: UserQueryDetails[];
  count: number;
  lenderCount: number;
  borrowerCount: number;
}

interface UserQueryDetails {
  id: number;
  userId: number;
  query: string;
  status: string | null;
  documentId: number;
  screenshotUrl: string;
  mobileNumber: string;
  email: string;
  fileName: string | null;
  filePath: string | null;
  userNewId: string;
  ticketId: string;
  comments: string | null;
  resolvedBy: string | null;
  name: string;
  receivedOn: string;
  respondedOn: string | null;
  listOfPendingQueries: PendingQuery[] | null;
  sNo: number;
  adminFileName: string | null;
  adminFilePath: string | null;
  adminScreenshotUrl: string;
  adminDocumentId: number;
}

interface PendingQuery {
  pendingQuereis: string;
  respondedOn: string;
  resolvedBy: string;
  adminFileName: string | null;
  adminFilePath: string | null;
  adminScreenshotUrl: string | null;
  adminDocumentId: number;
  respondedBy: string;
}

const UnresovedQueries: React.FC = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [queryStatus, setQueryStatus] = useState<string>('Pending');
  const [primaryType, setPrimaryType] = useState<string>('LENDER');
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queriesPerPage] = useState<number>(10);
  const [ismodalok , setisModalok]=useState<boolean>(false)
  const [totalQueries, setTotalQueries] = useState<number>(0);
  const [userId, setUserId]=useState<number>(0)
  const [id , setId]=useState<number>(0);
  const[adminDocumentId , setadminDocumentId]=useState<number>(0)
  const [userData, setUserData] = useState<ApiResponse>({
    listOfUserQueryDetailsResponseDto: [],
    count: 0,
    lenderCount: 0,
    borrowerCount: 0,
  });

  const [status, setstatus] = useState<string>('');
  const [comments, setcomments] = useState<string>('');
  const [resolvedBy, setresolvedBy] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPendingQueries, setTotalPendingQueries] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
   // State for total pending queries
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchQueries(queryStatus, primaryType);
  }, [queryStatus, primaryType, currentPage]);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error('No access token found');
        setError('Access token is missing');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await axios.post(
          'https://fintech.oxyloans.com/oxyloans/v1/user/testqueryDetailsBasedOnPrimaryType',
          {
            pageNo: 1,
            pageSize: 10,
            status: 'Pending',
            primaryType: 'LENDER',
          },
          {
            headers: {
              accessToken: `${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setUserData(response.data);
        setTotalQueries(response.data.lenderCount);
        console.log(response.data);
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

    fetchUser();
  }, []);

  const fetchQueries = async (status: string, type: string) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('No access token found');
      setError('Access token is missing');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://fintech.oxyloans.com/oxyloans/v1/user/testqueryDetailsBasedOnPrimaryType',
        {
          pageNo: currentPage,
          pageSize: queriesPerPage,
          status: 'Pending',
          primaryType: 'LENDER',
        },
        {
          headers: {
            accessToken: `${accessToken}`,
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

  const handleStatusChange = async (id: number, userId: number, newStatus: string) => {
    try {
      // Simulate updating status on the server
      // await axios.post('/api/update-query-status', { id, userId, status: newStatus });

      setAlertMessage('Successfully Updated');
      fetchQueries(queryStatus, primaryType); // Fetch updated data
    } catch (error) {
      console.error('Error updating query status:', error);
    }
  };



  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };



  const handleparmspass =(userId: number , id: number , adminDocumentId: number)=>{
    setisModalok(true)
     setUserId(userId);
     setId(id);
     setadminDocumentId(adminDocumentId);

  }
  const handleLastPage = () => {
    setCurrentPage(Math.ceil(totalQueries / queriesPerPage));
  };

  const handlePendingLenderQueriesClick = () => {
    setQueryStatus('Pending');
    setPrimaryType('LENDER');
    setCurrentPage(1); // Reset to first page
    setAlertMessage(''); // Clear any alert message
    fetchQueries('Pending', 'LENDER'); // Fetch queries again
  };

  const totalPages = Math.ceil(totalQueries / queriesPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400 ${
            currentPage === i ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };
 
  


  const handleclickdataapi =async()=>{

     


const accessToken = localStorage.getItem('accessToken');

if (!accessToken) {
  console.error('No access token found');
  setError('Access token is missing');
  setLoading(false);
  return;
}

setLoading(true);
setError('');

try {
  const response = await axios.patch(
    'https://fintech.oxyloans.com/oxyloans/v1/user/resolvingUserQuery',
    {
      id,
      userId,
      status:"Completed",
      comments,
      resolvedBy,
      adminDocumentId
    },
    {
      headers: {
        accessToken: `${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
  setisModalok(false)
console.log(response.data.message);
alert(response.data.message);
setisModalok(false)
  // setUserData(response.data);
} catch (err: any) {
  setisModalok(false)
  if (err.response) {
    console.error('Error fetching user data:', err.response.data);
    alert(err.response.data);
    setError(`Failed to fetch user data: ${err.response.status} ${err.response.statusText}`);
  } else if (err.request) {
    console.error('Error fetching user data: No response received', err.request);
    alert(err.request);
    setError('Failed to fetch user data: No response received.');
  } else {
    console.error('Error fetching user data:', err.message);
    setError(`Failed to fetch user data: ${err.message}`);
  }
} finally {
  setLoading(false);
}


  }
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
        <div className="flex">
          <div className="flex-1 p-4">
            <section className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">User Queries</h3>
                <div className="flex space-x-4">
                  <a href="./unresolvedQueries">
                    <button
                      className="btn bg-green-500 text-white py-2 px-4 rounded-full"
                      onClick={handlePendingLenderQueriesClick}
                    >
                      Pending Lender Queries
                    </button>
                  </a>
                </div>
              </div>
              {alertMessage && (
                <div className="alert bg-green-200 text-green-800 py-2 px-4 rounded mb-4">
                  <strong>{alertMessage}</strong>
                </div>
              )}
            </section>

            <section>
              <div className="box border rounded shadow-lg p-4 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <b>No of Lender Pending queries : {totalQueries}</b>
                    <br />
                  </div>
                  <div className="flex items-center space-x-2">
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
                    {renderPageNumbers()}
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

                <div className="container mx-auto mt-10">
                  {userData?.listOfUserQueryDetailsResponseDto.length === 0 ? (
                    <p className="text-center text-red-500">No data found</p>
                  ) : (
                    <table className="table-auto w-full border-collapse border border-gray-400">
                      <thead>
                        <tr className="border-b bg-gray-200">
                          <th className="border border-gray-300 px-4 py-2">#</th>
                          <th className="border border-gray-300 px-4 py-2">User Info</th>
                          <th className="border border-gray-300 px-4 py-2">Query</th>
                          <th className="border border-gray-300 px-4 py-2">Pending Queries</th>
                          <th className="border border-gray-300 px-4 py-2">Status</th>
                          <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData?.listOfUserQueryDetailsResponseDto.map((query) => (
                          <tr key={query.sNo}>
                            <td className="border border-gray-300 px-4 py-2">{query.sNo}</td>
                            <td className="border border-gray-300 px-4 py-2">
                              <b>User Id:</b> {query.userNewId}
                              <br />
                              <b>Mobile No:</b> {query.mobileNumber}
                              <br />
                              <b>Email:</b> {query.email}
                              <br />
                              <b>Ticket Id:</b> {query.ticketId}
                              <br />
                              <b>User Name:</b> {query.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{query.query}</td>
                            <td className="border border-gray-300 px-4 py-2">
                              <b>Comments</b>
                              <ul>
                                {query.listOfPendingQueries?.map((pendingQuery, index) => (
                                  <li key={index}>
                                    <b>Query:</b> {pendingQuery.pendingQuereis}
                                    <br />
                                    <b>Responded By:</b> {pendingQuery.respondedBy}
                                    <br />
                                    <b>Responded On:</b> {pendingQuery.respondedOn}
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{query.status}</td>
                            <td className="border border-gray-300 px-4 py-2">
                              <button
                                className="btn btn-xs bg-green-500 text-white py-1 px-2 rounded mb-2"
                                onClick={() => handleparmspass(query.userId, query.id, query.adminDocumentId)}
                                disabled>
                                Resolve
                              </button>
                              <br />
                              <button
                                className="btn btn-xs bg-red-500 text-white py-1 px-2 rounded mb-2"
                                onClick={() => handleparmspass(query.userId, query.id, query.adminDocumentId)}
                                disabled>
                                Pending
                              </button>
                              <br />
                              <button
                                className="btn btn-xs bg-blue-500 text-white py-1 px-2 rounded"
                                onClick={() => {
                                  // Implement ticket history logic
                                }}
                                disabled>
                                Ticket History
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
        </div>









{ismodalok && <>
  <div className="modal fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
  <div className="modal-dialog mx-auto my-10">
    <div className="modal-content bg-white shadow-lg rounded-lg">
      <div className="modal-header bg-gray-200 border-b">
        <button
          type="button"
          className="close text-black float-right text-3xl px-4 py-1"
        //   onClick={() => closeModal()}
        onClick = {()=> setisModalok(false)}
        >
          <span>&times;</span>
        </button>
        <h4 className="modal-title text-xl font-bold py-4 px-6">Comments</h4>
      </div>
      <div className="modal-body px-6 py-4">
        <form>
          <div className="mb-4">
            <textarea
              className="form-control w-full h-24 border rounded-md px-3 py-2"
              name='comment'
              placeholder="Enter The Comments"
                onChange={(event)=> setcomments(event.target.value)}
            ></textarea>
            <span className="error commentsErrorMessage hidden text-red-500">Enter The comments</span>
          </div>
          
          <div className="mb-4 flex items-center">
            <label className="mr-2">Attach File :</label>
            <input
              type="file"
              className="custom-file-input queryImageUpload query-file-upload-image"
              id="query"
            //   onChange={(e) => uploadQueryScreesShot(e.target)}
              accept="image/*"
            />
            <input type="hidden" id="queryDocumnetId" />
          </div>
          
          <div className="mb-4 flex items-center">
            <label className="mr-2" htmlFor="updating">Updating By<em className="error">*</em> :</label>
            <select className="form-control queyUpdatedBy border rounded-md px-3 py-2" id="updating"        onChange={(event)=> setresolvedBy(event.target.value)}>
              <option value="">-- Choose Your Name --</option>
              <option value="Subash">Subash</option>
              <option value="Ramadevi">Ramadevi</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </form>
      </div>
      <div className="modal-footer bg-gray-200 py-4 px-6">
        <div className="flex justify-end">
          <button
            type="button"
            className="btn bg-blue-500 text-white px-4 py-2 rounded mr-2"
            // onClick={() => approveQuery()}
            data-dismiss="modal"
            data-clikedId=""
            data-userId=""
            data-status=""

            onClick={handleclickdataapi}
          >
            Save
          </button>
          <button
            type="button"
            className="btn bg-gray-400 text-gray-700 px-4 py-2 rounded"
            // onClick={() => closeModal()}
            onClick = {()=> setisModalok(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</div></>}


    </div>
  );
};

export default UnresovedQueries;






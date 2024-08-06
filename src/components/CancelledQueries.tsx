import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
// import Sidebartype from './components/Sidebartype';
import axios from 'axios';
import Sidebartype from './Sidebartype';
import { IoMenu } from "react-icons/io5";
import UserImage from '../Assets/img/User.png';
import { IoIosNotificationsOutline } from 'react-icons/io';
const CancelledQueries: React.FC = () => {
  const [queries, setQueries] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [ismodalok,setisModalok] = useState<boolean>(false);
  const itemsPerPage = 10; // Number of queries per page
  const maxPageNumbersToShow = 5; // Number of page numbers to show in pagination
  const [totalquerycount,setTotalquerycount] = useState();
  const [id,setId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [comments,setComments] = useState<string>('')
  const [resolvedBy,setresolvedBy] = useState<string>('')
  const [adminDocumentId,setadminDocumentId] = useState<number>(0)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



  const handleparmspass =(userId: number , id: number , adminDocumentId: number)=>{
    setisModalok(true)
     setUserId(userId);
     setId(id);
     setadminDocumentId(adminDocumentId);

  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // For actual implementation, you would fetch data based on the page number
  };

  const handleApproveQuery = (id: number, userId: number, status: string) => {
    // Handle query approval
  };

  const handleViewSubQueries = (id: number, userId: number) => {
    // Handle viewing sub-queries
  };

  const downLoadWalletTrnsImage = (userId: number, documentId: number, type: string) => {
    console.log(`Downloading image for user ${userId} and document ${documentId} of type ${type}`);
  };

  // Calculate the range of queries to display based on current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Calculate the range of page numbers to display
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  useEffect(() => {
    const fetchuser = async () => {
      const accessToken = localStorage.getItem('accessToken');
  
      if (!accessToken) {
        console.error('No access token found');
        setError('Access token is missing');
        setLoading(false);
        return;
      }
  
      setLoading(true);
      setError("");
  
      try {
        const response = await axios.post(
          'https://fintech.oxyloans.com/oxyloans/v1/user/testqueryDetailsBasedOnPrimaryType',
          {
            pageNo: currentPage,
            pageSize: itemsPerPage,
            status: "Cancelled",
            primaryType: "LENDER"
          },
          {
            headers: {
              'accessToken': `${accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        )
  
        console.log( response.data);
        const responseData = response.data.listOfUserQueryDetailsResponseDto;
        const totalItems = response.data.lenderCount;
        const count=Math.ceil(totalItems/itemsPerPage)
        setTotalPages(count)
        setTotalquerycount(totalItems)
        setQueries(responseData);
       
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
  
    fetchuser();
  }, [currentPage]); // Include currentPage as a dependency
  
  const handleclickdataapi = async ()=>{
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
  // Ensure queries is always an array
  const actualQueries = Array.isArray(queries) ? queries : [];
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
          <div className="flex-grow p-4">
            <section className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Cancelled Queries</h3>
                <div className="space-x-2">
                  <a href="./CancelledQuries">
                    <button className="bg-green-500 text-white rounded-full px-4 py-2">
                      Cancelled Lender Queries
                    </button>
                  </a>
                  <a href="closedQuery?queryStatus=Cancelled&primaryType=BORROWER">
                    {/* Uncomment if needed */}
                    {/* <button className="bg-yellow-500 text-white rounded-full px-4 py-2 ml-2">
                      Cancelled Borrower Queries
                    </button> */}
                  </a>
                </div>
              </div>
              <div className="alert querySuccessMessage bg-green-100 p-4 mt-4 hidden">
                <strong className="text-bold text-lg">Successfully Updated.</strong>
              </div>
            </section>
            <section className="bg-white rounded-lg shadow p-4">
              <div className="mb-4 flex justify-between items-center">
                <div>
                  <b>No Of Cancelled Queries:</b> <span>{totalquerycount}</span>
                </div>
                <div className="flex space-x-2">
                  <div className="dashBoardPagination">
                    <div className="flex items-center space-x-2">
                      <button
                        className="btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400"
                        onClick={() => handlePageChange(1)}
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
                      {pageNumbers.map((pageNumber) => (
                        <button
                          key={pageNumber}
                          className={`btn bg-gray-300 text-gray-700 py-1 px-3 rounded border border-gray-400 ${currentPage === pageNumber ? 'bg-blue-500 text-white' : ''}`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
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
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        &gt;&gt;
                      </button>
                    </div>
                  </div>
                  <div className="searchborrowerPagination hidden">
                    <ul className="pagination bootpag flex space-x-1"></ul>
                  </div>
                </div>
              </div>
              <div>
                <table className="table-auto w-full text-left border border-gray-300">
                  <thead>
                    <tr className="border-b bg-gray-200">
                      <th className="p-2 border border-gray-300">S.No</th>
                      <th className="p-2 border border-gray-300">User Info</th>
                      <th className="p-2 border border-gray-300">Query</th>
                      <th className="p-2 border border-gray-300">Query Status</th>
                      <th className="p-2 border border-gray-300">Status</th>
                      <th className="p-2 border border-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queries.slice(startIndex, endIndex).map((query, index) => (
                      <tr key={query.id} className="border-b">
                        <td className="p-2 border border-gray-300">{startIndex + index + 1}</td>
                        <td className="p-2 border border-gray-300">
                          <b>User Id:</b> {query.userNewId}<br />
                          <b>Mobile No:</b> {query.mobileNumber}<br />
                          <b>Email:</b> {query.email}<br />
                          <b>Ticket Id:</b> {query.ticketId}<br />
                          <b>User Name:</b> {query.name}
                        </td>
                        <td className="p-2 border border-gray-300">{query.query}</td>
                        <td className="p-2 border border-gray-300">
                          {/* Uncomment if needed */}
                          {/* <ul>
                            {query.listOfPendingQueries.map((item, index) => (
                              <li key={index}>{item.pendingQuereis} - {item.resolvedBy} - {item.respondedOn}</li>
                            ))}
                          </ul> */}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {query.fileName && (
                            <div>
                              <b>ScreenShot</b>: <a href="javascript:void(0)" onClick={() => downLoadWalletTrnsImage(query.userId, query.id, 'USERQUERYSCREENSHOT')}>Click Here</a><br />
                            </div>
                          )}
                          <span className={`query-${query.status}`}><b>Status:</b> {query.status}</span><br />
                          <span><b>Received On:</b> {query.receivedOn}</span><br />
                          {query.resolvedBy && <span><b>Resolved By:</b> {query.resolvedBy}</span>}
                        </td>
                        <td className="p-2 border border-gray-300">
                          <button className="bg-green-500 text-white rounded px-2 py-1" onClick={() => handleparmspass(query.userId, query.id, query.adminDocumentId)} disabled>
                            Resolve
                          </button>
                          <br />
                          <button className="bg-red-500 text-white rounded px-2 py-1 mt-2" onClick={() => handleparmspass(query.userId, query.id, query.adminDocumentId)} disabled>
                            Pending
                          </button><br />
                          <button className="bg-blue-500 text-white rounded px-2 py-1 mt-2" onClick={() => handleViewSubQueries(query.id, query.userId)} disabled>Ticket History</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          {ismodalok && (
            <div className="modal fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
              <div className="modal-dialog mx-auto my-10">
                <div className="modal-content bg-white shadow-lg rounded-lg">
                  <div className="modal-header bg-gray-200 border-b">
                    <button
                      type="button"
                      className="close text-black float-right text-3xl px-4 py-1"
                      onClick={() => setisModalok(false)}
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
                          name="comment"
                          placeholder="Enter The Comments"
                          value={comments}
                          onChange={(event) => setComments(event.target.value)}
                        ></textarea>
                        <span className="error commentsErrorMessage hidden text-red-500">Enter The comments</span>
                      </div>

                      <div className="mb-4 flex items-center">
                        <label className="mr-2">Attach File :</label>
                        <input
                          type="file"
                          className="custom-file-input queryImageUpload query-file-upload-image"
                          id="query"
                          accept="image/*"
                        />
                        <input type="hidden" id="queryDocumnetId" />
                      </div>

                      <div className="mb-4 flex items-center">
                        <label className="mr-2" htmlFor="updating">Updating By<em className="error">*</em> :</label>
                        <select
                          className="form-control queyUpdatedBy border rounded-md px-3 py-2"
                          id="updating"
                          onChange={(event) => setresolvedBy(event.target.value)}
                        >
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
                        onClick={handleclickdataapi}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn bg-gray-400 text-gray-700 px-4 py-2 rounded"
                        onClick={() => setisModalok(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CancelledQueries;
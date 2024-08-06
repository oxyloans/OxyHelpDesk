import React, { useEffect, useState } from 'react';


interface TransferData {
  senderName: string;
  senderId: number;
  receiverName: string;
  receiverId: number;
  amount: number;
  requestedDate: string;
  status: string;
  id: number;
}

const LenderWalletTransfers: React.FC = () => {
  const [transfers, setTransfers] = useState<TransferData[]>([]);
  const [userType, setUserType] = useState<string | null>(null);

  // Function to fetch user type from cookies
  const getUserTypeFromCookies = (): string | null => {
    const cookieString = document.cookie.split('; ').find(row => row.startsWith('sUserType='));
    return cookieString ? cookieString.split('=')[1] : null;
  };

  // Fetch data useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/transfers'); // Example API endpoint
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTransfers(data);
      } catch (error) {
        console.error('Failed to fetch transfer data:', error);
      }
    };

    fetchData();
  }, []);

  // Set user type useEffect
  useEffect(() => {
    const userType = getUserTypeFromCookies();
    setUserType(userType);
  }, []);

  const approveW2W = (status: string, id: number) => {
    console.log(`Approve W2W: ${status}, ID: ${id}`);
    // Handle the approve/reject logic here
  };

  return (
    <div className="flex h-screen bg-gray-100">
 

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            <div className="relative mx-auto text-gray-600">
              <input className="border border-gray-300 h-10 w-96 px-5 pr-16 rounded-lg text-sm placeholder-current focus:outline-none dark:bg-gray-500 dark:border-gray-50 dark:text-gray-200" type="search" name="search" placeholder="Search" />
              <button type="submit" className="absolute right-1 top-0 mt-3 mr-4">
                <svg className="text-gray-600 dark:text-gray-200 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 56.966 56.966" xmlSpace="preserve" width="512px" height="512px">
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17 s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4 mr-4">
            <a href="#" className="text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path fill="currentColor" d="M6.429 2.413a.75.75 0 0 0-1.13-.986l-1.292 1.48a4.75 4.75 0 0 0-1.17 3.024L2.78 8.65a.75.75 0 1 0 1.5.031l.056-2.718a3.25 3.25 0 0 1 .801-2.069z" />
                <path fill="currentColor" fillRule="evenodd" d="M6.237 7.7a4.214 4.214 0 0 1 4.206-3.95H11V3a1 1 0 1 1 2 0v.75h.557a4.214 4.214 0 0 1 4.206 3.95l.221 3.534a7.376 7.376 0 0 0 1.308 3.754a1.617 1.617 0 0 1-1.135 2.529l-3.407.408V19a2.75 2.75 0 1 1-5.5 0v-1.075l-3.407-.409a1.617 1.617 0 0 1-1.135-2.528a7.377 7.377 0 0 0 1.308-3.754zm4.206-2.45a2.714 2.714 0 0 0-2.709 2.544l-.22 3.534a8.877 8.877 0 0 1-1.574 4.516a.117.117 0 0 0 .082.183l3.737.449c1.489.178 2.993.178 4.482 0l3.737-.449a.117.117 0 0 0 .082-.183a8.876 8.876 0 0 1-1.573-4.516l-.221-3.534a2.714 2.714 0 0 0-2.709-2.544zm1.557 15c-.69 0-1.25-.56-1.25-1.25v-.75h2.5V19c0 .69-.56 1.25-1.25 1.25" clipRule="evenodd" />
                <path fill="currentColor" d="M17.643 1.355a.75.75 0 0 0-.072 1.058l1.292 1.48a3.25 3.25 0 0 1 .8 2.07l.057 2.717a.75.75 0 0 0 1.5-.031l-.057-2.718a4.75 4.75 0 0 0-1.17-3.024l-1.292-1.48a.75.75 0 0 0-1.058-.072" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path fill="currentColor" d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17a10 10 0 1 0-12.68 0a1 1 0 0 0 .12 1.17l1.28 1.44a1 1 0 0 1 0 1.32l-1.28 1.44a1 1 0 0 0-.12 1.17a10 10 0 1 0 12.68 0a1 1 0 0 0-.12-1.17l-1.28-1.44zm-7.85-5.66a7.968 7.968 0 0 1 5.88 2.12a7.968 7.968 0 0 1 2.12 5.88a7.968 7.968 0 0 1-2.12 5.88a7.968 7.968 0 0 1-5.88 2.12a7.968 7.968 0 0 1-5.88-2.12a7.968 7.968 0 0 1-2.12-5.88a7.968 7.968 0 0 1 2.12-5.88a7.968 7.968 0 0 1 5.88-2.12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Wallet Transfers</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Sender Name</th>
                <th className="px-4 py-2 border-b">Sender ID</th>
                <th className="px-4 py-2 border-b">Receiver Name</th>
                <th className="px-4 py-2 border-b">Receiver ID</th>
                <th className="px-4 py-2 border-b">Amount</th>
                <th className="px-4 py-2 border-b">Requested Date</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transfers.length > 0 ? (
                transfers.map(transfer => (
                  <tr key={transfer.id}>
                    <td className="px-4 py-2 border-b">{transfer.senderName}</td>
                    <td className="px-4 py-2 border-b">{transfer.senderId}</td>
                    <td className="px-4 py-2 border-b">{transfer.receiverName}</td>
                    <td className="px-4 py-2 border-b">{transfer.receiverId}</td>
                    <td className="px-4 py-2 border-b">{transfer.amount}</td>
                    <td className="px-4 py-2 border-b">{new Date(transfer.requestedDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border-b">{transfer.status}</td>
                    <td className="px-4 py-2 border-b">
                      {userType === 'admin' && (
                        <button onClick={() => approveW2W(transfer.status, transfer.id)} className="text-blue-500 hover:text-blue-700">
                          Approve/Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-2 border-b text-center">No transfers available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LenderWalletTransfers;

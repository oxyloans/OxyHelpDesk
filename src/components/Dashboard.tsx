import React, { useEffect, useState } from 'react';


import ReactDOM from 'react-dom';
import ChartJS from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';

import  Apexgraph from './Apexgraph';
import axios from 'axios';
import { json } from 'stream/consumers';
import { ApexOptions } from 'apexcharts';
import Chart from './Chart';


import Sidebartype from './Sidebartype';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import UserImage from '../Assets/img/User.png';
interface DashboardData {
  registeredUsersCount: number;
  lendersCount: number;
  borrowersCount: number;
  todayRegisteredUsersCount: number;
  borrowersRequestedAmount: number;
  lendersCommitedAmount: number;
  noOfAggrements: number;
  noOfConversationRequests: number;
  totalOfferAmount: number;
  totalDisbursedAmount: number;
}

const data = {
  labels: ['active', 'monthly ', 'quarterly ', ' halfyearly', 'yearly', 'fiveYears', 'tenYears', 'lifeTime'],
  datasets: [
    {
      label: 'Monthly Data',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: [65, 59, 80, 81, 56, 55, 40, 60]
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly Data',
    },
  },
};
const Dashboard: React.FC = () => {


  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [myChart, setMyChart] = useState<ChartJS | null>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [chartData, setChartData] = useState<number[]>([]);  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const fetchChartData = async () => {
      const saccessToken = localStorage.getItem('accessToken');
      const postData = {
        startDate: '2024-07-01',
        endDate: '2024-07-24',
      };
  
      try {
        const response = await axios.post(
          'https://fintech.oxyloans.com/oxyloans/v1/user/grapical_image_admin_module',
          postData,
          {
            headers: {
              'Content-Type': 'application/json',
              'accessToken': `${saccessToken}`,
            },
          }
        );
  
        if (response && response.data) {
          console.log(response.data);
          const data = [
            response.data[0].activeLenders,
            response.data[0].monthlyPaidFeeLenders,
            response.data[0].quarterlyPaidFeeLenders,
            response.data[0].halfyearlyPaidFeeLenders,
            response.data[0].yearlyPaidFeeLenders,
            response.data[0].fiveYearsPaidFeeLenders,
            response.data[0].tenYearsPaidFeeLenders,
            response.data[0].lifeTimeFeeLenders,
          ];
          setChartData(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchChartData();
    }, []);
  
    const options: ApexOptions = {
      chart: {
        id: 'bar-chart',
      },
      xaxis: {
        categories: [
          'Active',
          'Monthly',
          'Quarterly',
          'Halfyearly',
          'Yearly',
          'Fiveyears',
          'Tenyears',
          'LifeTime',
        ],
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: 'Deals Data',
        align: 'left',
      },
      colors: ['#FF4560'],
    };
  
    const series = [
      {
        name: 'Deals data',
        data: chartData,
      },
    ];
  
    useEffect(() => {
      fetchChartData();
    }, []);
  

    useEffect(() => {
  
        fetchChartData();

    }, []);
  


      
    useEffect(() => {
      const suserId = localStorage.getItem("sUserId");
      const sprimaryType =  localStorage.getItem("sUserType");
      const saccessToken =  localStorage.getItem("accessToken");
  console.log(saccessToken)
      const loadBoxForApproveAmount = (
        userId: string,
        primaryType: string,
        accessToken: string,
        comments: string
      ) => {
      
      };
  
      const adminUrl = `https://fintech.oxyloans.com/oxyloans/v1/user/6680/dashboard/ADMIN?current=false`;
     
      axios.get(adminUrl, {
        headers: { accessToken: saccessToken } 
      }).then(response => {
        setDashboardData(response.data);
        setLoading(false);
      }).catch(error => {
        console.error("Error Something", error);
        setLoading(false);
      });
    }, []);
  
    if (loading) {
      return <div id="loadingSec">Loading...</div>;
    }
  
    if (!dashboardData) {
      return <div>Error loading data.</div>;
    }
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const handleSignOut = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
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
  
          {/* Main Content */}
          <div className="flex">
            {/* Dashboard Content */}
            <main className="flex-1 bg-gray-100 p-4">
              <section className="mb-4">
                <div className="mb-4">
                  <h1 className="text-2xl">Dashboard</h1>
                  <div className="flex justify-between items-center mt-4">
                    <small>
                      <ol className="breadcrumb"></ol>
                    </small>
                    <div>
                      <a href="newloan.php" className="btn btn-success mr-2"></a>
                      <a href="agreedLoans.php" className="btn btn-primary"></a>
                    </div>
                  </div>
                </div>
              </section>
  
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="small-box bg-blue p-4 rounded">
                  <div className="inner"></div>
                  <div className="icon">
                    <i className="ion ion-android-apps"></i>
                  </div>
                  <a href="#" className="small-box-footer">
                    <p className="text-white">REGISTERED USERS</p>
                    <p className="requestedloansAmount">{dashboardData.registeredUsersCount}</p>
                    <i className="fa fa-arrow-circle-right"></i>
                  </a>
                </div>
  
                <div className="small-box bg-green p-4 rounded">
                  <div className="inner"></div>
                  <div className="icon">
                    <i className="ion ion-stats-bars"></i>
                  </div>
                  <a href="#" className="small-box-footer">
                    <p className="text-white">LENDERS</p>
                    <p className="runningloansAmount"><b></b> {dashboardData.lendersCount}</p>
                    <i className="fa fa-arrow-circle-right"></i>
                  </a>
                </div>
  
                <div className="small-box bg-yellow p-4 rounded">
                  <div className="inner">
                    <p className="text-white">BORROWERS</p>
                    <h3 className="acceptedoffers">{dashboardData.borrowersCount}</h3>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add"></i>
                  </div>
                </div>
  
                <div className="small-box bg-gray p-4 rounded">
                  <div className="inner">
                    <p className="text-white">Today Registered users</p>
                    <h3 className="rejectedoffers">{dashboardData.todayRegisteredUsersCount}</h3>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-stalker"></i>
                  </div>
                </div>
              </section>
  
              <div className="flex flex-wrap gap-4">
                <div className="small-box w-100 bg-white p-4 rounded shadow-md" style={{ marginTop: '1rem', height: 'auto', width: '730px' }}>
                  <div className="w-full h-[800px]">
                    {loading ? <p>Loading...</p> : <Chart options={options} series={series} type="bar" height={220} />}
                  </div>
                </div>
  
                <div className="small-box bg-white p-4 rounded shadow-md" style={{ marginTop: '1rem', width: '300px' }}>
                  <h1>Current Month EMIs Information</h1>
                  <hr />
                  <br />
  
                  {[
                    { label: 'No of EMI processed', processed: 0, total: 0 },
                    { label: 'No of EMI Not processed', processed: 160, total: 200 },
                    { label: 'Amount Received', processed: 310, total: 200 },
                    { label: 'Amount Not Received', processed: 310, total: 200 },
                    { label: 'Earned Amount', processed: 480, total: 200 },
                    { label: 'No OF EMIS pending', processed: 250, total: 200 }
                  ].map(({ label, processed, total }) => (
                    <div key={label} className="progress-group mb-4">
                      <div className="flex justify-between items-center">
                        <span className="progress-text text-gray-700 font-semibold">{label}</span>
                        <span className="progress-number text-gray-500">
                          <b>{processed}</b>/<span>{total}</span>
                        </span>
                      </div>
                      <div className="mt-2">
                        <progress id="progressbar" value="0" max="100" className="w-full h-2.5 bg-gray-200 rounded-full"></progress>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  
              <div className="hidden mt-4 moreStatsDisplay">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: 'fa-rocket', label: 'Amount Disbursed', value: '64.89 %' },
                    { icon: 'fa-hand-o-right', label: 'Aval for Investment', value: '64.89 %' },
                    { icon: 'fa-arrow-up', label: 'Interest Received', value: '64.89 %' },
                    { icon: 'fa-bell', label: 'No. Of EMIs failed', value: '64.89 %' },
                    { icon: 'fa-exchange', label: 'No.Of Loan requests', value: '64.89 %' },
                    { icon: 'fa-eye', label: 'Outstanding Amount', value: '64.89 %' },
                    { icon: 'fa-inr', label: 'Principal received', value: '64.89 %' },
                    { icon: 'fa-pie-chart', label: 'Total Transaction Fee', value: '64.89 %' }
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="card p-4 bg-white shadow-md rounded">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <i className={`fa ${icon} text-green-500 text-2xl`}></i>
                          <div className="ml-4">
                            <h3>{value}</h3>
                            <span>{label}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
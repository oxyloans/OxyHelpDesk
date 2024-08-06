import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';

import  LenderWallet from './components/LendersWallet';
import LendersLoanApplications from  './components/LendersLoanApplications';
import WalletToWalletHistory from './components/WalletToWalletHistory';
import Lenderwallettranction from './components/Lenderwallettranction';
import CheckLenderDashboard from './components/CheckLenderDashboard';

import DashboardHeader from './components/Dashboard';
import UnResolvedQueries from './components/UnResolvedQueries';
import ResolvedQueries from './components/ResolvedQueries';
import CancelledQueries from './components/CancelledQueries';
import LenderDealStatistics from './components/LenderStatics';
import FromDeal from './components/FromDeal';
import FromWallet from './components/FromWallet';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<LoginForm />} />
     
        <Route path="/lenderwallet" element={< LenderWallet/>} />
        <Route path='/lenderloanapplications' element={<LendersLoanApplications/>}/>
        <Route path='/wallettoWallethistory' element={<WalletToWalletHistory/>}/>
        <Route path='/lenderwallettransaction' element={<Lenderwallettranction/>}/>
        <Route path='/dashboard' element={< DashboardHeader/>} />
        <Route path='/checklenderdashboard' element={<CheckLenderDashboard/>}/>
        <Route path='/unresolvedqueries' element={<UnResolvedQueries/>}/>
        <Route path='/resolvedqueries' element={<ResolvedQueries/>}/>
        <Route path='/cancelledqueries' element={<CancelledQueries/>}/>
        <Route path='/lenderstatistics' element={<LenderDealStatistics/>}/>
        <Route path='/fromdeal' element={<FromDeal/>}/>
        <Route path='/fromwallet' element={<FromWallet/>}/>
       <Route path='/dashboard' element={<Dashboard/>}/> 
      
      </Routes>
    </Router>
  );
};

export default App;

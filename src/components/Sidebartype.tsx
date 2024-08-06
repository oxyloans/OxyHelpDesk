
import React, { useState } from 'react';
import { FaHome, FaUser, FaWallet, FaGoogleWallet, FaHandsHelping, FaSignOutAlt, FaChevronRight, FaChevronDown, FaDotCircle, FaRegArrowAltCircleRight, FaHandPointRight } from 'react-icons/fa';
import { MdOutlineRestore, MdFreeCancellation } from 'react-icons/md';
import { IoMdStats } from 'react-icons/io';
import { RiDashboard3Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
// import { SlEnergy } from "react-icons/sl";

interface MenuItem {
  title: string;
  icon: JSX.Element;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: <RiDashboard3Fill className="text-md" />,
    path: '/dashboard',
  },
  {
    title: 'LENDERS',
    icon: <FaUser className="text-lg" />,
    children: [
      {
        title: 'Lender Loan Application',
        icon: <FaRegArrowAltCircleRight className="text-lg" />,
        path: '/lenderloanapplications',
      },
      {
        title: 'Lender Wallet Transactions',
        icon: <FaRegArrowAltCircleRight className="text-lg" />,
        path: '/lenderwallettransaction',
      },
      {
        title: 'Lender Deal Statics',
        icon: <FaDotCircle className="text-lg" />,
        path: '/lenderstatistics',
      }
    ],
  },
  {
    title: 'Lenders Wallet Amount',
    icon: <FaWallet className="text-lg" />,
    children: [
      {
        title: 'Check Lender Dashboard',
        icon: <FaDotCircle className="text-lg" />,
        path: '/checklenderdashboard',
      },
      {
        title: 'Lenders Wallet',
        icon: <FaDotCircle className="text-lg" />,
        path: '/lenderwallet',
      },
    ],
  },
  {
    title: 'Withdrawal Requests',
    icon: <FaGoogleWallet className="text-lg" />,
    children: [
      {
        title: 'From Deal',
        icon: <IoMdStats className="text-lg" />,
        path: '/fromdeal',
      },
      {
        title: 'From Wallet',
        icon: <MdOutlineRestore className="text-lg" />,
        path: '/fromwallet',
      },
      {
        title: 'Wallet To Wallet',
        icon: <FaWallet className="text-lg" />,
        path: '/wallettoWallethistory',
      },
    ],
  },
  {
    title: 'Help Desk',
    icon: <FaHandsHelping className="text-lg" />,
    children: [
      {
        title: 'Unresolved Queries',
        icon: <FaHandPointRight className="text-lg" />,
        path: '/unresolvedqueries',
      },
      {
        title: 'Resolved Queries',
        icon: <FaHandPointRight className="text-lg" />,
        path: '/resolvedqueries',
      },
      {
        title: 'Cancelled Queries',
        icon: <MdFreeCancellation className="text-lg" />,
        path: '/cancelledqueries',
      },
    ],
  },
  {
    title: 'Sign Out',
    icon: <FaSignOutAlt className="text-lg text-yellow" />,
    path: '/sign-out',
  },
];

const Sidebar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleMenu = (title: string) => {
    setOpenMenu((prevState) => (prevState === title ? null : title));
  };

  const handleNavigation = (path?: string) => {
    if (path) {
      if (path === '/sign-out') {
        const confirmSignOut = window.confirm("Are you sure you want to sign out?");
        if (confirmSignOut) {
          navigate('/');
        }
      } else {
        navigate(path);
      }
    }
  };

  const renderMenuItems = (items: MenuItem[], level: number = 0) => {
    return items.map((item, index) => (
      <div key={index} className={`pl-${level * 4}`}>
        <div
          className="flex items-center justify-between p-3 hover:bg-green-600 hover:text-white text-md text-white"
          onClick={() => {
            if (item.children) {
              toggleMenu(item.title);
            } else {
              handleNavigation(item.path);
            }
          }}
        >
          <div className="flex items-center">
            {item.icon}
            <span className="ml-2">{item.title}</span>
          </div>
          {item.children && (
            <div>
              {openMenu === item.title ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
            </div>
          )}
        </div>
        {item.children && openMenu === item.title && (
          <div className="pl-4">
            {renderMenuItems(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="w-64 h-screen bg-gray-800 p-5">
      <div className="text-white text-2xl flex items-center justify-center mb-11 bg-darkgreen-300">
        <h1>Test Admin</h1>
      </div>
      <div>
        {renderMenuItems(menuItems)}
      </div>
    </div>
  );
};

export default Sidebar;



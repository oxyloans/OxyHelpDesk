


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../Assets/img/logo.png';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>(''); // State for success message
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  // Email validation regex
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    if (password.trim().length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://fintech.oxyloans.com/oxyloans/v1/user/login?grantType=PWD',
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        const accessToken = response.headers['accesstoken']; // Adjust according to your API's header name
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          setSuccessMessage('Login successful! Redirecting...'); // Update success message state
          setTimeout(() => {
            navigate('/testadmindashboard');
          }, 1000); // Redirect after 1 second
        } else {
          setError('Login failed. Access token not found.');
        }
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // Handle specific HTTP error codes
        switch (err.response.status) {
          case 400:
            setError('Bad request. Please check your input.');
            break;
          case 401:
            setError('Unauthorized. Incorrect email or password.');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError('An unknown error occurred. Please try again.');
        }
      } else {
        setError('Network error. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Sticky top alert bar */}
      <div className="fixed top-0 left-0 right-0 bg-custom-blue shadow z-50">
        <div className="overflow-hidden whitespace-nowrap p-2 text-sm text-gray-600">
          <div className="inline-block animate-scroll-left">
            <a href="#" className="text-white  no-underline flex items-center">
              M/S SRS FINTECHLABS PVT. LTD (OxyLoans) is now registered as an <b>NBFC-P2P</b> with <b>RBI</b>. <b>Disclaimer</b>: The company is having a valid certificate of Registration dated Feb 06 2019 issued by the Reserve Bank of India under Section 45 IA of the Reserve Bank of India Act, 1934. However, the RBI does not accept any responsibility or guarantee about the present position as to the financial soundness of the company or for the correctness of any of the statements or representations made or opinions expressed by the company and for repayment of deposits/discharge of liabilities by the company.
            </a>
          </div>
        </div>
      </div>
<br></br>
      {/* Sticky header */}
      <header className="fixed top-10 left-0 right-0 bg-white border-1 border-black shadow z-30">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <a href="https://oxyloans.com/" className="flex items-center">
              <img src={Logo} alt="OxyLoans Logo" className="h-11 mx-auto" />
            </a>
          </div>
          <div className="flex items-center">
            <button 
              onClick={toggleNav} 
              className="text-blue-700 text-xs md:text-sm lg:text-base h-2 md:h-3 lg:h-8"
            >
              {isNavOpen ? 'X' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Side navigation */}
      <nav 
  id="mySidenav" 
  className={`fixed top-0 right-0 h-1/2 bg-white overflow-y-auto transition-all duration-300 z-50 ${isNavOpen ? 'w-64' : 'w-0'}`}
>
  <div className="relative p-4">
    <button 
      onClick={toggleNav} 
      className="absolute top-4 right-4 text-black hover:text-blue-500 text-lg"
    >
      &times; {/* Close icon */}
    </button>
    <a href="#" className="block py-2 text-black hover:text-blue-500">Personal Loans</a>
    <a href="#" className="block py-2 text-black hover:text-blue-500">Team</a>
    <a href="#" className="block py-2 text-black hover:text-blue-500">Lender</a>
    <a href="#" className="block py-2 text-black hover:text-blue-500">Borrower</a>
    <a href="#" className="block py-2 text-black hover:text-blue-500">Sign In</a>
    <a href="#" className="block py-2 text-black hover:text-blue-500">Join Today</a>
  </div>
</nav>

{/* Main content */}
  
<div className="min-h-screen flex items-center justify-center bg-gray-100 pt-24 pb-4">
  <div className="w-full max-w-md h-110 p-9 bg-white rounded shadow-lg">
    <h1 className="mb-6 text-2xl text-blue-800 text-center font-bold">Welcome to Oxyloans</h1>
    {successMessage && <p className="mb-4 text-green-500 text-center">{successMessage}</p>}
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-gray-700">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or Phone number"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2 text-gray-700">
          Password<span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      {error && <p className="mb-4 text-red-500 text-center">{error}</p>}
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-10 py-2 text-white bg-blue-400 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  </div>
</div>

      {/* Footer */}
      <footer className="bg-white text-black py-2 border-1 fixed bottom-0 w-full">
  <div className="container mx-auto flex justify-between items-center">
    <p className="text-sm">
      <span className="font-bold">Copyright © 2016</span> 
      <a href="https://oxyloans.com/" className="text-blue-600 hover:underline font-bold"> OxyLoans.com</a>. All rights reserved.
    </p>
    <p className="text-sm">
     <span className='font-bold'> Version</span> 2.4.0
    </p>
  </div>
</footer>

    </div>
  );
};

export default LoginForm;


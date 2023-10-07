import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LogoutAdmin = () => {
  const navigate = useNavigate(); // Get the history object to handle redirection
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    // Redirect to another component after 5 seconds
    setTimeout(() => {
      sessionStorage.removeItem('isAdminLoggedIn');
      clearInterval(intervalId); // Clear the countdown interval
      navigate('/adminLogin'); // Replace '/your-target-component' with the actual path you want to redirect to
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);
      return (
        <div className='admin-logout'>
          <center>
            <h1>Logout Successfully</h1>
            <p>Redirecting To Login Page in {countdown} seconds...</p>
          </center>
          
        </div>
      )
}

export default LogoutAdmin

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const Logout = () => {

  const navigate = useNavigate(); // Get the history object to handle redirection
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    // Redirect to another component after 5 seconds
    setTimeout(() => {
      sessionStorage.removeItem('isLoggedIn');
      localStorage.removeItem('member_mobile_no');
      localStorage.removeItem('user_login_data');


      clearInterval(intervalId); // Clear the countdown interval
      navigate('/login'); // Replace '/your-target-component' with the actual path you want to redirect to
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);
  return (
    <div>
      <center>
            <h1>Logout Successfully</h1>
            <p>Redirecting To Login Page in {countdown} seconds...</p>
          </center>
    </div>
  )
}

export default Logout

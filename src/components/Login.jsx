import React, { useState } from "react";
import "../css/login.css";
import axios from "axios";
const Login = () => {

  const [mobileNo, setmobileNo] = useState(null)
    const [password, setpassword] = useState(null)
    const [image, setImage] = useState({});
    const [error, setError] = useState(null);

    const setAuthToken = token => {
      if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      else
          delete axios.defaults.headers.common["Authorization"];
   }

    const submitForm = async () => {
      const login_details = {
        "userName": mobileNo,
        "password": password
    }
    //here we need to send the userName and password to the datbase for login
    try {
    await axios.post(`${"http://localhost:8080/authenticate"}`, login_details)
    .then(function (response) {
      console.log(response);
      if (response.status === 200) {
        
        // const tokenData = response.data
        sessionStorage.setItem('isLoggedIn', true);
        window.customerAllData = response.data;
        const login_response_data = response.data
        localStorage.setItem('user_login_data', JSON.stringify(login_response_data.member));
        localStorage.setItem('address', JSON.stringify(login_response_data.member.address));
        localStorage.setItem('transction', JSON.stringify(login_response_data.member.transction));

        //set JWT token to local
        localStorage.setItem("token", login_response_data.token);
          const file = login_response_data.member.data;
            localStorage.setItem('image', file);

        // console.log(sessionStorage.getItem('isLoggedIn'));
        // //redirect user to home page
        window.location.href = '/profile'
      }
    
    });
  }catch(error){
    if (error.response && error.response.status === 404) {
      setError('Invalid UserName and Password');
    }
  }
    }
    const isLoginFormValid = mobileNo === null && password === null;
  return (
    <section className="dev">
      <form className="lg">
        <div className="login">
          <input type="number" required placeholder="Enter Phone No" onChange={e => setmobileNo(e.target.value)}/>
          <br></br>
          <input type="password" required placeholder="Enter password" onChange={e => setpassword(e.target.value)}/>
          <br></br>
          <button disabled={isLoginFormValid} type='button' onClick={submitForm}>Login</button>
          <div class="remember-forgot" >
                       <span><a href="/register">register</a></span> 
                        <span><a href='/forgotPwd'>Forgot Password</a></span>
                    </div>
          {error ? (
        <p>{error}</p>
      ) : (
        <></>
      )}
        </div>
        </form>
    </section>
  );
};

export default Login;

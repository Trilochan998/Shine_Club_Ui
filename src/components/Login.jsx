import React, { useState } from "react";
import "../css/login.css";
import axios from "axios";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow } from "mdb-react-ui-kit";
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

  const [formErrors, setFormErrors] = useState({
    phoneNo: '',
    password: '',
  });

   const handleChange = (event) =>{
    let key = event.target.name
    if (key === "phoneNo") {
      setmobileNo(event.target.value)
    }else{
      setpassword(event.target.value)
    }
// ====================================================
    const { name, value } = event.target;
    // Perform validation
    validateField(name, value);

   }

   const validateField = (name, value) => {
    const errors = { ...formErrors };
    // Validation logic for each field
    switch (name) {
      case 'phoneNo':
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
          errors.phoneNo = 'Invalid Phone Number (10 digits)';
        } else {
          delete errors.phoneNo; // Clear the error if valid
        }
        break;
      case 'password':
        if (value.trim() === "") {
          errors.password = "Password Is Required";
        } else {
          delete errors.password; // Clear the error if valid
        }
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

    const submitForm = async () => {
      const login_details = {
        "userName": mobileNo,
        "password": password,
        "authorizeStatus":""
    }
    setError("Please Wait...")
    //here we need to send the userName and password to the datbase for login
    try {
    await axios.post(`${"http://localhost:8080/authenticate"}`, login_details)
    .then(function (response) {
      console.log(response);
      if (response.status === 200 && response.data === "Member Not Exist") {
        setError("Member Not Exist")
      } else if (response.status === 200) {
        // const tokenData = response.data
        sessionStorage.setItem('isLoggedIn', true);
        window.customerAllData = response.data;
        const login_response_data = response.data
        localStorage.setItem('member_mobile_no', JSON.stringify(login_response_data.member.mobileNo));
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
    const isLoginFormValid = mobileNo === null || password === null || mobileNo === "" || password === "" && (formErrors.phoneNo || formErrors.password);

  return (
    // <section className="dev">
    //   <form className="lg">
    //     <div className="login">
    //       <input type="number" name="phoneNo" required placeholder="Enter Phone No" onChange={e => handleChange(e)}/>
    //       {formErrors.phoneNo && <p className="error-message">{formErrors.phoneNo}</p>}
    //       <br></br>
    //       <input type="password" name="password" required placeholder="Enter password" onChange={e => handleChange(e)}/>
    //       {formErrors.password && <p className="error-message">{formErrors.password}</p>}
    //       <br></br>
    //       <button disabled={isLoginFormValid} type='button' className="btn btn-primary" onClick={submitForm}>Login</button>
    //       <div class="remember-forgot" >
    //                    <span><a href="/register">register</a></span> 
    //                     <span><a href='/forgotPwd'>Forgot Password</a></span>
    //                 </div>
    //       {error ? (
    //     <p>{error}</p>
    //   ) : (
    //     <></>
    //   )}
    //     </div>
    //     </form>
    // </section>
    <div>
    <MDBContainer className="my-5 member-login">

    {/* <MDBCard className="card"> */}
      <MDBRow className='g-0'>

        <MDBCol md='6'>
          <MDBCardImage src='https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80' alt="login form" className='rounded-start w-100 h-100'/>
        </MDBCol>

        <MDBCol md='6'>
          <MDBCardBody className='d-flex flex-column'>

            <div className='d-flex flex-row mt-2'>
              <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
              <span className="h1 fw-bold mb-0">Welcome To ShineClub</span>
            </div>

            <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

              <MDBInput wrapperClass='mb-4' name="phoneNo"  label='Mobile Number' id='formControlLg' type='number' size="lg" onChange={e => handleChange(e)}/>
              {formErrors.phoneNo && <p className="error-message">{formErrors.phoneNo}</p>}
              <MDBInput wrapperClass='mb-4' name="password" label='Password' id='formControlLg' type='password' size="lg" onChange={e => handleChange(e)}/>
              {formErrors.password && <p className="error-message">{formErrors.password}</p>}
            <MDBBtn disabled={isLoginFormValid} className="mb-4 px-5" color='dark' size='lg'  onClick={submitForm}>Login</MDBBtn>
           {/* <button disabled={isLoginFormValid} type='button' className="login-btn" onClick={submitForm}>Login</button> */}

            <a className="small text-muted" href="/forgotPwd">Forgot password?</a>
            <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="/register" style={{color: '#393f81'}}>Register here</a></p>

            <div className='d-flex flex-row justify-content-start'>
              <a href="#!" className="small text-muted me-1">Terms of use.</a>
              <a href="#!" className="small text-muted">Privacy policy</a>
            </div>

          </MDBCardBody>
        </MDBCol>

      </MDBRow>
    {/* </MDBCard> */}
    {error ? (
        <p style={{color:"white",marginLeft:"50%"}}>{error}</p>
      ) : (
        <></>
      )}
  </MDBContainer>
  </div>
  );
};

export default Login;

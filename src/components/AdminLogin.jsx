import React, { useState } from "react";
import "../css/adminLogin.css";
import axios from "axios";
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
const AdminLogin = () => {

  const [mobileNo, setmobileNo] = useState(null)
    const [password, setpassword] = useState(null)
    const [error, setError] = useState(null);


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
        "authorizeStatus":"admin"
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
        sessionStorage.setItem('isAdminLoggedIn', true);
        localStorage.setItem('admin', JSON.stringify(response.data))


        //redirect user to home page
        window.location.href = '/admin'
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
    // <section className="admin">
    //   <form className="admin_lg">
    //     <div className="admin_login">
    //       <input type="number" name="phoneNo" required placeholder="Enter Phone No" onChange={e => handleChange(e)}/>
    //       {formErrors.phoneNo && <p className="error-message">{formErrors.phoneNo}</p>}
    //       <br></br>
    //       <input type="password" name="password" required placeholder="Enter password" onChange={e => handleChange(e)}/>
    //       {formErrors.password && <p className="error-message">{formErrors.password}</p>}
    //       <br></br>
    //       <button disabled={isLoginFormValid} type='button' className="btn btn-primary" onClick={submitForm}>Login</button>
    //       {error ? (
    //     <p>{error}</p>
    //   ) : (
    //     <></>
    //   )}
    //     </div>
    //     </form>
    // </section>
<div className="adminLogin">
<MDBContainer className="my-5 gradient-form container">

<MDBRow>

  <MDBCol col='6' className="mb-5">
    <div className="d-flex flex-column ms-5">

      <div className="text-center">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
          style={{width: '185px'}} alt="logo" />
        <h4 className="mt-1 mb-5 pb-1">We are The ShineClub Team</h4>
      </div>

      <p>Please login to your account</p>


      <MDBInput wrapperClass='mb-4' name="phoneNo" label='Mobile Number' id='form1' type='number' onChange={e => handleChange(e)}/>
      {formErrors.phoneNo && <p className="error-message">{formErrors.phoneNo}</p>}
      <MDBInput wrapperClass='mb-4' name="password" label='Password' id='form2' type='password'onChange={e => handleChange(e)}/>
       {formErrors.password && <p className="error-message">{formErrors.password}</p>}



      <div className="text-center pt-1 mb-5 pb-1">
        <MDBBtn  disabled={isLoginFormValid} className="mb-4 w-100 gradient-custom-2" onClick={submitForm}>Sign in</MDBBtn>
        <button disabled={isLoginFormValid} type='button' className="btn btn-primary" onClick={submitForm}>Login</button>
      </div>

      <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
        <p className="mb-0">Don't have an account?</p>
        <MDBBtn outline className='mx-2' color='danger'>
          Create New
        </MDBBtn>
      </div>

    </div>

  </MDBCol>

  <MDBCol col='6' className="mb-5">
    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
        <h4 class="mb-4">We are more than just a company</h4>
        <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>

    </div>

  </MDBCol>

</MDBRow>
{error ? (
        <p>{error}</p>
      ) : (
        <></>
      )}
</MDBContainer>
</div>
  );
};

export default AdminLogin;

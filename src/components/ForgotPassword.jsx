import axios from 'axios';
import React, { useState } from 'react'

const ForgotPassword = () => {
    const [mobileNo, setmobileNo] = useState(null)
    const[msg,setMsg]=useState(null)

    const [formErrors, setFormErrors] = useState({
      phoneNo: '',
    });
    
    const submitForm = async () => {
        setMsg('Please wait...')
    await axios.get(`${"http://localhost:8080/forgotPassword?userName="+mobileNo}`)
    .then(function (response) {
        if (response.status === 200 && response.data === 'OTP sent successfully') {
          const member_mobile_no = response.data;
          localStorage.setItem('member_mobile_no', JSON.stringify(mobileNo));
  
            // const url = `/verifyOtp?phoneNo=${encodeURIComponent(mobileNo)}`
            const url = `/verifyOtp`

            window.location.href = url
        }
        else{
            setMsg('Invalid phone number')
        }
      }
    
    );
    }

    const handleChange = (event) =>{
     
        setmobileNo(event.target.value)
      const { name, value } = event.target;
      // Perform validation
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
          default:
        break;
    }
    setFormErrors(errors);
  };
     
  const isLoginFormValid = mobileNo === null || mobileNo === "" || formErrors.phoneNo;

  return (
    <section className="dev">
    <form className="lg">
    
      <div className="login">
        <input type="number" name='phoneNo' required placeholder="Enter Phone No" onChange={e => handleChange(e)}/>
        {formErrors.phoneNo && <p className="error-message">{formErrors.phoneNo}</p>}
        <br></br>
        <button type='button' className='btn btn-primary' onClick={submitForm} disabled={isLoginFormValid}>Send OTP</button>
    </div>
    {msg ? (
        <p>{msg}</p>
      ) : (
        <></>
      )}
      </form>
  </section>
  )
}

export default ForgotPassword

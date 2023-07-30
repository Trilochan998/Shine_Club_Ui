import axios from 'axios';
import React, { useState } from 'react'

const ForgotPassword = () => {
    const [mobileNo, setmobileNo] = useState(null)
    const[msg,setMsg]=useState(null)
    
    const submitForm = async () => {
        setMsg('Please wait...')
    await axios.get(`${"http://localhost:8080/forgotPassword?userName="+mobileNo}`)
    .then(function (response) {
        if (response.status === 200 && response.data === 'OTP sent successfully') {
            const url = `/verifyOtp?phoneNo=${encodeURIComponent(mobileNo)}`
            window.location.href = url
        }
        else{
            setMsg('Invalid phone number')
        }
      }
    
    );
    }
  return (
    <section className="dev">
    <form className="lg">
    
      <div className="login">
        <input type="number" required placeholder="Enter Phone No" onChange={e => setmobileNo(e.target.value)}/>
        <br></br>
        <button type='button' onClick={submitForm}>Send OTP</button>
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

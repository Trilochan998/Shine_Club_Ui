import axios from 'axios';
import React, { useState } from 'react'

function VerifyOtp() {
    const [OTP, setOTP] = useState(null)
    const [userName, setUserName] = useState(null)
    const[error,setError]=useState(null)

    const otpverify = async () => {
        const url = new URL(window.location.href);

    // Extract the desired parameter from the URL
    setUserName(url.searchParams.get('phoneNo'));
        const otp_details = {
            "userName": userName,
            "otp": OTP
        }
        
        try{
            setError('Please wait...')
            console.log(otp_details);
        await axios.post(`${"http://localhost:8080/verify-otp"}`,otp_details)
        .then(function (response) {
            if (response.status === 200) {
                console.log(userName);
               const changePasswordUrl = `/changePassword?phoneNo=${encodeURIComponent(userName)}`
                // window.location.href = changePasswordUrl
            }
        });}catch(error){
            if(error.response&&error.response.status===500)
            setError('Invallid otp')
        }
        }
  return (
    <section className="dev">
    <form className="lg">
      <div className="login">
        <input type="number" required placeholder="Enter OTP" onChange={e => setOTP(e.target.value)}/>
        <br></br>
        <button type='button' onClick={otpverify}>Verify OTP</button>
    </div>
    {error ? (
        <p>{error}</p>
      ) : (
        <></>
      )}
      </form>
  </section>
  )
}

export default VerifyOtp

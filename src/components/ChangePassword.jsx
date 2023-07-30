import axios from 'axios'
import React, { useState } from 'react'

const ChangePassword = () => {
    const [password, setpassword] = useState(null)
    const [conFirmPassword, setConfirmPassword] = useState(null)
    const [mobileNo, setMobileNo] = useState(null)
    const [msg, setMsg] = useState(null)



    const submitForm = async () => {
        const url = new URL(window.location.href);

    // Extract the desired parameter from the URL
    setMobileNo(url.searchParams.get('phoneNo'));

    const change_pwd_payload = {
        "mobileNo": "6371598816",
        "password": password,
        "confirmPassword": conFirmPassword
    }
         if(password===conFirmPassword){ 
            setMsg('Please wait...')
        await axios.post(`${"http://localhost:8080/changePassword"}`,change_pwd_payload)
        .then(function (response) {
          
            if (response.status === 200) {
                setMsg('password successfully changed')

            }
            window.location.href = '/login'
          }  
           );
        }else{
            setMsg('Password Missmatch')

        }
    }

  return (
    <section className="dev">
    <form className="lg">
   
      <div className="login">
        <input type="text" required placeholder="Enter New Password" onChange={e => setpassword(e.target.value)}/>
        <br></br>
        <input type="text" required placeholder="Enter Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/>
        <button type='button' onClick={submitForm}>Change Password</button>
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
export default ChangePassword

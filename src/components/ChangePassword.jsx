import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ChangePassword = () => {
    const [password, setpassword] = useState(null)
    const [conFirmPassword, setConfirmPassword] = useState(null)
    const [mobileNo, setMobileNo] = useState(null)
    const [msg, setMsg] = useState(null)

    const [formErrors, setFormErrors] = useState({
      password: '',
      conFirmPassword:''
    });


    const submitForm = async () => {

    const change_pwd_payload = {
        "mobileNo": mobileNo,
        "password": password,
        "confirmPassword": conFirmPassword
    }
         if(password===conFirmPassword){ 
            setMsg('Please wait...')
        await axios.post(`${"http://localhost:8080/changePassword"}`,change_pwd_payload)
        .then(function (response) {
          
            if (response.status === 200) {
                setMsg('password successfully changed')
                localStorage.removeItem('member_mobile_no');
            }
            window.location.href = '/login'
          }  
           );
        }else{
            setMsg('Password Missmatch')

        }
    }

    
   const handleChange = (event) =>{
    let key = event.target.name
    if (key === "password") {
      setpassword(event.target.value)
    }else{
      setConfirmPassword(event.target.value)
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
      case "password":
          if (value.trim() === "") {
            errors.password = "Password Is Required";
          } else {
            delete errors.password; // Clear the error if valid
          }
          break;

          case "conFirmPassword":
            if (value.trim() === "") {
              errors.conFirmPassword = "ConfirmPassword Is Required";
            } else {
              delete errors.conFirmPassword; // Clear the error if valid
            }
            break;
  
      default:
        break;
    }
    setFormErrors(errors);
  };

const isLoginFormValid = password === null || conFirmPassword === null || password === "" || conFirmPassword === "" && (formErrors.password || formErrors.confirmPassword);

useEffect(() => {
  const memberMobileNo = localStorage.getItem("member_mobile_no");
    const phone_no = JSON.parse(memberMobileNo);
    setMobileNo(phone_no)
}, []);

  return (
    <section className="dev">
    <form className="lg">
   
      <div className="login">
        <input type="text" name='password' required placeholder="Enter New Password" onChange={e => handleChange(e)}/>
        {formErrors.password && (
          <p className="error">{formErrors.password}</p>
        )}
        <br></br>
        <input type="text" name='conFirmPassword' required placeholder="Enter Confirm Password" onChange={e => handleChange(e)}/>
        {formErrors.conFirmPassword && (
          <p className="error">{formErrors.conFirmPassword}</p>
        )}
        <button type='button'className='btn btn-primary' onClick={submitForm} disabled={isLoginFormValid}>Change Password</button>
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

import axios from "axios";
import React, { useState } from "react";

const SecretKey = () => {
    const [error, setError] = useState(null);
    const [secretekey, setSecretKey] = useState("");

    const handleInputChange = (event) => {
        setSecretKey(event.target.value );
    };

    const submitForm = async () => {

      //here we need to send the userName and password to the datbase for login
      try {
      await axios.get("http://localhost:8080/admin/loadAdmin?secretKey="+secretekey)
      .then(function (response) {
        // console.log(response);
        if (response.status === 200 && response.data != "invalid key") {
          // const tokenData = response.data
          sessionStorage.setItem('isAdminLoggedIn', true);
        localStorage.setItem('admin', JSON.stringify(response.data))
         

          // //redirect user to home page
          window.location.href = '/admin'
        }
        else{
          alert("invalid secret key")
        }
    
      
      });
    }catch(error){
      if (error.response && error.response.status === 404) {
        setError('Invalid Secret Key');
      }
    }
}
  return (
    <>
      <section className="bd">
          <input type="text" placeholder="Enter a secret key" onChange={handleInputChange}></input>
          <button onClick={submitForm}>Submit</button>
        </section>
    </>
  );
};

export default SecretKey;

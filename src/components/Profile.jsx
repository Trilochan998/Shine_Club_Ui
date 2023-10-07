import React, { useEffect, useState } from "react";
import "../css/profile.css";
import EditProfileSection from "./EditProfileSection";
import ChangePassword from "./ChangePassword";
import Transaction from "./Transaction";
import Notification from "./Notification";
import Logout from "./Logout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Profile = () => {
  const [objectData, setObjectData] = useState({});
  const [addressObject, setAddressObject] = useState({});
  const [image, setImage] = useState({});
   const[isEditAccount,setIsEditAccount]=useState(true)
   const[isChangePassword,setIschangePassword]=useState(false)
   const[isTransaction,setIsTransaction]=useState(false)
   const[isNotification,setIsNotification]=useState(false)
   const[isLogout,setIsLogout]=useState(false)

   const [imagePreview, setImagePreview] = useState(null);
   const [isButtonEnabled, setButtonEnabled] = useState(false);

   const navigate = useNavigate();
   


  useEffect(() => {
    // Retrieving the object from localStorage when the component mounts
    const storedObjectData = localStorage.getItem("user_login_data");
    const addressData = localStorage.getItem("address");
    if (storedObjectData) {
      const parsedObjectData = JSON.parse(storedObjectData);
      setObjectData(parsedObjectData);
      const parsedAddressObject = JSON.parse(addressData);
      setAddressObject(parsedAddressObject);
      setImage(localStorage.getItem("image"));
    }
  }, []);

  const scrollItem=()=>{
    const targetElement = document.getElementById('inner-content');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const editAccount = () => {
    setIsEditAccount(true)
    setIschangePassword(false)
    setIsTransaction(false)
    setIsNotification(false)
    setIsLogout(false)
    scrollItem();
  }
  const transaction = () => {
    setIsEditAccount(false)
    setIschangePassword(false)
    setIsTransaction(true)
    setIsNotification(false)
    setIsLogout(false)
    scrollItem();

  }
  const changePassword = () => {
    setIsEditAccount(false)
    setIschangePassword(true)
    setIsTransaction(false)
    setIsNotification(false)
    setIsLogout(false)
    scrollItem();

  }
  const notification = () => {
    setIsEditAccount(false)
    setIschangePassword(false)
    setIsTransaction(false)
    setIsNotification(true)
    setIsLogout(false)
    scrollItem();

  }
  const logout = () => {
    setIsEditAccount(false)
    setIschangePassword(false)
    setIsTransaction(false)
    setIsNotification(false)
    setIsLogout(true)
    scrollItem();

  }
  const handleImageChange = (e) => {
    console.log("handleImageChange");
    const file = e.target.files[0];
    setImagePreview(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.replace("data:image/jpeg;base64,",""));
        setButtonEnabled(true);
        // console.log(reader.result);
        // console.log(objectData.memberId);
        // console.log(reader.result.replace("data:image/jpeg;base64,",""));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditButtonClick = () => {
    console.log("handleEditButtonClick");
    // This function will open the file input dialog
    document.getElementById("updateFileImage").click();
  
  };

  const updateImage =async (img,id) => {
    // console.log(imagePreview);
    // console.log(img);
    const payload = new FormData();
    payload.append('file',imagePreview);
    payload.append('memberId', id);
    console.log(payload);
    axios.put("http://localhost:8080/updateImage", payload)
    .then(response => {
      // console.log(response);
      if (response.status === 200) {
        const file =response.data;
        // console.log(file.data);
        localStorage.setItem('image', file.data);
              window.location.href = "/profile";
            }
    })
    .catch(error => {
      // Handle error
    });

  }
  


  return (
    <>
      {sessionStorage.getItem("isLoggedIn") ? (
        // <section className="bd">
          <article className="portion">
            <div className="left-portion" id="leftportion">
              <div className="profile-section">
                <img
                  src={`data:image/jpeg;base64,${image}`}
                  alt="profile-pic"
                  onClick={handleEditButtonClick}
                ></img>
                <button
                  className="btn btn-warning edit-image-btn"
                  onClick={() => updateImage(image, objectData.memberId)}
                  disabled={!isButtonEnabled}
                >
                  Update Photo
                </button>
                <input
            id="updateFileImage"
            type="file"
            // accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
              </div>
              <div id="myAccount">
                <ul>
                  <a>
                  <i class="fa-solid fa-user"></i>
                    <li onClick={editAccount} href='profile'>Account Details</li>
                  </a>

                  <a id="pwd">
                    <i class="fa-solid fa-key"></i>
                    <li onClick={changePassword}>Change Password</li>
                  </a>

                  <a>
                    <i class="fa-sharp fa-solid fa-building-columns"></i>
                    <li onClick={transaction} >Transaction</li>
                  </a>
                  <a >
                    <i class="fa-solid fa-bell"></i>
                    <li onClick={notification}>Notificaton</li>
                  </a>
                  <a >
                  <i class="fa-sharp fa-solid fa-right-from-bracket"></i>
                    <li onClick={logout}>Logout</li>
                  </a>
                </ul>
              </div>
            </div>
            <div className="right-portion" id="inner-content">
              {/* <div class="inner-portion"> */}
                {
                  isEditAccount ? <EditProfileSection memberData={objectData} memberAddress ={addressObject}/> : isChangePassword ? <ChangePassword /> : isTransaction ? <Transaction /> : isLogout ? <Logout/> : <Notification/>
                }
              
              {/* </div> */}
            </div>
          </article>
        // </section>
      ) : (
        // (window.location.href = "/login")
        setTimeout(() => {
          navigate("/login");
        }, 0)

       
      )}
    </>
  );
};

export default Profile;
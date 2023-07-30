import React, { useEffect, useState } from "react";
import "../css/profile.css";
import EditProfileSection from "./EditProfileSection";
import ChangePassword from "./ChangePassword";
import Transaction from "./Transaction";
import Notification from "./Notification";
import Logout from "./Logout";

const Profile = () => {
  const [objectData, setObjectData] = useState({});
  const [addressObject, setAddressObject] = useState({});
  const [image, setImage] = useState({});
   const[isEditAccount,setIsEditAccount]=useState(true)
   const[isChangePassword,setIschangePassword]=useState(false)
   const[isTransaction,setIsTransaction]=useState(false)
   const[isNotification,setIsNotification]=useState(false)
   const[isLogout,setIsLogout]=useState(false)


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

  const editAccount = () => {
    setIsEditAccount(true)
    setIschangePassword(false)
    setIsTransaction(false)
    setIsNotification(false)
    setIsLogout(false)
  }
  const transaction = () => {
    setIsEditAccount(false)
    setIschangePassword(false)
    setIsTransaction(true)
    setIsNotification(false)
    setIsLogout(false)

  }
  const changePassword = () => {
    setIsEditAccount(false)
    setIschangePassword(true)
    setIsTransaction(false)
    setIsNotification(false)
    setIsLogout(false)

  }
  const notification = () => {
    setIsEditAccount(false)
    setIschangePassword(false)
    setIsTransaction(false)
    setIsNotification(true)
    setIsLogout(false)

  }
  const logout = () => {
    setIsEditAccount(false)
    setIschangePassword(false)
    setIsTransaction(false)
    setIsNotification(false)
    setIsLogout(true)

  }
  return (
    <>
      {sessionStorage.getItem("isLoggedIn") ? (
        // <section className="bd">
          <article className="portion">
            <div className="left-portion">
              <div className="profile-section">
                <img
                  src={`data:image/jpg;base64,${image}`}
                  alt="profile-pic"
                ></img>
                <button
                  className="edit-profile"
                >
                  edit
                </button>
              </div>
              <div id="myAccount">
                <ul>
                  <a>
                    <i class="fa-solid fa-house"></i>
                    <li onClick={editAccount}>Account Details</li>
                  </a>

                  <a id="pwd">
                    <i class="fa-solid fa-key"></i>
                    <li onClick={changePassword}>Change Password</li>
                  </a>

                  <a>
                    <i class="fa-sharp fa-solid fa-building-columns"></i>
                    <li onClick={transaction}>Transaction</li>
                  </a>
                  <a >
                    <i class="fa-solid fa-bell"></i>
                    <li onClick={notification}>Notificaton</li>
                  </a>
                  <a >
                    <i class="fa-solid fa-bell"></i>
                    <li onClick={logout}>Logout</li>
                  </a>
                </ul>
              </div>
            </div>
            <div className="right-portion">
              <div class="inner-portion">
                {
                  isEditAccount ? <EditProfileSection memberData={objectData} memberAddress ={addressObject}/> : isChangePassword ? <ChangePassword /> : isTransaction ? <Transaction /> : isLogout ? <Logout/> : <Notification/>
                }
              
              </div>
            </div>
          </article>
        // </section>
      ) : (
        (window.location.href = "/login")
      )}
    </>
  );
};

export default Profile;
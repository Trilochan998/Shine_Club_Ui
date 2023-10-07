import React, { useEffect, useState } from 'react'
import EditProfileSection from './EditProfileSection';
import ChangePassword from './ChangePassword';
import Transaction from './Transaction';
import Logout from './Logout';
import Notification from './Notification';
import MemberList from './MemberList';
import SchedulingMeeting from './SchedulingMeeting';
import axios from 'axios';
import LogoutAdmin from './LogoutAdmin';

const AdminPannel = () => {

    const [objectData, setObjectData] = useState({});
  const [addressObject, setAddressObject] = useState({});
  const [image, setImage] = useState({});
   const[isMemberList,setIsMemberList]=useState(true)
   const[isChangePassword,setIschangePassword]=useState(false)
   const[isSchedulingMeeting,setIsSchedulingMeeting]=useState(false)
   const[isNotification,setIsNotification]=useState(false)
   const[isLogout,setIsLogout]=useState(false)
   const[meetingList,setMeetingList]=useState([])


   const scrollItem=()=>{
    const targetElement = document.getElementById('inner-content');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

    const memberList = () => {
        setIsMemberList(true)
        setIschangePassword(false)
        setIsSchedulingMeeting(false)
        setIsNotification(false)
        setIsLogout(false)
        scrollItem();
      }
      const schedduleMeeting =async () => {
        setIsMemberList(false)
        setIschangePassword(false)
        setIsSchedulingMeeting(true)
        setIsNotification(false)
        setIsLogout(false)
        scrollItem();
        try {
          await axios.get("http://localhost:8080/admin/listOfMeeting?")
          .then(function (response) {
            // console.log(response);
            if (response.status === 200) {
              setMeetingList(response.data)
              console.log(response.data);
              // window.location.href = '/admin'
            }
          
          });
        }catch(error){
          
        }

      }
      const changePassword = () => {
        setIsMemberList(false)
        setIschangePassword(true)
        setIsSchedulingMeeting(false)
        setIsNotification(false)
        setIsLogout(false)
        scrollItem();
    
      }
      const notification = () => {
        setIsMemberList(false)
        setIschangePassword(false)
        setIsSchedulingMeeting(false)
        setIsNotification(true)
        setIsLogout(false)
        scrollItem();
    
      }
      const logout = () => {
        setIsMemberList(false)
        setIschangePassword(false)
        setIsSchedulingMeeting(false)
        setIsNotification(false)
        setIsLogout(true)
        scrollItem();
    
      }
      
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
  return (
    <>
    {sessionStorage.getItem("isAdminLoggedIn") ? (
       <article className="portion">
       <div className="admin-left-portion">
         <div id="myAccount">
           <ul>
             <a>
             <i class="fa-sharp fa-solid fa-users"></i>
               <li onClick={memberList}>Members List</li>
             </a>

             <a id="pwd">
               <i class="fa-solid fa-key"></i>
               <li onClick={changePassword}>Change Password</li>
             </a>

             <a>
             <i class="fa-regular fa-calendar-days"></i>
               <li onClick={schedduleMeeting} >Schedule Meeting</li>
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
             isMemberList ? <MemberList /> : isChangePassword ? <ChangePassword /> : isSchedulingMeeting ? <SchedulingMeeting  listOfmeeting={meetingList}/> : isLogout ? <LogoutAdmin/> : <Notification />
           }
         
         {/* </div> */}
       </div>
     </article>
      ) : (
        (window.location.href = "/adminLogin")
      )}
    </>
  )
}

export default AdminPannel

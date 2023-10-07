import axios from 'axios';
import React, { useState } from 'react'

const RegisterStudent = () => {
    const [gender, setGender] = useState(null);
  
    const [formData, setFormData] = useState({
    studentFirstName: '',
    studentLastName: '',
    mobileNo: '',
    gender: '',
    village: '',
    class:'',
    school:'',
    event:''
    });
  
    // const handleChange = event => {
    //     setIsSubscribed(current => !current);
    //   };
  
    const handleSelectChange = (event) => {
      setGender(event.target.value);
    }; 
  
   
  
    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const saveStudentDetails = async () => {
      //  e.prevenetDefault();
      console.log("Member data adding started....");
        const memberInfo = {'name': formData.studentFirstName+formData.studentLastName,
        'phoneNumber': formData.mobileNo,
        'classes': formData.class,
        'gender': formData.gender,
        'school': formData.school,
        'village': formData.village,
        'event': formData.event
    }
    
        const postData = new FormData();
      postData.append('name', JSON.stringify(memberInfo));
      axios.post("http://localhost:8080/saveMemberDetails", postData)
        .then(response => {
          // Handle successful response
          console.log(response);
          if (response.status === 200) {
                  //redirect user to home page
                  window.location.href = "/";
                }
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
  
      
    }
  
    return (
      <div className="wrapper">
        <div class="inner">
          <form>
            <h3>Student Registration Form</h3>
            <div class="form-group">
              <div class="form-wrapper">
                <label for="">First Name</label>
                <input
                  type="text"
                  name="studentFirstName"
                  class="form-control1"
                  value={formData.studentFirstName}
                  onChange={handleInputChange}
               
                  // onChange={(e) => setMemberFirstName(e.target.value)}
                />
              </div>
              <div class="form-wrapper">
                <label for="">Last Name</label>
                <input
                  type="text"
                  class="form-control1"
                  name="studentLastName"
                  value={formData.studentLastName}
                  onChange={handleInputChange}
                  // onChange={(e) => setMemberLastName(e.target.value)}
                />
              </div>
            </div>
            <div class="form-wrapper">
              <label for="">Class</label>
              <input
                type="text"
                class="form-control1"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="form-wrapper">
              <label for="">School Name</label>
              <input
                type="text"
                class="form-control1"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                // onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
            <div class="form-group">
              <div class="form-wrapper">
                <label for="">Village </label>
                <input
                  type="text"
                  class="form-control1"
                  name="village"
                  value={formData.village}
                  onChange={handleInputChange}
                  // onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div class="form-wrapper">
                <label for="">phoneNo </label>
                <input
                  type="number"
                  class="form-control1"
                  name="pin"
                  value={formData.pin}
                  onChange={handleInputChange}
                  // onChange={(e) => setPin(e.target.value)}
                />
              </div>
            </div>
            <div class="form-wrapper">
              <label for="">Event </label>
              <input
                type="text"
                class="form-control1"
                name="event"
                value={formData.village}
                onChange={handleInputChange}
                // onChange={(e) => setVillage(e.target.value)}
              />
            </div>
            <div class="form-wrapper">
              <label for="">Gender </label><br/>
              <select id="mySelect" onChange={handleSelectChange}>
              <option value="" >
                  Select
                </option>
                <option value="male">
                  Male
                </option>
                <option
                  value="female"
                >
                  Female
                </option>
              </select>
            </div>
           
           
            
            <button type="button" className="register_btn" onClick={saveStudentDetails}>Register Now</button>
          </form>
        </div>
      </div>
    );
  };

export default RegisterStudent

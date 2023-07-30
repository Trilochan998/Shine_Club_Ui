import React, { useState } from "react";
import "../css/register.css";
import axios from "axios";

const RegisterMember = () => {
  const [gender, setGender] = useState(null);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
  memberFirstName: '',
  memberLastName: '',
  mobileNo: '',
  email: '',
  gender: '',
  dob: '',
  village: '',
  city: '',
  district: '',
  pin: '',
  dateOfTransction: '',
  tranctionDetails: '',
  imagePath: '',
  password: '',
  image: null
  });

  // const handleChange = event => {
  //     setIsSubscribed(current => !current);
  //   };

  const handleSelectChange = (event) => {
    setGender(event.target.value);
  }; 

  const fileHandle = (event) => {
    const file = event.target.files[0];
    setImage(file);
    console.log(file);
  };

  const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const saveuserDetails = async () => {
    //  e.prevenetDefault();
    console.log("Member data adding started....");
    if (formData.password ===formData.confirmPassword) {
      const memberInfo = {'memberName': formData.memberFirstName+formData.memberLastName,
      'mobileNo': formData.mobileNo,
      'email': formData.email,
      'gender': formData.gender,
      'dob': formData.dob,
      'village': formData.village,
      'city': formData.city,
      'district': formData.district,
      'pin': formData.pin,
      'dateOfTransction': formData.dateOfTransction,
      'tranctionDetails': formData.tranctionDetails,
      'password': formData.password
  }
  
      const postData = new FormData();
    postData.append('memberName', JSON.stringify(memberInfo));
    postData.append('file', image);
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
  }

  return (
    <div className="wrapper">
      <div class="inner">
        <form>
          <h3>Registration Form</h3>
          <div class="form-group">
            <div class="form-wrapper">
              <label for="">First Name</label>
              <input
                type="text"
                name="memberFirstName"
                class="form-control1"
                value={formData.memberFirstName}
                onChange={handleInputChange}
             
                // onChange={(e) => setMemberFirstName(e.target.value)}
              />
            </div>
            <div class="form-wrapper">
              <label for="">Last Name</label>
              <input
                type="text"
                class="form-control1"
                name="memberLastName"
                value={formData.memberLastName}
                onChange={handleInputChange}
                // onChange={(e) => setMemberLastName(e.target.value)}
              />
            </div>
          </div>
          <div class="form-wrapper">
            <label for="">Email</label>
            <input
              type="email"
              class="form-control1"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="form-wrapper">
            <label for="">Phone No</label>
            <input
              type="number"
              class="form-control1"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              // onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>
          <div class="form-group">
            <div class="form-wrapper">
              <label for="">DOB </label>
              <input
                type="date"
                class="form-control1"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                // onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div class="form-wrapper">
              <label for="">PIN </label>
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
          <div class="form-group">
          <div class="form-wrapper">
            <label for="">Village </label>
            <input
              type="text"
              class="form-control1"
              name="village"
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
         
          </div>
          <div class="form-wrapper">
            <label for="">City </label>
            <input
              type="text"
              class="form-control1"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              // onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div class="form-wrapper">
            <label for="">District </label>
            <input
              type="text"
              class="form-control1"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              // onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <div class="form-group">
            <div class="form-wrapper">
              <label for="">Password </label>
              <input
                type="password"
                name="password"
                class="form-control1"
                value={formData.password}
                onChange={handleInputChange}
                // onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="form-wrapper">
              <label for="">ConfirmPassword </label>
              <input
                type="password"
                class="form-control1"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                // onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="img">
            <label for="">image </label>
            <input
              type="file"
              name="image"
              onChange={fileHandle}
              // onChange={(e) => setImage(e.target.value)}
            />
          </div>
          
          <button type="button" className="register_btn" onClick={saveuserDetails}>Register Now</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterMember;

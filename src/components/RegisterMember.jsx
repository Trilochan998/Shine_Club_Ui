import React, { useEffect, useState } from "react";
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
  dob: '',
  village: '',
  city: '',
  district: '',
  pin: '',
  dateOfTransction: '',
  tranctionDetails: '',
  imagePath: '',
  password: '',
  image: null,
  errors: {},
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const checkFormValidity = () => {
    const errorsExist = Object.values(formData.errors).some((error) => !!error);

    // Check if all required fields are filled and there are no errors
    setIsFormValid(
      !errorsExist &&
        Object.keys(formData).every((key) =>
          ["memberFirstName", "memberLastName", "email", "mobileNo", "dob", "village", "city", "district", "pin", "password"].includes(key)
            ? !!formData[key]
            : true
        )
    );
  };

  // const handleChange = event => {
  //     setIsSubscribed(current => !current);
  //   };

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setGender(event.target.value);
  }; 

  const fileHandle = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(file);
    console.log(file);
  };

  const handleInputChange = (event) => {
    console.log(event.target.name);
    const { name, value } = event.target;
   
    let errors = { ...formData.errors };

    switch (name) {
      case "memberFirstName":
        // Check if the first name is not empty
        if (value.trim().length < 4) {
          errors.memberFirstName = "First Name must have at least 4 characters";
        } else if (/\d/.test(value)) {
          errors.memberFirstName = "First Name cannot contain digits";
        } else {
          delete errors.memberFirstName; // Clear the error if valid
        }
        break;

      case "memberLastName":
        // Check if the last name is not empty
        if (value.trim().length < 3) {
          errors.memberLastName = "Last Name must have at least 3 characters";
        } else if (/\d/.test(value)) {
          errors.memberLastName = "Last Name cannot contain digits";
        } else {
          delete errors.memberLastName; // Clear the error if valid
        }
        break;

      case "email":
        // Check if the email is in a valid format
        const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          errors.email = "Invalid Email Address";
        } else {
          delete errors.email; // Clear the error if valid
        }
        break;

      case "mobileNo":
        // Check if the phone number is a valid number
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
          errors.mobileNo = "Invalid Phone Number (10 digits)";
        } else {
          delete errors.mobileNo; // Clear the error if valid
        }
        break;

        case "village":
        // Check if the phone number is a valid number
        if (value.trim() === "") {
          errors.village = "Village Name Is Required";
        } else if (/\d/.test(value)) {
          errors.village = "Village Name cannot contain digits";
        } else {
          delete errors.village; // Clear the error if valid
        }
        break;

        case "dob":
      // Check if the DOB field is empty
      if (value.trim() === "") {
        errors.dob = "Date Of Birth Is Required";
      } else {
        delete errors.dob; // Clear the error if valid
      }
      break;

        case "city":
        // Check if the phone number is a valid number
        if (value.trim() === "") {
          errors.city = "City Name Is Required";
        } else if (/\d/.test(value)) {
          errors.city = "City Name cannot contain digits";
        } else {
          delete errors.city; // Clear the error if valid
        }
        break;

        case "district":
          // Check if the phone number is a valid number
          if (value.trim() === "") {
            errors.district = "District Name Is Required";
          }else if (/\d/.test(value)) {
            errors.district = "District Name cannot contain digits";
          } else {
            delete errors.district; // Clear the error if valid
          }
          break;

        case "pin":
        // Check if the phone number is a valid number
        const pinRegex = /^\d{6}$/;
        if (!pinRegex.test(value)) {
          errors.pin = "Invalid Pin Number (6 digits)";
        } else {
          delete errors.pin; // Clear the error if valid
        }
        break;

        case "password":
          // Check if the phone number is a valid number
          if (value.trim() === "") {
            errors.password = "Password Is Required";
          } else {
            delete errors.password; // Clear the error if valid
          }
          break;

          case "confirmPassword":
            // Check if the phone number is a valid number
            if (value.trim() === "") {
              errors.confirmPassword = "ConfirmPassword Is Required";
            } else {
              delete errors.confirmPassword; // Clear the error if valid
            }
            break;
  


      default:
        break;
  }

  setFormData({
    ...formData,
    [name]: value,
    errors,
  });
  };

  const clearmemberDetails = () => {
    document.getElementById("memberFirstName").value="";
    document.getElementById("memberLastName").value="";
    document.getElementById("email").value="";
    document.getElementById("mobileNo").value="";
    document.getElementById("dob").value="";
    document.getElementById("pin").value="";
    document.getElementById("village").value="";
    document.getElementById("city").value="";
    document.getElementById("district").value="";
    document.getElementById("password").value="";
    document.getElementById("confirmPassword").value="";
    document.getElementById("mySelect").value="";


    // var dropDown = document.getElementById("area");
    //   dropDown.selectedIndex = 0;
    
  }

  const saveuserDetails = async () => {
    //  e.prevenetDefault();
    console.log("Member data adding started....");
    if (formData.password ===formData.confirmPassword) {
      const memberInfo = {'memberName': formData.memberFirstName+formData.memberLastName,
      'mobileNo': formData.mobileNo,
      'email': formData.email,
      'gender': gender,
      'dob': formData.dob,
      'village': formData.village,
      'city': formData.city,
      'district': formData.district,
      'pin': formData.pin,
      'dateOfTransction': formData.dateOfTransction,
      'tranctionDetails': formData.tranctionDetails,
      'password': formData.password
  }
  console.log(memberInfo);
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

  useEffect(() => {
    checkFormValidity();
  }, [formData]);

  return (
    <div className="wrapper">
      <div class="inner">
        <form>
          <h3>Member Registration Form</h3>
          <div class="form-group">
            <div class="form-wrapper">
              <label for="">First Name</label>
              <input
                type="text"
                name="memberFirstName"
                id="memberFirstName"
                class="form-control1"
                value={formData.memberFirstName}
                onChange={handleInputChange}
             
              />
              {formData.errors.memberFirstName && (
          <p className="error">{formData.errors.memberFirstName}</p>
        )}
            </div>
            <div class="form-wrapper">
              <label for="">Last Name</label>
              <input
                type="text"
                class="form-control1"
                name="memberLastName"
                id="memberLastName"
                value={formData.memberLastName}
                onChange={handleInputChange}
                // onChange={(e) => setMemberLastName(e.target.value)}
              />
               {formData.errors.memberLastName && (
          <p className="error">{formData.errors.memberLastName}</p>
        )}
            </div>
          </div>
          <div class="form-wrapper">
            <label for="">Email</label>
            <input
              type="email"
              class="form-control1"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              // onChange={(e) => setEmail(e.target.value)}
            />
             {formData.errors.email && (
          <p className="error">{formData.errors.email}</p>
        )}
          </div>
          <div class="form-wrapper">
            <label for="">Phone No</label>
            <input
              type="number"
              class="form-control1"
              name="mobileNo"
              id="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              // onChange={(e) => setMobileNo(e.target.value)}
            />
              {formData.errors.mobileNo && (
          <p className="error">{formData.errors.mobileNo}</p>
        )}
          </div>
          <div class="form-group">
            <div class="form-wrapper">
              <label for="">DOB </label>
              <input
                type="date"
                class="form-control1"
                name="dob"
                id="dob"
                value={formData.dob}
                onChange={handleInputChange}
                // onChange={(e) => setDob(e.target.value)}
              />
               {formData.errors.dob && (
          <p className="error">{formData.errors.dob}</p>
        )}
            </div>
            <div class="form-wrapper">
              <label for="">PIN </label>
              <input
                type="number"
                class="form-control1"
                name="pin"
                id="pin"
                value={formData.pin}
                onChange={handleInputChange}
                // onChange={(e) => setPin(e.target.value)}
              />
               {formData.errors.pin && (
          <p className="error">{formData.errors.pin}</p>
        )}
            </div>
          </div>
          <div class="form-group">
          <div class="form-wrapper">
            <label for="">Village </label>
            <input
              type="text"
              class="form-control1"
              name="village"
              id="village"
              value={formData.village}
              onChange={handleInputChange}
              // onChange={(e) => setVillage(e.target.value)}
            />
             {formData.errors.village && (
          <p className="error">{formData.errors.village}</p>
        )}
          </div>
          <div class="form-wrapper">
            <label for="">Gender </label><br/>
            <select id="mySelect" onClick={handleSelectChange}>
            <option value="">
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
              id="city"
              value={formData.city}
              onChange={handleInputChange}
              // onChange={(e) => setCity(e.target.value)}
            />
                {formData.errors.city && (
          <p className="error">{formData.errors.city}</p>
        )}
          </div>
          <div class="form-wrapper">
            <label for="">District </label>
            <input
              type="text"
              class="form-control1"
              name="district"
              id="district"
              value={formData.district}
              onChange={handleInputChange}
              // onChange={(e) => setDistrict(e.target.value)}
            />
                   {formData.errors.district && (
          <p className="error">{formData.errors.district}</p>
        )}
          </div>
          <div class="form-group">
            <div class="form-wrapper">
              <label for="">Password </label>
              <input
                type="password"
                name="password"
                id="password"
                class="form-control1"
                value={formData.password}
                onChange={handleInputChange}
                // onChange={(e) => setPassword(e.target.value)}
              />
                    {formData.errors.password && (
          <p className="error">{formData.errors.password}</p>
        )}
            </div>
            <div class="form-wrapper">
              <label for="">ConfirmPassword </label>
              <input
                type="password"
                class="form-control1"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                // onChange={(e) => setConfirmPassword(e.target.value)}
              />
                    {formData.errors.confirmPassword && (
          <p className="error">{formData.errors.confirmPassword}</p>
        )}
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
          
          <button type="button" className="btn btn-success register_btn" onClick={saveuserDetails} disabled={!isFormValid}>Register</button>
          <button type="button" className="btn btn-success register_btn" value="Reset" onClick={clearmemberDetails}>Clear</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterMember;

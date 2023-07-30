/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'

const EditProfileSection = (props) => {
  const [memberName,setmeMeberName]=useState("")
  const [email,setEmail]=useState("")
  const [mobileNo,setMobileNo]=useState("")
  const [village,setVillage]=useState("")
  const [city,setCity]=useState("")
  const [district,setDistrict]=useState("")
  const [pin,setPin]=useState("")
  const [dob,setDob]=useState("")
  const [gender,setGender]=useState("")
  const [isDisabled,setIsDisabled]=useState(true)

  useEffect(() => {
    // Retrieving the object from localStorage when the component mounts
    const storedObjectData = localStorage.getItem("user_login_data");
    const addressData = localStorage.getItem("address");
    if (storedObjectData) {
      const parsedObjectData = JSON.parse(storedObjectData);
      const parsedAddressObject = JSON.parse(addressData);
      
      setmeMeberName(parsedObjectData.memberName);
      setEmail(parsedObjectData.email)
      setMobileNo(parsedObjectData.mobileNo)
      setVillage(parsedAddressObject.village)
      setCity(parsedAddressObject.city)
      setDistrict(parsedAddressObject.district)
      setPin(parsedAddressObject.pin)
      setDob(parsedObjectData.dob)
      setGender(parsedObjectData.gender)

    }
  }, []);
    // console.log(props.memberData.address);
    // console.log(props.memberAddress);
    let memberData=(e)=>{
      setmeMeberName(e.target.value)
   }
   let emialData=(e)=>{
    setEmail(e.target.value)
 }
 let mobileData=(e)=>{
  setMobileNo(e.target.value)
}
let villageData=(e)=>{
  setVillage(e.target.value)
}
let cityData=(e)=>{
  setCity(e.target.value)
}
let districtData=(e)=>{
  setDistrict(e.target.value)
}
let pinData=(e)=>{
  setPin(e.target.value)
}
let dobData=(e)=>{
  setDob(e.target.value)
}
let genderData=(e)=>{
  setGender(e.target.value)
}

const makeEnable = () => {
  setIsDisabled(false)
}

const makeDisable = () => {
  setIsDisabled(true)
}

  return (
    <form>
                  <div class="form-wrapper">
                    <label for="">Account Holder Name</label>
                    <input
                      type="text"
                      name="memberName"
                      class="form-control1"
                      // value={}
                      value={memberName} onChange={memberData}
                      disabled={isDisabled}
                    />
                  </div>
                  <div class="form-wrapper">
                    <label for="">Email</label>
                    <input
                      type="text"
                      class="form-control1"
                      name="memberLastName"
                      value={email} onChange={emialData}
                      disabled={isDisabled}
                    />
                  </div>
                  <div class="form-wrapper">
                    <label for="">Phone No</label>
                    <input
                      type="number"
                      class="form-control1"
                      name="mobileNo"
                      value={mobileNo} onChange={mobileData}
                      disabled={isDisabled}
                    />
                  </div>

                  <div class="form-group">
                    <div class="form-address">
                      <label for="">Village </label>
                      <input
                        type="text"
                        class="form-control1"
                        name="village"
                        value={village} onChange={villageData}
                        disabled={isDisabled}
                      />
                    </div>
                    <div class="form-address">
                      <label for="">City </label>
                      <input
                        type="text"
                        class="form-control1"
                        name="city"
                        value={city} onChange={cityData}
                        disabled={isDisabled}
                      />
                    </div>
                    
                    
                  </div>
                  <div class="form-group">
                  <div class="form-address">
                      <label for="">District </label>
                      <input
                        type="text"
                        class="form-control1"
                        name="district"
                        value={district} onChange={districtData}
                        disabled={isDisabled}
                      />
                    </div>
                    <div class="form-address">
                      <label for="">pin </label>
                      <input
                        type="text"
                        class="form-control1"
                        name="pin"
                        value={pin} onChange={pinData}
                        disabled={isDisabled}
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-user">
                      <label for="">DOB </label>
                      <input
                        type="text"
                        class="form-control1"
                        name="dob"
                        value={dob} onChange={dobData}
                        disabled={isDisabled}
                      />
                    </div>
                    <div class="form-user">
                      <label for="">Gender </label>
                      <input
                        type="text"
                        class="form-control1"
                        name="gender"
                        value={gender} onChange={genderData}
                        disabled={isDisabled}
                      />
                    </div>
                  </div>
                  <button type="button" onClick={makeEnable}>Edit</button>
                  <button type="button" onClick={makeDisable}>Cancel</button>
                </form>
  )
}

export default EditProfileSection

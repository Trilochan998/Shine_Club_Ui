import React, { useState } from 'react'
import RegisterMember from './RegisterMember';
import RegisterStudent from './RegisterStudent';
import "../css/register.css";

const Register = () => {
    const [selectedRegisterType, setSelectedRegisterType] = useState('member');

    const handleColorChange = (event) => {
        setSelectedRegisterType(event.target.value);
      };

  return (
    <div className='main_register'>
       <h2>Select Registration Type:</h2>
      <label className='reg_type'>
        <input
          type="radio"
          value="member"
          checked={selectedRegisterType === 'member'}
          onChange={handleColorChange}
        />
        Member
      </label>
      <label className='reg_type'>
        <input
          type="radio"
          value="student"
          checked={selectedRegisterType === 'student'}
          onChange={handleColorChange}
        />
        Student
      </label>
      {selectedRegisterType === 'member' ? <RegisterMember /> : <RegisterStudent />}
    </div>
  )
}

export default Register

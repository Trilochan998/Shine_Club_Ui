import React from 'react'

const EditAccount = () => {
  return (
    <div className="wrapper">
    <div class="inner">
      <form>
          <div class="form-wrapper">
            <label for="">Last Name</label>
            <input
              type="text"
              class="form-control1"
            />
          </div>
        <div class="form-wrapper">
          <label for="">Email</label>
          <input
            type="email"
            class="form-control1"
          />
        </div>
        <div class="form-wrapper">
          <label for="">Phone No</label>
          <input
            type="number"
            class="form-control1"
          />
        </div>
        <div class="form-group">
          <div class="form-wrapper">
            <label for="">DOB </label>
            <input
              type="date"
              class="form-control1"
            />
          </div>
          <div class="form-wrapper">
            <label for="">PIN </label>
            <input
              type="number"
              class="form-control1"
            />
          </div>
        </div>
        <div class="form-group">
        <div class="form-wrapper">
          <label for="">Village </label>
          <input
            type="text"
            class="form-control1"
          />
        </div>
        
        </div>
        <div class="form-wrapper">
          <label for="">City </label>
          <input
            type="text"
            class="form-control1"
            name="city"
          />
        </div>
        <div class="form-wrapper">
          <label for="">District </label>
          <input
            type="text"
            class="form-control1"
          />
        </div>
        <button type="button" className="register_btn" >Update</button>
      </form>
    </div>
  </div>
  )
}

export default EditAccount

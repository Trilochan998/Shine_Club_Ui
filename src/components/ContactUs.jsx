import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BiEnvelope,BiPhone } from 'react-icons/bi';
import { GrLocation } from "react-icons/gr";
// import style from '../css/contact.module.css'
import '../css/contact.css'


const ContactUs = () => {
  return (
    <div style={{backgroundColor:'white'}}>
      
      <div class="row">

          <div class="col-lg-5 d-flex align-items-stretch" id="left_side_div">
            <div class="info">
              <div class="address">
              <li><GrLocation /></li>
                <h4>Location:</h4>
                <p>Hatiadiha, Rupsa, Balasore, Odisha, 756028</p>
              </div>

              <div class="email">
                <li><BiEnvelope /></li>
                <h4>Email:</h4>
                <p>shineclub71@gmail.com</p>
              </div>

              <div class="phone">
                <li><BiPhone/></li>
                <h4>Call:</h4>
                <p>+91 7381632701</p>
              </div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14103.38936225007!2d87.022455!3d21.609932!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1cf05f5581b2d3%3A0x8ea9ed4b641c04b0!2sHatiadiha%20Market!5e1!3m2!1sen!2sus!4v1696436572423!5m2!1sen!2sus" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

          </div>

          <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch" id="right_side_div">
            <form action="forms/contact.php" method="post" role="form" class="php-email-form">
              <div className='name_email'>
                <div class="form-group col-md-6">
                  <label for="name">Your Name</label>
                  <input type="text" name="name" class="form-control" id="name" required=""/>
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Your Email</label>
                  <input type="email" class="form-control" name="email" id="email" required=""/>
                </div>
              </div>
              <div class="form-group">
                <label for="name">Subject</label>
                <input type="text" class="form-control" name="subject" id="subject" required=""/>
              </div>
              <div class="form-group">
                <label for="name">Message</label>
                <textarea class="form-control" name="message" rows="10" required=""></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center" className="contact_btn"><button type="submit">Send Message</button></div>
            </form>
          </div>

        </div>
    </div>
  )
}

export default ContactUs

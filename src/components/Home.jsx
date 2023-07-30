import React, { useEffect } from 'react'
import style from '../css/home.module.css'
// import { Button } from 'react-bootstrap';


const Home = () => {

  
  return (
    <section className={style.home}>
      <article>
        <div >
          <h1>WELCOME TO SHINE CLUB</h1>
          <h2>POV : SHINE IS THE WAY OF WIN</h2>
          <h2>social awareness and society welfare</h2>
          <a href="/login" >Login</a>
        </div>

      </article>
      <div id={style.about}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum voluptates, praesentium minus ipsa magni rerum magnam eligendi, distinctio expedita dolorum tenetur impedit veniam consequuntur, voluptatum cupiditate. Sit nihil sint cupiditate.
      </div>
    </section>


  )
}

export default Home

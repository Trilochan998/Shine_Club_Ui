import React from "react";
import { Nav, Navbar,NavLink } from "react-bootstrap";
// import style from "../css/navbar.module.css";
import logo from "../image/Logo.jpg";
import style from '../css/home.module.css'
const NavBar = () => {
  return (
        <div id="nav">
      <Navbar  expand="lg" className={style.navbarContainer} style={{backgroundColor:'#0096A4'}}>
      {/* <Navbar.Brand href="#home" id={style.logo} >
        <img src={logo} alt="Logo"  />
        
      </Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav " />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={{backgroundColor:'#0096A4'}}>
          <NavLink href="/" className={style.navLink} style={{color:'white'}}>Home</NavLink>
          <NavLink href="/aboutus" className={style.navLink} style={{color:'white'}}>AboutUs</NavLink>
          <NavLink href="/member" className={style.navLink} style={{color:'white'}}>Member</NavLink>
          <NavLink href="/graphics" className={style.navLink} style={{color:'white'}}>Gallery</NavLink>
          <NavLink href="/register" className={style.navLink} style={{color:'white'}}>Register</NavLink>
          <NavLink href="/contactus" className={style.navLink} style={{color:'white'}}>ContactUs</NavLink>
          <NavLink href="/profile" className={style.navLink} style={{color:'white'}}>profile</NavLink>
          <NavLink href="/admin" className={style.navLink} style={{color:'white'}}>AdiminPannel</NavLink>

        </Nav>
      </Navbar.Collapse>

      <img src={logo} alt="Logo"  style={{height:'50px',width:'50px',borderRadius:'50%',marginRight:'30px'}}/>
    </Navbar>
    </div>
  )
}

export default NavBar;

import React from "react";
import { Nav, Navbar,NavLink } from "react-bootstrap";
import logo from "../image/Logo.jpg";
import style from '../css/home.module.css'
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
        <div id="nav">
      <Navbar  expand="lg" className={style.navbarContainer} style={{backgroundColor:'#0096A4'}}>
      <Navbar.Brand href="#home"  >
        <img src={logo} alt="Logo" style={{height:'50px',width:'50px',borderRadius:'50%',marginRight:'30px'}} />
        
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav " />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={{backgroundColor:'#0096A4',fontSize:'larger',fontFamily:'normal'}}>
          <Link to="/" className={style.navLink} style={{color:'white',textDecoration:'none'}}>Home</Link>
          <Link to="/aboutus" className={style.navLink} style={{color:'white',textDecoration:'none'}}>AboutUs</Link>
          <Link to="/member" className={style.navLink} style={{color:'white',textDecoration:'none'}}>Member</Link>
          <Link to="/graphics" className={style.navLink} style={{color:'white',textDecoration:'none'}}>Gallery</Link>
          <Link to="/register" className={style.navLink} style={{color:'white',textDecoration:'none'}}>Register</Link>
          <Link to="/contactus" className={style.navLink} style={{color:'white',textDecoration:'none'}}>ContactUs</Link>
          <Link to="/profile" className={style.navLink} style={{color:'white',textDecoration:'none'}}>profile</Link>
          <Link to="/admin" className={style.navLink} style={{color:'white',textDecoration:'none'}}>AdiminPannel</Link>

        </Nav>
      </Navbar.Collapse>
     

      {/* <img src={logo} alt="Logo"  style={{height:'50px',width:'50px',borderRadius:'50%',marginRight:'30px'}}/> */}
    </Navbar>
    </div>
  )
}

export default NavBar;

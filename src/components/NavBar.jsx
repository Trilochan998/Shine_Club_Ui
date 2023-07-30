import React from "react";
import { Nav, Navbar,NavLink } from "react-bootstrap";
// import style from "../css/navbar.module.css";
import logo from "../image/Logo.jpg";
import style from '../css/home.module.css'
const NavBar = () => {
  return (
    // <div>
    //   <section>
    //     <div id={style.nav}>
    //       <div id={style.logo}>
    //         <img src={logo} alt=""></img>
    //       </div>
    //       <div class={style.menu}>
    //         <ol>
    //           <li>
    //             <Nav.Link href="/">Home</Nav.Link>
    //           </li>
    //           <li>
    //             <Nav.Link href="#home_about__1IqJ0">About</Nav.Link>
    //           </li>
    //           <li>
    //             <Nav.Link href="/member">Member</Nav.Link>
    //           </li>

    //           <li>
    //             <Nav.Link href="/graphics">Gallery</Nav.Link>
    //           </li>
    //           <li>
    //             <Nav.Link href="/register">RegisterMember</Nav.Link>
    //           </li>
    //         </ol>
    //       </div>
    //       <div class={style.space}>
    //         <article>{/* for space */}</article>
    //       </div>
    //       <div class={style.menu2}>
    //         <ol>
    //           <li>
    //             <Nav.Link href="/contactus">ContactUs</Nav.Link>
    //           </li>
    //           <li>
    //             <Nav.Link href="/login">
    //               <i class="fa-solid fa-user"></i>
    //             </Nav.Link>
    //           </li>
    //           <li>
    //             <a href="##">
    //               <i class="fa-solid fa-magnifying-glass"></i>
    //             </a>
    //           </li>
    //         </ol>
    //       </div>
    //     </div>
    //   </section>
    // </div>

        <div id="nav">
      <Navbar bg="black" variant="dark" expand="lg">
      <Navbar.Brand href="#home" id={style.logo} >
        <img src={logo} alt="Logo"  />
        
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav " />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto"style={{position:'fixed'}} >
          <NavLink href="/" className={style.navLink}>Home</NavLink>
          <NavLink href="#home_about__1IqJ0" className={style.navLink}>About</NavLink>
          <NavLink href="/member" className={style.navLink}>Member</NavLink>
          <NavLink href="/graphics" className={style.navLink}>Gallery</NavLink>
          <NavLink href="/register" className={style.navLink}>RegisterMember</NavLink>
          <NavLink href="/contactus" className={style.navLink}>ContactUs</NavLink>
          <NavLink href="/profile" className={style.navLink}>profile</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    </div>
  )
}

export default NavBar;

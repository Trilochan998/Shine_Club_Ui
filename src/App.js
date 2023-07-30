import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Graphics from "./components/Graphics";
import Member from "./components/Member";
import RegisterMember from "./components/RegisterMember";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOtp from "./components/VerifyOtp";
import ChangePassword from "./components/ChangePassword";
import EditAccount from "./components/EditAccount";
import Transaction from "./components/Transaction";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="#home_about__1IqJ0" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/graphics" element={<Graphics />} />
          <Route path="/member" element={<Member />} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<RegisterMember />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotPwd" element={<ForgotPassword />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/editAccount" element={<EditAccount />} />
          <Route path="/transaction" element={<Transaction />} />


          

        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;

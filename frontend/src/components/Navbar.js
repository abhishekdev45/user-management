import React, { useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../features/authSlice"; 

const Navbar = ({ toggleSidebar, open }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [navbar, setNavbar] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  
  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

 
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className={`fixed w-full z-10 transition-all ease-in-out duration-75 ${navbar ? 'bg-teal-600' : 'bg-teal-900'}`}>
      <div className="flex items-center justify-between px-4 py-2">
        <Link to="/" className="text-2xl font-bold text-white">Xcelore</Link>
        <div className="flex items-center">
          {userInfo && (
            <button
              onClick={handleLogout}
              className="text-white bg-red-600 px-4 py-2 rounded-md mr-4"
            >
              Logout
            </button>
          )}
          <button onClick={toggleSidebar} className="text-white md:hidden">
            {open ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

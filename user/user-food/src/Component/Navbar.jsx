import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../image/image.png";
import { IoNotifications } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

import "../css/Navbar.css";
import { StoreContext } from "../context/StoreContextProvider";
import { toast } from "react-toastify";
import order from "../image/successful.png";
import logout_icon from "../image/logout.png";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const { token, setToken, totalecartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  // logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully");
    setOpenDropdown(false);
    navigate("/");
  };

  // outside click close dropdown
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>

      {/* Menu */}
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </Link>

        <Link
          to="#mobile-app"
          onClick={() => setMenu("MobileApp")}
          className={menu === "MobileApp" ? "active" : ""}
        >
          Mobile App
        </Link>

        <Link
          to="#contact"
          onClick={() => setMenu("Contact")}
          className={menu === "Contact" ? "active" : ""}
        >
          Contact
        </Link>
      </ul>

      {/* Right side */}
      <div className="navbar-right">
        {/* Notification */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <IoNotifications className="notifi" />
          </Link>
          <div className={totalecartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* Login / Profile */}
        {!token ? (
          <button className="signup" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="navbar-profile" ref={dropdownRef}>
            {/* User icon */}
            <FaUserAlt
              className="profile"
              onClick={() => setOpenDropdown(!openDropdown)}
            />

            {/* Dropdown */}
            {openDropdown && (
              <ul className="nav-profile-dropdown">
                <li
                  className="order-name"
                  onClick={() => {
                    navigate("/order");
                    setOpenDropdown(false);
                  }}
                >
                  <img src={order} className="order" alt="" />
                  <p>Orders</p>
                </li>

                <hr />

                <li className="logout-name" onClick={logout}>
                  <img className="logout" src={logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

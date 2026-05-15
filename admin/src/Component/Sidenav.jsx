import React from "react";
import { Link } from "react-router-dom";
import '../css/sidenav.css'

const Sidenav = () => {
  return (
    <div className="sidenav">
      
      <h2 className="sidenav-logo">Foodey Club</h2>
      <ul className="sidenav-menu">
        <li>
          <Link to="/addItems" className={({ isActive }) => (isActive ? "active-link" : "")}>Add Items</Link>
        </li>
        <li>
          <Link to="/listItems" className={({ isActive }) => (isActive ? "active-link" : "")}>List Items</Link>
        </li>
        <li>
          <Link to="/order" className={({ isActive }) => (isActive ? "active-link" : "")}>Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;

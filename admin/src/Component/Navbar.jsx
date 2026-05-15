import React from 'react'
import '../css/navbar.css'
import Sidenav from './Sidenav'

const Navbar = () => {
    return (
        <div>
             <Sidenav/>
            {/* <nav className="navbar">
                <div className="nav-container">

                
                    <div className="nav-logo">
                        <span>Foodey<span className="highlight">Club</span></span>
                    </div>

        
                    <div className="nav-ham" onClick={() => setOpen(!open)}>
                        <div className={open ? "bar bar1 rotate1" : "bar bar1"}></div>
                        <div className={open ? "bar bar2 fade" : "bar bar2"}></div>
                        <div className={open ? "bar bar3 rotate2" : "bar bar3"}></div>
                    </div>

            
                    <ul className={open ? "nav-links open" : "nav-links"}>
                      
                        <li><button className="login-btn">Login</button></li>
                    </ul>

                </div>
            </nav> */}
        </div>
    )
}

export default Navbar

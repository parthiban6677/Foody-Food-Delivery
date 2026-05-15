import React from 'react'
import '../Footer/Footer.css'
import logo from '../../image/image.png'
import facbook from '../../assets/facebook_icon.png'
import twitter_ from '../../assets/twitter_icon.png'
import linkedin from '../../assets/linkedin_icon.png'


const Footer = () => {
    return (
        <div>
            <div className="footer" id="footer">
                <div className="footer-content">
                    <div className="footer-content-left">
                        <img src={logo} alt="" />
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
                            nostrum iure suscipit maiores non harum incidunt unde magnam
                            molestias ipsum qui vel aut natus aspernatur ipsa dignissimos,
                            numquam assumenda deserunt.
                        </p>
                        <div className="footer-social-icons">
                            <img src={facbook} alt="" />
                            <img src={twitter_} alt="" />
                            <img src={linkedin} alt="" />
                        </div>
                    </div>
                    <div className="footer-content-center">
                        <h2>Company</h2>
                        <ul>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Delivery</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className="footer-content-right">
                        <h2>Get in touch</h2>
                        <ul>
                            <li>+92-308-4900522</li>
                            <li>contact@tomato.com</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className="footer-copyright">
                    Copyright 2024 @ Tomato.com - All Right Reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer

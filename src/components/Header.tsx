import { Link } from "react-router-dom"

import { EnvelopeFill, TelephoneFill, List, XLg } from "react-bootstrap-icons";

import "./Header.css"
import { LogoSmall }  from "./Logo"
import { useEffect, useState } from "react";

const Header:React.FunctionComponent = () => {
    
    const [scrolledDown, setScrolledDown] = useState(false);

    useEffect(() => {
        function handleScroll() {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
            const triggerPosition = 500; 
        
            if (scrollPosition > triggerPosition) {
                setScrolledDown(true);
            } else {
                setScrolledDown(false);
            }
        }
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    return (
    <div className="header">
        <div className="contact-outer-header">
            <div className="contact-inner-header section-content">
                <div className="logo-after-first-view">
                    {scrolledDown ? <LogoSmall className="nothing"/> : <></>}
                </div>
                <div className="contact-div">
                    <div className="contact-method contact-phone">
                        <TelephoneFill/>
                        <p>
                            +123456789
                        </p>
                    </div>
                    <div className="contact-method contact-mail">
                        <EnvelopeFill/>
                        <p>
                            startlearning@lls.uk
                        </p>
                    </div>
                    <div className="contact-message">
                        <p className="contact-to-action">
                            Contact us now!
                        </p>
                        <p>
                            Vacant spots availabe!
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="nav-outer">
            <nav className="nav">
                <div className="nav-container">
                    {scrolledDown ? <LogoSmall className="nav-logo"/> : <></>}

                    <input type="checkbox" id="menu-check"/> 
                    <label htmlFor="menu-check" className="icons"> 
                        <List id="menu-open"/>
                        <XLg id="menu-close"/>
                    </label>

                    <ul> 
                        <li><Link to="/about">About us</Link></li> 
                        <li><Link to="/">Courses</Link></li> 
                        <li><Link to="/testimonies">Testimonies</Link></li>
                        <li><Link to="/register">Register Now</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    )
}

export default Header
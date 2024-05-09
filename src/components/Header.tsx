import { Link } from "react-router-dom"

import "./Header.module.css"

const Header:React.FunctionComponent = () => {
    
    return (
        <nav>
            <div className="nav-container"> 
                <a href="index.html"> 
                    <img src="img/logo-blue.png" alt="logo"></img>
                </a>

                <input type="checkbox" id="menu-check"/> 
                <label htmlFor="menu-check" className="icons"> 
                    <i className='bx bx-menu' id="menu-open"></i> 
                    <i className='bx bx-x' id="menu-close"></i>
                </label>

                <ul> 
                    <li><Link to="/about">About us</Link></li> 
                    <li><Link to="/">Courses</Link></li> 
                    <li><Link to="/testimonies">Testimonies</Link></li>
                    <li><Link to="/register">Register Now</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
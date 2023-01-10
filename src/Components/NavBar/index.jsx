import './style.css'

import logo from "../../Assets/Imgs/logo-teste.png";

const NavBar = () => {
    return (
        <div className="navbar">
            <div className='navbar-logo'>
                <img src={logo} alt="" />
            </div>

        </div>
    )
}

export default NavBar
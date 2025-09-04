import { Link } from 'react-router-dom';
import { IoMdCart } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

import { FiMenu } from "react-icons/fi";
import appLogo from '../assets/sidebar-shopBuddyLogo.png';

import '../stylesheet/header.css';
function Header() {
    return (


        <div className='header' >
            <div className="app-logo" >
                <Link to={'/'}><img src={appLogo} alt="" /></Link>
                <div ><FiMenu /></div>
            </div>

            <div className="searchbar">

                <input type="text" placeholder='Search products'/>
                <button><IoSearchSharp /></button>


            </div>
            <div className="acc-cart" style={{ fontSize: "30px", display: "flex", gap: "15px" }}>
                <IoMdCart />
                <MdAccountCircle />
            </div>
        </div>


    )
}
export default Header;
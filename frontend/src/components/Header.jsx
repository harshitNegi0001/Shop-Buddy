import { Link, useNavigate } from 'react-router-dom';
import { IoMdCart } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

import { FiMenu } from "react-icons/fi";
import appLogo from '../assets/sidebar-shopBuddyLogo.png';
import { useSelector } from 'react-redux';

function Header({setSidebar,setUserProf}) {
    const navigate = useNavigate()
    const {userInfo} = useSelector(state=>state.auth);
    return (


        <div className='header' >
            <div className="app-logo" >
                <Link to={'/'}><img src={appLogo} alt="" /></Link>
                <div onClick={()=>setSidebar(true)} ><FiMenu /></div>
            </div>

            <div className="searchbar">

                <input type="text" placeholder='Search products'/>
                <button><IoSearchSharp /></button>


            </div>
            <div className="acc-cart" style={{ fontSize: "30px", display: "flex", gap: "15px" }}>
                <IoMdCart />
                
                {(userInfo?.image)?<img onClick={()=>setUserProf(true)} src={userInfo.image} style={{width:"30px",height:"30px",borderRadius:"15px",objectFit:"cover",objectPosition:"center"}} alt=""  />:<MdAccountCircle onClick={()=>navigate('/login')}/>}
            </div>
        </div>


    )
}
export default Header;
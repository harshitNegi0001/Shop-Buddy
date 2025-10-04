import { Link, useLocation, useNavigate } from 'react-router-dom';
import sideBarLogo from '../assets/sidebar-shopBuddyLogo.png';
import { useEffect, useState } from 'react';
import { getNav } from '../navigation/index';
import { BiLogOutCircle } from 'react-icons/bi';
import { MdClose } from "react-icons/md";
import { useContext } from 'react';
import { AuthContext } from '../context/role_management.jsx';
function Sidebar({ setSidebar, sidebar }) {
    
    const { pathname } = useLocation();
    const [allNav, setAllNav] = useState([]);
    const {auth,logout} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(!auth.role){
            navigate('/login')
        }
        else{
            const navs = getNav(auth.role);
            setAllNav(navs)
        }
        
    }, [auth.role]);

    return (
        <div className={`scrollable sidebar ${sidebar ? 'show-sidebar' : 'notShow-sidebar'}`} >
            <div style={{ display: "flex", margin: "25px" }}>
                <Link to="/" onClick={()=>setSidebar(false)}>
                    <img src={sideBarLogo} alt="logo" style={{ width: "150px" }} />

                </Link>
                {
                    (sidebar) ? <span style={{ fontSize: "30px",color:"var(--text)", position: "absolute", top: "0px",left:"85%" }} className='close' onClick={() => setSidebar(false)}><MdClose /></span> : null
                }
            </div>
            <div className="sidebar-tabs">
                <ul style={{ listStyle: "none" }}>
                    {
                        allNav.map((n, i) =>
                            <li key={i} >

                                <Link to={n.path} onClick={()=>setSidebar(false)}  className={`${pathname === n.path ? 'active-tab' : 'normal-tab'}`} style={{ textDecoration: "none", display: "flex", gap: "20px", padding: "5px" }}>
                                    <span>{n.icon}</span>
                                    <span>{n.title}</span>
                                </Link>
                            </li>
                        )
                    }

                    <li>
                        <button className='logout-btn' onClick={()=>logout()}>
                            <span><BiLogOutCircle /></span>
                            <span>Log Out</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar;
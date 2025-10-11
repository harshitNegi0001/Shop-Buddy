import { Link,useLocation, useNavigate } from 'react-router-dom';
import applogo from '../assets/sidebar-shopBuddyLogo.png';


function Sidebar({ sidebar, setSidebar }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    return (

        <div style={{ width: "280px", boxSizing: "border-box", transform: `${sidebar ? 'translateX(0px)' : 'translateX(-100%)'}`, transition: "all 0.3s", padding: "10px 15px", height: "100vh", backgroundColor: "var(--sidebar)", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()} >
            <div className="app-logo" style={{ display: "flex", justifyContent: "center" }}>
                <Link to={'/'}><img onClick={() => navigate('/')} src={applogo} alt="" style={{ width: "120px" }} /></Link>
            </div>
            <div className="sidebar-options" style={{ display: "flex", flexDirection: 'column', alignItems: "center", marginTop: "25px" }}>
                <ul style={{ width: "100%" }}>
                    <li className={`${pathname === '/' ? 'active-tab' : 'normal-tab'}`} style={{ width: "80%", backgroundColor: `${pathname==='/'?'var(--primary)':'transparent'}`, margin: "10px 0px", padding: "10px 20px", listStyle: "none", borderRadius: "15px", fontSize: "18px" }}><Link to={'/'} style={{ textDecoration: "none", color: `${pathname === '/' ? 'black' : 'var(--text)'}` }}>Home</Link></li>
                    <li className={`${pathname === '/products' ? 'active-tab' : 'normal-tab'}`}  style={{ width: "80%", backgroundColor: `${pathname==='/products'?'var(--primary)':'transparent'}`, margin: "10px 0px", padding: "10px 20px", listStyle: "none", borderRadius: "15px", fontSize: "18px" }}><Link to={'/products'} style={{ textDecoration: "none", color: `${pathname === '/products' ? 'black' : 'var(--text)'}` }}>Products</Link></li>
                    <li  className={`${pathname === '/seller-chat' ? 'active-tab' : 'normal-tab'}`} style={{ width: "80%", backgroundColor: `${pathname==='/seller-chat'?'var(--primary)':'transparent'}`, margin: "10px 0px", padding: "10px 20px", listStyle: "none", borderRadius: "15px", fontSize: "18px" }}><Link to={'/seller-chat'} style={{ textDecoration: "none", color: `${pathname === '/seller-chat' ? 'black' : 'var(--text)'}` }}>Chat with seller</Link></li>
                    <li  className={`${pathname === '/orders-hist' ? 'active-tab' : 'normal-tab'}`} style={{ width: "80%", backgroundColor: `${pathname==='/orders-hist'?'var(--primary)':'transparent'}`, margin: "10px 0px", padding: "10px 20px", listStyle: "none", borderRadius: "15px", fontSize: "18px" }}><Link to={'/orders-hist'} style={{ textDecoration: "none", color: `${pathname === '/orders-hist' ? 'black' : 'var(--text)'}` }}>Orders details</Link></li>
                </ul>
            </div>
        </div>

    )
}
export default Sidebar;

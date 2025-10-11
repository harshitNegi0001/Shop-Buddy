import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar";
import UserProfile from "../components/UserProfile.jsx";
import { useEffect, useState } from "react";
import '../stylesheet/mainLayout.css';
import { useSelector } from "react-redux";



function MainLayout() {
    const [sidebar, setSidebar] = useState(false);
    const [userProf, setUserProf] = useState(false);
    const { userInfo } = useSelector(state => state.auth);
    return (
        <div className="main-layout-cont" style={{ width: "100%", height: "100%", boxSizing: "border-box", overflowY: "scroll", scrollbarWidth: "none" }}>
            <div className="sidebar-com" style={{ transform: `${sidebar ? 'translateX(0px)' : 'translateX(-100%)'}` }} onClick={() => setSidebar(false)} >
                <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

            </div>
            {userInfo && <div style={{ display: `${userProf ? 'flex' : 'none'}`, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(2px)", position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", zIndex: "999" }} onClick={() => setUserProf(false)} className="profile-container">
                <UserProfile setUserProf={setUserProf} />
            </div>}



            <div className="scrollable main-right" style={{ position:"relative", width: "100%", height: "100%", boxSizing: "border-box"}}  >
                <div className="header-con" style={{ position: "sticky", top: "0px", left: "0px", width: "100%" }}>
                    <Header setSidebar={setSidebar} setUserProf={setUserProf} />
                </div>

                <Outlet />
            </div>
        </div>
    )
}
export default MainLayout;

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import '../stylesheet/mainLayout.css';
import { useEffect, useState } from "react";

function MainLayout(){
    const [sidebar,setSidebar] = useState((window.innerWidth<=750)?false:true);
    return(
        <div className="main-layout">
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            
            <div className="scrollable main-right" >

                <Header setSidebar={setSidebar}  />
                <Outlet />
            </div>
        </div>
    )
}
export default MainLayout;
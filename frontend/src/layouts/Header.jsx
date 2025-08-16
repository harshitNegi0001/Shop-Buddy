import { IoMenu } from "react-icons/io5";
import searchIcon from '../assets/searchIcon.png'
import imageSample from '../assets/image-sample.png'

function Header({setSidebar}){
    return(
        <div className="header">
            <div className="sidebar-slider" >
                <button onClick={()=>setSidebar(pre=>!pre)} style={{background:"none",border:"none",color:"var(--text)",fontSize:"32px"}}><IoMenu/></button>
                
            </div>
            <div className="search-bar">
                <form >
                    <input type="text" id="search-inp" placeholder="Search" />
                    <img style={{width:"20px" , position:"absolute",right:"9px"}} src={searchIcon} alt="Search-icon" />
                </form>
            </div>
            <div style={{width:"105px",height:"30px",backgroundColor:"gray", borderRadius:"15px",display:"flex",alignItems:"center",gap:"12px"}} className="profile-sec">
                
                <div className="info" style={{display:"flex",flexDirection:"column",alignItems:"center",margin:"0px 5px"}}>
                    <span style={{fontSize:"11px",fontWeight:"bold"}}>Harshit...</span>
                    <span style={{fontSize:"8px"}}>admin</span>
                </div>
                <div style={{width:"25px",height:"25px" ,borderRadius:"15px"}} className="dp" >
                    <img style={{borderRadius:"15px" ,width:"25px",height:"25px"}} src={imageSample} alt="admin-pic" />
                </div>
            </div>
        </div>
    )
}
export default Header;
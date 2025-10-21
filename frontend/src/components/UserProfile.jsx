import { useDispatch, useSelector } from 'react-redux';
import { getInfo, reset, setState } from '../Store/reducer/authReducer.js';
import toast from 'react-hot-toast';
import { MdModeEdit } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';

function UserProfile({ setUserProf }) {
    const { userInfo } = useSelector(state => state.auth);
    const [editDetail, setEditdetail] = useState(false);
    const [editedDetail,setEditedDetail]=useState({
        name:userInfo?.name||'',
        email:userInfo?.email||'',
        phone : userInfo?.phone_no||'',
        address : userInfo?.address||{
            houseNo:'',
            cityName:'',
            pincode:'',
            district:'',
            state:''
        }
    })
    const dispatch = useDispatch();
    
    const BackendPort = import.meta.env.VITE_BACKEND_PORT
    const logout = async () => {

        try {
            dispatch(setState({isLoading:true}))
            const response = await fetch(`${BackendPort}/api/logout`, {
                method: "POST",
                credentials: "include"
            });
            const result = await response.json();
            dispatch(setState({isLoading:false}))
            if (response.ok) {
                dispatch(reset());
                
            }
            else {
                toast.error("Error! " + result.message);
            }

        } catch (err) {
            dispatch(setState({isLoading:false}));
            toast.error("Error! " + err.message);
        }


    }
    const saveProfileInfo = async()=>{
        try{
            dispatch(setState({isLoading:true}))
            const response = await fetch(`${BackendPort}/api/edit-customer-prof`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                    editedDetail:editedDetail
                }),
                credentials:"include"
            });
            const result = await response.json();
            dispatch(setState({isLoading:false}));

            if(response.ok){
                toast.success("Info saved");
                
                setEditdetail(false);
                dispatch(setState({userInfo:result.userInfo}));
            }
        }
        catch(err){
            dispatch(setState({isLoading:false}))
            toast.error("Error! "+err.message);
        }
    }
    return (
        <div onClick={(e) => e.stopPropagation()} className="user-profile-box scrollable" style={{ width: "300px", height: "420px", boxSizing: "border-box", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: "15px", borderRadius: "15px", backgroundColor: "var(--sidebar)" }}>
            <div className="profile-close" style={{ position: "absolute", right: "20px", width: "fit-content", display: "flex", justifyContent: "center", alignItems: "center", top: "20px", fontSize: "30px", color: "var(--text)" }} onClick={() => setUserProf(false)}>
                <IoCloseOutline />

            </div>
            <div className="profile-pic" style={{ marginTop: "20px" }}>
                <img src={userInfo.image} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "40px" }} alt="" />
            </div>
            <div className='userInfo-box'>
                {
                    !editDetail ?
                        <div className='info-box' style={{ width: "220px",position:"relative", boxSizing: "border-box", padding: "5px",paddingTop:"10px",borderRadius:"10px", backgroundColor:"var(--highlight)", margin: "10px 0px", display: "flex", flexDirection: "column", color: "var(--text)", fontSize: "12px" }}>
                            <span onClick={()=>setEditdetail(true)} style={{width:"fit-content",height:"fit-content",background:"yellow",color:"black",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"3px",position:"absolute",top:"10px",right:"10px",fontSize:"16px"}}><MdModeEdit /></span>
                            <div>Name : {userInfo.name}</div>
                            <div>Email : {userInfo.email}</div>
                            <div>Phone no : {userInfo.phone_no || 'not availible'}</div>
                            <div>Address : {userInfo.address ? <span>{userInfo.address?.houseNo} {userInfo.address?.cityName}, {userInfo.address?.pincode}, {userInfo.address?.district}, {userInfo.address?.state}</span> : <span>not availible</span>}  </div>
                        </div>
                        : <div className='edit-box' style={{width:"220px",boxSizing:"border-box",padding:"5px",paddingTop:"10px",color:"var(--text)",fontSize:"12px",display:"flex",flexDirection:"column",margin:"10px 0px",backgroundColor:"var(--highlight)"}}>
                            <label style={{marginTop:"5px"}} htmlFor="userName">Name</label>
                            <input style={{background:"none",border:"1px solid var(--text)",borderRadius:"5px",color:"var(--text)",padding:"0px 5px"}} type="text" id='userName' value={editedDetail.name} onChange={(e)=>setEditedDetail({...editedDetail,name:e.target.value})} />
                            <label style={{marginTop:"5px"}} htmlFor="userEmail">Email</label>
                            <input style={{background:"none",border:"1px solid var(--text)",borderRadius:"5px",color:"var(--text)",padding:"0px 5px"}} type="email" id='userEmail' value={editedDetail.email} onChange={(e)=>setEditedDetail({...editedDetail,email:e.target.value})} />
                            <label style={{marginTop:"5px"}} htmlFor="userPhone">Phone No.</label>
                            <input style={{background:"none",border:"1px solid var(--text)",borderRadius:"5px",color:"var(--text)",padding:"0px 5px"}} type="text" id='userPhone' value={editedDetail.phone} onChange={(e)=>setEditedDetail({...editedDetail,phone:e.target.value})}/>
                            <label style={{marginTop:"10px",fontWeight:"bold"}} htmlFor="address-houseNo">Address:</label>
                            <label style={{marginTop:"5px"}} htmlFor="address-houseNo">House No</label>
                            <input style={{background:"none",border:"1px solid var(--text)",borderRadius:"5px",color:"var(--text)",padding:"0px 5px"}} type="text" id='address-houseNo' value={editedDetail.address?.houseNo} onChange={(e)=>setEditedDetail({...editedDetail,address:{...editedDetail.address,houseNo:e.target.value}})}/>
                            <label style={{marginTop:"5px"}} htmlFor="address-city">City</label>
                            <input style={{background:"none",border:"1px solid var(--text)",borderRadius:"5px",color:"var(--text)",padding:"0px 5px"}} type="text" id='address-city' value={editedDetail.address?.cityName} onChange={(e)=>setEditedDetail({...editedDetail,address:{...editedDetail.address,cityName:e.target.value}})}/>
                            <label style={{marginTop:"5px"}} htmlFor="address-pincode">Pincode</label>
                            <input style={{background:"none",border:"1px solid var(--text)",borderRadius:"5px",color:"var(--text)",padding:"0px 5px"}} type="text" id='address-pincode' value={editedDetail.address?.pincode} onChange={(e)=>setEditedDetail({...editedDetail,address:{...editedDetail.address,pincode:e.target.value}})}/>
                            <label style={{marginTop:"5px"}} htmlFor="address-district">District</label>
                            <input style={{background:"none",border:"1px solid var(--text)",borderRadius:"5px",color:"var(--text)",padding:"0px 5px"}} type="text" id='address-district' value={editedDetail.address?.district} onChange={(e)=>setEditedDetail({...editedDetail,address:{...editedDetail.address,district:e.target.value}})}/>
                            <label style={{marginTop:"5px"}} htmlFor="address-state">State Name</label>
                            <input style={{background:"none",border:"1px solid var(--text)",borderRadius:"5px",color:"var(--text)",padding:"0px 5px"}} type="text" id='address-state' value={editedDetail.address?.state} onChange={(e)=>setEditedDetail({...editedDetail,address:{...editedDetail.address,state:e.target.value}})}/>
                            <div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}><button onClick={saveProfileInfo} id='prof-edit-save' style={{width:"100px",height:"25px",backgroundColor:"var(--btn)",border:"none",borderRadius:"5px"}}>Save</button></div>
                            
                        </div>
                }
            </div>
            <div className="logout-btn"><button onClick={logout} style={{ width: "130px", height: "35px", fontSize: "16px", backgroundColor: "var(--btn)", border: "none", borderRadius: "10px" }}>Log out</button></div>
        </div>
    )
}
export default UserProfile;
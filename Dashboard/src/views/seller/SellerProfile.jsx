import { RiImageEditFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import loading from '../../assets/loading3.webp';
import '../../stylesheet/sellerProfile.css';
import toast from "react-hot-toast";

function SellerProfile() {
    const [loader, setLoader] = useState(false);
    const [state, setState] = useState({
        shopName: '',
        postalCode: '',
        district: '',
        stateName: '',
        country: ''
    });
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getSellerDetail();
    }, [])
    const getSellerDetail = async () => {
        try {
            setLoader(true);
            const response = await fetch("http://localhost:5000/api/get-user", {
                method: "GET",
                credentials: "include"
            });
            const result = await response.json();
            setLoader(false);
            if (!response.ok) {
                toast.error("Error! " + result.message);
            }
            else {
                setUserInfo(result.userInfo);
            }
        }
        catch (err) {
            setLoader(false);
            toast.error("Error! " + err.message);
        }
    }
    const handleImage = async (e) => {
        const file = e.target.files[0];

        if (file) {


            const formData = new FormData();
            formData.append("image", file);
            try {

                setLoader(true);
                const response = await fetch('http://localhost:5000/api/update-profile', {
                    method: "POST",
                    body: formData,
                    credentials: "include"
                });

                const result = await response.json();
                setLoader(false);
                if (!response.ok) {
                    toast.error("Error! " + result.message);

                }
                else {
                    setUserInfo({ ...userInfo, s_image: result.image });
                    toast.success("Profile image updated successfully");
                }
            }
            catch (err) {
                setLoader(false);
                toast.error("Error! " + err.message)
            }
        }
    }
    const submitShopInfo = async (e) => {
        e.preventDefault();

        const shopName = state.shopName.trim();
        const postalCode = state.postalCode.trim();
        const district = state.district.trim();
        const stateName = state.stateName.trim();
        const country = state.country.trim();
        if (shopName && postalCode && district && stateName && country) {
            try {
                setLoader(true);
                const response = await fetch('http://localhost:5000/api/add-shop', {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        shop_info: {
                            shopName,
                            postalCode,
                            district,
                            stateName,
                            country
                        }
                    }),
                    credentials: "include"
                });
                const result = await response.json();
                setLoader(false);
                if (!response.ok) {
                    toast.error("Error! " + result.message);
                }
                else {
                    setUserInfo(result.userInfo);
                    toast.success("Successfully submitted");

                }

            }
            catch (err) {
                setLoader(true);
                console.log(err)
                toast.error("Error! " + err.message);
            }
        }
        else {
            toast.error("Please Enter all fields first");
        }
    }
    const status = 'active';

    return (
        <div className="seller-profile" >
            {loader && <div className='load-back'>
                <img className='loading' src={loading} alt='loading...' />
            </div>}
            <div className="profile-edit" >
                <div className="change-image" >
                    <img src={userInfo.s_image} alt="seller-img" />
                    <span  ><label style={{ display: "flex" }} htmlFor="edit-image"><RiImageEditFill /></label>
                        <input type="file" name="editImage" id="edit-image" accept="image/*" onChange={handleImage} hidden /></span>
                </div>
                <div className="edit-info" >
                    <div><span className="edit-info-data" >Name: </span><span>{userInfo.s_name}</span></div>
                    <div><span className="edit-info-data" >Email: </span><span>{userInfo.s_email}</span></div>
                    <div><span className="edit-info-data" >Role: </span><span>{userInfo.s_role}</span></div>
                    <div><span className="edit-info-data" >Status: </span><span>{userInfo.s_status}</span></div>
                    <div><span className="edit-info-data" >Payment Account: </span>
                        {(userInfo.s_payment === 'active') ? <span className="edit-info-span-green">Active</span> : <span className="edit-info-span-blue" >Click Active</span>}</div>
                    <div className="edit-info-btn" ><RiEdit2Fill /></div>
                </div>
                {
                    !userInfo.shop_info ? <div className="edit-shop-detail" >
                        <form onSubmit={submitShopInfo}>
                            <div >
                                <label htmlFor="shop-name">Shop Name</label>
                                <input type="text" value={state.shopName} onChange={(e) => setState({ ...state, shopName: e.target.value })} id="shop-name" />
                            </div>
                            <div >
                                <label htmlFor="pin-code">Postal Code</label>
                                <input type="number" value={state.postalCode} onChange={(e) => setState({ ...state, postalCode: e.target.value })} id="pin-code" />
                            </div>
                            <div >
                                <label htmlFor="dist-name">District Name</label>
                                <input type="text" value={state.district} onChange={(e) => setState({ ...state, district: e.target.value })} id="dist-name" />
                            </div>
                            <div >
                                <label htmlFor="state-name">State Name</label>
                                <input type="text" value={state.stateName} onChange={(e) => setState({ ...state, stateName: e.target.value })} id="state-name" />
                            </div>
                            <div >
                                <label htmlFor="country-name">Country Name</label>
                                <input type="text" value={state.country} onChange={(e) => setState({ ...state, country: e.target.value })} id="country-name" />
                            </div>
                            <button type="submit" >Submit</button>
                        </form>
                    </div> : <div className="shop-info" >
                        <div><span className="edit-info-data">Shop Name : </span><span>{userInfo.shop_info.shopName}</span></div>
                        <div><span className="edit-info-data">Postal Code : </span><span>{userInfo.shop_info.postalCode}</span></div>
                        <div><span className="edit-info-data">District Name : </span><span>{userInfo.shop_info.district}</span></div>
                        <div><span className="edit-info-data">State Name : </span><span>{userInfo.shop_info.stateName}</span></div>
                        <div><span className="edit-info-data">Country Name : </span><span>{userInfo.shop_info.country}</span></div>
                        <div className="edit-info-btn" ><RiEdit2Fill /></div>
                    </div>
                }
                <div className="add-shop">

                </div>
            </div>

            <div className="change-pass" >
                <div className="change-pass-form" >
                    <span style={{ fontSize: "18px" }}>Change Password</span>
                    <form action="">
                        <div >
                            <label htmlFor="change-pass-email">Email</label>
                            <input type="email" id="change-pass-email" required />
                        </div>
                        <div >
                            <label htmlFor="change-pass-pass">Password</label>
                            <input type="password" id="change-pass-pass" required autoComplete="old-pass" />
                        </div>
                        <div >
                            <label htmlFor="change-pass-new-pass">New Password</label>
                            <input type="password" id="change-pass-new-pass" required autoComplete="new-pass" />
                        </div>

                        <button type="submit" >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SellerProfile;
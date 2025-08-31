import { RiImageEditFill } from "react-icons/ri";
import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";

import '../../stylesheet/sellerProfile.css'
import sellerImage from '../../assets/sellerSamplePhoto.jpg';

function SellerProfile() {
    const [newImage, setNewImage] = useState(sellerImage);
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewImage(imageUrl);
        }
    }
    const status = 'active';
    const userInfo = true;
    return (
        <div className="seller-profile" >
            <div className="profile-edit" >
                <div className="change-image" >
                    <img src={newImage} alt="seller-img" />
                    <span  ><label style={{ display: "flex" }} htmlFor="edit-image"><RiImageEditFill /></label>
                        <input type="file" name="editImage" id="edit-image" accept="image/*" onChange={handleImage} hidden /></span>
                </div>
                <div className="edit-info" >
                    <div><span className="edit-info-data" >Name: </span><span>Raju Dhami</span></div>
                    <div><span className="edit-info-data" >Email: </span><span>dhamiroop@testing.com</span></div>
                    <div><span className="edit-info-data" >Role: </span><span>Seller</span></div>
                    <div><span className="edit-info-data" >Status: </span><span>Active</span></div>
                    <div><span className="edit-info-data" >Payment Account: </span>
                    {(status === 'active') ? <span className="edit-info-span-green">Pending</span> : <span className="edit-info-span-blue" >Click Active</span>}</div>
                    <div className="edit-info-btn" ><RiEdit2Fill /></div>
                </div>
                {
                    !userInfo ? <div className="edit-shop-detail" >
                        <form action="">
                            <div >
                                <label htmlFor="shop-name">Shop Name</label>
                                <input type="text" id="shop-name"  />
                            </div>
                            <div >
                                <label htmlFor="pin-code">Postal Code</label>
                                <input type="number" id="pin-code"  />
                            </div>
                            <div >
                                <label htmlFor="dist-name">District Name</label>
                                <input type="text" id="dist-name"  />
                            </div>
                            <div >
                                <label htmlFor="state-name">State Name</label>
                                <input type="text" id="state-name"  />
                            </div>
                            <div >
                                <label htmlFor="country-name">Country Name</label>
                                <input type="text" id="country-name" />
                            </div>
                            <button type="submit" >Submit</button>
                        </form>
                    </div> : <div className="shop-info" >
                        <div><span className="edit-info-data">Shop Name: </span><span>Jagdamba Electronics</span></div>
                        <div><span className="edit-info-data">Postal Code: </span><span>263002</span></div>
                        <div><span className="edit-info-data">District Name: </span><span>Nainital</span></div>
                        <div><span className="edit-info-data">State Name: </span><span>Uttarakhand</span></div>
                        <div><span className="edit-info-data">Country Name: </span><span>India(Bharat)</span></div>
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
                            <input type="email" id="change-pass-email" required  />
                        </div>
                        <div >
                            <label htmlFor="change-pass-pass">Password</label>
                            <input type="password" id="change-pass-pass" required autoComplete="old-pass" />
                        </div>
                        <div >
                            <label htmlFor="change-pass-new-pass">New Password</label>
                            <input type="password" id="change-pass-new-pass" required autoComplete="new-pass"/>
                        </div>

                        <button type="submit" >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SellerProfile;
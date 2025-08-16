import sellerImage from '../../assets/sellerSamplePhoto.jpg'
import '../../stylesheet/sellerDetails.css';
function SellerDetails(){

    return(
        <div className="seller-detail-container" >
            <div className="seller-detail" >
                <img id='seller-image'  src={sellerImage} alt="" />
                <div className="seller-basic-info" >
                    <span style={{color:"black"}}>Basic Info</span>
                    <div className='inner-seller-detail'>
                        <span>Name : Harshit Singh Negi</span>
                        <span>Email : negiharshit@test.com</span>
                        <span>Role : Seller</span>
                        <span>Status : Active</span>
                        <span>Payment Status : Active</span>
                    </div>
                    
                </div>
                <div className="seller-address" >
                    <span style={{color:"black"}}>Address</span>
                    <div className='inner-seller-detail'>
                        <span>Shop Name : Jagdamba Store</span>
                        <span>Country : India</span>
                        <span>State : Uttarakhand</span>
                        <span>District : Nainital</span>
                        <span>Pincode : 263002</span>
                    </div>
                </div>

            </div>
            <div className="active-select">
                <select name="status" id="active-status" >
                    <option value="active">Active</option>
                    <option value="deactive">Deactive</option>
                </select>
                <button className='seller-submit-btn'>submit</button>
            </div>
        </div>
    )
}
export default SellerDetails;
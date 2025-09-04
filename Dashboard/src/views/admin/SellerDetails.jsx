import { useParams } from 'react-router-dom';
import sellerImage from '../../assets/sellerSamplePhoto.jpg'
import '../../stylesheet/sellerDetails.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import loadingGif from '../../assets/loading3.webp'
function SellerDetails(){
    const [sellerDetails,setSellerDetails] = useState({});
    const [status,setStatus] = useState('');
    const {sellerId} = useParams();
    const [loading,setLoading] =useState(false);
    useEffect(()=>{
        getSellerDetail();
    },[]);

    //set seller status
    const sendStatus = async()=>{
        try{
            if(status===sellerDetails.s_status){
                return;
            }
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/set-seller-status`,{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    status:status,
                    id:sellerDetails.s_id
                }),
                credentials:"include"
            });

            const result = await response.json();
            setLoading(false);
            if(!response.ok){
                toast.error("Error! "+result.message);
            }else{
                toast.success("Successfully Done");
                setSellerDetails(result.sellerDetail);
            }
        }
        catch(err){
            setLoading(false);
            toast.error("Error! "+err.message);
        }
    }

    // for getting seller details
    const getSellerDetail = async()=>{
        try{
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/get-seller-detail?id=${sellerId}`,{
                method:"GET",
                credentials:"include"
            });
            const result = await response.json();
            setLoading(false);
            if(!response.ok){
                toast.error("Error!"+result.message);
            }
            else{
                setSellerDetails(result.sellerDetail);
                setStatus(result.sellerDetail.s_status)
                
            }
        }
        catch(err){
            setLoading(false);
            toast.error("Error!"+err.message);
        }
    }
    return(
        <div className="seller-detail-container" >
            {loading && <div className='load-back'>
                            <img className='loading' src={loadingGif} alt='loading...' />
                        </div>}
            <div className="seller-detail" >
                <img id='seller-image'  src={sellerDetails.s_image} alt="" />
                <div className="seller-basic-info" >
                    <span style={{color:"black"}}>Basic Info</span>
                    <div className='inner-seller-detail'>
                        <span>Name : {sellerDetails.s_name}</span>
                        <span>Email : {sellerDetails.s_email}</span>
                        <span>Role : {sellerDetails.s_role}</span>
                        <span>Status : {sellerDetails.s_status}</span>
                        <span>Payment Status : {sellerDetails.s_payment}</span>
                    </div>
                    
                </div>
                <div className="seller-address" >
                    <span style={{color:"black"}}>Address</span>
                    <div className='inner-seller-detail'>
                        <span>Shop Name : {sellerDetails.shop_info?.shopName||'not availible yet'}</span>
                        <span>Country : {sellerDetails.shop_info?.country||'not availible yet'}</span>
                        <span>State : {sellerDetails.shop_info?.stateName||'not availible yet'}</span>
                        <span>District : {sellerDetails.shop_info?.district||'not availible yet'}</span>
                        <span>Pincode : {sellerDetails.shop_info?.postalCode||'not availible yet'}</span>
                    </div>
                </div>

            </div>
            <div className="active-select">
                <select name="status" id="active-status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                    {(sellerDetails.s_status==='pending')?<option value="pending">Pending</option>:null}
                    <option value="active">Active</option>
                    <option value="deactive">Deactive</option>
                </select>
                <button className='seller-submit-btn' onClick={sendStatus}>submit</button>
            </div>
        </div>
    )
}
export default SellerDetails;
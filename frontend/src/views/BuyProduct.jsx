import { BsBoxSeam } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";

import { useState } from 'react';
import '../stylesheet/buyProduct.css';
function BuyProduct({}) {
    const [deliveryMeth, setDeliveryMeth] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    return (
        <div className="buy-prod-page">
            <div className="delivery-container">
                <span>Shipping Information</span>
                <div className="del-method">
                    <div className={` ${(deliveryMeth === 'delivery') ? 'active' : 'deactive'}`} onClick={() => setDeliveryMeth('delivery')}>
                        <TbTruckDelivery size={18} /> <span>Delivery</span>
                    </div>
                    <div className={` ${(deliveryMeth === 'pickup') ? 'active' : 'deactive'}`} onClick={() => setDeliveryMeth('pickup')}>
                        <BsBoxSeam /> <span>Pickup</span>
                    </div>
                </div>
                <div className="cust-full-name">
                    <label htmlFor="full-name" style={{ fontSize: "14px" }}>Full Name: </label>
                    <input type="text" id="full-name" />
                </div>
                <div className="cust-full-email">
                    <label htmlFor="cust-email" style={{ fontSize: "14px" }}>Email: </label>
                    <input type="text" id="cust-email" />
                </div>
                <div className="cust-contact">
                    <label htmlFor="cust-phone" style={{ fontSize: "14px" }}>Phone No: </label>
                    <input type="text" id="cust-phone" />
                </div>

                <div className="address-details">
                    <div className="address-home-no">
                        <label htmlFor="cust-address-house" style={{ fontSize: "14px" }}>House No: </label>
                        <input type="text" id="cust-address-house" />
                    </div>
                    <div className="address-city">
                        <label htmlFor="cust-address-city" style={{ fontSize: "14px" }}>City / Village: </label>
                        <input type="text" id="cust-address-city" />
                    </div>
                    <div className="address-pincode">
                        <label htmlFor="cust-address-pincode" style={{ fontSize: "14px" }}>Pincode: </label>
                        <input type="number" id="cust-address-pincode" />
                    </div>
                    <div className="address-district">
                        <label htmlFor="cust-address-dist" style={{ fontSize: "14px" }}>District: </label>
                        <input type="text" id="cust-address-dist" />
                    </div>
                    <div className="address-state">
                        <label htmlFor="cust-address-state" style={{ fontSize: "14px" }}>State: </label>
                        <input type="text" id="cust-address-state" />
                    </div>
                </div>
                <div className="read-terms">
                    <input type="checkbox" name="" id="checkbox-term" />
                    <label style={{fontSize:"12px"}} htmlFor="checkbox-term">I confirm that all the information provided is correct.</label>
                </div>
            </div>
            <div className="payment-container">
                <span>Review your orders</span>
                <div className="display-cart-prod">

                </div>
            </div>
        </div>
    )
}
export default BuyProduct;
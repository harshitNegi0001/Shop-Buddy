import { BsBoxSeam } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { HiMiniCreditCard } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import '../stylesheet/buyProduct.css';
import toast from 'react-hot-toast';
import { useLocation } from "react-router-dom";
import loadingGif from '../assets/loading3.webp';
function BuyProduct() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const Backend_port = import.meta.env.VITE_BACKEND_PORT;
    const { userInfo } = useSelector(state => state.auth);
    const { myCartProd, quantity, grandtotal, subtotal } = location.state;
    const [deliveryMeth, setDeliveryMeth] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState({
        full_name: userInfo.name??'',
        email: userInfo.email??'',
        phone_no: userInfo.phone_no??'',
        address: {
            house_no: userInfo.address?.houseNo??'',
            city: userInfo.address?.cityName??'',
            district: userInfo.address?.district??'',
            pincode: userInfo.address?.pincode??'',
            state: userInfo.address?.state??''
        },
        confirmDetail: false
    });
    const [cardInfo, setCardInfo] = useState({
        cardNo: '',
        secCode: '',
        firstName: '',
        lastName: '',
        expiry: ''
    })
    const changeFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const changeAddress = (e) => {
        setFormData({ ...formData, address: { ...formData.address, [e.target.name]: e.target.value } })
    }
    const changeCardinfo = (e) => {
        setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
    }
    const bookOrder = async () => {
        const isValid = formData.address?.city && formData.address?.district && formData.address.house_no && formData.address?.pincode && formData.address?.state && formData.confirmDetail && formData.full_name && formData.email && formData.phone_no;
        if (!deliveryMeth || !isValid) {
            toast.error("Please fill all details");
        }
        else {
            const filledCard = cardInfo.cardNo && cardInfo.expiry && cardInfo.firstName && cardInfo.lastName && cardInfo.secCode;
            if (paymentMethod === 'card' && !filledCard) {
                toast.error("Please fill card details.");
            }
            else {
                try {
                    setIsLoading(true);
                    const response = await fetch(`${Backend_port}/api/book-my-order`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            formData: formData,
                            cardInfo: (paymentMethod === 'card') ? cardInfo : null,
                            myCartProd,
                            quantity,
                            deliveryMeth,
                            paymentMethod
                        }),
                        credentials: "include"
                    });
                    const result = await response.json();
                    setIsLoading(false);
                    if (response.ok) {
                        toast.success("Order queued");

                    }
                    else {
                        toast.error("Error! " + result.message);;
                    }
                } catch (err) {
                    setIsLoading(false);
                    toast.error("Error! " + err.message);
                }
            }

        }

    }
    return (
        <div className="buy-prod-page">
            {isLoading && <div className="loading-div"><img src={loadingGif} /></div>}
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
                    <input type="text" value={formData.full_name} onChange={(e) => changeFormData(e)} name="full_name" id="full-name" />
                </div>
                <div className="cust-full-email">
                    <label htmlFor="cust-email" style={{ fontSize: "14px" }}>Email: </label>
                    <input type="text" id="cust-email" value={formData.email} onChange={(e) => changeFormData(e)} name="email" />
                </div>
                <div className="cust-contact">
                    <label htmlFor="cust-phone" style={{ fontSize: "14px" }}>Phone No: </label>
                    <input type="text" id="cust-phone" value={formData.phone_no} onChange={(e) => changeFormData(e)} name="phone_no" />
                </div>

                <div className="address-details">
                    <div className="address-home-no">
                        <label htmlFor="cust-address-house" style={{ fontSize: "14px" }}>House No: </label>
                        <input type="text" id="cust-address-house" value={formData.address?.house_no} onChange={(e) => changeAddress(e)} name="house_no" />
                    </div>
                    <div className="address-city">
                        <label htmlFor="cust-address-city" style={{ fontSize: "14px" }}>City / Village: </label>
                        <input type="text" id="cust-address-city" value={formData.address?.city} onChange={(e) => changeAddress(e)} name="city" />
                    </div>
                    <div className="address-pincode">
                        <label htmlFor="cust-address-pincode" style={{ fontSize: "14px" }}>Pincode: </label>
                        <input type="number" id="cust-address-pincode" value={formData.address?.pincode} onChange={(e) => changeAddress(e)} name="pincode" />
                    </div>
                    <div className="address-district">
                        <label htmlFor="cust-address-dist" style={{ fontSize: "14px" }}>District: </label>
                        <input type="text" id="cust-address-dist" value={formData.address?.district} onChange={(e) => changeAddress(e)} name="district" />
                    </div>
                    <div className="address-state">
                        <label htmlFor="cust-address-state" style={{ fontSize: "14px" }}>State: </label>
                        <input type="text" id="cust-address-state" value={formData.address?.state} onChange={(e) => changeAddress(e)} name="state" />
                    </div>
                </div>
                <div className="read-terms">
                    <input type="checkbox" name="" id="checkbox-term" checked={formData.confirmDetail} onChange={(e) => setFormData({ ...formData, confirmDetail: e.target.checked })} />
                    <label style={{ fontSize: "12px" }} htmlFor="checkbox-term">I confirm that all the information provided is correct.</label>
                </div>
            </div>
            <div className="payment-container">
                <span>Review your orders</span>
                <div className="display-cart-prod scrollable">
                    {myCartProd.map((p, i) =>
                        <div key={i} style={{ width: "100%", height: "70px", boxSizing: "border-box", flexShrink: "0", display: "flex", gap: "5px" }}>
                            <img src={p.images[0]} style={{ width: "70px", objectFit: "contain", backgroundColor: "white", borderRadius: "5px", border: "1px solid var(--highlight)" }} alt="" />
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontSize: "12px", width: "100%", overflow: "hidden" }}>
                                <span style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}>{p.name}</span>
                                <span>{quantity[i]}x</span>
                                <span>₹ {(p.price * (1 - p.discount / 100)).toFixed(2)}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div style={{ width: "100%", height: "0px", border: "1px solid var(--highlight)", borderRadius: "5px" }}></div>
                <div className="price-box">
                    <div><span>Subtotal </span><span>₹ {subtotal}</span></div>
                    <div><span>Platform charges </span><span>₹ {(parseFloat(subtotal) * (0.1)).toFixed(2)}</span></div>
                    <div><span>Grand total </span><span>₹ {grandtotal}</span></div>
                </div>
                <div style={{ width: "100%", height: "0px", border: "1px solid var(--highlight)", borderRadius: "5px" }}></div>
                <div className="payment-method-cont">
                    <span style={{ fontSize: "14px" }}>Payment Method</span>
                    <div className="pay-methods" >
                        <div className={` ${(paymentMethod === 'ondelivery') ? 'active' : 'deactive'}`} onClick={() => setPaymentMethod('ondelivery')}>
                            <GiMoneyStack size={20} /> <span >Cash on Delivary</span>
                        </div>
                        <div className={` ${(paymentMethod === 'card') ? 'active' : 'deactive'}`} onClick={() => setPaymentMethod('card')}>
                            <HiMiniCreditCard size={18} /> <span>Card</span>
                        </div>
                    </div>
                    {
                        (paymentMethod === 'card') ? <div className="card-detail">
                            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: '3px', marginBottom: "15px" }}>
                                <span>Credit / Debit Card</span>
                                <div style={{ display: "flex", gap: "5px" }}>
                                    <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1759070737/jxdfpqtov1jx5mrtfotn.png" style={{ width: "35px", height: "25px", objectFit: "cover" }} alt="" />

                                    <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1759070777/xl0n7vfuzhizzxo9n18b.png" style={{ width: "35px", height: "25px", objectFit: "cover" }} alt="" />
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
                                <label style={{ fontSize: "12px" }} htmlFor="card-no">Card No :</label>
                                <input type="number" id="card-no" style={{ fontSize: "12px" }} value={cardInfo.cardNo} name="cardNo" onChange={(e) => changeCardinfo(e)} />
                            </div>
                            <div style={{ display: "flex", gap: '5px', marginTop: "8px", justifyContent: "space-between", flexWrap: "wrap" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
                                    <label style={{ fontSize: "12px" }} htmlFor="card-first-name">First Name :</label>
                                    <input type="text" id="card-first-name" style={{ fontSize: "12px", width: "120px" }} value={cardInfo.firstName} name="firstName" onChange={(e) => changeCardinfo(e)} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
                                    <label style={{ fontSize: "12px" }} htmlFor="card-last-name">Last Name :</label>
                                    <input type="text" id="card-last-name" style={{ fontSize: "12px", width: "120px" }} value={cardInfo.lastName} name="lastName" onChange={(e) => changeCardinfo(e)} />
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: '5px', marginTop: "8px", justifyContent: "space-between", flexWrap: "wrap" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
                                    <label style={{ fontSize: "12px" }} htmlFor="card-expiry">Expiry Date :</label>
                                    <input type="date" id="card-expiry" style={{ fontSize: "12px" }} value={cardInfo.expiry} name="expiry" onChange={(e) => changeCardinfo(e)} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: '5px' }}>
                                    <label style={{ fontSize: "12px" }} htmlFor="card-sec-code">Security code :</label>
                                    <input type="number" id="card-sec-code" style={{ fontSize: "12px", width: "120px" }} value={cardInfo.secCode} name="secCode" onChange={(e) => changeCardinfo(e)} />
                                </div>
                            </div>
                        </div> : null
                    }

                    <div className="buying-btn">
                        <button disabled={paymentMethod ? false : true} onClick={() => bookOrder()} style={{ cursor: `${(paymentMethod) ? 'pointer' : 'not-allowed'}` }}>{(paymentMethod === 'ondelivery') ? 'Complete Order' : 'Submit Payment'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BuyProduct;
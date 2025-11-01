import { useParams } from 'react-router-dom';
import sampleImage from '../../assets/image-sample.png'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function OrderDetails() {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState({});
    const [orderStatus, setOrderStatus] = useState('');
    const [customerAdd, setCustomerAdd] = useState({});
    const Backend_Port = import.meta.env.VITE_BACKEND_PORT;
    useEffect(() => {
        
        if (orderId) {
            getOrderDetail();
        }
    }, [orderId]);


    const getOrderDetail = async () => {
        try {
            const response = await fetch(`${Backend_Port}/api/get-order-detail?orderId=${orderId}`, {
                method: 'GET',
                credentials: "include"
            });
            const result = await response.json();
            if (response.ok) {
                
                setOrderDetails(result.orderDetail);
                setOrderStatus(result.orderDetail.order_status);
                setCustomerAdd(result.orderDetail.customer_address)
            }
            else {
                toast.error("Error! " + result.message);
            }
        } catch (err) {
            toast.error("Error! " + err.message);
        }
    }

    return (
        <div className="order-details-container" style={{ width: "90%", boxSizing: "border-box", padding: "15px 20px", borderRadius: "15px", backgroundColor: "rgb(132, 203, 250)", margin: "20px 0px", display: "flex", flexDirection: "column" }}>
            <div className="order-detail-header" style={{ width: "100%", boxSizing: "border-box", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span >Orders Details</span>
                <select name="order-status" id="order-status" style={{ width: "120px", background: "none", border: "2px solid black", borderRadius: "10px", height: "33px", textAlign: "center", outline: "none" }}>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="placed">Placed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>
            <div className="order-detail-main" style={{ boxSizing: "border-box", marginTop: "15px", padding: "5px 0px", display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
                <div className="od-main-left" style={{ width: "260px" }}>
                    <div style={{ display: "flex", gap: "10px", fontSize: "14px" }}><span>#{orderDetails?.order_id}</span><span>{
                        new Date(orderDetails?.ordered_date?.replace(" ", "T"))
                            .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                            .replaceAll("/", " ")
                    }</span></div>
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>Deliver to : {orderDetails?.customer_name}</div>
                    <div style={{ fontSize: "12px" }}>{customerAdd?.houseNo} {customerAdd?.cityName}, {customerAdd?.pincode} {customerAdd?.district} {customerAdd?.state}  </div>
                    <div style={{ fontSize: "14px" }}>Payment status : <span style={{ fontWeight: "600" }}>{orderDetails?.payment_status}</span></div>
                    <div style={{ fontSize: "14px" }}>Price : ₹{orderDetails?.total_cost}</div>
                    <div >
                        {orderDetails?.products?.map((p, i) => <div key={i} style={{ backgroundColor: "var(--mess-outer)", fontSize: "12px", display: "flex", width: "100%", boxSizing: "border-box", padding: "5px", gap: "5px", marginTop: "10px", height: "70px", borderRadius: "10px", color: "white", alignItems: "center" }}>
                            <img src={p?.images[0]} style={{ width: "40px", height: "40px", borderRadius: "5px", backgroundColor: "white", objectFit: "contain" }} alt="img" />
                            <div style={{ display: 'flex', flexDirection: "column", width: "calc(100% - 50px)" }}>
                                <span style={{ width: "100%", textWrap: "nowrap", overflow: "hidden", textOverflow: 'ellipsis' }}>{p.name}</span>
                                <span>Brand : {p.brand}</span>
                                <span>Quantity : {orderDetails.quantity[orderDetails.products_id.indexOf(p.id)]}</span>
                            </div>
                        </div>)}

                    </div>
                </div>
            </div>
        </div>
    )
}
export default OrderDetails;
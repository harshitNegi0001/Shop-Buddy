import { useEffect, useState } from 'react';
import '../stylesheet/ordersHistory.css';
import toast from 'react-hot-toast';
import loadingGif from '../assets/loading3.webp';

function OrdersDetail() {
    const [isLoading, setIsLoading] = useState(false);
    const [ordersHistory, setOrdersHistory] = useState([]);
    const Backend_Port = import.meta.env.VITE_BACKEND_PORT;
    useEffect(() => {
        getMyOrderHistory();
    }, [])
    const getMyOrderHistory = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${Backend_Port}/api/get-my-orders-hist`, {
                method: "GET",
                credentials: 'include'
            });
            const result = await response.json();
            setIsLoading(false);
            if (response.ok) {
                setOrdersHistory(result.ordersList);
                // console.log(result.ordersList);
            }
            else {
                toast.error("Error! " + result.message);
            }
        } catch (err) {
            setIsLoading(false);
            toast.error("Error! " + err.message);
        }


    }
    return (
        <div className="order-hist-page">
            {isLoading && <div className="loading-div"><img src={loadingGif} /></div>}
            <span style={{ fontSize: "26px", color: "var(--primary)", fontWeight: '500' }}>Orders History</span>
            <div className="order-hist-container">

                {ordersHistory.map((o, i) =>
                    <div key={i} className="hist-prod-card">
                        {
                            o.prod_info?.map((p, j) =>
                                <div key={j} style={{ display: "flex", alignItems: "center", height: "100px", gap: "10px" }}>
                                    <img src={p.images[0]} alt="" />
                                    <div style={{ width: "0px", height: "100%", border: "1px solid  var(--highlight)", borderRadius: "5px" }}>

                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", fontSize: "12px", width: "calc(100% - 125px)" }}>
                                        <span style={{ overflow: "hidden", textOverflow: 'ellipsis', textWrap: "nowrap", width: "100%" }}>{p.name}</span>
                                        <span>{p.brand}</span>
                                        {/* <span>{p.price}</span> */}
                                        {/* <span>{o.order_status}</span> */}
                                    </div>
                                </div>
                            )
                        }
                        <div style={{ width: "100%", height: "0px", border: "1px solid var(--muted-text)", borderRadius: "5px" }}></div>
                        <div style={{ display: "flex", flexDirection: "column", fontSize: '12px' }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}> <span>Total</span>  <span>₹ {o.total_cost}</span></div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Order Status </span><span> {o.order_status}</span></div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Payment status </span> <span>{o.payment_status}</span></div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Ordered Date</span> <span>{
                                new Date(o.created_at.replace(" ", "T"))
                                    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                                    .replaceAll("/", " ")
                            }</span></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrdersDetail;
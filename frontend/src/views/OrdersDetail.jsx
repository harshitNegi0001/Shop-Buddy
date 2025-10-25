import { useEffect, useState } from 'react';
import '../stylesheet/ordersHistory.css';
import toast from 'react-hot-toast';

function OrdersDetail() {
    const [ordersHistory, setOrdersHistory] = useState([]);
const Backend_Port = import.meta.env.VITE_BACKEND_PORT;
    useEffect(() => {
        getMyOrderHistory();
    }, [])
    const getMyOrderHistory = async () => {
        try {

            const response = await fetch(`${Backend_Port}/api/get-my-orders-hist`,{
                method:"GET",
                credentials:'include'
            });
            const result = await response.json();

            if(response.ok){
                setOrdersHistory(result.ordersList);
                console.log(result.ordersList);
            }
            else{
                toast.error("Error! "+result.message);
            }
        } catch (err) {
            toast.error("Error! "+err.message);
        }


    }
    return (
        <div className="order-hist-page">
            <span style={{ fontSize: "26px", color: "var(--primary)", fontWeight: '500' }}>Orders History</span>
            <div className="order-hist-container">

                {ordersHistory.map((o,i) =>
                    <div key={i} className="hist-prod-card">
                        {/* <img src={o} alt="" /> */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrdersDetail;
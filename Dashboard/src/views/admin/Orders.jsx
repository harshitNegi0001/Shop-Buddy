import { useState } from "react";
import { LuArrowDownFromLine } from "react-icons/lu";
import toast from 'react-hot-toast';
import '../../stylesheet/Orders.css'
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useEffect } from "react";

function Orders() {
    const [currPage, setCurrPage] = useState(1);
    //const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    const [showElement, setShowElement] = useState(false);
    const [orders, setOrders] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const Backend_port = import.meta.env.VITE_BACKEND_PORT;

    useEffect(() => {
        getOrders();
    }, [currPage,parPage]);

    const getOrders = async () => {
        try {
            const response = await fetch(`${Backend_port}/api/get-all-orders?parPage=${parPage}&&currPage=${currPage}`,
                {
                    method: 'GET',
                    credentials: "include"
                }
            );
            const result = await response.json();

            if (response.ok) {
                setOrders(result.orders);
                
                setTotalItem(result.total);

            }
            else {
                toast.error('Error! ' + result.message);

            }

        } catch (err) {
            toast.error("Error! " + err.message);
        }
    }

    return (
        <div className="orders-list">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <select name="" id="" onChange={e => setParPage(e.target.value)} style={{ width: "50px", borderRadius: "10px" }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                {/* <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    </div> */}
            </div>
            <div>
                <div className="orders-list-header">
                    <div style={{ width: "18%" }}>Orders id</div>
                    <div style={{ width: "14%" }}>Price</div>
                    <div style={{ width: "24%" }}>Payment Status</div>
                    <div style={{ width: "20%" }}>Order Status</div>
                    <div style={{ width: "18%" }}>Action</div>
                    <div style={{ width: "5%" }}><LuArrowDownFromLine /></div>
                </div>

                <div>
                    {orders.map((o, i) => <div key={i} style={{ borderBottom: "1px solid var(--text)" }}>
                        <div className="orders-list-body">
                            <div style={{ width: "18%" }}>#{o.id}</div>
                            <div style={{ width: "14%" }}>₹{o.total_cost}</div>
                            <div style={{ width: "24%" }}>{o.payment_status}</div>
                            <div style={{ width: "20%" }}>{o.order_status}</div>
                            <div style={{ width: "18%" }}><Link to={`/admin/dashboard/orders/details/${o.id}`} style={{ color: "yellowgreen" }}>view</Link></div>
                            <div style={{ width: "5%" }} onClick={e => setShowElement(!showElement)}><LuArrowDownFromLine /></div>
                        </div>
                        {showElement && <div className="orders-list-element">
                            {o.products_id.map((p,j)=><div className="orders-list-element-inner">
                                <div style={{ width: "18%" }}>#{p} </div>
                                <div style={{ width: "14%" }}>₹{o.prices[j]}</div>
                                <div style={{ width: "24%" }}>{o.payment_status} </div>
                                <div style={{ width: "20%" }}>{o.order_status} </div>
                                <div style={{ width: "18%" }}></div>
                                <div style={{ width: "5%" }}></div>
                            </div>)}
                            
                        </div>}
                    </div>)}

                </div>

            </div>
            <div style={{ position: "absolute", right: "20px", marginTop: "10px" }}>
                <Pagination currPage={currPage} setCurrPage={setCurrPage} totalItem={totalItem} parPage={parPage} showItem={3} />
            </div>
        </div>
    )
}
export default Orders;
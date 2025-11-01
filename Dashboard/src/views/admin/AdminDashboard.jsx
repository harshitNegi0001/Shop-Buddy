import { MdCurrencyRupee } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import Chart from 'react-apexcharts'
import { FaAngleDoubleRight } from "react-icons/fa";
import imageSample from "../../assets/image-sample.png";
import { state } from "./dashboardChart";
import '../../stylesheet/dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

function AdminDashboard() {
    const Backend_Port = import.meta.env.VITE_BACKEND_PORT;
    const [latestMsg, setLatestMsg] = useState([]);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getLatestMessage();
        getOrders()
    }, [])
    const getLatestMessage = async () => {
        try {
            const response = await fetch(`${Backend_Port}/api/msg/get-latest-msg`, {
                method: 'GET',
                credentials: 'include'
            });
            const result = await response.json();
            if (response.ok) {
                setLatestMsg(result.latestMsg);
            }
            else {
                toast.error('Error! ' + result.message);
            }
        } catch (err) {
            toast.error('Error! ' + err.message)
        }
    }
    const getOrders = async () => {
        try {
            const response = await fetch(`${Backend_Port}/api/get-all-orders?parPage=${5}&&currPage=${1}`,
                {
                    method: 'GET',
                    credentials: "include"
                }
            );
            const result = await response.json();

            if (response.ok) {
                setOrders(result.orders);
            }
            else {
                toast.error('Error! ' + result.message);
            }

        } catch (err) {
            toast.error("Error! " + err.message);
        }
    }
    return (
        <div className="admin-dash" >
            <div className="upper-dash" >
                <div className="small-upper-dash" style={{ backgroundColor: "rgba(181, 250, 185, 1)" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>
                            $12093
                        </span>
                        <span style={{ color: "black", fontSize: "12px" }}>
                            Total sales
                        </span>
                    </div>
                    <div id="rupee-curr-dash"><MdCurrencyRupee /></div>
                </div>
                <div className="small-upper-dash" style={{ backgroundColor: "rgba(236, 173, 255, 1)" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>
                            120
                        </span>
                        <span style={{ color: "black", fontSize: "12px" }}>
                            products
                        </span>
                    </div>
                    <div id="product-curr-dash"><TiShoppingCart /></div>
                </div>
                <div className="small-upper-dash" style={{ backgroundColor: "rgb(253, 198, 116)" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>
                            20
                        </span>
                        <span style={{ color: "black", fontSize: "12px" }}>
                            sellers
                        </span>
                    </div>
                    <div id="seller-curr-dash"><FaUsers /></div>
                </div>
                <div className="small-upper-dash" style={{ backgroundColor: "rgba(151, 196, 253, 1)" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>
                            9999
                        </span>
                        <span style={{ color: "black", fontSize: "12px" }}>
                            orders
                        </span>
                    </div>
                    <div id="order-curr-dash"><BsCartCheckFill /></div>
                </div>
            </div>
            <div className="middle-dash">
                <div className="chart" style={{ backgroundColor: "var(--card-bg)", borderRadius: "10px", maxWidth: "500px" }}>
                    <Chart type="bar" width={'100%'} options={state.options} series={state.series} />
                </div>
                <div className="quick-message" >
                    <div className="upper-quick" style={{ color: "var(--text)", fontSize: "12px", width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <span>Recent Seller Message</span>
                        <Link to='live-chat' style={{ textDecoration: "none", color: "var(--text)", display: "flex", alignItems: "center" }}><span>View All</span><FaAngleDoubleRight /></Link>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "200px", margin: "30px 0px" }}>

                        {latestMsg.map((msg, i) => <div key={i} className="main-quick" >
                            <div className="pre-profile" onClick={() => navigate(`/admin/dashboard/live-chat/${msg.s_id}`)}>
                                <img src={msg.s_image} alt="dp" style={{ width: "35px", height: '35px', objectFit: "cover", borderRadius: "20px" }} />
                            </div>
                            <div className="pre-box" onClick={() => navigate(`/admin/dashboard/live-chat/${msg.s_id}`)} style={{ cursor: 'pointer' }}>
                                <div>
                                    <span>
                                        {msg.s_name}
                                    </span>
                                </div>
                                <div className="message-box" >
                                    <p>{msg.msg}</p>
                                </div>
                            </div>
                        </div>)}

                    </div>
                </div>
            </div>
            <div className="recent-order" style={{ width: "99%", margin: "30px 0px", boxSizing: "border-box", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--card-bg)", color: "var(--text)", borderRadius: "10px", fontSize: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <span>
                        Recent Orders
                    </span>
                    <Link to='/admin/dashboard/orders' style={{ textDecoration: "none", color: "var(--text)", display: "flex", alignItems: "center" }}><span>View All</span><FaAngleDoubleRight /></Link>
                </div>
                <div style={{ width: "98%", marginTop: "15px" }}>
                    <table style={{
                        width: "100%", textAlign: "center", borderCollapse: "separate", borderSpacing: "0 10px"
                    }}>
                        <thead >
                            <tr >
                                <th scope="col" style={{ borderBottom: "1px solid var(--text)" }}>Order Id</th>
                                <th scope="col" style={{ borderBottom: "1px solid var(--text)" }}>Price</th>
                                <th scope="col" style={{ borderBottom: "1px solid var(--text)" }}>Payment Status</th>
                                <th scope="col" style={{ borderBottom: "1px solid var(--text)" }}>Order Status</th>
                                <th scope="col" style={{ borderBottom: "1px solid var(--text)" }}>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o,i)=><tr key={i}>
                                <td>#{o.id}</td>
                                <td>₹{o.total_cost}</td>
                                <td>{o.payment_status}</td>
                                <td>{o.order_status}</td>
                                <td><Link style={{color:'greenyellow'}} to={`/admin/dashboard/orders/details/${o.id}`}>View</Link></td>
                            </tr>)}
                            
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}
export default AdminDashboard;
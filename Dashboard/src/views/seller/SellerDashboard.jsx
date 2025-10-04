import { MdCurrencyRupee } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { BsCartCheckFill } from "react-icons/bs";
import Chart from 'react-apexcharts';
import { MdOutlinePendingActions } from "react-icons/md";
import { FaAngleDoubleRight } from "react-icons/fa";
import imageSample from "../../assets/image-sample.png";
import '../../stylesheet/dashboard.css';
import { Link } from "react-router-dom";
function SellerDashboard (){
    const state = {
        series: [
            {
                name: 'Orders',
                data: [20, 30, 34, 23, 45, 50, 54, 57, 60, 65, 70, 94]
            },
            {
                name: 'Revenue',
                data: [10, 20, 24, 12, 14, 25, 30, 29, 40, 43, 50, 74]
            },
            {
                name: 'Sales',
                data: [10, 20, 34, 43, 55, 60, 74, 87, 90, 75, 50, 44]
            }
        ],
        options: {
            xaxis: {
                categories: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
            },

            // colors: ['orange', 'darkturquoise','yellowgreen'],
            chart: {
                background: 'transparent',
                foreColor: 'var(--text)'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                curve: ['smooth', 'straight', 'stepline'],
                lineCap: 'butt',
                colors: "red",
                width: .5,
                dashArray: 0
            },
            legend: {
                position: 'top'
            },
            responsive: [
                {
                    breakpoint: 550,
                    options: {
                        chart: {
                            width: '100%'
                        }
                    }
                }
            ]
        }
    }
    return(
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
                            Products
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
                            Orders
                        </span>
                    </div>
                    <div id="seller-curr-dash"><BsCartCheckFill /></div>
                </div>
                <div className="small-upper-dash" style={{ backgroundColor: "rgba(151, 196, 253, 1)" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>
                            99
                        </span>
                        <span style={{ color: "black", fontSize: "12px" }}>
                            Pending Orders
                        </span>
                    </div>
                    <div id="order-curr-dash"><MdOutlinePendingActions /></div>
                </div>
            </div>
            <div className="middle-dash">
                <div className="chart" style={{ backgroundColor: "var(--card-bg)", borderRadius: "10px", maxWidth: "500px" }}>
                    <Chart type="bar" width={'100%'} options={state.options} series={state.series} />
                </div>
                <div className="quick-message" >
                    <div className="upper-quick" style={{ color: "var(--text)", fontSize: "12px", width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <span>Recent Customer Message</span>
                        <Link to='chat-customer' style={{ textDecoration: "none", color: "var(--text)", display: "flex", alignItems: "center" }}><span>View All</span><FaAngleDoubleRight /></Link>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "200px", margin: "30px 0px" }}>
                        <div className="main-quick" >
                            <div className="pre-profile">
                                <img src={imageSample} alt="dp" style={{ width: "25px", borderRadius: "15px" }} />
                            </div>
                            <div className="pre-box" >
                                <div>
                                    <span >
                                        Yogesh Jani
                                    </span>
                                </div>
                                <div className="message-box" >
                                    <p>How are you?</p>
                                </div>
                            </div>
                        </div>
                        <div className="main-quick" >
                            <div className="pre-profile">
                                <img src={imageSample} alt="dp" style={{ width: "25px", borderRadius: "15px" }} />
                            </div>
                            <div className="pre-box" >
                                <div>
                                    <span>
                                        Yogesh Jani
                                    </span>
                                </div>
                                <div className="message-box" >
                                    <p>hello</p>
                                </div>
                            </div>
                        </div>
                        <div className="main-quick" >
                            <div className="pre-profile">
                                <img src={imageSample} alt="dp" style={{ width: "25px", borderRadius: "15px" }} />
                            </div>
                            <div className="pre-box" >
                                <div>
                                    <span>
                                        Piyush
                                    </span>
                                </div>
                                <div className="message-box" >
                                    <p>I am getting problems, Please help me </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="recent-order" style={{ width: "99%",  margin: "30px 0px", boxSizing: "border-box", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--card-bg)", color: "var(--text)", borderRadius: "10px", fontSize: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <span>
                        Recent Orders
                    </span>
                    <Link to='orders' style={{ textDecoration: "none", color: "var(--text)", display: "flex", alignItems: "center" }}><span>View All</span><FaAngleDoubleRight /></Link>
                </div>
                <div style={{ width: "98%", marginTop: "15px" }}>
                    <table style={{
                        width: "100%", textAlign: "center",borderCollapse: "separate",borderSpacing: "0 10px"}}>
                        <thead >
                            <tr >
                                <th scope="col" style={{borderBottom: "1px solid var(--text)"}}>Order Id</th>
                                <th scope="col" style={{borderBottom: "1px solid var(--text)"}}>Price</th>
                                <th scope="col" style={{borderBottom: "1px solid var(--text)"}}>Payment Status</th>
                                <th scope="col" style={{borderBottom: "1px solid var(--text)"}}>Order Status</th>
                                <th scope="col" style={{borderBottom: "1px solid var(--text)"}}>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10001</td>
                                <td>₹100</td>
                                <td>Pendding</td>
                                <td>Pendding</td>
                                <td>View</td>
                            </tr>
                            <tr>
                                <td>10001</td>
                                <td>₹100</td>
                                <td>Pendding</td>
                                <td>Pendding</td>
                                <td>View</td>
                            </tr>
                            <tr>
                                <td>10001</td>
                                <td>₹100</td>
                                <td>Pendding</td>
                                <td>Pendding</td>
                                <td>View</td>
                            </tr><tr>
                                <td>10001</td>
                                <td>₹100</td>
                                <td>Pendding</td>
                                <td>Pendding</td>
                                <td>View</td>
                            </tr><tr>
                                <td>10001</td>
                                <td>₹100</td>
                                <td>Pendding</td>
                                <td>Pendding</td>
                                <td>View</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}
export default SellerDashboard;
import { useState,useEffect } from 'react';
import searchIcon from '../../assets/searchIcon.png';
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';

import '../../stylesheet/allProducts.css';
import { Link } from 'react-router-dom';

function Orders() {
    const [currPage, setCurrPage] = useState(1);
    const [parPage, setParPage] = useState(5);
    const [orders, setOrders] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const Backend_port = import.meta.env.VITE_BACKEND_PORT;

    useEffect(() => {
        getOrders();
    }, [currPage, parPage]);



    const getOrders = async () => {
        try {
            const response = await fetch(`${Backend_port}/api/get-sellers-orders?parPage=${parPage}&&currPage=${currPage}`,
                {
                    method: 'GET',
                    credentials: "include"
                }
            );
            const result = await response.json();

            if (response.ok) {
                setOrders(result.orders);
                // console.log(result.orders)
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
        <div className="all-product">
            <div style={{ color: "var(--text)" }}>Orders</div>
            <div className='card-search' >
                <select name="" id="" onChange={e => setParPage(e.target.value)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                {/* <div >
                    <input type="text" id="search-inp" placeholder="Search" />
                    <img  src={searchIcon} alt="Search-icon" />
                </div> */}
            </div>




            <div className='orders-list-seller' >
                <table >
                    <thead >
                        <tr >
                            <th scope="col" >Order Id</th>
                            <th scope="col" >Price</th>
                            <th scope="col" >Payment Status</th>
                            <th scope="col" >Order Status</th>
                            <th scope="col" >Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o,i) => <tr key={i}>
                            <td>#{o.id}</td>
                            <td>₹{o.total_cost}</td>
                            <td>{o.payment_status}</td>
                            <td>{o.order_status}</td>
                            <td><Link to={`/seller/dashboard/order/detail/${o.id}`}><div className='order-view' ><FaEye /></div></Link></td>
                        </tr>)}
                    </tbody>

                </table>
            </div>
            <div className='paging-div' >
                <div >
                    <Pagination currPage={currPage} setCurrPage={setCurrPage} totalItem={totalItem} parPage={parPage} showItem={3} />
                </div>
            </div>
        </div>

    )
}
export default Orders;
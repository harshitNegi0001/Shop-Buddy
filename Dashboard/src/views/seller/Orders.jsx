import { useState } from 'react';
import searchIcon from '../../assets/searchIcon.png';
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";


import '../../stylesheet/allProducts.css';
import { Link } from 'react-router-dom';

function Orders() {
    const [currPage, setCurrPage] = useState(1);
    //const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    return (
        <div className="all-product">
            <div style={{ color: "var(--text)" }}>Orders</div>
            <div className='card-search' >
                <select name="" id="" onChange={e => setParPage(e.target.value)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                <div >
                    <input type="text" id="search-inp" placeholder="Search" />
                    <img  src={searchIcon} alt="Search-icon" />
                </div>
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
                        {[1,2,3,4,5].map((index)=><tr key={index}>
                            <td>1000{index}</td>
                            <td>₹100</td>
                            <td>Pendding</td>
                            <td>Pendding</td>
                            <td><Link to={`/seller/dashboard/order/detail/${index}`}><div className='order-view' ><FaEye /></div></Link></td>
                        </tr>)}
                    </tbody>

                </table>
            </div>
            <div className='paging-div' >
                <div >
                    <Pagination currPage={currPage} setCurrPage={setCurrPage} totalItem={50} parPage={parPage} showItem={3} />
                </div>
            </div>
        </div>

    )
}
export default Orders;
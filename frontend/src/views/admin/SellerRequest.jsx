import '../../stylesheet/Sellers.css';
import { useState } from 'react';
import searchIcon from '../../assets/searchIcon.png';
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';

function SellerRequests() {
    const [currPage, setCurrPage] = useState(1);
    //const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    return (
        <div className="sellers">
            <div><span style={{color:"var(--text)"}}>Deactive Seller</span></div>
            <div style={{ display: "flex",marginTop:"10px", width: "100%", justifyContent: "space-between" }}>
                <select name="" id="" onChange={e => setParPage(e.target.value)} style={{ width: "50px", borderRadius: "10px" }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input type="text" id="search-inp" placeholder="Search" />
                    <img style={{ width: "20px", position: "absolute", right: "9px" }} src={searchIcon} alt="Search-icon" />
                </div>
            </div>
            <div className="sellers-list">
                <div className="sellers-header">
                    <div style={{ width: "10%" }}>No.</div>
                    <div style={{ width: "18%" }}>Name</div>
                    <div style={{ width: "20%" }}>Pay status</div>
                    <div style={{ width: "24%" }}>Email</div>
                    <div style={{ width: "14%" }}>status</div>
                    <div style={{ width: "14%" }}>Action</div>
                </div>
                <div className="sellers-body">
                    <div style={{ width: "10%" }}>1</div>
                    <div style={{ width: "18%" }}>Harsh...</div>
                    <div style={{ width: "20%" }}>active</div>
                    <div style={{ width: "24%" }}>negihar...</div>
                    <div style={{ width: "14%" }}>dea...</div>
                    <div style={{ width: "14%", display: "flex", justifyContent: "center" }}><Link to={'/admin/dashboard/seller/details/1'} style={{ width: "18px",color:"var(--text)", height: "18px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "3px" }}><FaEye /></Link></div>
                </div>
                <div className="sellers-body">
                    <div style={{ width: "10%" }}>2</div>
                    <div style={{ width: "18%" }}>Harsh...</div>
                    <div style={{ width: "20%" }}>active</div>
                    <div style={{ width: "24%" }}>negihar...</div>
                    <div style={{ width: "14%" }}>dea...</div>
                    <div style={{ width: "14%", display: "flex", justifyContent: "center" }}><Link to={'/admin/dashboard/seller/details/2'} style={{ width: "18px",color:"var(--text)", height: "18px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "3px" }}><FaEye /></Link></div>
                </div>
                <div className="sellers-body">
                    <div style={{ width: "10%" }}>3</div>
                    <div style={{ width: "18%" }}>Harsh...</div>
                    <div style={{ width: "20%" }}>active</div>
                    <div style={{ width: "24%" }}>negihar...</div>
                    <div style={{ width: "14%" }}>dea...</div>
                    <div style={{ width: "14%", display: "flex", justifyContent: "center" }}><Link to={'/admin/dashboard/seller/details/3'} style={{ width: "18px",color:"var(--text)", height: "18px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "3px" }}><FaEye /></Link></div>
                </div>
                <div className="sellers-body">
                    <div style={{ width: "10%" }}>4</div>
                    <div style={{ width: "18%" }}>Harsh...</div>
                    <div style={{ width: "20%" }}>active</div>
                    <div style={{ width: "24%" }}>negihar...</div>
                    <div style={{ width: "14%" }}>dea...</div>
                    <div style={{ width: "14%", display: "flex", justifyContent: "center" }}><Link to={'/admin/dashboard/seller/details/4'} style={{ width: "18px",color:"var(--text)", height: "18px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "3px" }}><FaEye /></Link></div>
                </div>

            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                <div >
                    <Pagination currPage={currPage} setCurrPage={setCurrPage} totalItem={50} parPage={parPage} showItem={3} />
                </div>
            </div>
        </div>
    )
}
export default SellerRequests;
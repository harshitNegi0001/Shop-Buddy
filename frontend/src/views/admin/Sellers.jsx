import '../../stylesheet/sellers.css';
import { useState } from 'react';
import searchIcon from '../../assets/searchIcon.png';
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";


function Sellers() {
    const [currPage, setCurrPage] = useState(1);
    //const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    return (
        <div className="sellers">
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
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
                    <div style={{ width: "8%" }}>No.</div>
                    <div style={{ width: "20%" }}>Name</div>
                    <div style={{ width: "18%" }}>Shop Name</div>
                    <div style={{ width: "15%" }}>Pay status</div>
                    <div style={{ width: "25%" }}>Email</div>
                    <div style={{ width: "14%" }}>Action</div>
                </div>
                <div className="sellers-body">
                    <div style={{ width: "8%" }}>1</div>
                    <div style={{ width: "20%" }}>Harsh...</div>
                    <div style={{ width: "18%" }}>Jagda...</div>
                    <div style={{ width: "15%" }}>pend...</div>
                    <div style={{ width: "25%" }}>negiha...</div>
                    <div style={{ width: "14%", display: "flex", justifyContent: "center" }}><span style={{ width: "18px", height: "18px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "3px" }}><FaEye /></span></div>
                </div>
                <div className="sellers-body">
                    <div style={{ width: "8%" }}>2</div>
                    <div style={{ width: "20%" }}>Harsh...</div>
                    <div style={{ width: "18%" }}>Jagda...</div>
                    <div style={{ width: "15%" }}>pend...</div>
                    <div style={{ width: "25%" }}>negiha...</div>
                    <div style={{ width: "14%", display: "flex", justifyContent: "center" }}><span style={{ width: "18px", height: "18px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "3px" }}><FaEye /></span></div>
                </div>
                <div className="sellers-body">
                    <div style={{ width: "8%" }}>3</div>
                    <div style={{ width: "20%" }}>Harsh...</div>
                    <div style={{ width: "18%" }}>Jagda...</div>
                    <div style={{ width: "15%" }}>pend...</div>
                    <div style={{ width: "25%" }}>negiha...</div>
                    <div style={{ width: "14%", display: "flex", justifyContent: "center" }}><span style={{ width: "18px", height: "18px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "3px" }}><FaEye /></span></div>
                </div>
                <div className="sellers-body">
                    <div style={{ width: "8%" }}>4</div>
                    <div style={{ width: "20%" }}>Harsh...</div>
                    <div style={{ width: "18%" }}>Jagda...</div>
                    <div style={{ width: "15%" }}>pend...</div>
                    <div style={{ width: "25%" }}>negiha...</div>
                    <div style={{ width: "14%", display: "flex", justifyContent: "center" }}><span style={{ width: "18px", height: "18px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "3px" }}><FaEye /></span></div>
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
export default Sellers;
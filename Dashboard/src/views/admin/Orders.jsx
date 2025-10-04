import { useState } from "react";
import searchIcon from '../../assets/searchIcon.png';
import { LuArrowDownFromLine } from "react-icons/lu";

import '../../stylesheet/Orders.css'
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

function Orders() {
    const [currPage, setCurrPage] = useState(1);
    //const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    const [showElement, setShowElement] = useState(false);
    return (
        <div className="orders-list">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <select name="" id="" onChange={e=>setParPage(e.target.value)} style={{ width: "50px", borderRadius: "10px" }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input type="text" id="search-inp" placeholder="Search" />
                    <img style={{ width: "20px", position: "absolute", right: "9px" }} src={searchIcon} alt="Search-icon" />
                </div>
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
                    <div style={{ borderBottom: "1px solid var(--text)" }}>
                        <div className="orders-list-body">
                            <div style={{ width: "18%" }}>#1001</div>
                            <div style={{ width: "14%" }}>$299</div>
                            <div style={{ width: "24%" }}>Pendding</div>
                            <div style={{ width: "20%" }}>Pendding</div>
                            <div style={{ width: "18%" }}><Link to='details/1' style={{color:"yellowgreen"}}>view</Link></div>
                            <div style={{ width: "5%" }} onClick={e=>setShowElement(!showElement)}><LuArrowDownFromLine /></div>
                        </div>
                        {showElement&&<div className="orders-list-element">
                            <div className="orders-list-element-inner">
                                <div style={{ width: "18%" }}>#1001 </div>
                                <div style={{ width: "14%" }}>$299</div>
                                <div style={{ width: "24%" }}>Pendding </div>
                                <div style={{ width: "20%" }}>Pendding </div>
                                <div style={{ width: "18%" }}></div>
                                <div style={{ width: "5%" }}></div>
                            </div>
                            <div className="orders-list-element-inner">
                                <div style={{ width: "18%" }}>#1001 </div>
                                <div style={{ width: "14%" }}>$299</div>
                                <div style={{ width: "24%" }}> Pendding</div>
                                <div style={{ width: "20%" }}>Pendding </div>
                                <div style={{ width: "18%" }}></div>
                                <div style={{ width: "5%" }}></div>
                            </div>
                        </div>}
                    </div>
                    <div style={{ borderBottom: "1px solid var(--text)" }}>
                        <div className="orders-list-body">
                            <div style={{ width: "18%" }}>#1001</div>
                            <div style={{ width: "14%" }}>$299</div>
                            <div style={{ width: "24%" }}>Pendding</div>
                            <div style={{ width: "20%" }}>Pendding</div>
                            <div style={{ width: "18%" }}><Link to='details/2' style={{color:"yellowgreen"}}>view</Link></div>
                            <div style={{ width: "5%" }} onClick={e=>setShowElement(!showElement)}><LuArrowDownFromLine /></div>
                        </div>
                        {showElement&&<div className="orders-list-element">
                            <div className="orders-list-element-inner">
                                <div style={{ width: "18%" }}>#1001 </div>
                                <div style={{ width: "14%" }}>$299</div>
                                <div style={{ width: "24%" }}>Pendding </div>
                                <div style={{ width: "20%" }}> Pendding</div>
                                <div style={{ width: "18%" }}></div>
                                <div style={{ width: "5%" }}></div>
                            </div>
                            <div className="orders-list-element-inner">
                                <div style={{ width: "18%" }}>#1001</div>
                                <div style={{ width: "14%" }}>$299</div>
                                <div style={{ width: "24%" }}>Pendding</div>
                                <div style={{ width: "20%" }}>Pendding</div>
                                <div style={{ width: "18%" }}></div>
                                <div style={{ width: "5%" }}></div>
                            </div>
                        </div>}
                    </div>
                    <div style={{ borderBottom: "1px solid var(--text)" }}>
                        <div className="orders-list-body">
                            <div style={{ width: "18%" }}>#1001</div>
                            <div style={{ width: "14%" }}>$299</div>
                            <div style={{ width: "24%" }}>Pendding</div>
                            <div style={{ width: "20%" }}>Pendding</div>
                            <div style={{ width: "18%" }}><Link to='details/3' style={{color:"yellowgreen"}}>view</Link></div>
                            <div style={{ width: "5%" }} onClick={e=>setShowElement(!showElement)}><LuArrowDownFromLine /></div>
                        </div>
                        {showElement&&<div className="orders-list-element">
                            <div className="orders-list-element-inner">
                                <div style={{ width: "18%" }}>#1001</div>
                                <div style={{ width: "14%" }}>$299</div>
                                <div style={{ width: "24%" }}>Pendding</div>
                                <div style={{ width: "20%" }}>Pendding</div>
                                <div style={{ width: "18%" }}></div>
                                <div style={{ width: "5%" }}></div>
                            </div>
                            <div className="orders-list-element-inner">
                                <div style={{ width: "18%" }}>#1001</div>
                                <div style={{ width: "14%" }}>$299</div>
                                <div style={{ width: "24%" }}>Pendding</div>
                                <div style={{ width: "20%" }}>Pendding</div>
                                <div style={{ width: "18%" }}></div>
                                <div style={{ width: "5%" }}></div>
                            </div>
                        </div>}
                    </div>
                    <div style={{ borderBottom: "1px solid var(--text)" }}>
                        <div className="orders-list-body">
                            <div style={{ width: "18%" }}>#1001</div>
                            <div style={{ width: "14%" }}>$299</div>
                            <div style={{ width: "24%" }}>Pendding</div>
                            <div style={{ width: "20%" }}>Pendding</div>
                            <div style={{ width: "18%" }}><Link to='details/4' style={{color:"yellowgreen"}}>view</Link></div>
                            <div style={{ width: "5%" }} onClick={e=>setShowElement(!showElement)}><LuArrowDownFromLine /></div>
                        </div>
                        {showElement&&<div className="orders-list-element">
                            <div className="orders-list-element-inner">
                                <div style={{ width: "18%" }}>#1001</div>
                                <div style={{ width: "14%" }}>$299</div>
                                <div style={{ width: "24%" }}>Pendding</div>
                                <div style={{ width: "20%" }}>Pendding</div>
                                <div style={{ width: "18%" }}></div>
                                <div style={{ width: "5%" }}></div>
                            </div>
                            <div className="orders-list-element-inner">
                                <div style={{ width: "18%" }}>#1001</div>
                                <div style={{ width: "14%" }}>$299</div>
                                <div style={{ width: "24%" }}>Pendding</div>
                                <div style={{ width: "20%" }}>Pendding</div>
                                <div style={{ width: "18%" }}></div>
                                <div style={{ width: "5%" }}></div>
                            </div>
                        </div>}
                    </div>
                    <div style={{ borderBottom: "1px solid var(--text)" }}>
                        <div className="orders-list-body">
                            <div style={{ width: "18%" }}>#1001</div>
                            <div style={{ width: "14%" }}>$299</div>
                            <div style={{ width: "24%" }}>Pendding</div>
                            <div style={{ width: "20%" }}>Pendding</div>
                            <div style={{ width: "18%" }}><Link to='details/5' style={{color:"yellowgreen"}}>view</Link></div>
                            <div style={{ width: "5%" }} onClick={e=>setShowElement(!showElement)}><LuArrowDownFromLine /></div>
                        </div>
                        {showElement&&<div className="orders-list-element">
                            <div className="orders-list-element-inner">
                                <div style={{ width: "18%" }}>#1001</div>
                                <div style={{ width: "14%" }}>$299</div>
                                <div style={{ width: "24%" }}>Pendding</div>
                                <div style={{ width: "20%" }}>Pendding</div>
                                <div style={{ width: "18%" }}></div>
                                <div style={{ width: "5%" }}></div>
                            </div>
                            <div className="orders-list-element-inner">
                                <div style={{ width: "18%" }}>#1001</div>
                                <div style={{ width: "14%" }}>$299</div>
                                <div style={{ width: "24%" }}>Pendding</div>
                                <div style={{ width: "20%" }}>Pendding</div>
                                <div style={{ width: "18%" }}></div>
                                <div style={{ width: "5%" }}></div>
                            </div>
                        </div>}
                    </div>
                </div>
                
            </div>
            <div style={{position:"absolute",right:"20px",marginTop:"10px"}}>
                <Pagination currPage={currPage} setCurrPage={setCurrPage} totalItem={50} parPage={parPage} showItem={3}  />
            </div>
        </div>
    )
}
export default Orders;
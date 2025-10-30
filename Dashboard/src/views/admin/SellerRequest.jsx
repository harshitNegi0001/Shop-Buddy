import '../../stylesheet/sellers.css';
import { useEffect, useState } from 'react';
import searchIcon from '../../assets/searchIcon.png';
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import loadingGif from '../../assets/loading3.webp';

function SellerRequests() {
    const [currPage, setCurrPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    const [sellers, setSellers] = useState([]);
    const [debouncedSearch, setDebouncedSearch] = useState(searchValue);
    const [totalItem, setTotalItem] = useState(0);
    const [loading, setLoading] = useState(false);
    const Backend_Port = import.meta.env.VITE_BACKEND_PORT;
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchValue);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [searchValue]);
    useEffect(() => {
        getSellers();
    }, [debouncedSearch, parPage, currPage]);

    async function getSellers() {


        try {
            setLoading(true);
            const response = await fetch(`${Backend_Port}/api/get-sellers?parPage=${parPage}&&currPage=${currPage}&&searchValue=${searchValue}&&status=pending`, {
                method: "GET",
                credentials: "include"
            });
            const result = await response.json();
            setLoading(false);
            if (!response.ok) {
                toast.error("Error!" + result.message);

                setSellers([]);
                setTotalItem(0);
            }
            else {
                setSellers(result.sellers);
                setTotalItem(result.totalSellers);
            }
        }
        catch (err) {
            setLoading(false);
            toast.error("Error!" + err.message);

            setSellers([]);
            setTotalItem(0);
        }
    }
    return (
        <div className="sellers">
            {loading && <div className='load-back'>
                <img className='loading' src={loadingGif} alt='loading...' />
            </div>}
            <div><span style={{ color: "var(--text)" }}>Deactive Seller</span></div>
            <div style={{ display: "flex", marginTop: "10px", width: "100%", justifyContent: "space-between" }}>
                <select name="" id="" onChange={e => setParPage(e.target.value)} style={{ width: "50px", borderRadius: "10px" }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input type="text" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} id="search-inp" placeholder="Search" />
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
                {sellers.map((seller, index) => <div key={index} className="sellers-body">
                    <div style={{ width: "10%", overflow: "scroll", scrollbarWidth: "none" }}>{index + 1}</div>
                    <div style={{ width: "18%", overflow: "scroll", scrollbarWidth: "none" }}>{seller.s_name}</div>
                    <div style={{ width: "20%", overflow: "scroll", scrollbarWidth: "none" }}>{seller.s_payment}</div>
                    <div style={{ width: "24%", overflow: "scroll", scrollbarWidth: "none" }}>{seller.s_email}</div>
                    <div style={{ width: "14%", overflow: "scroll", scrollbarWidth: "none" }}>{seller.s_status}</div>
                    <div style={{ width: "14%", display: "flex", justifyContent: "center" }}><Link to={`/admin/dashboard/seller/details/${seller.s_id}`} style={{ width: "18px", color: "var(--text)", height: "18px", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "3px" }}><FaEye /></Link></div>
                </div>)}


            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                <div >
                    <Pagination currPage={currPage} setCurrPage={setCurrPage} totalItem={totalItem} parPage={parPage} showItem={3} />
                </div>
            </div>
        </div>
    )
}
export default SellerRequests;
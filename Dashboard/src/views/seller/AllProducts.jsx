import { useEffect, useState } from 'react';
import searchIcon from '../../assets/searchIcon.png';
import Pagination from "../Pagination";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../../context/role_management";
import { useContext } from "react";
import loading from '../../assets/loading3.webp';


import '../../stylesheet/allProducts.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
function AllProducts() {
    const { auth } = useContext(AuthContext);
    const Backend_Port = import.meta.env.VITE_BACKEND_PORT;
    const sellerId = auth.id;
    const [loader, setLoader] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    const [debouncedSearch, setDebouncedSearch] = useState(searchValue);
    const [totalItem, setTotalItem] = useState(0);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchValue);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [searchValue]);
    useEffect(() => {
        getProducts();
    }, [debouncedSearch, currPage, parPage]);

    const getProducts = async () => {
        try {
            setLoader(true);
            const response = await fetch(`${Backend_Port}/api/get-products?searchValue=${searchValue}&&parPage=${parPage}&&currPage=${currPage}&&sellerId=${sellerId}`);
            const result = await response.json();
            setLoader(false);
            if (!response.ok) {
                toast.error("Error! " + result.message);
                setTotalItem(0);
                setProducts([]);
            } else {
                setTotalItem(result.totalItems);
                setProducts(result.products);

            }
        }
        catch (err) {
            setLoader(false);
            setTotalItem(0);
            setProducts([]);
            toast.error("Error! " + err.message);
        }
    }
    return (
        <div className="all-product">
            {loader && <div className='load-back'>
                <img className='loading' src={loading} alt='loading...' />
            </div>}
            <div style={{ color: "var(--text)" }}>All Products</div>
            <div className='card-search'>
                <select name="" id="" onChange={e => setParPage(e.target.value)} >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input type="text" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} id="search-inp" placeholder="Search" />
                    <img style={{ width: "20px", position: "absolute", right: "9px" }} src={searchIcon} alt="Search-icon" />
                </div>
            </div>


            <div className='disc-prod-list' >
                <table style={{ textAlign: "start" }}>
                    <thead >
                        <tr >
                            <th style={{ textAlign: "start" }} >No.</th>
                            <th style={{ textAlign: "start" }}>Image</th>
                            <th style={{ textAlign: "start" }}>Name</th>
                            <th style={{ textAlign: "start" }}>Category</th>
                            <th style={{ textAlign: "start" }}>Brand</th>
                            <th style={{ textAlign: "start" }}>Price</th>
                            <th style={{ textAlign: "start" }}>Discount</th>
                            <th style={{ textAlign: "start" }}>Stock</th>
                            <th style={{ textAlign: "start" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod, index) => <tr key={index} >
                            <td>{index + 1}</td>
                            <td><img style={{ width: "40px", backgroundColor: "pink" }} src={prod.images[0]} alt="" /></td>
                            <td >{prod.name}</td>
                            <td>{prod.category_name}</td>
                            <td>{prod.brand}</td>
                            <td>₹{prod.price}</td>
                            <td>{prod.discount}%</td>
                            <td>{prod.stock}</td>
                            <td ><div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}><Link to={`/seller/dashboard/edit-product/${prod.id}`}><span className='edit-prod-btn' ><CiEdit /></span></Link><span className='delete-prod' ><MdDelete /></span><span className='view-prod' ><FaEye /></span></div></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div className='paging-div'>
                <div >
                    <Pagination currPage={currPage} setCurrPage={setCurrPage} totalItem={totalItem} parPage={parPage} showItem={3} />
                </div>
            </div>
        </div>

    )
}
export default AllProducts;
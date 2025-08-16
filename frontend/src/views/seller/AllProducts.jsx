import { useState } from 'react';
import searchIcon from '../../assets/searchIcon.png';
import Pagination from "../Pagination";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";


import '../../stylesheet/allProducts.css';
import { Link } from 'react-router-dom';
function AllProducts() {
    const [currPage, setCurrPage] = useState(1);
    //const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    return (
        <div className="all-product">
            <div style={{color:"var(--text)"}}>All Products</div>
            <div className='card-search'>
                <select name="" id="" onChange={e => setParPage(e.target.value)} >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                <div >
                    <input type="text" id="search-inp" placeholder="Search" />
                    <img src={searchIcon} alt="Search-icon" />
                </div>
            </div>
            
            
            <div className='disc-prod-list' >
                <table style={{textAlign:"start"}}>
                    <thead >
                        <tr >
                            <th style={{textAlign:"start"}} >No.</th>
                            <th style={{textAlign:"start"}}>Image</th>
                            <th style={{textAlign:"start"}}>Name</th>
                            <th style={{textAlign:"start"}}>Category</th>
                            <th style={{textAlign:"start"}}>Brand</th>
                            <th style={{textAlign:"start"}}>Price</th>
                            <th style={{textAlign:"start"}}>Discount</th>
                            <th style={{textAlign:"start"}}>Stock</th>
                            <th style={{textAlign:"start"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1,2,3,4,5,6].map((index)=><tr key={index} >
                            <td>{index}</td>
                            <td><img style={{width:"40px",backgroundColor:"pink"}} src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp" alt="" /></td>
                            <td >Essence Mascara Lash Princess</td>
                            <td>beauty</td>
                            <td>Essence</td>
                            <td>$9.99</td>
                            <td>10%</td>
                            <td>99</td>
                            <td ><div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}><Link to='/seller/dashboard/edit-product'><span className='edit-prod-btn' ><CiEdit /></span></Link><span className='delete-prod' ><MdDelete/></span><span className='view-prod' ><FaEye /></span></div></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div className='paging-div'>
                <div >
                    <Pagination currPage={currPage} setCurrPage={setCurrPage} totalItem={50} parPage={parPage} showItem={3} />
                </div>
            </div>
        </div>

    )
}
export default AllProducts;
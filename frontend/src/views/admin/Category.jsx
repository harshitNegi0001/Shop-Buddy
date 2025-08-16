import { useState } from 'react';
import searchIcon from '../../assets/searchIcon.png';
import Pagination from "../Pagination";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";

import '../../stylesheet/category.css';
function Category() {
    const [currPage, setCurrPage] = useState(1);
    //const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    return (
        <div className='category'>
            <div className='display-category'>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                <div className='category-list'>
                    <div className='category-list-header'>
                        <div style={{ width: "25%" }}>No.</div>
                        <div style={{ width: "25%" }}>Image</div>
                        <div style={{ width: "25%" }}>Category</div>
                        <div style={{ width: "25%" }}>Action</div>
                    </div>
                    <div className="category-list-body">
                        <div style={{ width: "25%" }}>1</div>
                        <div style={{ width: "25%" }}><img src='https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp' alt='photo' /></div>
                        <div style={{ width: "25%" }}>beauty</div>
                        <div style={{ width: "25%", display: "flex", justifyContent: "center" }}><span className='cat-edit'><CiEdit /></span><span className='cat-del'><MdDelete /></span></div>
                    </div>
                    <div className="category-list-body">
                        <div style={{ width: "25%" }}>2</div>
                        <div style={{ width: "25%" }}><img src='https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp' alt='photo' /></div>
                        <div style={{ width: "25%" }}>beauty</div>
                        <div style={{ width: "25%", display: "flex", justifyContent: "center" }}><span className='cat-edit'><CiEdit /></span><span className='cat-del'><MdDelete /></span></div>
                    </div>
                    <div className="category-list-body">
                        <div style={{ width: "25%" }}>3</div>
                        <div style={{ width: "25%" }}><img src='https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp' alt='photo' /></div>
                        <div style={{ width: "25%" }}>beauty</div>
                        <div style={{ width: "25%", display: "flex", justifyContent: "center" }}><span className='cat-edit'><CiEdit /></span><span className='cat-del'><MdDelete /></span></div>
                    </div>
                    <div className="category-list-body">
                        <div style={{ width: "25%" }}>4</div>
                        <div style={{ width: "25%" }}><img src='https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp' alt='photo' /></div>
                        <div style={{ width: "25%" }}>furniture</div>
                        <div style={{ width: "25%", display: "flex", justifyContent: "center" }}><span className='cat-edit'><CiEdit /></span><span className='cat-del'><MdDelete /></span></div>
                    </div>
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                    <div >
                        <Pagination currPage={currPage} setCurrPage={setCurrPage} totalItem={50} parPage={parPage} showItem={3} />
                    </div>
                </div>
            </div>
            <div className='add-category'>
                <span>Add Category</span>
                <div className='add-cat-inp' >
                    <span>Category Name</span>
                    <input type="text" name='new-category' id='new-category' placeholder='Category' />
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                    <label htmlFor="cat-img" className='add-category-img'>
                        <span style={{ fontSize: "20px" }}><CiImageOn /></span>
                        <span>Select Image</span>
                    </label>
                    <input type="file" name="cat-img" accept='image/*' id="cat-img" hidden/>

                </div>
                <div  ><button className='add-cat-btn' >Add Category</button></div>
            </div>
        </div>
    )
}
export default Category;
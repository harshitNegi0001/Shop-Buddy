import { useEffect, useState } from 'react';
import searchIcon from '../../assets/searchIcon.png';
import Pagination from "../Pagination";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

import loading from '../../assets/loading3.webp'

import '../../stylesheet/category.css';
import toast from 'react-hot-toast';
function Category() {
    const [currPage, setCurrPage] = useState(1);
    const [categories, setCategories] = useState([])
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    const [state, setState] = useState({
        cat_name: '',
        image: '',
        loading: false
    });
    const [debouncedSearch, setDebouncedSearch] = useState(searchValue);
    const [totalItem, setTotalItem] = useState(0);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchValue);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [searchValue]);
    const [imageShow, setImageShow] = useState('');

    useEffect(() => { handleChanges() }, [debouncedSearch, parPage, currPage]);
    const handleChanges = async () => {
        try {
            setState({ ...state, loading: true });
            const response = await fetch('http://localhost:5000/api/get-category', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    currPage: currPage,
                    searchValue: searchValue,
                    parPage: parPage
                }),
                credentials: "include"
            });
            setState({ ...state, loading: false });
            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message);
                setCategories([]);
                setTotalItem(0);
            }
            else {
                setCategories(result.response);
                setTotalItem(result.totalResult);
            }
        }
        catch (err) {
            toast.error(err.message);
            setState({ ...state, loading: false });
        }
    }
    const handleImg = (e) => {
        const files = e.target.files;

        if (files.length > 0) {
            setImageShow(URL.createObjectURL(files[0]));
            setState({ ...state, image: files[0] });
        }


    }
    const removeImage = () => {
        setImageShow('');
        setState({ ...state, image: '' });
    }

    const handleNewCat = async (e) => {
        e.preventDefault();
        const image = state.image;
        const name = state.cat_name;
        if (image && name) {
            try {
                setState({ ...state, loading: true });
                const formData = new FormData();
                formData.append("image", image);
                formData.append("name", name);
                const response = await fetch('http://localhost:5000/api/add-new-category', {
                    method: "POST",
                    body: formData,
                    credentials: "include"
                });
                const result = await response.json();
                setState({ ...state, loading: false });
                if (!response.ok) {
                    toast.error('Error! ' + result.message);
                }
                else {
                    toast.success("Catagory added successfully.");
                    setState({ ...state, image: '', cat_name: '' })
                    setImageShow('')
                }
            }
            catch (err) {
                toast.error('Error! ' + err.message);
            }
        }
        else if (!name) {
            toast.error("Please Enter Catagory Name.")
        }
        else {
            toast.error("Please Enter an Image for category.");
        }
    }
    return (
        <div className='category'>
            {state.loading && <div className='load-back'>
                <img className='loading' src={loading} alt='loading...' />
            </div>}
            <div className='display-category'>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <select onChange={e => setParPage(e.target.value)} style={{ width: "50px", borderRadius: "10px" }}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                        <input type="text" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} id="search-inp" placeholder="Search" />
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
                    {categories.map((cat, index) => (<div key={index} className="category-list-body">
                        <div style={{ width: "25%" }}>{index + 1}</div>
                        <div style={{ width: "25%" }}><img src={cat.image} alt={cat.slug} /></div>
                        <div style={{ width: "25%" }}>{cat.name}</div>
                        <div style={{ width: "25%", display: "flex", justifyContent: "center", fontSize: "16px" }}><span className='cat-edit'><CiEdit /></span><span className='cat-del'><MdDelete /></span></div>
                    </div>))}

                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                    <div >
                        <Pagination currPage={currPage} setCurrPage={setCurrPage} totalItem={totalItem} parPage={parPage} showItem={3} />
                    </div>
                </div>
            </div>
            <form className='add-category' onSubmit={handleNewCat}>
                <span>Add Category</span>
                <div className='add-cat-inp' >
                    <span>Category Name</span>
                    <input type="text" value={state.cat_name} onChange={(e) => setState({ ...state, cat_name: e.target.value })} name='new-category' id='new-category' placeholder='Category' />
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                    <label htmlFor="cat-img" className='add-category-img' style={{ display: `${imageShow ? "none" : "flex"}` }}>
                        <span style={{ fontSize: "20px" }}><CiImageOn /></span>
                        <span>Select Image</span>
                    </label>
                    {
                        imageShow && <div style={{ display: "flex", position: "relative", width: "230px", height: "230px", boxSizing: "border-box", overflow: "hidden", justifyContent: "center" }}><img src={`${imageShow}`} alt="cat-photo" /><span style={{ position: "absolute", width: "15px", height: "15px", display: "flex", justifyContent: "center", alignItems: "center", right: "10px", top: "10px", backgroundColor: "var(--highlight)", fontSize: "12px", color: "var(--text)" }} onClick={removeImage} ><IoClose /></span></div>
                    }
                    <input type="file" name="cat-img" accept='image/*' id="cat-img" onChange={handleImg} hidden />

                </div>
                <div  ><button className='add-cat-btn' type='submit' >Add Category</button></div>
            </form>
        </div>
    )
}
export default Category;
import { Link } from "react-router-dom";
import '../../stylesheet/addProduct.css';
import { useEffect, useState } from "react";
import Select from "react-select";
import { CiImageOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import loading from '../../assets/loading3.webp';

function AddProduct() {
    const [loader,setLoader] = useState(false);
    const Backend_Port = import.meta.env.VITE_BACKEND_PORT;
    const [state, setState] = useState({
        prodName: "",
        brandName: "",
        prodCategory: "",
        prodStock: "",
        prodPrice: "",
        discount: "",
        prodDesc: ""
    });
    useEffect(() => {
        getCategories();
    }, []);
    const getCategories = async () => {
        try {
            setLoader(true);
            const response = await fetch(`${Backend_Port}/api/get-category`, {
                method: "GET",
                credentials: "include"
            });
            const result = await response.json();
            setLoader(false);
            if (!response.ok) {
                toast.error("Error! " + result.message);
            }
            else {
                const category = result.categories;
                const categoryOptions = result.categories.map((cat) => ({
                    label: cat.name,
                    value: cat.id
                }));
                setCategories(categoryOptions);
            }
        }
        catch (err) {
            setLoader(false);
            toast.error("Error! "+err.message);
        }
    }
    const [images, setImages] = useState([]);
    const [imageShow, setImageShow] = useState([]);
    const cstmStyle = {
        control: (provided) => ({ ...provided, height: "35px", border: "2px solid var(--text)", background: "none", color: "var(--text)", borderRadius: "10px" }), singleValue: (provided) => ({ ...provided, color: "var(--text)" }), input: (provided) => ({ ...provided, color: "var(--text)" })
    }
    const [categories, setCategories] = useState([]);
    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });

    }
    const handleImages = (e) => {
        const files = e.target.files;
        const length = files.length;
        if (length > 0) {
            setImages([...images, ...files]);
            let imageUrl = [];
            for (let i = 0; i < length; i++) {
                imageUrl.push({ url: URL.createObjectURL(files[i]) });
            }
            setImageShow([
                ...imageShow, ...imageUrl
            ])
        }
    }
    const submitProduct = async (e) => {
        e.preventDefault();
        const image = images;

        if (image) {
            try {
                
                const formData = new FormData();
                formData.append("name", state.prodName.trim());
                formData.append("brand", state.brandName.trim());
                formData.append("category", state.prodCategory);
                formData.append("stock", state.prodStock);
                formData.append("price", state.prodPrice);
                formData.append("discount", state.discount);
                formData.append("description", state.prodDesc);
                images.forEach((file) => {
                    formData.append("image", file);
                });
                setLoader(true);
                const response = await fetch(`${Backend_Port}/api/add-product/`, {
                    method: "POST",
                    
                    body: formData,
                    credentials: "include"
                });

                const result = await response.json();
                setLoader(false);
                if (!response.ok) {
                    toast.error("Error!" + result.message);
                }
                else {
                    toast.success("Product added successfully");
                    setImageShow([]);
                    setImages([]);
                    setState({
                        prodName: "",
                        brandName: "",
                        prodCategory: "",
                        prodStock: "",
                        prodPrice: "",
                        discount: "",
                        prodDesc: ""
                    });
                }
            }
            catch (err) {
                toast.error(err.message);
                setLoader(false);
                
            }
        }
        else {
            toast.error("Please enter all fields");
        }
    }
    const removeImage = (index) => {
        setImageShow(prev => prev.filter((_, i) => i !== index));
        setImages(prev => prev.filter((_, i) => i !== index));
    };
    return (
        <div className="add-product-container" >
        {loader && <div className='load-back'>
                        <img className='loading' src={loading} alt='loading...' />
                    </div>}
            <div className="add-prod-header" >
                <span>Add Product</span>
                <Link to='/seller/dashboard/all-product' className="all-prod-link" >All Product</Link>
            </div>
            <form onSubmit={submitProduct} >
                <div className="add-prod-main">
                    <div className="add-prod-inp" >
                        <label htmlFor="prod-name">Product Name</label>
                        <input type="text" value={state.prodName} onChange={handleInput} required name="prodName" id="prod-name" placeholder="Product Name" />
                    </div>
                    <div className="add-prod-inp" >
                        <label htmlFor="brand-name">Brand Name</label>
                        <input type="text" value={state.brandName} onChange={handleInput} required name="brandName" id="brand-name" placeholder="Brand Name" />
                    </div>
                    <div className="add-prod-inp" style={{ color: "black" }} >
                        <label htmlFor="prod-category" style={{ color: "var(--text)" }}>Category</label>

                        <Select options={categories} value={categories.find(cat => cat.value === state.prodCategory)} required onChange={(e) => setState({ ...state, prodCategory: e.value })} isSearchable={true} name="prodCategory" styles={cstmStyle} placeholder="Select Category" />
                    </div>

                    <div className="add-prod-inp" >
                        <label htmlFor="prod-stock">Product Stock</label>
                        <input type="number" value={state.prodStock} onChange={handleInput} required name="prodStock" id="prod-stock" placeholder="Stock" />
                    </div>
                    <div className="add-prod-inp" >
                        <label htmlFor="prod-price">Price</label>
                        <input type="number" value={state.prodPrice} onChange={handleInput} required name="prodPrice" id="prod-price" placeholder="Price" />
                    </div>
                    <div className="add-prod-inp" >
                        <label htmlFor="discount">Discount</label>
                        <input type="number" value={state.discount} onChange={handleInput} required name="discount" id="discount" placeholder="Disount" />
                    </div>
                    <div className="add-prod-desc" >
                        <label htmlFor="prod-desc">Description</label>
                        <textarea id="prod-desc" value={state.prodDesc} onChange={handleInput} required name="prodDesc" placeholder="Description" />
                    </div>
                    <div className="imageShow" >
                        {
                            imageShow.map((img, i) => <div key={i}   ><img src={img.url} alt={`product image ${i}`} /><span id="close-imageShow" onClick={() => removeImage(i)} ><IoClose /></span></div>)
                        }
                        <label htmlFor="cat-img" className='add-category-img'>
                            <span style={{ fontSize: "20px" }}><CiImageOn /></span>
                            <span>Select Image</span>
                        </label>
                        <input type="file" onChange={handleImages} name="cat-img" accept='image/*' id="cat-img" hidden />

                    </div>
                    <button id="add-prod-btn" type="submit" >add product</button>
                </div>


            </form>
        </div>
    )
}
export default AddProduct;
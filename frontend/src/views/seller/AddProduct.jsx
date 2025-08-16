import { Link } from "react-router-dom";
import '../../stylesheet/addProduct.css'
import { useState } from "react";
import Select from "react-select";
import { CiImageOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

function AddProduct() {
    const [state, setState] = useState({
        prodName: "",
        brandName: "",
        prodCategory: "",
        prodStock: "",
        prodPrice: "",
        discount: "",
        prodDesc: ""
    });
    const [images, setImages] = useState([]);
    const [imageShow, setImageShow] = useState([]);
    const cstmStyle = {
        control: (provided) => ({ ...provided, height: "35px", border: "2px solid var(--text)", background: "none", color: "var(--text)", borderRadius: "10px" }), singleValue: (provided) => ({ ...provided, color: "var(--text)" }),input: (provided) => ({...provided,color: "var(--text)"})
    }
    const categories = [
        {

            label: 'Sports',
            value: 'sports'
        },
        {

            label: 'Beauty',
            value: 'beauty'
        },
        {

            label: 'Furniture',
            value: 'furniture'
        },
        {

            label: 'Groceries',
            value: 'groceries'
        }
    ]
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
    const removeImage = (index) => {
        setImageShow(prev => prev.filter((_, i) => i !== index));
        setImages(prev => prev.filter((_, i) => i !== index));
    };
    return (
        <div className="add-product-container" >
            <div className="add-prod-header" >
                <span>Add Product</span>
                <Link to='/seller/dashboard/all-product' className="all-prod-link" >All Product</Link>
            </div>
            <form action="" >
                <div className="add-prod-main">
                    <div className="add-prod-inp" >
                        <label htmlFor="prod-name">Product Name</label>
                        <input type="text" value={state.prodName} onChange={handleInput} required name="prodName" id="prod-name" placeholder="Product Name" />
                    </div>
                    <div className="add-prod-inp" >
                        <label htmlFor="brand-name">Brand Name</label>
                        <input type="text" value={state.brandName} onChange={handleInput} required name="brandName" id="brand-name" placeholder="Product Name" />
                    </div>
                    <div className="add-prod-inp" style={{ color: "black" }} >
                        <label htmlFor="prod-category" style={{ color: "var(--text)" }}>Category</label>

                        <Select options={categories} value={categories.find(cat => cat.value === state.prodCategory)} required onChange={(e) => setState({ ...state, prodCategory: e.value })} isSearchable={true} name="prodCategory" styles={cstmStyle} placeholder="Select Category" />
                    </div>

                    <div className="add-prod-inp" >
                        <label htmlFor="prod-stock">Product Stock</label>
                        <input type="number" value={state.prodStock} onChange={handleInput} required name="prodStock" id="prod-stock" placeholder="Product Name" />
                    </div>
                    <div className="add-prod-inp" >
                        <label htmlFor="prod-price">Price</label>
                        <input type="number" value={state.prodPrice} onChange={handleInput} required name="prodPrice" id="prod-price" placeholder="Product Name" />
                    </div>
                    <div className="add-prod-inp" >
                        <label htmlFor="discount">Discount</label>
                        <input type="number" value={state.discount} onChange={handleInput} required name="discount" id="discount" placeholder="Product Name" />
                    </div>
                    <div className="add-prod-desc" >
                        <label htmlFor="prod-desc">Description</label>
                        <textarea id="prod-desc" value={state.prodDesc} onChange={handleInput} required name="prodDesc" placeholder="Description"  />
                    </div>
                    <div className="imageShow" >
                        {
                            imageShow.map((img, i) => <div key={i}   ><img src={img.url} alt={`product image ${i}`} /><span id="close-imageShow" onClick={()=>removeImage(i)} ><IoClose /></span></div>)
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
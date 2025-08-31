import { Link, useNavigate, useParams } from "react-router-dom";
import '../../stylesheet/addProduct.css'
import { useEffect, useState } from "react";
import Select from "react-select";
import { CiImageOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import loading from '../../assets/loading3.webp'


function EditProduct() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [loader, setLoader] = useState(false);
    const [state, setState] = useState({
        prodName: "",
        brandName: "",
        prodCategory: "",
        prodStock: "",
        prodPrice: "",
        discount: "",
        prodDesc: "",
        oldImage: []
    });
    const [images, setImages] = useState([]);
    const [imageShow, setImageShow] = useState([]);
    useEffect(() => {
        getProductDetail();
        getCategories();
    }, []);
    const getProductDetail = async () => {

        try {
            setLoader(true);
            const response = await fetch(`http://localhost:5000/api/get-product-detail?productId=${productId}`);
            const result = await response.json();
            setLoader(false);
            if (!response.ok) {
                toast.error("Error! " + result.message);
                setState({});
                setImageShow([]);
            }
            else {
                setState({
                    prodName: result.prodDetail.name,
                    brandName: result.prodDetail.brand,
                    prodCategory: result.prodDetail.category,
                    prodStock: result.prodDetail.stock,
                    prodPrice: result.prodDetail.price,
                    discount: result.prodDetail.discount,
                    prodDesc: result.prodDetail.description,
                    oldImage: result.prodDetail.images
                });
                setImageShow(result.prodDetail.images.map((url) => ({ url: url })));
            }
        }
        catch (err) {
            setLoader(false);
            toast.error("Error! " + err.message);
        }

    }
    const getCategories = async () => {
        try {
            setLoader(true);
            const response = await fetch('http://localhost:5000/api/get-category', {
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
            toast.error("Error! " + err.message);
        }
    }
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
            ]);
        }
    }
    const submitProduct = async (e) => {
        e.preventDefault();
        const image = images;

        if (images.length > 0 || state.oldImage.length > 0) {
            try {

                const formData = new FormData();
                formData.append("name", state.prodName.trim());
                formData.append("brand", state.brandName.trim());
                formData.append("category", state.prodCategory);
                formData.append("stock", state.prodStock);
                formData.append("price", state.prodPrice);
                formData.append("discount", state.discount);
                formData.append("description", state.prodDesc);
                formData.append("id", productId);
                state.oldImage.forEach(img => {
                    formData.append("oldImage", img);
                });

                images.forEach((file) => {
                    formData.append("image", file);
                });
                setLoader(true);
                const response = await fetch('http://localhost:5000/api/edit-product', {
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
                    navigate('/seller/dashboard/all-product');
                }
            }
            catch (err) {
                toast.error(err.message);
                setLoader(false);

            }
        }
        else {
            toast.error("Please add at least one image");
        }
    }
    const removeImage = (index) => {
        if (index < state.oldImage.length) {
            const temp = state.oldImage.filter((img, i) => i != index);
            setState({ ...state, oldImage: temp });
            setImageShow(prev => prev.filter((_, i) => i !== index));
        }
        else {
            setImageShow(prev => prev.filter((_, i) => i !== index));
            setImages(prev => prev.filter((_, i) => i !== index-state.oldImage.length));
        }

    };
    return (
        <div className="add-product-container" >
            {loader && <div className='load-back'>
                <img className='loading' src={loading} alt='loading...' />
            </div>}
            <div className="add-prod-header" >
                <span>Edit Product</span>
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
                        <input type="number" value={state.discount} onChange={handleInput} required name="discount" id="discount" placeholder="Discount" />
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
                    <button id="add-prod-btn" type="submit" >Save Changes</button>
                </div>


            </form>
        </div>
    )
}
export default EditProduct;
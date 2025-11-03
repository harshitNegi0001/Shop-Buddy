import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import '../stylesheet/productDetail.css';
import loadingGif from '../assets/loading3.webp';
import { FaAnglesRight } from "react-icons/fa6";
import { TbShoppingCart } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";
import sampleImg from '../assets/image-sample.png'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { Rating, Star } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';


function ProductDetail() {
    const [isLoading, setIsLoading] = useState(false);
    const Backend_port = import.meta.env.VITE_BACKEND_PORT;
    const { prodId } = useParams();
    const navigate = useNavigate();
    const [selectedImg, setSelectedImg] = useState('');
    const [topRating, setTopRating] = useState([]);
    
    const [similarRatings, setSimilarRatings] = useState([])
    const [priceDiscount, setPriceDiscount] = useState({
        maxPrice: 0,
        minPrice: 0,
        discount: 0
    });
    const [ratings, setRating] = useState({
        avgRating: 0,
        totalReview: 0,
        totalStars: 0,
        ratingDetail: {
            five: 0,
            four: 0,
            three: 0,
            two: 0,
            one: 0
        }
    })
    const { userInfo } = useSelector(state => state.auth);
const [userFeedback,setUserFeedback] = useState('');
    const [products, setProducts] = useState([]);
    const [hasmore, setHasmore] = useState(true);
    const [page, setPage] = useState(1);
    const [productDetails, setProductDetails] = useState({});
    const [userRating, setUserRating] = useState(0) // Initial value


    useEffect(() => {
        if (prodId) {
            getProductDetail();
        }
    }, [prodId]);
    useEffect(() => {
        if (productDetails.name) { getSimilarProd(); }
    }, [productDetails])
    const submitRating = async()=>{
        if(userRating>0){
            try {
                const response = await fetch(`${Backend_port}/api/rate-prod`,{
                    method:'POST',
                    headers:{
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify({
                        prodId:prodId,
                        comments:{
                            star:userRating,
                            comment:userFeedback,
                            customer_id:userInfo.id
                        }
                    }),
                    credentials:'include'
                })
                const result = await response.json();
                if(response.ok){
                    toast("Thank you for ratings", { icon: "❤"});
                }
                else{
                    toast.error('Error! '+result.message);
                }
            } catch (err) {
                toast.error('Error! '+err.message);
            }
        }
        else{
            toast.error('Please rate product first');
        }
    }
    const addToCart = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${Backend_port}/api/add-to-cart`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    prodId: prodId
                }),
                credentials: "include"
            })
            const result = await response.json();
            setIsLoading(false);
            if (response.ok) {
                toast.success("added to cart")
            }
            else {
                toast.error("Error " + result.message);
            }
        } catch (err) {
            setIsLoading(false);
            toast.error("Error! " + err.message);

        }
    }
    const getSimilarProd = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${Backend_port}/api/get-products?searchValue=${productDetails.category_name}&parPage=${10}&currPage=${page}`);
            const result = await response.json();
            setIsLoading(false);
            if (response.ok) {

                if (result.products.length === 0) {

                    setHasmore(false);
                    return;
                }
                setSimilarRatings((prev) => [...prev, ...result.ratings]);
                setProducts((prev) => [...prev, ...result.products]);
                setPage((prev) => prev + 1);
            }
            else {
                toast.error("Error! " + result.message);
            }
        } catch (err) {
            setIsLoading(false);
            toast.error("Error! " + err.message);
        }
    }
    const getProductDetail = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${Backend_port}/api/get-product-detail?productId=${prodId}`);
            const result = await response.json();
            setIsLoading(false);
            if (response.ok) {
                setProductDetails(result.prodDetail);
                // console.log(result.topRating);
                setTopRating(result.topRating);
                setRating(result.rating||ratings);
                setSelectedImg(result.prodDetail?.images?.[0]);
                const maxPrice = result.prodDetail.price;
                const discount = result.prodDetail.discount;
                const minPrice = maxPrice - (maxPrice * discount / 100);
                setPriceDiscount({ minPrice, maxPrice, discount });
            }
            else {
                toast.error("Error! " + result.message);

            }
        } catch (err) {
            setIsLoading(false);
            toast.error("Error! " + err.message);
        }
    }

    return (
        <div id="scroll-prod-detail" className="prod-detail-cont">
            {isLoading && <div className="loading-div"><img src={loadingGif} /></div>}
            <div className="image-container">
                {selectedImg && <img className="selected-image" src={selectedImg} alt="" />}
                <div className="img-option">
                    {
                        productDetails.images?.map((images, i) =>
                            <img onClick={() => setSelectedImg(images)} key={i} className={`${(selectedImg === images) ? 'active-img' : 'all-img'}`} src={images} alt="" />
                        )
                    }
                </div>
                <div style={{ width: "100%", height: "0px", margin: "10px 0px", border: "2px solid var(--highlight)", borderRadius: "5px" }}></div>
                <div className="cart-buy-btns">
                    <button className="add-to-cart" onClick={() => addToCart()}><TbShoppingCart /> Add to Cart</button>
                    <button className="buy-now-button" onClick={() => navigate('/buy-products', { state: { myCartProd: [productDetails], quantity: [1], grandtotal: ((productDetails.price * (1 - productDetails.discount / 100)) * (1.1)).toFixed(2), subtotal: (productDetails.price * (1 - productDetails.discount / 100)).toFixed(2) } })}><FaAnglesRight /> Buy Now</button>
                </div>
                <div style={{ width: "100%", height: "0px", margin: "10px 0px", border: "2px solid var(--highlight)", borderRadius: "5px" }}></div>
                {userInfo && <div style={{ width: "100%",color:"var(--text)", boxSizing: "border-box", padding: '15px', backgroundColor: "var(--header)", borderRadius: "15px",display:"flex",flexDirection:"column",gap:'10px',alignItems:"center" }}>
                    <span>Rate Us</span>
                    <Rating style={{ maxWidth: "150px" }} value={userRating} onChange={setUserRating} itemStyles={{itemShapes:Star,activeFillColor:'#FFD700',inactiveFillColor:'#C0C0C0'}} />
                    <div className="comment-box" style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:'10px',alignItems:"center"}}>
                        <div style={{width:'100%',display:'flex',gap:'5px',justifyContent:"center",alignItems:'center',flexWrap:'wrap'}}>
                            <span style={{fontSize:"12px"}}>Feedback</span>
                            <input type="text" value={userFeedback} onChange={(e)=>setUserFeedback(e.target.value)} style={{width:'240px',background:'none',border:'2px solid var(--text)',color:'var(--text)',padding:'0px 5px',outlineColor:'var(--primary)',borderRadius:'5px',height:'35px'}}/>
                            
                        </div>
                        <button style={{marginTop:"15px",width:'100px',height:'30px',backgroundColor:"var(--primary)",border:'none',color:'var(-text)',borderRadius:"10px",fontWeight:'500'}} onClick={submitRating}>Submit</button>
                    </div>
                </div>}
            </div>
            <div className="prod-other-info-container">
                <div className="prod-basic-info">
                    <span>{productDetails.name}</span>
                    <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}><span style={{ fontSize: "28px", color: "var(--text)" }}>₹{priceDiscount.minPrice}</span>{priceDiscount.discount > 0 && <span style={{ textDecoration: "line-through", fontSize: "14px" }}>₹{priceDiscount.maxPrice}</span>}{priceDiscount.discount > 0 && <span style={{ color: "green" }}>{priceDiscount.discount}% off</span>}</div>
                    <div className="card-rating-div" ><span className="prod-rating" >{ratings.avgRating} <FaStar /></span><span className="card-reviwes">({ratings.totalReview} Reviews)</span></div>
                </div>
                <div className="prod-full-info">
                    <span style={{ fontSize: "20px", fontWeight: "500", color: "var(--text)" }}>Product Details</span>
                    <span>Name : {productDetails.name}</span>
                    <span>Brand : {productDetails.brand}</span>
                    <span>Category : {productDetails.category_name}</span>
                    <span>Availible stock :{productDetails.stock}</span>
                    <span>Description : <span style={{ fontSize: "14px" }}>{productDetails.description}</span></span>
                </div>
                <div className="prod-seller-shop">
                    <span style={{ color: "var(--text)", fontSize: "20px" }}>Sold by</span>

                    <div className="prod-shop-info">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', gap: "15px" }}>
                            <div style={{ width: "50px", height: "50px", boxSizing: "border-box", display: "flex", justifyContent: "center", alignItems: "center", color: "skyblue", backgroundColor: "rgba(144,202,249,0.2)", padding: "10px", fontSize: "25px", borderRadius: "30px", minWidth: "50px" }}><BsShop /></div>
                            <span style={{ fontSize: "14px" }}>Jagdamba Fashion Ranikhet</span>
                        </div>

                        <button onClick={() => navigate(`/seller-chat/${productDetails.seller_id}`)}><IoChatbubblesOutline /> Message </button>
                    </div>

                </div>
                <div className="prod-rating-cont">
                    <span style={{ color: "var(--text)" }}>Product Rating and Review</span>
                    <div style={{ width: "100%", boxSizing: "border-box", display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-evenly" }}>
                        <div style={{ color: "#004600", width: "80px", fontSize: "30px", fontWeight: "bold" }}>{ratings.avgRating}<span style={{ fontSize: "33px" }}> <FaStar style={{ fontSize: "20px" }} /></span></div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "7px", width: "calc(100% - 80px)", maxWidth: "350px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text)", fontSize: "12px" }}><span style={{ width: "65px" }}>Excellent</span><div style={{ width: "calc(100% - 100px)", overflow: "hidden", height: "6px", boxSizing: "border-box", backgroundColor: "var(--highlight)", borderRadius: "5px" }}><div style={{ border: `${((ratings.ratingDetail.five / ratings.totalStars) * 100) > 0 ? '3px solid green' : 'none'}`, width: `${(ratings.ratingDetail.five / ratings.totalStars) * 100}%`, borderRadius: "5px" }}></div></div><span>{ratings.ratingDetail.five}</span></div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text)", fontSize: "12px" }}><span style={{ width: "65px" }}>Very good</span><div style={{ width: "calc(100% - 100px)", overflow: "hidden", height: "6px", boxSizing: "border-box", backgroundColor: "var(--highlight)", borderRadius: "5px" }}><div style={{ border: `${((ratings.ratingDetail.four / ratings.totalStars) * 100) > 0 ? '3px solid greenyellow' : 'none'}`, width: `${(ratings.ratingDetail.four / ratings.totalStars) * 100}%`, borderRadius: "5px" }}></div></div><span>{ratings.ratingDetail.four}</span></div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text)", fontSize: "12px" }}><span style={{ width: "65px" }}>Good</span><div style={{ width: "calc(100% - 100px)", overflow: "hidden", height: "6px", boxSizing: "border-box", backgroundColor: "var(--highlight)", borderRadius: "5px" }}><div style={{ border: `${((ratings.ratingDetail.three / ratings.totalStars) * 100) > 0 ? '3px solid yellow' : 'none'}`, width: `${(ratings.ratingDetail.three / ratings.totalStars) * 100}%`, borderRadius: "5px" }}></div></div><span>{ratings.ratingDetail.three}</span></div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text)", fontSize: "12px" }}><span style={{ width: "65px" }}>Average</span><div style={{ width: "calc(100% - 100px)", overflow: "hidden", height: "6px", boxSizing: "border-box", backgroundColor: "var(--highlight)", borderRadius: "5px" }}><div style={{ border: `${((ratings.ratingDetail.two / ratings.totalStars) * 100) > 0 ? '3px solid orange' : 'none'}`, width: `${(ratings.ratingDetail.two / ratings.totalStars) * 100}%`, borderRadius: "5px" }}></div></div><span>{ratings.ratingDetail.two}</span></div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text)", fontSize: "12px" }}><span style={{ width: "65px" }}>Poor</span><div style={{ width: "calc(100% - 100px)", overflow: "hidden", height: "6px", boxSizing: "border-box", backgroundColor: "var(--highlight)", borderRadius: "5px" }}><div style={{ border: `${((ratings.ratingDetail.one / ratings.totalStars) * 100) > 0 ? '3px solid red' : 'none'}`, width: `${(ratings.ratingDetail.one / ratings.totalStars) * 100}%`, borderRadius: "5px" }}></div></div><span>{ratings.ratingDetail.one}</span></div>

                        </div>
                    </div>
                    <div style={{ width: "100%", height: "0px", border: '1px solid var(--highlight)', margin: "10px 0px" }}></div>
                    {
                        topRating.map((cmnt, i) =>
                            <div key={i} style={{ display: "flex", flexDirection: "column", borderBottom: "2px solid var(--highlight)", gap: "5px" }}>

                                <div style={{ display: "flex", gap: "10px", alignItems: "center", color: "var(--text)" }}>
                                    <img src={cmnt.userDetail?.image || sampleImg} style={{ width: "35px", height: "35px", borderRadius: "20px", objectFit: "cover" }} alt="" />
                                    <span>{cmnt?.userDetail?.name || 'A shopbuddy user'}</span>
                                </div>
                                <div style={{ display: "flex", gap: "10px", alignItems: "center", color: "var(--text)", marginBottom: "10px" }}>
                                    <span className="prod-rating">{cmnt.star} <FaStar /></span>
                                    <span style={{ fontSize: "12px" }}>{cmnt.comment}</span>
                                </div>
                            </div>)
                    }
                </div>
            </div>

            <div className="similar-prod-box">
                <InfiniteScroll
                    style={{ width: "100%" }}
                    dataLength={products.length}
                    next={getSimilarProd}
                    hasMore={hasmore}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p style={{ textAlign: "center", fontSize: "10px", color: "var(--text)" }}> Page End (ಥ﹏ಥ) No more products left...
                    </p>
                    }
                    scrollableTarget="scroll-prod-detail"
                >
                    <div className="product-container" style={{ width: "100%", boxSizing: "border-box", padding: "20px", display: "grid", placeItems: "center", gap: "20px 10px" }}>
                        {products.map((p, i) => {
                            if (p.id === productDetails.id) { return }
                            return (<div key={i} className="card-div" onClick={() => navigate(`/product-detail/${p.id}`)}>
                                <img src={p.images[0]} alt="" />
                                <span className="prod-card-name" >{p.name}</span>
                                <div><span className="card-new-price" >₹{p.price}</span> <span className="card-old-price" >₹599</span> <span className="card-discount" >10% off</span></div>
                                <div style={{ color: "var(--text)", fontSize: "12px" }}>free delivery</div>
                                <div className="card-rating-div" ><span className="prod-rating" >{similarRatings?.[i].avgRating} <FaStar /></span><span className="card-reviwes">({similarRatings?.[i].totalReview} Reviews)</span></div>
                            </div>)
                        }
                        )}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}
export default ProductDetail;
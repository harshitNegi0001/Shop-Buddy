import Offers from "../components/Offers";
import Trendz from "../components/Trendz";
import '../stylesheet/home.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import loadingGif from '../assets/loading3.webp';



function Home() {
    const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [hasmore, setHasmore] = useState(true);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const searchValue = '';
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${BACKEND_PORT}/api/get-products?searchValue=${searchValue}&parPage=${10}&currPage=${page}`);
            const result = await response.json();
            setIsLoading(false);
            if (response.ok) {
                if (result.products.length === 0) {

                    setHasmore(false);
                    return;
                }
                setRatings((prev) => [...prev, ...result.ratings]);
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
    return (
        <div id="scrollTarget" style={{ width: "100%", height: "100vh", boxSizing: "border-box", overflowY: "scroll", scrollbarWidth: "none" }}>
            {isLoading && <div className="loading-div"><img src={loadingGif} /></div>}
            <Offers setIsLoading={setIsLoading} />
            <Trendz />



            <InfiniteScroll
                style={{ width: "100%" }}
                dataLength={products.length}
                next={getProducts}
                hasMore={hasmore}
                loader={<div style={{ width: "100%", justifyContent: "center", display: "flex" }}><img style={{ width: "40px", height: "40px" }} src={loadingGif} /></div>}
                endMessage={<p style={{ textAlign: "center", fontSize: "10px", color: "var(--text)" }}> Page End (ಥ﹏ಥ) No more products left...
                </p>
                }
                scrollableTarget="scrollTarget"
            >
                <div className="product-container" style={{ width: "100%", boxSizing: "border-box", padding: "20px", display: "grid", placeItems: "center", gap: "20px 10px" }}>
                    {products.map((p, i) =>
                        <div key={i} className="card-div" onClick={() => navigate(`/product-detail/${p.id}`)}>
                            <img src={p.images[0]} alt="" />
                            <span className="prod-card-name" >{p.name}</span>
                            <div><span className="card-new-price" >₹{p.price - (p.price * p.discount / 100)}</span> {p.discount > 0 ? <span className="card-old-price" >₹{p.price}</span> : null} {p.discount > 0 ? <span className="card-discount" >{p.discount}% off</span> : null}</div>
                            <div style={{ color: "var(--text)", fontSize: "12px" }}>free delivery</div>
                            <div className="card-rating-div" ><span className="prod-rating" >{ratings?.[i].avgRating} <FaStar /></span><span className="card-reviwes">({ratings?.[i].totalReview} Reviews)</span></div>
                        </div>
                    )}
                </div>
            </InfiniteScroll>
            {/* <Products/> */}

        </div>
    )
}

export default Home;
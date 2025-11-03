
import '../stylesheet/home.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import loadingGif from '../assets/loading3.webp'

function Products() {
    const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [hasmore, setHasmore] = useState(true);
    const [ratings, setRatings] = useState([]);
    const navigate = useNavigate()
    const [page, setPage] = useState(1);
    const { searchValue } = useParams();
    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasmore(true);
        setTimeout(() => {
            getProducts(true);
        }, 0)

    }, [searchValue]);
    const getProducts = async (isNewSearch = false) => {
        try {
            // setIsLoading(true);
            const response = await fetch(
                `${BACKEND_PORT}/api/get-products?searchValue=${searchValue || ''}&parPage=10&currPage=${isNewSearch ? 1 : page}`
            );
            const result = await response.json();
            // setIsLoading(false);
            if (response.ok) {
                if (result.products.length === 0) {
                    setHasmore(false);
                    return;
                }

                if (result.products.length < 10) {
                    setHasmore(false);
                }

                if (isNewSearch) {
                    setRatings(result.ratings);
                    setProducts(result.products);
                    setPage(2); // next page
                } else {
                    setRatings((prev) => [...prev, ...result.ratings]);
                    setProducts((prev) => [...prev, ...result.products]);
                    setPage((prev) => prev + 1);
                }
            } else {
                toast.error("Error! " + result.message);
            }
        } catch (err) {
            // setIsLoading(false);
            toast.error("Error! " + err.message);
        }
    };

    return (
        <div id='scrollTarget' style={{ width: "100%", boxSizing: "border-box", height: "100vh", overflowY: "scroll", scrollbarWidth: "none" }}>
            {isLoading && <div className="loading-div"><img src={loadingGif} /></div>}
            <InfiniteScroll
                style={{ width: "100%" }}
                dataLength={products.length}
                next={getProducts}
                hasMore={hasmore}
                loader={
                    <div style={{ width: "100%", justifyContent: "center", display: "flex" }}><img style={{ width: "40px", height: "40px" }} src={loadingGif} /></div>
                }
                endMessage={<p style={{ textAlign: "center", color: "var(--text)", fontSize: "12px" }}> Page End (ಥ﹏ಥ)
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
                            <div className="card-rating-div" ><span className="prod-rating" >{ratings?.[i].avgRating||0} <FaStar /></span><span className="card-reviwes">({ratings?.[i].totalReview} Reviews)</span></div>
                        </div>
                    )}
                </div>
            </InfiniteScroll>

        </div>
    )
}
export default Products;
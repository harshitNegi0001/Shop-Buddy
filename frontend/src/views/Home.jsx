import Offers from "../components/Offers";
import Trendz from "../components/Trendz";
import '../stylesheet/home.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


function Home() {
    const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
    const [products, setProducts] = useState([]);
    const [hasmore, setHasmore] = useState(true);
    const [page, setPage] = useState(1);
    const searchValue = '';
    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async () => {
        try {
            const response = await fetch(`${BACKEND_PORT}/api/get-products?searchValue=${searchValue}&&parPage=${2}&&currPage=${page}`);
            const result = await response.json();

            if (response.ok) {
                if (result.products.length === 0) {
                    setHasmore(false);
                    return;
                }
                setProducts([...products, ...result.products]);
                setPage((prev) => prev + 1);
            }
            else {
                toast.error("Error! " + result.message);
            }
        } catch (err) {
            toast.error("Error! " + err.message);
        }
    }
    return (
        <div style={{ width: "100%", height: "fit-content", boxSizing: "border-box", overflowY: "scroll", scrollbarWidth: "none" }}>
            {/* <Offers/>
            <Trendz/> */}


            <div className="product-container" style={{ width: "100%", boxSizing: "border-box", padding: "20px", display: "grid", placeItems: "center", gap: "20px 10px" }}>
                <InfiniteScroll
                    dataLength={products.length} 
                    next={getProducts}
                    hasMore={hasmore} 
                    loader={<h4>Loading...</h4>} 
                    endMessage={<p style={{ textAlign: "center" }}> Page End (ಥ﹏ಥ) No more products left...
</p>}
                >
                    {products.map((p,i) =>
                        <div key={i} className="card-div" >
                            <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1756309188/x7dim13cze41ir7kgf8b.jpg" alt="" />
                            <span className="prod-card-name" >Assus Vivobook</span>
                            <div><span className="card-new-price" >$400</span> <span className="card-old-price" >$599</span> <span className="card-discount" >10% off</span></div>
                            <div style={{ color: "var(--text)", fontSize: "12px" }}>free delivery</div>
                            <div className="card-rating-div" ><span className="prod-rating" >4.9 <FaStar /></span><span className="card-reviwes">(100 Reviews)</span></div>
                        </div>
                    )}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Home;
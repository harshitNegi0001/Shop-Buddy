import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import toast from 'react-hot-toast';
import { useEffect, useState } from "react";
const responsive = {
    screen: {
        breakpoint: { max: 4000, min: 0 },
        items: 1
    }
};


function Offers() {
    const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
    const [offerHighlight, setOfferHighlight] = useState([]);
    useEffect(() => {
        getOfferHighlight();
    }, [])
    const getOfferHighlight = async () => {

        try {
            const response = await fetch(`${BACKEND_PORT}/api/get-offer-highlight`);
            const result = await response.json();
            if (response.ok) {
                setOfferHighlight(result.highlight)
            }
            else {
                toast.error("Error! " + result.message);
            }
        } catch (err) {
            toast.error("Error! " + err.message);
        }
    }
    return (
        <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            customTransition="all 700ms"
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            {
                offerHighlight.map((o, i) => (
                    <div key={i} className="offers-card" style={{ width: "100%",minHeight:"350px", display: "flex", justifyContent: "space-evenly", alignItems: "center", backgroundColor: "var(--offers-main)", flexWrap: "wrap", boxSizing: "border-box", padding: "10px" }}>
                        <img src={o.image} style={{objectFit:"contain" }} alt="" />
                        <div className="offer-desc-cont" style={{  display: "flex", flexDirection: "column" ,textAlign:"center"}}>
                            <span style={{fontSize:"14px",color:"var(--text)"}}>{o.title}</span>
                            <span style={{fontSize:"24px",fontWeight:"bold",color:"var(--text)"}}>{o.subtitle}</span>
                        </div>
                    </div>
                ))
            }
        </Carousel>
    )
}
export default Offers;
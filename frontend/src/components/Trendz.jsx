import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    largeScreen: {
        breakpoint: { max: 4000, min: 1024 },
        items: 3
    },
    midScreen: {
        breakpoint: { max: 1023, min: 751 },
        items: 2
    },
    smallScreen: {
        breakpoint: { max: 750, min: 0 },
        items: 1
    }
};


function Trendz() {
    return (
        <div className="trendz-container" style={{ width: "100%", marginTop: "10px" }}>
            <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1757342863/wtfedwewvkxeodhunouv.png" style={{ width: "320px", borderRadius: "10px", objectFit: "contain" }} alt="" />
            <div className="trendz-carousel" style={{boxSizing:"border-box" }}>
                <Carousel
                    swipeable={true}
                    draggable={true}
                    removeArrowOnDeviceType={["largeScreen", "midScreen", "smallScreen"]}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={2000}
                    keyBoardControl={false}
                    customTransition="all 700ms"
                    transitionDuration={500}
                    
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {[
                        {
                            image: 'https://res.cloudinary.com/dns5lxuvy/image/upload/v1757339527/eto8o7evhvtgqu8o1ojx.webp',
                            name: 'Summer Women'
                        }, {
                            image: 'https://res.cloudinary.com/dns5lxuvy/image/upload/v1757339520/umak6kiuanlzwcdwqjep.webp',
                            name: 'Summer Men'
                        }, {
                            image: 'https://res.cloudinary.com/dns5lxuvy/image/upload/v1757339507/eihu0efy7fvs7egfpkmd.webp',
                            name: 'Earings'
                        }, {
                            image: 'https://res.cloudinary.com/dns5lxuvy/image/upload/v1757339496/lx3hs7s3uu5zlhjp6f0r.webp',
                            name: 'Footwear'
                        }
                    ].map((item, i) => <div key={i} className="trendz-multi-carousel" style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center",justifyContent:"center",height:"230px"}}>
                        <img src={item.image} style={{ width: "120px" }} alt="" />
                        <span className="name-box" style={{width:"fit-content",backgroundColor:"white",padding:"5px 10px",boxShadow:"4px 4px purple",fontWeight:"600",borderRadius:"10px",color:"#500143"}}>{ item.name}</span>
                    </div>)}
                </Carousel>
            </div>
        </div>
    )
}

export default Trendz;
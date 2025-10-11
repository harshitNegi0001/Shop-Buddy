import '../stylesheet/sellerChat.css';
import sellerImage from '../assets/sellerSamplePhoto.jpg';
import { IoChevronBack } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SellerChat() {
    const { sellerId } = useParams();
    const navigate = useNavigate();
    const [showChat, setShowChat] = useState(sellerId?true:false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        (windowWidth < 601) ? setShowChat(false) : setShowChat(true);
    }, [windowWidth]);

    useEffect(() => {
        
        if (sellerId) {
            setShowChat(true);
        }
    }, [sellerId]);

    const handleSellerClick = (id) => {
        navigate(`/seller-chat/${id}`);
    };

    return (
        <div className="liveChat-container">
            {/* Seller List */}
            <div
                className="chat-seller-list"
                style={{ display: `${(showChat&&sellerId && windowWidth < 601) ? 'none' : 'flex'}` }}
            >
                <div><span style={{ marginBottom: "20px" }}>Sellers list</span></div>

                <div onClick={() => handleSellerClick("yogesh")} className='chat-sel'>
                    <div className="seller-img--sm">
                        <img src={sellerImage} alt="seller_img" />
                    </div>
                    <div style={{ paddingBottom: "10px" }}>Yogesh Jani</div>
                </div>

                <div onClick={() => handleSellerClick("piyush")} className='chat-sel'>
                    <div className="seller-img--sm"><img src={sellerImage} alt="seller_img" /></div>
                    <div style={{ paddingBottom: "10px" }}>Piyush Negi</div>
                </div>

                <div onClick={() => handleSellerClick("ayush")} className='chat-sel'>
                    <div className="seller-img--sm"><img src={sellerImage} alt="seller_img" /></div>
                    <div style={{ paddingBottom: "10px" }}>Ayush Singh</div>
                </div>
            </div>

            {/* Chat Box */}
            {showChat && sellerId && (
                <div className="seller-chat">
                    <div className="chat-header">
                        <div className='close-chat' onClick={() => navigate(`/seller-chat`)}>
                            <IoChevronBack />
                        </div>
                        <div className="seller-img--sm"><img src={sellerImage} alt="seller_img" /></div>
                        <div className="seller-name">{sellerId}</div>
                    </div>
                    <div className="chat-main">
                        <div className='recieved-msg'><span className='left-msg'>{`Hello Admin,\nI need help.`}</span></div>
                        <div className='sent-msg'><span className='right-msg'>{'Hi,\nsure I will help you'}</span></div>
                    </div>
                    <div className='write-msg-container'>
                        <div className="msg-input"><input placeholder='Enter message' type='text' /></div>
                        <div className="send-msg"><RiSendPlaneFill /></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SellerChat;

import '../../stylesheet/livechat.css';
import sellerImage from '../../assets/sellerSamplePhoto.jpg';
import { IoChevronBack } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";

import { useState, useEffect } from 'react';
function SellerToCustomer() {
    const [showChat, setShowChat] = useState(false);
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
    return (
        <div className="liveChat-container" >
            <div className="chat-seller-list" style={{ display: `${(showChat && windowWidth < 601) ? 'none' : 'flex'}` }} >
                <div><span style={{ marginBottom: "20px" }}>Customer Chat</span></div>


                <div onClick={() => { setShowChat(true)}} className='chat-sel' >

                    <div className="seller-img--sm">
                        <img src={sellerImage} alt="seller_img" />
                    </div>
                    <div  style={{ paddingBottom: "10px" }}>Yogesh Jani</div>
                </div>
                <div onClick={() =>  setShowChat(true)} className='chat-sel' >

                    <div className="seller-img--sm" ><img src={sellerImage} alt="seller_img" /></div>
                    <div  style={{ paddingBottom: "10px" }}>Piyush Negi</div>
                </div>
                <div onClick={() =>  setShowChat(true)} className='chat-sel' >

                    <div className="seller-img--sm" ><img  src={sellerImage} alt="seller_img" /></div>
                    <div style={{ paddingBottom: "10px" }}>Ayush Singh</div>
                </div>
            </div>
            {showChat && <div className="seller-chat"  >
                <div className="chat-header" >
                    <div className='close-chat' onClick={() => { setShowChat(false)}} ><IoChevronBack /></div>
                    <div className="seller-img--sm" ><img src={sellerImage} alt="seller_img" /></div>
                    <div className="seller-name">Piyush Negi</div>
                </div>
                <div className="chat-main" >
                    <div className='recieved-msg' ><span className='left-msg' >{`Hello Admin, \nI need help.`}</span></div>
                    <div className='sent-msg' ><span className='right-msg' >{'hii, \nsure i will help you'}</span></div>

                </div>
                <div className='write-msg-container'>
                    <div className="msg-input"><input  placeholder='Enter message' type='text' /></div>
                    <div className="send-msg" ><RiSendPlaneFill /></div>
                </div>
            </div>}
        </div>
    )
}
export default SellerToCustomer;
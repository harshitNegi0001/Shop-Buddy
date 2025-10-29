import '../stylesheet/sellerChat.css';
import { IoChevronBack } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { socket } from '../utils/socket';
import { useSelector } from 'react-redux';
import loadingGif from '../assets/loading3.webp';


function SellerChat() {
    const [isLoading, setIsLoading] = useState(false);
    const { userId, userRole } = useSelector(state => state.auth);
    const { sellerId } = useParams();
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    const [sendMsgData, setSendMsgData] = useState('');
    const [chatList, setChatList] = useState([]);
    const [sellerInfo, setSellerInfo] = useState({});
    const [showChat, setShowChat] = useState(sellerId ? true : false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const Backend_port = import.meta.env.VITE_BACKEND_PORT;
    useEffect(() => {
        getChatList();
    }, [])

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
        if (sellerId && chatList) {
            setSellerInfo(chatList.find(s => s.id == sellerId))

        }
    }, [chatList, sellerId])
    useEffect(() => {
        (windowWidth < 601) ? setShowChat(false) : setShowChat(true);
    }, [windowWidth]);

    useEffect(() => {

        if (sellerId) {

            setShowChat(true);
            getMessages();
            socket.on('receive-msg', (msgData) => {

                if (msgData.seller_id == sellerId) {

                    setMessages((prev) => [msgData, ...prev])
                }
            })
            return () => {
                socket.off('receive-msg');
            };



        }
    }, [sellerId]);
    const getMessages = async () => {
        try {

            setIsLoading(true);
            const response = await fetch(`${Backend_port}/api/msg/seller-customer?sellerId=${sellerId}`, {
                method: "GET",
                credentials: "include"
            }
            )
            const result = await response.json();
            setIsLoading(false);
            if (response.ok) {
                setMessages(result.messages);

            }
            else {
                toast.error("Error! " + result.message);
            }
        } catch (err) {
            setIsLoading(false);
            toast.error("Error! " + err.message);
        }
    }
    const sendMessage = async (e) => {

        e.preventDefault();
        if (sendMsgData) {
            setSendMsgData('');
            try {
                const msg = {
                    sender: 'customer',
                    seller_id: sellerId,
                    customer_id: userId,
                    msg: sendMsgData
                }
                socket.emit('send-message', (msg))
                setIsLoading(true);
                const response = await fetch(`${Backend_port}/api/msg/send-seller-customer`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        msgData: sendMsgData,
                        sellerId: sellerId
                    }),
                    credentials: "include"
                });
                const result = await response.json();
                setIsLoading(false);
                if (response.ok) {
                    toast.success("Sent");
                    getChatList();
                }
                else {
                    toast.error("Error! " + result.message);

                }
            }
            catch (err) {
                setIsLoading(false);
                toast.error("Error! " + err.message);
            }
        }

    }
    const getChatList = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${Backend_port}/api/msg/get-chatlist?required=sellers`, {
                method: "GET",
                credentials: "include"
            });

            const result = await response.json();
            setIsLoading(false);
            if (response.ok) {
                setChatList(result.chatList);

            }
            else {
                toast.error("Error! " + result.message);
            }
        } catch (err) {
            setIsLoading(false);
            toast.error("Error! " + err.message);
        }
    }
    const handleSellerClick = (id) => {
        navigate(`/seller-chat/${id}`);
    };

    return (
        <div className="liveChat-container">
            {/* Seller List */}
            {isLoading && <div className="loading-div"><img src={loadingGif} /></div>}
            <div
                className="chat-seller-list scrollable"
                style={{ display: `${(showChat && sellerId && windowWidth < 601) ? 'none' : 'flex'}` }}
            >
                <div><span style={{ marginBottom: "20px" }}>Sellers list</span></div>

                {chatList.map((s, i) => <div key={i} onClick={() => handleSellerClick(s.id)} className={`${(s.id == sellerId) ? 'active-chat-sel' : 'chat-sel'}`}>
                    <div className="seller-img--sm">
                        <img src={s.image} alt="seller_img" />
                    </div>
                    <div style={{ paddingBottom: "10px" }}>{s.name}</div>
                </div>)}


            </div>

            {/* Chat Box */}
            {showChat && sellerId && (
                <div className="seller-chat">
                    <div className="chat-header">
                        <div className='close-chat' onClick={() => navigate(`/seller-chat`)}>
                            <IoChevronBack />
                        </div>
                        <div className="seller-img--sm"><img src={sellerInfo?.image} alt="seller_img" /></div>
                        <div className="seller-name">{sellerInfo?.name}</div>
                    </div>
                    <div className="chat-main">
                        {
                            messages.map((m, i) => <div key={i}>
                                <div className={`${(m.sender === 'seller') ? 'recieved-msg' : 'sent-msg'}`}><span className={`${(m.sender === 'seller') ? 'left-msg' : 'right-msg'}`}>{m.msg}</span></div>

                            </div>)
                        }

                    </div>
                    <div className='write-msg-container'>
                        <form style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }} onSubmit={(e) => sendMessage(e)}>
                            <div className="msg-input"><input placeholder='Enter message' type='text' value={sendMsgData} onChange={(e) => setSendMsgData(e.target.value)} /></div>
                            <button type='submit' onClick={(e) => sendMessage(e)} className={`${sendMsgData ? "send-msg" : "empty-send-msg"}`}><RiSendPlaneFill /></button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SellerChat;

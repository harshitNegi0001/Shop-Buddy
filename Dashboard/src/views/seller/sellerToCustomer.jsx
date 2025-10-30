import '../../stylesheet/livechat.css';
import { IoChevronBack } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { socket } from '../../utils/socket.js';
import { AuthContext } from '../../context/role_management.jsx';
import loadingGif from '../../assets/loading3.webp';

function SellerToCustomer() {
    const {auth} =useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { customerId } = useParams();
    const Backend_port = import.meta.env.VITE_BACKEND_PORT;
    const navigate = useNavigate();
    const [chatList, setChatList] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({});
    const [messages, setMessages] = useState([]);

    const [sendMsgData, setSendMsgData] = useState('');
    const [showChat, setShowChat] = useState(customerId ? true : false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   useEffect(() => {
        getCustomerList();
    }, []);
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

        if (customerId) {
            setShowChat(true);
            getMessages();
            
            socket.on('receive-msg', (msgData) => {
             
                if (msgData.customer_id == customerId) {

                    setMessages((prev) => [msgData, ...prev])
                }
            })
            return () => {
                socket.off('receive-msg');
            };
        }
    }, [customerId]);
    useEffect(() => {
        if (customerId && chatList) {
            setCustomerInfo(chatList.find(c => c.id == customerId));

        }
    }, [chatList, customerId]);

    const getCustomerList = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${Backend_port}/api/msg/get-chatlist?required=customers`, {
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
    const getMessages = async () => {
        try {

            setIsLoading(true);
            const response = await fetch(`${Backend_port}/api/msg/seller-customer?customerId=${customerId}`, {
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
                    sender: 'seller',
                    seller_id: auth.id,
                    customer_id: customerId,
                    msg: sendMsgData
                }


                socket.emit('send-message', (msg))

                // setIsLoading(true);
                const response = await fetch(`${Backend_port}/api/msg/send-seller-customer`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        msgData: sendMsgData,
                        customerId: customerId
                    }),
                    credentials: "include"
                });
                const result = await response.json();
                // setIsLoading(false);
                if (response.ok) {
                    toast.success("Sent");
                    getCustomerList();
                }
                else {
                    toast.error("Error! " + result.message);

                }
            }
            catch (err) {
                // setIsLoading(false);
                toast.error("Error! " + err.message);
            }
        }

    }
    const handleCustomerClick = (id) => {
        navigate(`/seller/dashboard/chat-customer/${id}`);
    };

    
    return (
        <div className="liveChat-container">
             {isLoading && <div className="loading-div"><img src={loadingGif} /></div>}
            {/* customers List */}
            <div
                className="chat-seller-list scrollable"
                style={{ display: `${(showChat && customerId && windowWidth < 601) ? 'none' : 'flex'}` }}
            >
                <div><span style={{ marginBottom: "20px" }}>Customer Chat</span></div>

                {chatList.map((s, i) => <div key={i} onClick={() => handleCustomerClick(s.id)} className={`${(s.id == customerId) ? 'active-chat-sel' : 'chat-sel'}`}>
                    <div className="seller-img--sm">
                        <img src={s.image} alt="seller_img" />
                    </div>
                    <div style={{ paddingBottom: "10px" }}>{s.name}</div>
                </div>)}


            </div>

            {/* Chat Box */}
            {showChat && customerId && (
                <div className="seller-chat">
                    <div className="chat-header">
                        <div className='close-chat' onClick={() => navigate(`/seller/dashboard/chat-customer`)}>
                            <IoChevronBack />
                        </div>
                        <div className="seller-img--sm"><img src={customerInfo?.image} alt="customer_image" /></div>
                        <div className="seller-name">{customerInfo?.name}</div>
                    </div>
                    <div className="chat-main">
                        {
                            messages.map((m, i) => <div key={i}>
                                <div className={`${(m.sender === 'customer') ? 'recieved-msg' : 'sent-msg'}`}><span className={`${(m.sender === 'customer') ? 'left-msg' : 'right-msg'}`}>{m.msg}</span></div>

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
    )
}
export default SellerToCustomer;
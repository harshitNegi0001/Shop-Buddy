import '../../stylesheet/livechat.css';
import sellerImage from '../../assets/sellerSamplePhoto.jpg';
import { RiSendPlaneFill } from "react-icons/ri";
import { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { socket } from '../../utils/socket.js';
import { AuthContext } from '../../context/role_management.jsx';
import loadingGif from '../../assets/loading3.webp';

function SellerToAdmin() {
        const [isLoading, setIsLoading] = useState(false);

    const { auth } = useContext(AuthContext);
   
    const Backend_port = import.meta.env.VITE_BACKEND_PORT;
    // const [chatList, setChatList] = useState([]);
    const [messages, setMessages] = useState([]);

    const [sendMsgData, setSendMsgData] = useState('');
    const [adminInfo, setAdminInfo] = useState({});
    // setCustomerInfo(chatList.find(c => c.id == customerId));
    useEffect(() => {
        getAdmin();
        getMessages();

        socket.on('receive-msg', (msgData) => {
            setMessages((prev) => [msgData, ...prev]);
        });
        return () => {
            socket.off('receive-msg');
        };
    }, []);
    const getAdmin = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${Backend_port}/api/msg/get-chatlist?required=admin`, {
                method: "GET",
                credentials: "include"
            });

            const result = await response.json();
            setIsLoading(false);
            if (response.ok) {
                setAdminInfo(result.chatList);

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
            const response = await fetch(`${Backend_port}/api/msg/seller-admin?adminId=${1}`, {
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
                    admin_id: 1,
                    msg: sendMsgData
                }


                socket.emit('send-message', (msg))

                // setIsLoading(true);
                const response = await fetch(`${Backend_port}/api/msg/send-seller-admin`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        msgData: sendMsgData,
                        adminId: 1
                    }),
                    credentials: "include"
                });
                const result = await response.json();
                // setIsLoading(false);
                if (response.ok) {
                    toast.success("Sent");
                    getAdmin();
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
    return (
        <div className="liveChat-container" >
{isLoading && <div className="loading-div"><img src={loadingGif} /></div>}
            <div className="seller-chat" style={{ width: "100%" }}  >
                <div className="chat-header" >
                    <div className="seller-img--sm" ><img src={adminInfo.image} alt="seller_img" /></div>
                    <div className="seller-name">{adminInfo.name} (Admin)</div>
                </div>
                <div className="chat-main">
                        {
                            messages.map((m, i) => <div key={i}>
                                <div className={`${(m.sender === 'admin') ? 'recieved-msg' : 'sent-msg'}`}><span className={`${(m.sender === 'admin') ? 'left-msg' : 'right-msg'}`}>{m.msg}</span></div>

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
        </div>
    )
}
export default SellerToAdmin;
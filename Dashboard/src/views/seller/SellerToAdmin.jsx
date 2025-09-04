import '../../stylesheet/livechat.css';
import sellerImage from '../../assets/sellerSamplePhoto.jpg';
import { RiSendPlaneFill } from "react-icons/ri";

function SellerToAdmin() {




    return (
        <div className="liveChat-container" >

            <div className="seller-chat" style={{ width: "100%" }}  >
                <div className="chat-header" >
                    <div className="seller-img--sm" ><img src={sellerImage} alt="seller_img" /></div>
                    <div className="seller-name">Admin</div>
                </div>
                <div className="chat-main" >
                    <div className='recieved-msg' ><span className='left-msg' >Hello Admin, <br />I need help</span></div>
                    <div className='sent-msg' ><span className='right-msg' >hii, <br />sure i will help you</span></div>

                </div>
                <div className='write-msg-container'>
                    <div className="msg-input"><input placeholder='Enter message' type='text' /></div>
                    <div className="send-msg" ><RiSendPlaneFill /></div>
                </div>
            </div>
        </div>
    )
}
export default SellerToAdmin;
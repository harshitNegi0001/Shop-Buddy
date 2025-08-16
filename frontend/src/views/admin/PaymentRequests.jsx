import '../../stylesheet/paymentReq.css';
import { forwardRef } from 'react';
import { FixedSizeList as List } from 'react-window';

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref}  {...props} />

))
function PaymentRequests() {
    const array = [1,2,3,4,5,6,7,8,9,10];
    const Row = ({index,style})=>{
        return (
            <div style={{...style,display:"flex",width:"100%",boxSizing:"border-box",padding:"5px"}}  >
                <div style={{width:"12%" }}>{index+1}</div>
                <div style={{width:"20%"}}>$499</div>
                <div style={{width:"26%"}}>Pendding</div>
                <div style={{width:"20%"}}>12 Aug 2025</div>
                <div style={{width:"22%"}}><button className='req-confirm-btn'>confirm</button></div>
            </div>
        )
    }

    return (
        <div className="payment-req">
            <div className="display-pay-req">
                <span>Payment Request</span>
                
                <div className="pay-req-table">
                    
                    <div className="pay-req-header">
                        <div style={{ width: "12%" }}>No.</div>
                        <div style={{ width: "20%" }}>Amount</div>
                        <div style={{ width: "26%" }}>Status</div>
                        <div style={{ width: "20%" }}>Date</div>
                        <div style={{ width: "22%" }}>Action</div>
                    </div>
                    {
                        <List style={{minWidth:"100%"}}
                        className='List' height={350} itemCount={10} itemSize={35} outerElementType={outerElementType}>
                            {Row}
                        </List>
                    }
                    
                </div>
                
            </div>
        </div>
    )
}
export default PaymentRequests;
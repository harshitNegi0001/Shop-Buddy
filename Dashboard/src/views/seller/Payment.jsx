import { MdCurrencyRupee } from "react-icons/md";
import { FixedSizeList as List } from 'react-window';
import { forwardRef } from 'react';

import '../../stylesheet/payment.css'

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref}  {...props} />

))

function Payment() {
    const Row = ({ index, style }) => {
        return (
            <div style={{ ...style, display: "flex", width: "100%", boxSizing: "border-box", padding: "5px", fontSize: "12px" }}  >
                <div style={{ width: "18%" }}>{index + 1}</div>
                <div style={{ width: "25%" }}>$499</div>
                <div style={{ width: "32%" }}>Pendding</div>
                <div style={{ width: "25%" }}>12 Aug 2025</div>

            </div>
        )
    }
    return (
        <div style={{ width: "90%", boxSizing: "border-box" }}>
            <div className="upper-dash" >
                <div className="small-upper-dash" style={{ backgroundColor: "rgba(181, 250, 185, 1)" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>
                            ₹12093
                        </span>
                        <span style={{ color: "black", fontSize: "12px" }}>
                            Total sales
                        </span>
                    </div>
                    <div id="rupee-curr-dash"><MdCurrencyRupee /></div>
                </div>
                <div className="small-upper-dash" style={{ backgroundColor: "rgba(236, 173, 255, 1)" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>
                            ₹120
                        </span>
                        <span style={{ color: "black", fontSize: "12px" }}>
                            Available Amount
                        </span>
                    </div>
                    <div id="product-curr-dash"><MdCurrencyRupee /></div>
                </div>
                <div className="small-upper-dash" style={{ backgroundColor: "rgb(253, 198, 116)" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>
                            ₹20
                        </span>
                        <span style={{ color: "black", fontSize: "12px" }}>
                            Withdrawal Amount
                        </span>
                    </div>
                    <div id="seller-curr-dash"><MdCurrencyRupee /></div>
                </div>
                <div className="small-upper-dash" style={{ backgroundColor: "rgba(151, 196, 253, 1)" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>
                            $99
                        </span>
                        <span style={{ color: "black", fontSize: "12px" }}>
                            Pending Amount
                        </span>
                    </div>
                    <div id="order-curr-dash"><MdCurrencyRupee /></div>
                </div>
            </div>
            <div className="payment-middle">
                <div className="sendRequest">
                    <div className="send-req">
                        <span>Send Request</span>
                        <form>
                            <input type="number"  />
                            <button >Send</button>
                        </form>
                    </div>
                    <div className="pending-req">
                        <div>Pending Request</div>
                        <div className="pay-req-header">
                            <div style={{ width: "18%" }}>No.</div>
                            <div style={{ width: "25%" }}>Amount</div>
                            <div style={{ width: "32%" }}>Status</div>
                            <div style={{ width: "25%" }}>Date</div>
                        </div>
                        {
                            <List style={{ minWidth: "100%" }}
                                className='List' height={350} itemCount={10} itemSize={35} outerElementType={outerElementType}>
                                {Row}
                            </List>
                        }
                    </div>
                </div>
                <div className="successWindow">
                    <div>Success Window</div>
                    <div className="success-table">
                        <div className="pay-req-header">
                            <div style={{ width: "18%" }}>No.</div>
                            <div style={{ width: "25%" }}>Amount</div>
                            <div style={{ width: "32%" }}>Status</div>
                            <div style={{ width: "25%" }}>Date</div>
                        </div>
                        {
                            <List style={{ minWidth: "100%" }}
                                className='List' height={460} itemCount={10} itemSize={35} outerElementType={outerElementType}>
                                {Row}
                            </List>
                        }
                       
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Payment;
import sampleImage from '../../assets/image-sample.png'

function OrderDetails() {
    return (
        <div className="order-details-container" style={{ width: "90%", boxSizing: "border-box", padding: "15px 20px", borderRadius: "15px", backgroundColor: "rgb(132, 203, 250)", margin: "20px 0px", display: "flex", flexDirection: "column" }}>
            <div className="order-detail-header" style={{ width: "100%", boxSizing: "border-box", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span >Orders Details</span>
                <select name="order-status" id="order-status" style={{ width: "120px", background: "none", border: "2px solid black", borderRadius: "10px", height: "33px", textAlign: "center", outline: "none" }}>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="placed">Placed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>
            <div className="order-detail-main" style={{  boxSizing: "border-box", marginTop: "15px", padding: "5px 0px", display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
                <div className="od-main-left" style={{  width: "260px" }}>
                    <div style={{ display: "flex", gap: "10px", fontSize: "14px" }}><span>#454545</span><span>3 may 2025</span></div>
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>Delivered to : Raju Dhami</div>
                    <div style={{ fontSize: "12px" }}>47 W 13th St, New York, NY 10011, USA </div>
                    <div style={{ fontSize: "14px" }}>Payment status : <span style={{ fontWeight: "600" }}>Paid</span></div>
                    <div style={{ fontSize: "14px" }}>Price : $199</div>
                    <div>
                        <div style={{ backgroundColor: "var(--mess-outer)", fontSize: "12px", display: "flex", width: "100%", boxSizing: "border-box", padding: "5px", gap: "5px", marginTop: "10px", height: "70px", borderRadius: "10px", color: "white", alignItems: "center" }}>
                            <img src={sampleImage} style={{ width: "40px",borderRadius:"20px" }} alt="dp" />
                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <span>Long t-shirt</span>
                                <span>Brand : MegaWear</span>
                                <span>Quantity : 2</span>
                            </div>
                        </div>
                        <div style={{ backgroundColor: "var(--mess-outer)", fontSize: "12px", display: "flex", width: "100%", boxSizing: "border-box", padding: "5px", gap: "5px", marginTop: "10px", height: "70px", borderRadius: "10px", color: "white", alignItems: "center" }}>
                            <img src={sampleImage} style={{ width: "40px",borderRadius:"20px" }} alt="dp" />
                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <span>Long t-shirt</span>
                                <span>Brand : MegaWear</span>
                                <span>Quantity : 2</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ad-main-right" style={{  width: "calc( 100% - 300px)", minWidth: "260px", display: "flex", alignItems: "center" }}>
                    <div style={{ width: "100%", boxSizing: "border-box", padding: "5px", backgroundColor: "var(--mess-outer)",borderRadius:"10px" }}>
                        <div style={{ display: "flex", flexDirection: "column",color:"white" }}>
                            <span>Seller 1 order : Pending</span>
                            <div style={{ fontSize: "12px", display: "flex", width: "100%", boxSizing: "border-box", padding: "5px", gap: "5px", height: "70px", alignItems: "center" }}>
                                <img src={sampleImage} style={{ width: "40px" ,borderRadius:"20px" }} alt="dp" />
                                <div style={{ display: 'flex', flexDirection: "column" }}>
                                    <span>Long t-shirt</span>
                                    <span>Brand : MegaWear</span>
                                    <span>Quantity : 2</span>
                                </div>
                            </div>
                        </div>
                         <div style={{ display: "flex", flexDirection: "column",color:"white" }}>
                            <span>Seller 2 order : Pending</span>
                            <div style={{ fontSize: "12px", display: "flex", width: "100%", boxSizing: "border-box", padding: "5px", gap: "5px", height: "70px", alignItems: "center" }}>
                                <img src={sampleImage} style={{ width: "40px",borderRadius:"20px" }} alt="dp" />
                                <div style={{ display: 'flex', flexDirection: "column" }}>
                                    <span>Long t-shirt</span>
                                    <span>Brand : MegaWear</span>
                                    <span>Quantity : 2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default OrderDetails;
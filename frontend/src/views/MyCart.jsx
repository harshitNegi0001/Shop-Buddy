import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import '../stylesheet/myCart.css';
import { Link, useNavigate } from "react-router-dom";
import empty_cart from '../assets/empty_cart.png';
import loadingGif from '../assets/loading3.webp';

function MyCart() {
    const [myCartProd, setMyCartProd] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const Backend_port = import.meta.env.VITE_BACKEND_PORT;
    const [quantity, setQuantity] = useState([]);
    const platChargePrecent = 10;
    const [subtotal, setSubtotal] = useState(0);
    const [grandtotal, setGrandtotal] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        getMyCart();
    }, []);
    useEffect(() => {
        let sub = 0;
        for (let i = 0; i < myCartProd.length; i++) {
            sub += quantity[i] * (myCartProd[i].price * (1 - myCartProd[i].discount / 100));
        }
        setSubtotal(sub.toFixed(2));
        setGrandtotal((sub * (1 + platChargePrecent / 100)).toFixed(2));
    }, [quantity])
    const closeProd = (i) => {
        const closedProd = myCartProd.filter((p, index) => i != index);
        setMyCartProd([...closedProd]);
        const closedQuantity = quantity.filter((q, index) => index != i);
        setQuantity([...closedQuantity]);

    }
    const deleteFromCart = async (id, i) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${Backend_port}/api/delete-from-myCart`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    cart_id: id
                }),
                credentials: "include"
            });
            const result = await response.json();
            setIsLoading(false);
            if (response.ok) {
                toast.success("Product removed from cart");
                closeProd(i);
            }
            else {
                toast.error("Error! " + result.message);
            }
        } catch (err) {
            setIsLoading(false);
            toast.error("Error! " + err.message);
        }
    }
    const getMyCart = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${Backend_port}/api/get-cart-prod`, {
                method: "GET",
                credentials: "include"
            });

            const result = await response.json();
            setIsLoading(false);
            if (response.ok) {
                setMyCartProd(result.cartProd);
                const temp = result.cartProd.map(i => 1)
                setQuantity(temp);
                // console.log(result.cartProd);
            }
            else {
                toast.error("Error! " + result.message);
            }
        } catch (err) {
            setIsLoading(false);
            toast.error("Error! " + err.messsage);
        }
    }
    const reduceQuantity = (index) => {
        if (quantity[index] > 0) {
            const temp = quantity.map((q, i) => { return (i === index) ? q - 1 : q });
            setQuantity([...temp]);
        }

    }
    const increaseQuantity = (index) => {

        const temp = quantity.map((q, i) => { return (i === index) ? q + 1 : q });
        setQuantity([...temp]);


    }
    const navigateToBuy = () => {
        if (myCartProd.length > 0 && subtotal > 0) {
            navigate('/buy-products', {
                state: {
                    myCartProd, quantity, grandtotal, subtotal
                }
            });
        }
        else {
            toast.error("Please select at least one product");
        }
    }

    return (
        <div>
            {isLoading && <div className="loading-div"><img src={loadingGif} /></div>}
            {(myCartProd.length > 0) ? <div className="my-cart-cont" >
                <div className="cart-products">
                    {myCartProd.map((prod, i) => <div key={i} className="cart-prod-detail">
                        <div className="close-card" onClick={() => closeProd(i)}><MdClose /></div>
                        <div className="cart-prod-image"><img src={prod.images?.[0]} alt="" /></div>
                        <div className="cart-prod-info">
                            <div style={{ color: "var(--muted-text)", fontSize: "16px", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}>{prod.name}</div>
                            <div style={{ color: "var(--primary)", fontSize: "12px", fontWeight: "600" }}>{prod.brand}</div>
                            <div style={{ width: "100%", height: "0px", border: "1px solid var(--highlight)", borderRadius: "5px" }}></div>
                            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px", gap: "5px", color: "var(--text)", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                                <div style={{ display: "flex", gap: "3px" }}>QTY: <div style={{ display: "flex", gap: "3px", height: "14px", alignItems: "center", border: "1px solid gray", padding: "1px", borderRadius: "10px" }}>
                                    <FaMinus color="var(--primary)" onClick={() => reduceQuantity(i)} /> <div style={{ height: "100%", width: "0px", border: "1px solid gray" }}></div> <span style={{ padding: "0px 3px" }}>{quantity[i]}</span> <div style={{ height: "100%", width: "0px", border: "1px solid gray" }}></div> <FaPlus color="var(--primary)" onClick={() => increaseQuantity(i)} />
                                </div></div>

                                <div>price : ₹ {(prod.price * (1 - prod.discount / 100)).toFixed(2)}</div>
                                <div>total : ₹ {((prod.price * (1 - prod.discount / 100)) * quantity[i]).toFixed(2)}</div>
                                <RiDeleteBin5Fill color="red" size={18} onClick={() => deleteFromCart(prod.cart_id, i)} />
                            </div>
                        </div>
                    </div>)}
                </div>
                <div className="checkout-cont">
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}> <span>Subtotal</span> <span>₹ {subtotal}</span> </div>

                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}><span>Platform charges</span> <span>₹ {(subtotal * platChargePrecent / 100).toFixed(2)}</span></div>
                    <div style={{ width: "100%", height: "0px", border: "1px solid var(--highlight)", borderRadius: "5px" }}></div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}><span>Grand total</span> <span>₹ {grandtotal}</span></div>
                    <div style={{ width: "100%", height: "0px", border: "1px solid var(--highlight)", borderRadius: "5px" }}></div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}> <button onClick={() => navigateToBuy()}>Checkout</button></div>
                </div>
            </div> : <div style={{ width: "100%", height: "calc(100vh - 120px)", fontWeight: "600", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                <img src={empty_cart} alt="" style={{ width: "300px" }} />
                <span style={{ fontSize: "24px", color: "var(--text)" }}>Your cart is empty</span>
                <span style={{ fontSize: "24px", color: "var(--text)" }}>Go Back <Link to={'/'} style={{ color: "var(--primary)", fontWeight: "bold", textDecoration: "none" }}>Home</Link></span>
            </div>}
        </div>
    )
}

export default MyCart;
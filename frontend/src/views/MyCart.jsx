import { useState, useEffect} from "react";
import toast from "react-hot-toast";


function MyCart () {
    const [myCartProd,setMyCartProd] = useState([]);
    const Backend_port = import.meta.env.VITE_BACKEND_PORT;
    useEffect(()=>{
        getMyCart();
    },[])
    const getMyCart = async()=>{
        try {
            const response = await fetch(`${Backend_port}/api/get-cart-prod`,{
                method:"GET",
                credentials:"include"
            });
             
            const result = await response.json();

            if(response.ok){
                setMyCartProd(result.cartProd);
                console.log(result.cartProd);
            }
            else{
                toast.error("Error! "+result.message);
            }
        } catch (err) {
            toast.error("Error! "+err.messsage);
        }
    }
    return (
        <div>
            
        </div>
    )
}

export default MyCart;
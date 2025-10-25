import returnRes from "../../utiles/response.js";
import db from '../../utiles/db.js';

class Orders {
    bookMyOrder = async (req,res)=>{
        const role = req.role;
        if(role==='customer'){
            const id = req.id;
            const {formData,cardInfo,myCartProd,quantity,deliveryMeth,paymentMethod }= req.body;
            const prodIds = myCartProd.map(p=>p.id);
            const payStatus = (paymentMethod==='card')?'Paid':'Pending';
            const prices = myCartProd.map(p=>parseFloat((p.price*(1-p.discount/100)).toFixed(2)));
            const totalCost = (prices.reduce((s,p)=>s+p,0)*1.1).toFixed(2);
            console.log(prices,totalCost);
            try {
                await db.query('INSERT INTO orders (customer_id,products_id,products_quantity,order_status,payment_status,receiving_method,total_cost,prices) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',[id,prodIds,quantity,'Pending',payStatus,deliveryMeth,totalCost,prices]);
                return returnRes(res,200,{message:"Success"});
            } catch (err) {
                return returnRes(res,500,{message:"Internal server error"});
            }
        }
        else{
            return returnRes(res,403,{message:"You are not allowed"});
        }
    }
    getMyOrderHist = async (req,res)=>{
        const role = req.role;
        if(role==='customer'){
            const id = req.id;
            try {
                const result = await db.query('SELECT o.*, json_agg(p.*) AS prod_info FROM orders AS o JOIN products AS p ON p.id = ANY(o.products_id) WHERE o.customer_id =$1 GROUP BY o.id ORDER BY o.id DESC',[id]);
                
                return returnRes(res,200,{message:"success",ordersList:result.rows});
            } catch (err) {
                return returnRes(res,500,{message:"Internal Server Error"});
            }
        }
        else{
            return returnRes(res,403,{message:"You are not allowed"});
        }
    }
}


export default new Orders();
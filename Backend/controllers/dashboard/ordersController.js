import returnRes from "../../utiles/response.js";
import db from '../../utiles/db.js';

class Orders {
    bookMyOrder = async (req, res) => {
        const role = req.role;
        if (role === 'customer') {
            const id = req.id;
            const { formData, cardInfo, myCartProd, quantity, deliveryMeth, paymentMethod } = req.body;
            const prodIds = myCartProd.map(p => p.id);
            const payStatus = (paymentMethod === 'card') ? 'Paid' : 'Pending';
            const prices = myCartProd.map(p => parseFloat((p.price * (1 - p.discount / 100)).toFixed(2)));
            const totalCost = (prices.reduce((s, p) => s + p, 0) * 1.1).toFixed(2);

            try {
                await db.query('INSERT INTO orders (customer_id,products_id,products_quantity,order_status,payment_status,receiving_method,total_cost,prices) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', [id, prodIds, quantity, 'Pending', payStatus, deliveryMeth, totalCost, prices]);
                return returnRes(res, 200, { message: "Success" });
            } catch (err) {
                // console.log(err);
                return returnRes(res, 500, { message: "Internal server error" });
            }
        }
        else {
            return returnRes(res, 403, { message: "You are not allowed" });
        }
    }
    getMyOrderHist = async (req, res) => {
        const role = req.role;
        if (role === 'customer') {
            const id = req.id;
            try {
                const result = await db.query('SELECT o.*, json_agg(p.*) AS prod_info FROM orders AS o JOIN products AS p ON p.id = ANY(o.products_id) WHERE o.customer_id =$1 GROUP BY o.id ORDER BY o.id DESC', [id]);

                return returnRes(res, 200, { message: "success", ordersList: result.rows });
            } catch (err) {
                return returnRes(res, 500, { message: "Internal Server Error" });
            }
        }
        else {
            return returnRes(res, 403, { message: "You are not allowed" });
        }
    }

    getAllOrders = async (req, res) => {
        const role = req.role;
        if (role === 'admin') {
            try {
                const { parPage, currPage } = req.query;
                const total = await db.query("SELECT COUNT(id) FROM orders");
                const result = await db.query("SELECT * FROM orders ORDER BY id DESC OFFSET $1 LIMIT $2", [(parPage * (currPage - 1)), parPage])

                return returnRes(res, 200, { message: "Success", total: total.rows[0].count, orders: result.rows });
            } catch (err) {
                // console.log(err);
                return returnRes(res, 500, { message: "Internal Server Error" });
            }
        }
        else {
            return returnRes(res, 403, { message: "You are not allowed" });
        }
    }
    getSellersOrders = async (req, res) => {
        const role = req.role;
        if (role === 'seller') {
            const id = req.id;
            try {
                const { parPage, currPage } = req.query;
                const total = await db.query("SELECT o.id FROM orders as o join products as p on p.id=any(o.products_id) where p.seller_id =$1 group by o.id ORDER BY o.id DESC", [id]);
                const result = await db.query("SELECT o.*,array_agg(p.*) as products FROM orders as o join products as p on p.id=any(o.products_id) where p.seller_id =$1 group by o.id ORDER BY o.id DESC  OFFSET $2 LIMIT $3", [id, (parPage * (currPage - 1)), parPage])

                return returnRes(res, 200, { message: "Success", total: total.rows.length, orders: result.rows });
            } catch (err) {
                // console.log(err);
                return returnRes(res, 500, { message: "Internal Server Error" });
            }
        }
        else {
            return returnRes(res, 403, { message: "You are not allowed" });
        }
    }
    getOrderDetail = async (req, res) => {
        const role = req.role;
        if (role === 'admin') {
            const { orderId } = req.query;
            try {
                const result = await db.query(`select c.name AS customer_name , c.address AS customer_address,o.id AS order_id,o.created_at as ordered_date,o.total_cost,o.payment_status,o.order_status, o.products_id,o.products_quantity as quantity, s.s_name as seller_name , s.s_id as seller_id, array_agg(json_build_object('name',p.name,'id',p.id,'images',p.images,'brand',p.brand)) as products from orders as o join customers as c on c.id=o.customer_id join products as p on p.id =any(o.products_id) join seller_info as s on p.seller_id = s.s_id where o.id = $1 group by o.id ,c.id, s.s_id`, [orderId]);

                return returnRes(res, 200, { message: "Success", orderDetail: result.rows })
            } catch (err) {
                // console.log(err)
                return returnRes(res, 500, { message: "Internal server error." });
            }
        }
        else if (role === 'seller') {
            const id = req.id;
            const { orderId } = req.query;
            try {
                const result = await db.query(`select c.name AS customer_name , c.address AS customer_address,o.id AS order_id,o.created_at as ordered_date,o.total_cost,o.payment_status,o.order_status, o.products_id,o.products_quantity as quantity, s.s_name as seller_name , s.s_id as seller_id, array_agg(json_build_object('name',p.name,'id',p.id,'images',p.images,'brand',p.brand)) as products from orders as o join customers as c on c.id=o.customer_id join products as p on p.id =any(o.products_id) join seller_info as s on p.seller_id = s.s_id where o.id = $1 AND seller_id=$2 group by o.id ,c.id, s.s_id`, [orderId,id]);

                return returnRes(res, 200, { message: "Success", orderDetail: result.rows[0] })
            } catch (err) {
                console.log(err)
                return returnRes(res, 500, { message: "Internal server error." });
            }
        }
        else {
            return returnRes(res, 403, { message: "You are not allowed" });
        }
    }
}


export default new Orders();
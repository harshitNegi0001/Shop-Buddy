import returnRes from "../../utiles/response.js";
import db from '../../utiles/db.js';

class Messages {
    getSellerCustomer = async (req, res) => {
        const id = req.id;
        const role = req.role;
        if (role === 'seller' || role === 'customer') {
            const sellerId = (role === 'seller') ? id : req.query.sellerId;
            const customerId = (role === 'seller') ? req.query.customerId : id;

            const messages = await db.query('SELECT * FROM seller_customer WHERE seller_id = $1 AND customer_id = $2 ORDER BY created_at DESC', [sellerId, customerId]);
            return returnRes(res, 200, { message: 'Success', messages: messages.rows });
        }
        else {
            return returnRes(res, 403, { message: "Access denied. You do not have permission." });
        }


    }
    getSellerAdmin = async (req, res) => {
        const id = req.id;
        const role = req.role;
        if (role === 'seller' || role === 'admin') {
            const sellerId = (role === 'seller') ? id : req.query.sellerId;
            const adminId = (role === 'seller') ? req.query.adminId : id;

            const messages = await db.query('SELECT * FROM seller_admin WHERE seller_id = $1 AND admin_id = $2 ORDER BY created_at DESC', [sellerId, adminId]);
            return returnRes(res, 200, { message: 'Success', messages: messages.rows });
        }
        else {
            return returnRes(res, 403, { message: "Access denied. You do not have permission." });
        }


    }
    getChatList = async (req, res) => {
        const role = req.role;
        const id = req.id;
        const { required } = req.query;
        

        try {
            if (role == 'seller') {
                if (required === 'customers') {
                    const recentList = await db.query('SELECT c.id,c.name,c.image,max(sc.created_at) FROM customers AS c JOIN seller_customer AS sc ON c.id = sc.customer_id WHERE sc.seller_id = $1 GROUP BY (c.id,c.name,c.image) ORDER BY max(sc.created_at) DESC', [id]);
                    const selectedIds = recentList.rows.map(c => c.id);
                    const allCustomers = await db.query('SELECT id,name,image FROM customers WHERE id!=ALL($1::int[]) ORDER BY id DESC', [selectedIds]);
                    const chatList = [...recentList.rows, ...allCustomers.rows];
                    if (chatList.length > 0) {
                        return returnRes(res, 200, { message: "fetching success", chatList: chatList });

                    }
                    else {
                        return returnRes(res, 404, { message: "NO customers found" });
                    }
                }
                else if (required === 'admin') {
                    const recentList = await db.query('SELECT id ,name,image FROM admins');
                    return returnRes(res, 200, { message: "fetching success", chatList: recentList.rows[0] });
                }
                else {
                    return returnRes(res, 400, { message: "Something Went Wrong" });
                }
            }
            else if (role === 'customer') {
                if (required === 'sellers') {
                    const recentList = await db.query("SELECT s.s_id AS id ,s.s_name AS name ,s.s_image AS image ,max(sc.created_at) FROM seller_info AS s JOIN seller_customer AS sc ON s.s_id = sc.seller_id  WHERE sc.customer_id = $1 GROUP BY (s.s_id,s.s_name,s.s_image) ORDER BY MAX(sc.created_at) DESC", [id]);
                    const selectedIds = recentList.rows.map(s => s.id);
                    const allCustomers = await db.query('SELECT s_id AS id, s_name AS name ,s_image AS image FROM seller_info WHERE s_id != ALL($1::int[]) ORDER BY id DESC', [selectedIds]);
                    // console.log(recentList.rows,(await allCustomers).rows)
                    const chatList = [...recentList.rows, ...allCustomers.rows];
                    if (chatList.length > 0) {
                        return returnRes(res, 200, { message: "fetching success", chatList: chatList });

                    }
                    else {
                        return returnRes(res, 404, { message: "NO customers found" });
                    }
                }
                else {
                    return returnRes(res, 400, { message: "Something Went Wrong" });
                }
            }
            else {
                if (required === 'sellers') {
                    const recentList = await db.query("SELECT s.s_id AS id ,s.s_name AS name ,s.s_image AS image ,max(sa.created_at) FROM seller_info AS s JOIN seller_admin AS sa ON s.s_id = sa.seller_id  WHERE sa.admin_id = $1 GROUP BY (s.s_id,s.s_name,s.s_image) ORDER BY MAX(sa.created_at) DESC", [id]);
                    const selectedIds = recentList.rows.map(s => s.id);
                    const allCustomers = await db.query('SELECT s_id AS id, s_name AS name, s_image AS image FROM seller_info WHERE  s_id != ALL($1::int[]) ORDER BY id DESC', [selectedIds]);
                    const chatList = [...recentList.rows, ...allCustomers.rows];
                    if (chatList.length > 0) {
                        return returnRes(res, 200, { message: "fetching success", chatList: chatList });
                    }
                    else {
                        return returnRes(res, 404, { message: "NO customers found" });
                    }
                }
                else {
                    return returnRes(res, 400, { message: "Something Went Wrong" });
                }
            }
        }
        catch (err) {
            console.log(err)
            return returnRes(res, 500, { message: "Internal Server Error" })
        }
    }
    sendSellerCustomerMsg = async (req, res) => {
        const role = req.role;
        const id = req.id;
        if (role === 'customer' || role === 'seller') {
            try {
                const sellerId = (role === 'seller') ? id : req.body.sellerId;
                const customerId = (role === 'seller') ? req.body.customerId : id;

                const { msgData } = req.body;
                await db.query("INSERT INTO seller_customer (seller_id,customer_id,sender,msg) VALUES($1,$2,$3,$4)", [sellerId, customerId, role, msgData]);
                return returnRes(res, 200, { message: "Success" })
            }
            catch (err) {
                // console.log(err);
                return returnRes(res, 500, { message: "Internal Server Error" })
            }
        }
        else {
            return returnRes(res, 403, { message: "Access denied. You do not have permission." });
        }
    }
    sendSellerAdminMsg = async (req, res) => {
        const role = req.role;
        const id = req.id;
        if (role === 'admin' || role === 'seller') {
            try {
                const sellerId = (role === 'seller') ? id : req.body.sellerId;
                const adminId = (role === 'seller') ? req.body.adminId : id;

                const { msgData } = req.body;
                await db.query("INSERT INTO seller_admin (seller_id,admin_id,sender,msg) VALUES($1,$2,$3,$4)", [sellerId, adminId, role, msgData]);
                return returnRes(res, 200, { message: "Success" });
            }
            catch (err) {
                // console.log(err);
                return returnRes(res, 500, { message: "Internal Server Error" });
            }
        }
        else {
            return returnRes(res, 403, { message: "Access denied. You do not have permission." });
        }
    }
    getLatestMsg = async (req, res) => {
        const role = req.role;
        const id = req.id;
        if (role === 'admin') {
            try {
                const result = await db.query("SELECT c.*,s.s_name,s.s_image,s.s_id FROM seller_admin AS c JOIN seller_info AS s ON s.s_id=c.seller_id  WHERE c.admin_id = $1 AND c.sender = 'seller' ORDER BY c.id DESC  LIMIT 3", [id]);
                return returnRes(res, 200, { message: 'Success', latestMsg: result.rows });
            }
            catch (err) {
                return returnRes(res, 500, { message: 'Internal server error' });
            }
        }
        else if (role === 'seller') {
            try {
                const result = await db.query("SELECT m.*,c.name,c.image FROM seller_customer AS m JOIN customers AS c ON c.id=m.customer_id  WHERE m.seller_id = $1 AND m.sender = 'customer' ORDER BY m.id DESC  LIMIT 3", [id]);
                return returnRes(res, 200, { message: 'Success', latestMsg: result.rows });
            }
            catch (err) {
                return returnRes(res, 500, { message: 'Internal server error' });
            }
        }
    }
}

export default new Messages();
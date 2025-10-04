import returnRes from "../../utiles/response";

class Messages {
    getSellerCustomer = async (req, res) => {
        const id = req.id;
        const role = req.role;
        if (role === 'seller' || role === 'customer') {
            const sellerId = (role === 'seller') ? id : req.query.sellerId;
            const customerId = (role === 'seller') ? req.query.customerId : id;
        }
        else{
            return returnRes(res,403,{message:"Access denied. You do not have permission."});
        }


    }
}

export default new Messages();
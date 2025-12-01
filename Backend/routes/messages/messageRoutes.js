import express from 'express';
import Messages from '../../controllers/messages/messageController.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { checkUser } from '../../middlewares/userAuthMiddleware.js';

const router = express.Router();

router.get("/seller-customer",authMiddleware,Messages.getSellerCustomer);
router.get("/customer-seller",checkUser,Messages.getSellerCustomer);
router.get("/seller-admin",authMiddleware,Messages.getSellerAdmin);
router.get('/get-chatlist',authMiddleware,Messages.getChatList);
router.get('/get-chatlist-for-user',checkUser,Messages.getChatList);

router.post('/send-seller-customer',authMiddleware,Messages.sendSellerCustomerMsg);
router.post('/send-customer-seller',authMiddleware,Messages.sendSellerCustomerMsg);
router.post('/send-seller-admin',authMiddleware,Messages.sendSellerAdminMsg);

router.get('/get-latest-msg',authMiddleware,Messages.getLatestMsg);


export default router;
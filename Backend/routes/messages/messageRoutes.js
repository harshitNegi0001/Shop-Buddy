import express from 'express';
import Messages from '../../controllers/messages/messageController.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/seller-customer",authMiddleware,Messages.getSellerCustomer);
router.get("/seller-admin",authMiddleware,Messages.getSellerAdmin);
router.get('/get-chatlist',authMiddleware,Messages.getChatList);


router.post('/send-seller-customer',authMiddleware,Messages.sendSellerCustomerMsg);
router.post('/send-seller-admin',authMiddleware,Messages.sendSellerAdminMsg);

router.get('/get-latest-msg',authMiddleware,Messages.getLatestMsg);


export default router;
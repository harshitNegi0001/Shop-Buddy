import express from 'express';
import Messages from '../../controllers/messages/messageController.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/seller-costomer",authMiddleware,Messages.getSellerCustomer);
router.get('/get-chatlist',authMiddleware,Messages.getChatList);


router.post('/send-seller-customer',authMiddleware,Messages.sendSellerCustomerMsg);



export default router;
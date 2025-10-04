import express from 'express';
import Messages from '../../controllers/messages/messageController';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = express.Router();

router.get("seller-costomer",authMiddleware,Messages.getSellerCustomer);


export default router;
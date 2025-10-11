import express from 'express';
import Messages from '../../controllers/messages/messageController.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get("seller-costomer",authMiddleware,Messages.getSellerCustomer);


export default router;
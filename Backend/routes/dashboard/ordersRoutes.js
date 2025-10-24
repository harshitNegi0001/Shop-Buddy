import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import Orders from '../../controllers/dashboard/ordersController.js';

const router = express.Router();

router.post('/book-my-order',authMiddleware,Orders.bookMyOrder);



export default router;
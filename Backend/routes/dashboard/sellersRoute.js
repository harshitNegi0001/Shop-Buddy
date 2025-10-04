import express from 'express';
import { checkAdmin } from '../../middlewares/checkAdmin.js';
import Seller from '../../controllers/dashboard/sellerController.js';


const router = express.Router();


router.get('/get-sellers',checkAdmin,Seller.getSeller);
router.get('/get-seller-detail',checkAdmin,Seller.getSellerDetail);
router.post('/set-seller-status',checkAdmin,Seller.setSellerStatus);

export default router;
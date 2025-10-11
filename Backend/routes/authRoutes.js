import express from 'express';
import authController from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/admin-login',authController.adminLogin);
router.get('/get-user',authMiddleware, authController.getUser);
router.post('/add-shop',authMiddleware, authController.addShop);
router.post('/logout',authController.logout);

router.post('/seller-register',authController.sellerRegister);
router.post('/update-profile',authMiddleware,authController.updateProfile);
router.post('/seller-login',authController.sellerLogin);
router.post('/customer-login',authController.customerLogin);
router.post('/edit-customer-prof',authMiddleware,authController.editCustomerInfo);



export default router;
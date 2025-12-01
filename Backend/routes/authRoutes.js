import express from 'express';
import authController from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { checkUser } from '../middlewares/userAuthMiddleware.js';
const router = express.Router();

router.post('/admin-login',authController.adminLogin);
router.get('/get-user',authMiddleware, authController.getUser);
router.get('/get-user-customer',checkUser, authController.getUser);
router.post('/add-shop',authMiddleware, authController.addShop);
router.post('/logout',authController.logout);
router.post('/logout-user',authController.userLogout);
router.post('/seller-register',authController.sellerRegister);
router.post('/update-profile',authMiddleware,authController.updateProfile);
router.post('/seller-login',authController.sellerLogin);
router.post('/customer-login',authController.customerLogin);
router.post('/customer-register',authController.customerRegister);
router.post('/edit-customer-prof',authMiddleware,authController.editCustomerInfo);



export default router;
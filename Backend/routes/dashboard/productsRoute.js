import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import Product from '../../controllers/dashboard/productsController.js'
import { checkUser } from '../../middlewares/userAuthMiddleware.js';


const router = express.Router();

router.post('/add-product',authMiddleware,Product.addProduct);
router.get('/get-products',Product.getProducts);
router.get('/get-product-detail',Product.getProductDetail);
router.post('/edit-product',authMiddleware,Product.editProduct);
router.post('/rate-prod',checkUser,Product.rateProd);

router.get('/get-offer-highlight',Product.getOfferHighlight);
router.post('/add-to-cart',checkUser,Product.addToCart);
router.get('/get-cart-prod',checkUser,Product.getMyCart);
router.post('/delete-from-myCart',checkUser,Product.deleteFromCart);

export default router;
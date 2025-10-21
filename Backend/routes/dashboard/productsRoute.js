import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import Product from '../../controllers/dashboard/productsController.js'


const router = express.Router();

router.post('/add-product',authMiddleware,Product.addProduct);
router.get('/get-products',Product.getProducts);
router.get('/get-product-detail',Product.getProductDetail);
router.post('/edit-product',authMiddleware,Product.editProduct);
router.post('/rate-prod',Product.rateProd)

router.get('/get-offer-highlight',Product.getOfferHighlight)
router.post('/add-to-cart',authMiddleware,Product.addToCart);
router.get('/get-cart-prod',authMiddleware,Product.getMyCart);

export default router;
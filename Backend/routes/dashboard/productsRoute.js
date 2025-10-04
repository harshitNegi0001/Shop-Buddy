import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import Product from '../../controllers/dashboard/productsController.js'


const router = express.Router();

router.post('/add-product',authMiddleware,Product.addProduct);
router.get('/get-products',Product.getProducts);
router.get('/get-product-detail',Product.getProductDetail);
router.post('/edit-product',authMiddleware,Product.editProduct);

export default router;
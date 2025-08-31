import express from 'express';
import Category from "../../controllers/dashboard/categoryController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { checkAdmin } from '../../middlewares/checkAdmin.js';

const router = express.Router();

router.post('/add-new-category', checkAdmin, Category.addCategory);
router.post('/get-category',authMiddleware,Category.getCategory);
router.get('/get-category',authMiddleware,Category.getCategories);

export default router;
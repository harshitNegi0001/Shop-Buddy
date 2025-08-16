import express from 'express';
import authController from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/admin-login',authController.adminLogin);
router.get('/get-user',authMiddleware, authController.getUser);

export default router;
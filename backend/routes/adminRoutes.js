import express from 'express';
import { addCoupon, getCoupons, login, removeCoupon } from '../controller/admin.js';
const router = express.Router();

router.post('/login' , login);
router.post('/addCoupon' , addCoupon);
router.post('/removeCoupon' , removeCoupon);
router.post('/getCoupons' , getCoupons);

export default router;
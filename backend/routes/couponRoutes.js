import express from 'express';
import { getCoupon } from '../controller/coupon.js';
const router = express.Router();

router.post('/getCoupon' , getCoupon);

export default router;
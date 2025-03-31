import express from 'express';
import { addCoupon, editCoupon, getCoupons, login, removeCoupon } from '../controller/admin.js';
const router = express.Router();

router.post('/login' , login);
router.post('/addCoupon' , addCoupon);
router.post('/removeCoupon' , removeCoupon);
router.get('/getCoupons' , getCoupons);
router.post('/editCoupon' , editCoupon);

export default router;
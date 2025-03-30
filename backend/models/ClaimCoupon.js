import mongoose from "mongoose";

const claimCouponSchema = new mongoose.Schema({
    couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    redeemedAt: {
        type: Date,
        default: Date.now
    }
})

const ClaimCoupon = mongoose.model('ClaimCoupon', claimCouponSchema);
export default ClaimCoupon;
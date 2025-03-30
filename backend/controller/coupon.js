import ClaimCoupon from "../models/ClaimCoupon.js";
import Coupon from "../models/Coupon.js"
import { v4 as uuidv4 } from 'uuid'
import Cookies from "js-cookie";

const INTERVAL = 5 * 60 * 1000;

const canClaimCoupon = async (ip, sessionId) => {
    const interval = new Date().getTime() - INTERVAL;

    const ipCoupon = await ClaimCoupon.findOne({ ip, redeemedAt: { $gt: interval } });

    if (ipCoupon) {
        const timeRemain = Math.ceil((INTERVAL - (new Date() - ipCoupon.redeemedAt)) / 60000);
        return {
            ok: false,
            message: `Please Wait ${timeRemain} ${timeRemain == 1 ? 'minute' : "minutes"} before claiming coupon again.`
        }
    }

    const sessionCoupon = await ClaimCoupon.findOne({ sessionId, redeemedAt: { $gt: interval } });

    if (sessionCoupon) {
        const timeRemain = Math.ceil((INTERVAL - (Date.now() - sessionCoupon.redeemedAt)) / 1000);
        return {
            ok: false,
            message: `Please Wait ${timeRemain} ${timeRemain == 1 ? 'minute' : "minutes"} before claiming coupon again.`
        }
    }

    return { ok: true };
}

const findCoupon = async () => {
    const coupon = await Coupon.findOne({ $expr: { $lt: ["$used", "$limit"] }, expireAt: { $gt: new Date() } }).sort({ used: 1 });

    if (!coupon) {
        return { ok: false, message: "No available coupon." };
    }

    return { ok: true, coupon };
}

const claimCoupon = async (ip, sessionId, couponId) => {
    try {
        const coupon = new ClaimCoupon({ ip, sessionId, couponId, redeemedAt: new Date() });
        await coupon.save();

        await Coupon.findOneAndUpdate({ _id: couponId }, { $inc: { used: 1 } });
    } catch (error) {
        console.log(error)
    }
}

const getUserIP = async () => {
    try {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP:", error);
        return "unknown";
    }
};

export const getCoupon = async (req, res) => {
    try {
        const ip = await getUserIP();

        let sessionId = req.cookies?.sessionId
        if (!sessionId) {
            sessionId = uuidv4();
            res.cookie("sessionId", sessionId);
        }

        const canClaim = await canClaimCoupon(ip, sessionId);

        if (!canClaim.ok) {
            return res.status(429).json({ ok: false, message: canClaim.message });
        }

        const coupon = await findCoupon();

        if (!coupon.ok) {
            return res.status(503).json({ ok: false, message: coupon.message });
        }

        await claimCoupon(ip, sessionId, coupon.coupon._id);
        res.status(200).json({ ok: true, couponCode: coupon.coupon.code, message: `Your Coupon is ${coupon.coupon.code}` });

    } catch (error) {
        res.status(500).json({ ok: false, message: "Error in getting coupon", error: error });
    }
}
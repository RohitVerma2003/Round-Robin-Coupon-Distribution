import Coupon from "../models/Coupon.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username != process.env.ADMIN_USERNAME || password != process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(201).json({
            message: 'Logged in successfully',
        })
    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const addCoupon = async (req, res) => {
    try {
        const { code, limit, date } = req.body;

        const coupon = new Coupon({ code, limit, expireAt: date });
        await coupon.save();

        res.status(201).json({
            message: 'Coupon added successfully',
            coupon
        })
    } catch (error) {
        console.log("Error in Adding Coupon", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const removeCoupon = async (req, res) => {
    try {
        const { code } = req.body;

        const coupon = await Coupon.findOneAndDelete({ code });

        res.status(201).json({
            message: 'Coupon deleted successfully',
            coupon
        })
    } catch (error) {
        console.log("Error in Removing Coupon", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({});

        res.status(201).json({
            message: 'Coupons extracted successfully',
            coupons
        })
    } catch (error) {
        console.log("Error in Removing Coupon", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
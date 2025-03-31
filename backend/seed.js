import mongoose from "mongoose";
import Coupon from "./models/Coupon.js"
import dotenv from "dotenv";

dotenv.config()

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to mongoDB");

        console.log(process.env.MONGODB_URI)

        const coupon1 = new Coupon({ code: "TASTE100", limit: 100, expireAt: new Date("2022-12-31") });
        const coupon2 = new Coupon({ code: "SUMMER100", limit: 100, expireAt: new Date("2022-12-31") });
        const coupon3 = new Coupon({ code: "DRIVE100", limit: 100, expireAt: new Date("2022-12-31") });

        await coupon1.save();
        await coupon2.save();
        await coupon3.save();
    } catch (error) {
        console.log(error);
        process.exit(1);
    } finally {
        mongoose.connection.close();
        console.log("MongoDB connection closed");
        process.exit(1);
    }
}

seed();
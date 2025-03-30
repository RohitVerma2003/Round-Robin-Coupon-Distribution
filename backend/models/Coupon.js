import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    code :{
        type : String,
        required : true,
        unique : true
    },
    limit : {
        type : Number,
        default : 100,
        required : true
    },
    used : {
        type : Number,
        default : 0
    },
    expireAt : {
        type : Date,
        required : true,
    }
})

const Coupon  = mongoose.model('Coupon' , couponSchema);
export default Coupon;
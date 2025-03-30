import mongoose from 'mongoose';

export const connectToDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to mongoDB");
    }catch(error){
        console.log("Error connecting to mongoDB", error);
        process.exit(1);
    }
}
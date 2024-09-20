import mongoose from "mongoose";
 

export const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connected ${conn.connect.host}`);
    }catch(error){
        console.log("EError connecting to MongoDb : ",error.message);
        process.exit(1);
    }
}
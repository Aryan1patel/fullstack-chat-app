import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
    try {
        const conn =await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`); 
    } catch (error) {
        console.log("errorrrrr check net")
        console.log(error.message);
    }

};

//newpassword1212

//mongodb+srv://ppparyanpatel:newpassword1212@2ndchat.l92q3.mongodb.net/?retryWrites=true&w=majority&appName=2ndchat
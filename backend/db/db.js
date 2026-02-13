import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async() => {
    try{
     mongoose.connect(process.env.MONGODB_URI)
    console.log("Database is Connected")
    }catch(error){
        console.log("Database error",error)
    }
    
}

export default connectDB;
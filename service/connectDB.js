import mongoose from "mongoose";

 const connectDB = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/spark");
}
 
export default connectDB;
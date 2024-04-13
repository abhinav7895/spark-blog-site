import mongoose from "mongoose";

 const connectDB = (MongoDBURL) => {
    return mongoose.connect(MongoDBURL);
}
 
export default connectDB;
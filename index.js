import express from "express";
import connectDB from "./service/connectDB.js";
const app = express();
const PORT = 8000;

// mongoDB connection
connectDB()
 .then(() => console.log("MongoDB connected"))
 .catch((e) => console.error(e));

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

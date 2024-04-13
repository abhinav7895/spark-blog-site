import 'dotenv/config'
import express from "express";
import connectDB from "./service/connectDB.js";
import path from "path";
import UserRouter from "./routes/user.js";
import BlogRouter from "./routes/blog.js"
import cookieParser from "cookie-parser";
import BlogModel from "./models/blog.js"
import { checkForAuthenticationCookies } from "./middlewares/authentication.js";
const app = express();

// mongoDB connection
connectDB(`${process.env.MongoDBURL}${process.env.DB_NAME}`)
 .then(() => console.log("MongoDB connected"))
 .catch((e) => console.error(e));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve('./public')));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookies("uuid"));
app.use("/", UserRouter);
app.use("/", BlogRouter);

app.get('/', async(req, res) => {
    const allBlogs = await BlogModel.find({createdBy : req?.user?._id});
    res.render('index', {
        user : req?.user,
        blogs : allBlogs
    }); 
});

app.listen(process.env.PORT || 8000, () => console.log(`Server running at port ${process.env.PORT || 8000}`));

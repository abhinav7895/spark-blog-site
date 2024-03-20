import express from "express";
import connectDB from "./service/connectDB.js";
import path from "path";
import UserRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import { checkForAuthenticationCookies } from "./middlewares/authentication.js";
const app = express();
const PORT = 8000;


// mongoDB connection
connectDB()
 .then(() => console.log("MongoDB connected"))
 .catch((e) => console.error(e));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve('./public')));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookies("uuid"));

app.use("/", UserRouter)
app.get('/', (req, res) => {
    res.render('index', {
        user : req.user
    }); 
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

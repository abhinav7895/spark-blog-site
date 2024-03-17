import express from "express";
import connectDB from "./service/connectDB.js";
import path from "path";
const app = express();
const PORT = 8000;

// mongoDB connection
connectDB()
 .then(() => console.log("MongoDB connected"))
 .catch((e) => console.error(e));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    res.render('index'); // Render an 'index.ejs' file
});
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

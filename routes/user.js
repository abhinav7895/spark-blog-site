import { Router } from "express";
import User from "../models/user.js";
const router = Router();

router.get("/signin", (req, res) => {
    if (req.user) {
        return res.redirect("/")
    }
    return res.render("signin")
})

router.get("/signup", (req, res) => {
    if (req.user) {
        return res.redirect("/")
    }
    return res.render("signup")
})

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await User.matchPasswordGenerateToken(email, password);
        res.cookie("uuid", token);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.render("signin", {error : "Incorrect email or password"});
    }
});

router.post("/signup", async (req, res) => {
    console.log("hello");
    try {
        const { fullName, email, password } = req.body;
        const user = await User.findOne({email : email});
        console.log(user);
        if (user) {
            return res.render("signup", {error : "Email already exist!"});
        }
        await User.create({ fullName, email, password });
        return res.redirect("/signin");
    } catch (error) {
        console.log(error);
        return res.render("error");
    }
})
router.get("/signout", async (req, res) => {
    try {
        const expiryDate = new Date('2000-01-01T00:00:00'); // January 1, 2000
        res.cookie("uuid", "", { expires: expiryDate });
        return res.redirect("/signin");
    } catch (error) {
        console.log(error);
        return res.render("error");
    }
})
router.get("/edit-profile", async (req, res) => {
    try {
        return res.render("editprofile", {
            user : req.user
        });
    } catch (error) {
        console.log(error);
        return res.render("error");
    }
})


export default router;

import { Router } from "express";
import BlogModel from "../models/blog.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { generateDate } from "../utils/helper.js";

const router = Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.resolve(`./public/uploads/${req.user._id}`);
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        return cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        return cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage })
router.get("/add-blog", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    });
});

router.post("/add-blog", upload.single("coverImage"), async (req, res) => {
    try {
        const { title, body } = req.body;
        const { filename } = req.file;
        await BlogModel.create({
            title, body, coverImage: `/uploads/${req?.user?._id}/${filename}`, createdBy: req?.user?._id
        });
        return res.redirect("/");
    } catch (error) {
        return res.render("error")
    }
})

router.get("/blog/:blogID", async (req, res) => {
    const blogID = req.params?.blogID;
    const blog = await BlogModel.findOne({ _id: blogID });
    const date = generateDate(blog.createdAt);
    return res.render("blog", {
        user: req.user,
        blog: blog,
        createdAt: date
    });
})
export default router;

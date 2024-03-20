import mongoose, { set } from "mongoose";
import { createHmac, randomBytes } from "crypto"
import { setUser } from "../service/auth.js";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        salt: {
            type: String,
        },
        profileImageUrl: {
            type: String,
            default: "/assets/useravatar.png"
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
    }
)

UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");
    this.salt = salt;
    this.password = hashedPassword;
    next();
})

UserSchema.static("matchPasswordGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found!");
    const userHashedPassword = createHmac("sha256", user.salt).update(password).digest("hex");
    if (userHashedPassword === user.password) {
        const token = setUser({
            fullName: user.fullName,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            _id: user._id
        });
        return token;
    }
    else { throw new Error("Incorrect email or password!"); }
})

export default mongoose.model("user", UserSchema)
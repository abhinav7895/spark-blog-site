import jwt from "jsonwebtoken";
const secretKey = "Blog@232312^";

export const setUser = ({fullName, email, profileImageUrl, _id}) => {
    return jwt.sign({
        fullName : fullName,
        email : email,
        profileImageUrl : profileImageUrl,
        _id : _id,
    }, secretKey);
}

export const getUser = (token) => {
    return jwt.verify(token, secretKey);
}
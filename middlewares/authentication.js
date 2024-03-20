import { getUser } from "../service/auth.js";

export const checkForAuthenticationCookies = (cookieName) => {
    return (req, res, next) => {
        const cookieValue = req.cookies[cookieName];
        if (!cookieValue) return next();

        try {
            const userPayload = getUser(cookieValue);
            if (userPayload) {
                req.user = userPayload;
            }
        } catch (error) { console.error(error); }
        return next();
    } 
}
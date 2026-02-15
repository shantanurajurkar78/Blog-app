const { validateToken } = require("../services/authentication");

function checkforAuthenticationCookie(cookieName){
    return (req, res, next) => {
        const tokenCookieValue = req.cookies && req.cookies[cookieName];

        if(!tokenCookieValue) {
             return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            res.locals.user = userPayload;
        } catch (error) {
            // invalid token: clear any set user and continue
            req.user = undefined;
            res.locals.user = undefined;
        }

        return next();
    };
}

module.exports =  {
    checkforAuthenticationCookie,
}
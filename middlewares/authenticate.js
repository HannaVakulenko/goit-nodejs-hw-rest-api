const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");

const User = require("../models/user");

const { SECRET_KEY } = process.env;

const authenticate = async(req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ", 2);
    // checking for the "Bearer" in Headers
    if (bearer !== "Bearer") {
        next(HttpError(401));
    }

    // token validation
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            next(HttpError(401));
        }
        req.user = user;
        next();
    } catch {
        next(HttpError(401));
    }
}

module.exports = authenticate;
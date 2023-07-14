const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/user');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators'); // try...catch wrapper!

const { SECRET_KEY } = process.env;

const register = async(req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({email});

    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}

const login = async(req, res) => {
    const {email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Password is wrong");
    }

    const { _id: id } = user;   // destructuring with renaming (_id ---> id)

    const payload = {
        id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});

    await User.findByIdAndUpdate(id, {token});

    res.json({
        token,
    })
}

const getCurrent = async(req, res) => {
    const { name, email, subscription } = req.user;

    res.json({
        name,
        email,
        subscription,
    })
}

const logout = async(req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, {token: "" });

    res.json({
        message: "Logout success!"
    })
}

const updateUserSubscription = async(req, res) => {

    const { _id } = req.user;

    const result = await User.findByIdAndUpdate(_id, req.body, {new: true}); // the third argument for res updated object
    if (!result) {
      throw HttpError(404, `User with ${_id} not found`); // throw HttpError(404); using helpers messages
    }
    res.json(result);
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateUserSubscription: ctrlWrapper(updateUserSubscription),
}
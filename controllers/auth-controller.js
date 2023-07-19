const fs = require("fs/promises");
const path = require("path");
const gravatar = require('gravatar');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Jimp = require('jimp');

const User = require('../models/user');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators'); // try...catch wrapper!

const { SECRET_KEY } = process.env;

// the path where the file is moved to
const avatarsDir = path.resolve("public", "avatars");

const register = async(req, res) => {

    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // Using the gravatar package in order to immediately generate an avatar for a new user by his email upon registration.
    const avatarUrl = gravatar.url(email);

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        subscription,
        avatarUrl,
    });

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarUrl: newUser.avatarUrl,
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
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});

    await User.findByIdAndUpdate(id, {token});

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

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

const updateAvatar = async (req, res, next) => {

    if (!req.file) {
        throw HttpError(400, 'Avatar must be provided');
    }

    const { _id: owner } = req.user;
    const { path: tempPath, originalname } = req.file;

    // Processing the avatar with the jimp package and setting its dimensions to 250 by 250
    await Jimp.read(tempPath)
    .then((avatar) => {
      return avatar
        .resize(250, 250) // resize
        .quality(60) // set JPEG quality
        .write(tempPath); // save
    })
    .catch((err) => {
      throw err;
    });
 
    // providing a unique file name for a specific user
    const fileName = `${owner}_${originalname}`;

    // Moving the user's avatar from the tmp folder to the public/avatars folder.
    const publicPath = path.join(avatarsDir, fileName);
    await fs.rename(tempPath, publicPath);

    // Getting the URL /avatars/<filename with extension> and saving it in the avatarURL field of the user
    const avatarUrl = path.join("avatars", fileName);
    await User.findByIdAndUpdate(owner, { avatarUrl });
    res.json({
        avatarUrl,
      });

}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateUserSubscription: ctrlWrapper(updateUserSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
}
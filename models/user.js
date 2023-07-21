const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const { subscription, emailRegexp } = require("../constants");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        match: emailRegexp,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        enum: subscription,
        default: "starter",
        required: true,
    },
    token: {
        type: String,
    },
    avatarUrl: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    }
}, {versionKey: false, timestamps: true});

// adding middleware movieSchema when an error occurred while adding or updating data
userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
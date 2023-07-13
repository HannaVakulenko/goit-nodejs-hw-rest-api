const Joi = require("joi");

const { subscription, emailRegexp } = require("../constants");

const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription:  Joi.string().valid(...subscription),
})

const userLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const updateUserSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid(...subscription)
        .required()
        .messages({ 'any.required': "Missing field 'subscription'", }),
  });

module.exports = {
    userRegisterSchema,
    userLoginSchema,
    updateUserSubscriptionSchema,
};
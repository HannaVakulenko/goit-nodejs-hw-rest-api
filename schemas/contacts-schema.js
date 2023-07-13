const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({ "any.required": 'Contact name must be exist!' }).required(),
  email: Joi.string().required().messages({ "any.required": 'Contact email must be exist!' }),
  phone: Joi.string().required().messages({ "any.required": 'Phone number must be exist!' }),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactSchema,
  contactUpdateFavoriteSchema,
 };
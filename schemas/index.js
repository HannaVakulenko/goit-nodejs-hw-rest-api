const { contactSchema, contactUpdateFavoriteSchema} = require('./contacts-schema');
const { userRegisterSchema, userLoginSchema, userEmailSchema, updateUserSubscriptionSchema } = require('./users');

module.exports = {
    contactSchema,
    contactUpdateFavoriteSchema,
    
    userRegisterSchema,
    userLoginSchema,
    userEmailSchema,
    updateUserSubscriptionSchema,
}
const { contactSchema, contactUpdateFavoriteSchema} = require('./contacts-schema');
const { userRegisterSchema, userLoginSchema, updateUserSubscriptionSchema } = require('./users');

module.exports = {
    contactSchema,
    contactUpdateFavoriteSchema,
    
    userRegisterSchema,
    userLoginSchema,
    updateUserSubscriptionSchema,
}
const {
    register,
    login,
    getCurrent,
    logout,
    updateUserSubscription,
} = require('./auth-controller');

const {
    getAllContacts,
    getContactById,
    addContact,
    deleteContactById,
    updateContactById,
    updateStatusContact,
} = require('./contacts-controllers');

module.exports = {
    // auth-controllers
    register,
    login,
    getCurrent,
    logout,
    updateUserSubscription,
    // contacts-controllers
    getAllContacts,
    getContactById,
    addContact,
    deleteContactById,
    updateContactById,
    updateStatusContact,
}
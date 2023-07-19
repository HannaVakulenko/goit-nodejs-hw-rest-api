const {
    register,
    login,
    getCurrent,
    logout,
    updateUserSubscription,
    updateAvatar,
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
    updateAvatar,
    // contacts-controllers
    getAllContacts,
    getContactById,
    addContact,
    deleteContactById,
    updateContactById,
    updateStatusContact,
}
const express = require('express');

const contactsController = require('../../controllers/contacts-controllers');

const schemas = require('../../schemas/contacts-schema');

const { validateBody } = require('../../decorators');

const { isValidId } = require("../../middlewares");

const router = express.Router();

// GET /api/contacts 
router.get('/', contactsController.getAllContacts);

// GET /api/contacts/:id
router.get('/:id', isValidId, contactsController.getContactById);

// POST /api/contacts
router.post('/', validateBody(schemas.contactSchema), contactsController.addContact);

// DELETE /api/contacts/:id
router.delete('/:id', isValidId, contactsController.deleteContactById);

// PUT /api/contacts/:id
router.put('/:id', isValidId, validateBody(schemas.contactSchema), contactsController.updateContactById);

// PATCH /api/contacts/:id/favorite
router.patch("/:id/favorite", isValidId, validateBody(schemas.contactUpdateFavoriteSchema), contactsController.updateStatusContact);

module.exports = router;
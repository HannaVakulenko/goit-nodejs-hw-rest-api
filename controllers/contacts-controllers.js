const Contact = require('../models/contact');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators'); // try...catch wrapper!

const { contactUpdateFavoriteSchema } = require("../schemas");

const getAllContacts = async (req, res) => { // - controler function req->res
  
  const { _id: owner } = req.user; // destructuring with renaming (_id ---> owner)

  // pagination vs. quiry filter!!!
  const {page = 1, limit = 20, ...query}= req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({owner, ...query}, "-createdAt -updatedAt", {skip, limit});
  
  res.json(result);

}

const getContactById = async (req, res) => { // controler function req.params->res (console.log(req.params);)
      
    const { id } = req.params;
    const result = await Contact.findById(id); // or Contact.findOne({_id: id})
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`); // throw HttpError(404) using helpers messages
    }
    res.json(result);

}

const addContact = async (req, res) => { // controler function req-res

  const { _id: owner } = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);

}

const deleteContactById = async (req, res) => { // controler function req-res

      const { id } = req.params;
      const result = await Contact.findByIdAndDelete(id);
      if (!result) {
        throw HttpError(404, `Contact with ${id} not found`); // throw HttpError(404) using helpers messages
      };
      res.json({
        "message": "Contact deleted"
      });

}

const updateContactById = async (req, res) => { // controler function req-res

      const { id } = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, {new: true}); // the third argument for res updated object
      if (!result) {
        throw HttpError(404, `Contact with ${id} not found`); // throw HttpError(404); using helpers messages
      }
      res.json(result);

}

const updateStatusContact = async(req, res) => {

  const { error } = contactUpdateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing field favorite");
  }

  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true}); // the third argument for res updated object
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`); // throw HttpError(404); using helpers messages
  }
  res.json(result);
}

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContactById: ctrlWrapper(updateContactById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
}
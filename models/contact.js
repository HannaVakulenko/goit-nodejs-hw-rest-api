const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../middlewares");

const contactSchema = new Schema({
name: {
    type: String,
    required: [true, 'Set name for contact!'],
},
email: {
    type: String,
},
phone: {
    type: String,
},
favorite: {
    type: Boolean,
    default: false,
},
}, {versionKey: false, timestamps: true}); // the second argument - field shutdown and adding creation date (createdAt) and update date (updatedAt)

// adding middleware to contactSchema when an error occurred while adding or updating data
contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
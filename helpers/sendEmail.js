const nodemailer = require("nodemailer");
require("dotenv").config();

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

// settings object
const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465, // may be 25, 465, 2525   !!!465 - has secure
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD
    }
}

// транспорт
const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async(data) => {
    const email = {...data, from: UKR_NET_EMAIL};
    await transport.sendMail(email);
    return true;
};

module.exports = sendEmail;
const multer = require("multer");
const path = require("path");

const destination = path.join(__dirname, '../', "tmp");
const avatarSize = 1048576;

// setting storage object
const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, originalname);
    },
    limits: {
      fileSize: avatarSize,
    },
});

const upload = multer({
    storage,
});

module.exports = upload;
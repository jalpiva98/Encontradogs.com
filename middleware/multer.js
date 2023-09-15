const multer = require("multer"); // middleware to handle file uploads

const storage = multer.diskStorage({
    filename: function (req,file,cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: storage});

module.exports = upload;
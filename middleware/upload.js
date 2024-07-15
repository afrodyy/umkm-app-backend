const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error(
      "Tipe file yang diperbolehkan hanya jpg, jpeg, dan png."
    );
    error.code = "LIMIT_FILE_TYPES";

    return cb(error, false);
  }

  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 2048 },
  fileFilter: fileFilter,
});

module.exports = upload;

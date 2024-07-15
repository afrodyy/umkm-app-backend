const multer = require("multer");

const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Error dari multer
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(422).json({
        status: false,
        message: "Ukuran file terlalu besar. Batas ukuran file adalah 2MB.",
      });
    }
  } else if (err) {
    // Error dari fileFilter
    if (err.code === "LIMIT_FILE_TYPES") {
      return res.status(422).json({
        status: false,
        message: "Tipe file yang diperbolehkan hanya jpg, jpeg, dan png.",
      });
    }
  }
  next(err);
};

module.exports = handleMulterError;

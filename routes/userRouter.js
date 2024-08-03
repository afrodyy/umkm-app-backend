const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const upload = require("../middleware/upload");
const handleMulterError = require("../middleware/handleMulterError");

router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.post("/user", upload.single("image"), handleMulterError, createUser);
router.put("/user/:id", upload.single("image"), handleMulterError, updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;

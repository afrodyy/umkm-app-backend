const router = require("express").Router();
const {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");
const upload = require("../middleware/upload");
const handleMulterError = require("../middleware/handleMulterError");

router.get("/menu", getAllMenus);
router.get("/menu/:id", getMenuById);
router.post("/menu", upload.single("image"), handleMulterError, createMenu);
router.put("/menu/:id", upload.single("image"), handleMulterError, updateMenu);
router.delete("/menu/:id", deleteMenu);

module.exports = router;

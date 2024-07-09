const router = require("express").Router();
const {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

router.get("/menu", getAllMenus);
router.get("/menu/:id", getMenuById);
router.post("/menu", createMenu);
router.put("/menu/:id", updateMenu);
router.delete("/menu/:id", deleteMenu);

module.exports = router;

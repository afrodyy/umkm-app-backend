const router = require("express").Router();
const {
  getAllRole,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

router.get("/role", getAllRole);
router.get("/role/:id", getRoleById);
router.post("/role", createRole);
router.put("/role/:id", updateRole);
router.delete("/role/:id", deleteRole);

module.exports = router;

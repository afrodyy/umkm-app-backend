const router = require("express").Router();
const categoryRouter = require("../routes/categoryRouter");
const menuRouter = require("../routes/menuRouter");
const roleRouter = require("./roleRouter");

router.use("/api/v1", categoryRouter);
router.use("/api/v1", menuRouter);
router.use("/api/v1", roleRouter);

module.exports = router;

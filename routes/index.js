const router = require("express").Router();
const categoryRouter = require("../routes/categoryRouter");
const menuRouter = require("../routes/menuRouter");

router.use("/api/v1", categoryRouter);
router.use("/api/v1", menuRouter);

module.exports = router;

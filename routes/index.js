const router = require("express").Router();
const roleRouter = require("./roleRouter");
const userRouter = require("../routes/userRouter");
const categoryRouter = require("../routes/categoryRouter");
const menuRouter = require("../routes/menuRouter");

router.use("/api/v1", roleRouter);
router.use("/api/v1", userRouter);
router.use("/api/v1", categoryRouter);
router.use("/api/v1", menuRouter);

module.exports = router;

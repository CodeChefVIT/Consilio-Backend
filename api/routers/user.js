const router = require("express").Router();

const user = require("../controllers/team");
const checkAuth = require("../middlewares/checkAuth");

router.patch("/update", checkAuth, user.update);

module.exports = router;

const router = require("express").Router();
const authController = require("../controller/user");

router.post("/user/signup", authController.postSignup);
router.post("/user/login", authController.postLogin);

module.exports = router;

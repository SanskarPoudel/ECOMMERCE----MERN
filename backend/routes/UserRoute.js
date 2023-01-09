const {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controller/UserController");

const router = require("express").Router();

router.post("/registration", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.get("/password/reset", resetPassword);

module.exports = router;

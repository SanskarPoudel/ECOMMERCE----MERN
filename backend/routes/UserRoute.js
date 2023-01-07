const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controller/UserController");

const router = require("express").Router();

router.post("/registration", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;

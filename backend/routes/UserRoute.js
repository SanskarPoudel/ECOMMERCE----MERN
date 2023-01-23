const {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  userDetails,
  updatePassword,
  updateProfile,
  allUsers,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  addtoCart,
  getCart,
  removeFromCart,
} = require("../controller/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = require("express").Router();

router.post("/registration", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset", resetPassword);
router.get("/me", isAuthenticatedUser, userDetails);
router.put("/me/updatepassword", isAuthenticatedUser, updatePassword);
router.put("/me/updateinfo", isAuthenticatedUser, updateProfile);

router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUsers
);
router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleUser
);

router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateUserRole
);

router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);

router.post("/addToCart", isAuthenticatedUser, addtoCart);

router.get("/getCart", isAuthenticatedUser, getCart);

router.delete(
  "/removeFromCart/:productId",
  isAuthenticatedUser,
  removeFromCart
);

module.exports = router;

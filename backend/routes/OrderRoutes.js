const {
  createOrder,
  getSingleOrder,
  getAllOrders,
  getAllOrdersAdmin,
} = require("../controller/OrderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = require("express").Router();

router.post("/order/new", isAuthenticatedUser, createOrder);

router.get("/order/:id", isAuthenticatedUser, getSingleOrder);

router.get("/orders/me", isAuthenticatedUser, getAllOrders);

router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllOrdersAdmin
);

module.exports = router;

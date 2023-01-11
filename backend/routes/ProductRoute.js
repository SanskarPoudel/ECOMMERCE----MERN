const express = require("express");
const { route } = require("../app");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  createReview,
} = require("../controller/ProductController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/products/:id", getSingleProduct);

router.post(
  "/products/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);

router.put(
  "/products/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);

router.delete(
  "/products/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

// router.post("/product/review", isAuthenticatedUser, createReview);

module.exports = router;

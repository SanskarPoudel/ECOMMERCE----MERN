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
  getAllProductsAdmin,
} = require("../controller/ProductController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

const multer = require("multer");
const path = require("path");

//Storage Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

router.get("/products", getAllProducts);

router.get("/products/:id", getSingleProduct);

router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllProductsAdmin
);

router.post(
  "/products/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  upload.single("image"),
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

router.post("/product/review", isAuthenticatedUser, createReview);

module.exports = router;

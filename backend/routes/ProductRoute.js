const express = require("express");
const { route } = require("../app");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controller/ProductController");
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.post("/products/new", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;

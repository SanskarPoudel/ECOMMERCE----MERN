const express = require("express");
const { route } = require("../app");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/ProductController");
const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products/new", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;

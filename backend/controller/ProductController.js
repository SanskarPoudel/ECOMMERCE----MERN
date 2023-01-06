const Product = require("../models/ProductModel");

//CREATE PRODUCT -- ADMIN
module.exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    success: "true",
    product,
  });
};

//GET PRODUCTS
module.exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

// UPDATE PRODUCT ---ADMIN
module.exports.updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product is not found with this id",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};

//DELETE PRODUCT --ADMIN

module.exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product is not found with this id",
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
};

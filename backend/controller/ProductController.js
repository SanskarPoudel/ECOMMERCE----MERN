const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

//CREATE PRODUCT -- ADMIN
module.exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    success: "true",
    product,
  });
});

//GET PRODUCTS
module.exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  let products = await Product.find();
  if (products.length === 0) {
    return next(new ErrorHandler("There are no Products to show", 404));
  }
  res.status(200).json({
    success: true,
    products,
  });
});

// UPDATE PRODUCT ---ADMIN
module.exports.updateProduct = async (req, res, next) => {
  let product;

  product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product is not Found with this id ", 404));
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
module.exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product is not Found with this id ", 404));
    }
    await product.remove();
  } catch (error) {
    return next(new ErrorHandler("Product is not Found with this id ", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
};

//SINGLE PRODUCT DETAILS
module.exports.getSingleProduct = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product is not Found with this id ", 404));
    }
  } catch (error) {
    return next(new ErrorHandler("Product is not Found with this id ", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

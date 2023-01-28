const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Features = require("../utils/Features");

//CREATE PRODUCT -- ADMIN
module.exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    description,
    price,
    discountedPrice,
    color,
    size,
    rating,
    category,
    stock,
    numberOfReviews,
    reviews,
  } = req.body;
  const product = await Product.create({
    name,
    description,
    price,
    discountedPrice,
    color,
    size,
    rating,
    category,
    stock,
    numberOfReviews,
    reviews,
    image: {
      data: req.file.filename,
      contentType: "image/jpg",
    },
  });
  res.status(200).json({
    success: "true",
    message: "Product Created Successfully",
  });
});

//GET PRODUCTS
module.exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();

  const feature = new Features(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  let products = await feature.query;
  if (products.length === 0) {
    return next(new ErrorHandler("There are no Products to show", 404));
  }

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
  });
});

// UPDATE PRODUCT ---ADMIN
module.exports.updateProduct = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product is not Found with this id ", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useUnified: false,
    });
  } catch (error) {
    return next(new ErrorHandler("Product is not Found with this id ", 404));
  }
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

// Create New Review or Update the review
module.exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  console.log(productId);

  const product = await Product.findById(productId);

  console.log(product);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All reviews of a single product
exports.getSingleProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review --Admin
module.exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found with this id", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numberOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numberOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

//

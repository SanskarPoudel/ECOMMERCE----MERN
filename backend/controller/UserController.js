const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail.js");
const randomstring = require("randomstring");
const Product = require("../models/ProductModel");

//REGISTER USER
module.exports.createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "testing.com",
      url: "testing.com",
    },
  });
  sendToken(user, 201, res);
});

//LOGIN USER

module.exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  const passCheck = await bcrypt.compare(password, user.password);

  if (!passCheck) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  sendToken(user, 201, res);
});

//LOGOUT USER
module.exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out Successfully",
  });
});

//FORGOT PASSWORD

module.exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found"), 400);
  }

  const randomString = randomstring.generate();

  const updateStatus = await User.updateOne(
    { email },
    { $set: { resetPasswordToken: randomString } }
  );

  const updatedUser = await User.findOne({ _id: user._id });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset?token=${updatedUser.resetPasswordToken}`;

  const message = `Reset your password by visiting this link : \n\n ${resetPasswordUrl}`;

  sendMail({
    email: user.email,
    subject: `Ecommerce Password Recovery`,
    text: message,
  });

  res.status(200).json({
    success: true,
    message: "Check your email to reset your password",
  });
});

//RESET PASSWORD
module.exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const token = req.query.token;
  const user = await User.findOne({ resetPasswordToken: token });
  if (!user) {
    return next(new ErrorHandler("Invalid reset Link", 404));
  }
  const { password } = req.body;

  const salt = await bcrypt.genSalt();

  const hashedPassword = await bcrypt.hash(password, salt);

  const userData = await User.findByIdAndUpdate(
    { _id: user._id },
    { $set: { password: hashedPassword, resetPasswordToken: null } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
    userData,
  });
});

//GET USER DETAILS

module.exports.userDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

//UPDATE USER PASSWORD
module.exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.body.id).select("+password");

  const passCheck = await bcrypt.compare(req.body.oldPassword, user.password);

  if (!passCheck) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  const hashedPassword = await bcrypt.hash(req.body.newPassword, user.password);

  const userData = await User.findByIdAndUpdate(
    { _id: user._id },
    { $set: { password: hashedPassword } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

//UPDATE USER DETAILS

module.exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//GET ALL USERS -- ADMIN
module.exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//GET SINGLE USER DETAIL -- ADMIN
module.exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

module.exports.userReview = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate({ _id: req.user.id }, { $set: {} });
});

//CHANGING USER ROLE --ADMIN

module.exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//DELETE USER --ADMIN
module.exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

//ADD TO CART
module.exports.addtoCart = catchAsyncError(async (req, res) => {
  const user = await User.findById(req.user._id);

  const product = await Product.findById(req.body.productId);

  const isProductInCart = user.cart.find(
    (cartItem) => cartItem.product.toString() === product._id.toString()
  );
  if (isProductInCart) {
    return res.status(400).json({
      message: "Product is already in cart",
    });
  }

  user.cart.push({
    product: product._id,
    quantity: req.body.quantity,
  });

  await user.save();
  res.status(200).json({
    message: "Product added to cart",
  });
});

//GET CART
module.exports.getCart = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate("cart.product")
    .select("cart");

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  res.status(200).json({
    cart: user.cart,
  });
});

//REMOVE PRODUCT FROM CART
module.exports.removeFromCart = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const product = await Product.findById(req.params.productId);

  const isProductInCart = user.cart.find(
    (cartItem) => cartItem.product.toString() === product._id.toString()
  );
  if (!isProductInCart) {
    return res.status(400).json({
      message: "Product not found in cart",
    });
  }

  const updatedCart = user.cart.filter(
    (cartItem) => cartItem.product.toString() !== product._id.toString()
  );

  user.cart = updatedCart;
  await user.save();
  res.status(200).json({
    message: "Product removed from cart",
  });
});

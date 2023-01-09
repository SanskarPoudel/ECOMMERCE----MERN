const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail.js");
const randomstring = require("randomstring");

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

  console.log(updatedUser);

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset?token=${updatedUser.resetPasswordToken}`;

  const message = `Reset your password by visiting this link : \n\n ${resetPasswordUrl}`;

  console.log(message);

  sendMail({
    email: user.email,
    subject: `Ecommerce Password Recovery`,
    text: message,
  });

  res.status(200).json({
    success: true,
    updateStatus,
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

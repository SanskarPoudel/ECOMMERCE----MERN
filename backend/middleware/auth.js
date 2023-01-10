const ErroHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

module.exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErroHandler("Please login to access the resources", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_sECRET_KEY);

  req.user = await User.findById(decodedData.id);

  next();
});

//ADMIN ROLE
module.exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErroHandler(`${req.user.role} cannot access this resources`),
        401
      );
    }
    next();
  };
};

const express = require("express");
const productRoute = require("./routes/ProductRoute");
const userRoute = require("./routes/UserRoute");
const orderRoute = require("./routes/OrderRoutes");
const cors = require("cors");
const ErrorHandler = require("./middleware/Error");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use(ErrorHandler);

module.exports = app;

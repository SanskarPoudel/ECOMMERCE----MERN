const express = require("express");
const productRoute = require("./routes/ProductRoute");
const cors = require("cors");
const ErrorHandler = require("./middleware/Error");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ credentials: true }));

app.use("/api/v1", productRoute);
app.use(ErrorHandler);

module.exports = app;

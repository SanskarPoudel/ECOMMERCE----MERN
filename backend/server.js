const connectDB = require("./db/Database");
const app = require("./app");

require("dotenv").config({
  path: "../backend/config/.env",
});

// CREATING SERVER
const server = app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});

//CONNECTING DATABASE
connectDB();

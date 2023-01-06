require("dotenv").config({
  path: "../backend/config/.env",
});

const connectDB = require("./db/Database");
const app = require("./app");

// CREATING SERVER
const server = app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});

//
connectDB();

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectionDB = require("./config/database");
const cookieParser = require("cookie-parser");
const errorHandler = require("../src/middleware/errorHandler");
const User = require("../src/routes/userRoutes");
const Dealership = require("../src/routes/dealershipUserRoutes");
const Car = require("../src/routes/carRoutes");
const terms = require("../src/routes/terms&conditionRoutes");
const faqs = require("../src/routes/faqsRoutes");

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(errorHandler);

const initializeApp = async () => {
    try {
      console.log("Connecting to MongoDB...");
      await connectionDB();
      console.log("MongoDB connected successfully!");
  
    //   const PORT = process.env.PORT || 3000;
    //   app.listen(PORT, () => {
    //     console.log(`Server is running on port ${PORT}`);
    //   });
    } catch (error) {
      console.error("Failed to initialize the application:", error.message);
      process.exit(1); // Exit the application if the connection fails
    }
  };
  
  initializeApp();
  
app.get("/", (req, res) => {
    res.send("Application is currently working!");
});

app.use("/users", User);
app.use("/dealership", Dealership);
app.use("/cars", Car);
app.use("/terms", terms);
app.use("/faqs", faqs);

module.exports = app;

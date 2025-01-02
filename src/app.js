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

// Ensure database connection for every request
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      console.log("Reconnecting to MongoDB...");
      await connectionDB();
      console.log("Reconnected to MongoDB.");
    } catch (error) {
      console.error("Database connection error:", error.message);
      return res.status(500).send("Database connection error");
    }
  }
  next();
});

// Default route
app.get("/", (req, res) => {
  res.send("Application is currently working!");
});

// API routes
app.use("/users", User);
app.use("/dealership", Dealership);
app.use("/cars", Car);
app.use("/terms", terms);
app.use("/faqs", faqs);

module.exports = app;

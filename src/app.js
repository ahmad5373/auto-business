const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app =  express();
const cors = require("cors");
const bodyParser  = require("body-parser");
const connectionDB = require("./config/database");
const cookieParser = require("cookie-parser");
const errorHandler = require("../src/middleware/errorHandler");
const User = require("../src/routes/userRoutes");
const Dealership = require("../src/routes/dealershipUserRoutes");
const Car = require("../src/routes/carRoutes");
const terms = require("../src/routes/terms&conditionRoutes");
const faqs = require("../src/routes/faqsRoutes");


// const corsOptions = {
//     credentials: true,
//     origin: ['http://localhost:5173' ,'https://spreadz-admin.vercel.app', 'https://spreadz.vercel.app' ,'http://localhost:3000']
// };
  
// app.use(cors(corsOptions));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(errorHandler);


connectionDB();
// createAdmin(); 

//Default route
app.get('/' , (req,res)=>{
    res.send("Application is currently working !")
});

app.use("/users", User);
app.use("/dealership", Dealership);
app.use("/cars", Car);
app.use("/terms", terms);
app.use("/faqs", faqs);


module.exports = app;

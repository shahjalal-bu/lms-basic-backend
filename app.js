var express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require('./routes/auth')
const courseRoute = require('./routes/courses')

var app = express();

dotenv.config();

//connection mongodb
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB");
});

app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/courses", courseRoute);

module.exports = app;


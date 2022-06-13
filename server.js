///////////////////////////////
// Setting Up my Dependencies
///////////////////////////////

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");

///////////////////////////////
// Pointing to my URL
///////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL;

///////////////////////////////
// Avoiding Deprication
///////////////////////////////
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

///////////////////////////////
// Connecting to URL
///////////////////////////////
mongoose.connect(DATABASE_URL, CONFIG);

///////////////////////////////
// Connection Event Lsiteners
///////////////////////////////
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

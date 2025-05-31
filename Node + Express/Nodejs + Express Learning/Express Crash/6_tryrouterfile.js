//const express = require("express");
//const path = require("path");
//const quotes = require("./routes/6_quotes");

import express from "express";
import quotes from "./routes/6_quotes.js";
const app = express();

//Routes
app.use("/api/quotes", quotes);

app.listen(5000, () => {
  console.log(`server is running on port 5000`);
});

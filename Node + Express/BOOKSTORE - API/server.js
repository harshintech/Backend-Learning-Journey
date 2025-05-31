require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const bookRouter = require("./routes/book-routes");

const app = express();
const PORT = process.env.PORT || 3000;

//connect to our database
connectToDB();

//middleware -> express.json();
app.use(express.json());

//router here
app.use("/api/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});

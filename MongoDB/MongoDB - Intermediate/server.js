require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product-routes");
const bookRoutes = require("./routes/book-routes");

const app = express();

//connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((e) => console.log(e));

app.use(express.json());
app.use("/products", productRoutes);
app.use("/reference", bookRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is now runningd on port ${process.env.PORT}`);
});

import express from "express";
import quotes from "./routes/7_quotespost.js";
const app = express();


//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/quotes", quotes);

//Routes

app.listen(5000, () => {
  console.log(`server is running on port 5000`);
});

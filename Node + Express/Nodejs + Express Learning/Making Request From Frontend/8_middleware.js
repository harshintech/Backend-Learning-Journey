import express from "express";
import quotes from "./routes/8_quoteswithmiddleware.js";
import logger from "./middleware/8_logger.js";
import errorHandler from "./middleware/8_error.js";
import notFound from "./middleware/8_noteFound.js";
import { fileURLToPath } from "url";
import path from "path";
const app = express();

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger middleware
app.use(logger);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//setup static folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/quotes", quotes);

app.use(notFound);

//Error
app.use(errorHandler);

app.listen(5000, () => {
  console.log(`server is running on port 5000`);
});




//const port = process.env.PORT || 5000; //--> This is Get From ENV File and use can't see when upload on github


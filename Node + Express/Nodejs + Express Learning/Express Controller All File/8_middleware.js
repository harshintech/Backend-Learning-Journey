import express from "express";
import quotes from "./routes/8_quoteswithmiddleware.js";
import logger from "./middleware/8_logger.js";
import errorHandler from "./middleware/8_error.js";
import notFound from "./middleware/8_noteFound.js";
const app = express();

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger middleware
app.use(logger);

// When a request hits your server:
// logger middleware runs first for every request (because you used app.use(logger) globally).
// Then, if the request path matches /api/quotes, it goes into the quotes router.
// So yes — middleware like logger runs first, before route handlers or routers.

//Routes
app.use("/api/quotes", quotes);

app.use(notFound);

//Error
app.use(errorHandler);

app.listen(5000, () => {
  console.log(`server is running on port 5000`);
});

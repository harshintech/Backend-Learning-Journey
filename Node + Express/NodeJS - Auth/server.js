require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");


connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // <- MUST be before app.use("/api/auth", authRoutes)

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);



app.listen(PORT, () => {
  console.log(`Server is now listening  to port ${PORT}`);
});

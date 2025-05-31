import express from "express";

const app = express();

//Config ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("index",{
    title: 'Welcome Harsh',
    message: 'Hello From EJS',
    people : ['John','Jane','Jack']
  });
});

app.listen(5555, () => {
  console.log("Server Started");
});

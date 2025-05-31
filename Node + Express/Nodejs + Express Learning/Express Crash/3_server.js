import express from "express";
import path from "path";
import {fileURLToPath} from 'url';


//const port = process.env.PORT || 5000; //--> This is Get From ENV File and use can't see when upload on github

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//setup static folder
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  { id: 1, title: "post one" },
  { id: 2, title: "post two" },
  { id: 3, title: "post three" },
  { id: 4, title: "post four" },
  { id: 5, title: "post five" },
];

//get all posts
app.get("/api/posts", (req, res) => {
  console.log(req.query); //-->http://localhost:5000/api/posts?limit=2&mode=dark
  //? after this all is qurery you see in console
  res.json(posts);
});

//get single posts
//--> "/api/posts/:id" --> now :id now dynamic value
app.get("/api/posts/:id", (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id);
  res.json(posts.filter((post) => post.id === id));
});

app.listen(5000, () => {
  console.log(`server is running on port 5000`);
});

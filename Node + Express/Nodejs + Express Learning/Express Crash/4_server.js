import express from "express";

const app = express();

let posts = [
  { id: 1, title: "post one" },
  { id: 2, title: "post two" },
  { id: 3, title: "post three" },
  { id: 4, title: "post four" },
  { id: 5, title: "post five" },
];

app.get("/api/posts", (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    res.json(posts.slice(0, limit));
  } else {
    res.json(posts);
  }

  //for see output try this
  //http://localhost:5000/api/posts?limit=2 //--> last limit is query you give any thing like 1,2,3,4,5
});

app.get("/api/posts/:id", (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id);
  res.json(posts.filter((post) => post.id === id));
});

app.listen(5000, () => {
  console.log(`server is running on port 5000`);
});

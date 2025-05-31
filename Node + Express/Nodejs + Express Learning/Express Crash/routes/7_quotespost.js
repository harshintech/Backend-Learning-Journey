import express from "express";
const router = express.Router();

let quotes = [
  { id: 1, quote: "Push yourself, because no one else will." },
  { id: 2, quote: "Success is no accident." },
  { id: 3, quote: "Dream big. Work hard. Stay focused." },
  { id: 4, quote: "Don’t watch the clock; do what it does. Keep going." },
  { id: 5, quote: "The harder you work, the luckier you get." },
];

router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(quotes.slice(0, limit));
  }
  res.status(200).json(quotes);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const quote = quotes.find((quote) => quote.id === id);

  if (!quote) {
    res.status(404).json({ msg: `A post with the id of ${id} was not found` });
  } else {
    res.status(200).json(quote);
  }
});

//Create new Post
router.post("/", (req, res) => {
  console.log(req.body);
  const newPost = {
    id: quotes.length + 1,
    quote: req.body.title,
  };

  if (!newPost.quote) {
    return res.status(400).json({ msg: "please include a quote" });
  }

  quotes.push(newPost);
  res.status(201).json(quotes);
});

//Update Post
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const quote = quotes.find((quote) => quote.id === id);



  if (!quote) {
    return res
      .status(404)
      .json({ msg: `A post with the id of ${id} was not found` });
  }

  quote.quote = req.body.title;
  res.status(200).json(quotes);
});


//Delete Post
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const quote = quotes.find((quote) => quote.id === id);



  if (!quote) {
    return res
      .status(404)
      .json({ msg: `A post with the id of ${id} was not found` });
  }

  quotes = quotes.filter((quote)=> quote.id !== id)
  res.status(200).json(quotes);
});


export default router;

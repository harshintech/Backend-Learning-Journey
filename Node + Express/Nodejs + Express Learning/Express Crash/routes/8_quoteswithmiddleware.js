import express from "express";
const router = express.Router();

let quotes = [
  { id: 1, quote: "Push yourself, because no one else will." },
  { id: 2, quote: "Success is no accident." },
  { id: 3, quote: "Dream big. Work hard. Stay focused." },
  { id: 4, quote: "Don’t watch the clock; do what it does. Keep going." },
  { id: 5, quote: "The harder you work, the luckier you get." },
];

router.get("/", (req, res, next) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(quotes.slice(0, limit));
  }
  res.status(200).json(quotes);
});

router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const quote = quotes.find((quote) => quote.id === id);

  if (!quote) {
    const error = new Error(`A post with the id of ${id} was not Found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(quote);
});

//Create new Post
router.post("/", (req, res, next) => {
  console.log(req.body);
  const newPost = {
    id: quotes.length + 1,
    quote: req.body.title,
  };

  if (!newPost.quote) {
    const error = new Error("Please include title");
    error.status = 400;
    return next(error);
  }

  quotes.push(newPost);
  res.status(201).json(quotes);
});

//Update Post
router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const quote = quotes.find((quote) => quote.id === id);

  if (!quote) {
    const error = new Error("Please include title");
    error.status = 400;
    return next(error);
  }

  quote.quote = req.body.title;
  res.status(200).json(quotes);
});

//Delete Post
router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const quote = quotes.find((quote) => quote.id === id);

  if (!quote) {
    const error = new Error("Please include title");
    error.status = 400;
    return next(error);
  }

  quotes = quotes.filter((quote) => quote.id !== id);
  res.status(200).json(quotes);
});

export default router;

// const express = require("express");
import express from "express";
const router = express.Router();

const quotes = [
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

// module.exports = router;
export default router;

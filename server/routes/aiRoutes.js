const express = require("express");
const router = express.Router();

const { askAI } = require("../controllers/aiController");

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Route Working",
  });
});

router.post("/", askAI);

module.exports = router;
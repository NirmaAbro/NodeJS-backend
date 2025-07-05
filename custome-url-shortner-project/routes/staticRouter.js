const express = require("express");
const router = express.Router();
const url = require("../models/url");

router.get("/", async (req, res) => {
  try {
    const allUrls = await url.find({});
    res.render("home", {
      urls: allUrls,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading dashboard");
  }
});

module.exports = router;

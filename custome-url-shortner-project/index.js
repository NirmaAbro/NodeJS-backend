const express = require("express");
const app = express();
const mongoose = require("mongoose");
const urlRoutes = require("./routes/url");
const connectDB = require("./connect");
const url = require("./models/url");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/url", urlRoutes);

// Redirect
app.get("/:shortid", async (req, res) => {
    const shortId = req.params.shortid;
  
    try {
      const entry = await url.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
      );
  
      if (!entry) {
        return res.status(404).send("<h2>🔗 Short URL not found</h2>");
      }
  
      res.redirect(entry.redirectUrl);
    } catch (err) {
      console.error("Redirect error:", err);
      res.status(500).send("<h2>🚨 Server Error</h2>");
    }
  });
  

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

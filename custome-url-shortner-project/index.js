const express = require("express");
const app = express();
const path = require("path");
const urlRoutes = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const connectDB = require("./connect");
const url = require("./models/url");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //for form data
app.use("/url", urlRoutes);
app.use("/",staticRouter);

app.get("/allurls", async (req, res) => {
  const allUrls = await url.find({});
  try {
    return res.render("home",{
      urls:allUrls
    });
  } catch (error) {
    console.error(err);
    res.status(500).send("Error loading dashboard");
  }
 
})




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

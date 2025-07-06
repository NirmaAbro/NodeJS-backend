const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  const shortID = shortid();

  if (!body.url) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a valid url" });
  }

  //  First save the new short URL
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });

  //  THEN fetch all updated URLs
  const allUrls = await URL.find({});

  //  Now render the page with the correct data
  return res.render("home", {
    id: shortID,
    urls: allUrls,
  });
}

async function handlegetAnalytics(req, res) {
  const shortId = req.params.shortid;
  const entry = await URL.findOne({ shortId });
  if (!entry) {
    return res.status(404).json({ success: false, message: "URL not found" });
  }

  return res.json({
    totalClicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortUrl,
  handlegetAnalytics,
};

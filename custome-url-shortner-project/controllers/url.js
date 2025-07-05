const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  const shortID = shortid();
  if (!body.url) {
    res
      .status(400)
      .json({ success: false, message: "Please provide a valid url" });
  }

  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.status(200).json({ id: shortID });
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

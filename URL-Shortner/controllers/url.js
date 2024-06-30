const URL = require("../models/url");
const ShortUniqueId = require("short-unique-id");
console.log("inside controller");
async function handleGenerateNewShortURL(req, res) {
  if (!req.body || !req.body.url) {
    return res.status(400).json({ message: "url is required" });
  }
  const uid = new ShortUniqueId({ length: 6 });

  const result = await URL.create({
    redirectURL: req.body.url,
    shortId: uid.rnd(),
    visitHistory: [],
  });
  return res
    .status(201)
    .json({ message: `addeed to DB success with id : ${result._id}` });
}
async function handleGetAllShortURL(req, res) {
  res.setHeader("X-developed-by", "Kaushik Jain");
  const allURL = await URL.find({});
  return res.status(200).json(allURL);
}

async function handleGetURLByID(req, res) {
  const shortId = req.params.shortId;
  if (!shortId) {
    return res.status(400).json({ message: "id is required" });
  }
  const data = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(data.redirectURL);
}
async function handleGetAnalyticsByID(req, res) {
  const shortId = req.params.shortId;
  if (!shortId) {
    return res.status(400).json({ message: "id is required" });
  }
  const data = await URL.findOne({ shortId });
  console.log(data, "data");

  return res.status(200).json({
    TotalClicks: data.visitHistory.length,
    analytics: data.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAllShortURL,
  handleGetURLByID,
  handleGetAnalyticsByID,
};

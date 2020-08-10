const express = require("express");
const scrapeWatchUrl = require("./controllers/scrapeWatchUrl");
const scrapeAnimeName = require("./controllers/scrapeAnimeName");
const scrapeSearch = require("./controllers/scrapeSearch");

const appRouter = express.Router();

appRouter.get("/watch/:query", scrapeWatchUrl);

appRouter.get("/anime/:name", scrapeAnimeName);

appRouter.get("/search/:name", scrapeSearch);

module.exports = appRouter;

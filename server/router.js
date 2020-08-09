const express = require("express");
const scrapeWatchUrl = require("./controllers/scrapeWatchUrl");
const scrapeAnimeName = require("./controllers/scrapeAnimeName");

const appRouter = express.Router();

appRouter.get("/watch/:query", scrapeWatchUrl);

appRouter.get("/anime/:name", scrapeAnimeName);

module.exports = appRouter;

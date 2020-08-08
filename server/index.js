const express = require("express");
const jsdom = require("jsdom");
const got = require("got");
const cors = require("cors");
const checkStringSimilarity = require("./lib/checkStringSimilarity");

const { JSDOM } = jsdom;
const app = express();

app.use(cors());

app.get("/watch/:query", async (req, res) => {
  const animeQuery = req.params.query;
  const errorQuery =
    animeQuery.slice(0, animeQuery.length - 2) +
    animeQuery.slice(animeQuery.length - 1);
  const url = `https://4anime.to/${animeQuery}`;
  const errorUrl = `https://4anime.to/${errorQuery}`;
  let hasNextEpisode = false;
  try {
    const response = await got(url);
    const dom = new JSDOM(response.body);
    const nodeList = [dom.window.document.querySelectorAll(`source`)];
    const nodeListEpisodes = dom.window.document.querySelectorAll(".episodes");
    // console.log(nodeListEpisodes[53].textContent);
    const videoUrl = nodeList[0][0].attributes.getNamedItem("src").value;
    res.status(200).json({ videoUrl, hasNextEpisode });
  } catch (err) {
    try {
      const response = await got(errorUrl);
      const dom = new JSDOM(response.body);
      const nodeList = [dom.window.document.querySelectorAll(`source`)];
      const nodeListEpisodes = dom.window.document.querySelectorAll(
        "#waytohideepisodes"
      )[0].children[0].children;
      if (
        Number(animeQuery.slice(animeQuery.length - 2)) <=
        nodeListEpisodes.length
      ) {
        hasNextEpisode = true;
      }
      const videoUrl = nodeList[0][0].attributes.getNamedItem("src").value;
      res.status(200).json({ videoUrl, hasNextEpisode });
    } catch (secondError) {
      res.status(200).json({ videoUrl: "" });
    }
  }
});

app.get("/anime/:name", async (req, res) => {
  const anilistName = req.params.name
    .split(" ")
    .map((item) => item.toLowerCase())
    .join(" ");
  let fourAnimeName = "";
  const url =
    "https://4anime.to/?s=" +
    req.params.name
      .split(" ")
      .map((part) => part.toLowerCase())
      .join("+");
  try {
    const response = await got(url);
    const dom = new JSDOM(response.body);
    const nodeList = [...dom.window.document.querySelectorAll("#headerDIV_95")];
    nodeList.forEach((div) => {
      const showUrl = div.children[0].attributes[0].value;
      const nameOfTheShow = showUrl.split("https://4anime.to/anime/")[1];
      if (
        checkStringSimilarity(
          nameOfTheShow.split("-").join(" "),
          anilistName
        ) >= 0.85
      ) {
        (fourAnimeName = nameOfTheShow.split("-").join(" ")), anilistName;
      }
      return;
    });
    res.json({ name: fourAnimeName.split(" ").join("-") });
  } catch (error) {
    res.status(400).send();
  }
});

app.listen(4000, () => console.log("listening"));

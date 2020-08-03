const express = require("express");
const jsdom = require("jsdom");
const got = require("got");
const cors = require("cors");
const checkStringSimilarity = require("./lib/checkStringSimilarity");

const { JSDOM } = jsdom;
const app = express();

app.use(cors());

app.get("/anime/:name", async (req, res) => {
  console.log(req.params.name);
  const anilistName = req.params.name
    .split(" ")
    .map((item) => item.toLowerCase())
    .join(" ");
  let fourAnimeName = "";
  console.log("ani", anilistName);
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
      console.log(showUrl);
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
    res.json({ name: fourAnimeName });
  } catch (error) {
    console.log(error);
  }
});

app.listen(4000, () => console.log("listening"));

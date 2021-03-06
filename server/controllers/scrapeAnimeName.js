const checkStringSimilarity = require("../lib/checkStringSimilarity");
const jsdom = require("jsdom");
const got = require("got");
const { JSDOM } = jsdom;

const scrapeAnimeName = async (req, res) => {
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
};

module.exports = scrapeAnimeName;

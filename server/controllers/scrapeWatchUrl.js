const jsdom = require("jsdom");
const got = require("got");
const { JSDOM } = jsdom;

const scrapeWatchUrl = async (req, res) => {
  const animeQuery = req.params.query;
  const errorQuery =
    animeQuery.slice(0, animeQuery.length - 2) +
    animeQuery.slice(animeQuery.length - 1);
  const url = `https://4anime.to/${animeQuery}`;
  const errorUrl = `https://4anime.to/${errorQuery}`;
  try {
    const response = await got(url);
    const dom = new JSDOM(response.body);
    const nodeList = [dom.window.document.querySelectorAll(`source`)];
    const nodeListEpisodes = dom.window.document.querySelectorAll(
      "#waytohideepisodes"
    )[0].children[0].children;
    const videoUrl = nodeList[0][0].attributes.getNamedItem("src").value;
    res
      .status(200)
      .json({ videoUrl, numberOfEpisodes: nodeListEpisodes.length });
  } catch (err) {
    try {
      const response = await got(errorUrl);
      const dom = new JSDOM(response.body);
      const nodeList = [dom.window.document.querySelectorAll(`source`)];
      const nodeListEpisodes = dom.window.document.querySelectorAll(
        "#waytohideepisodes"
      )[0].children[0].children;
      const videoUrl = nodeList[0][0].attributes.getNamedItem("src").value;
      res
        .status(200)
        .json({ videoUrl, numberOfEpisodes: nodeListEpisodes.length });
    } catch (secondError) {
      res.status(400).json({ videoUrl: "", numberOfEpisodes: "" });
    }
  }
};

module.exports = scrapeWatchUrl;

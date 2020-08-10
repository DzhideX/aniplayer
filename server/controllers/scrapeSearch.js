const jsdom = require("jsdom");
const got = require("got");
const { JSDOM } = jsdom;

const scrapeSearch = async (req, res) => {
  const search = req.params.name;
  const url = `https://4anime.to/?s=${search.split(" ").join("+")}`;
  let shows = [];
  try {
    const response = await got(url);
    const dom = new JSDOM(response.body);
    const nodeList = [...dom.window.document.querySelectorAll("#headerDIV_95")];
    nodeList.forEach((div) => {
      const showUrl = div.children[0].attributes[0].value;
      const showPicture = div.children[0].children[0].attributes["src"].value;
      const showName = div.children[0].children[1].textContent;
      shows.push({
        showName,
        showPicture,
        showUrl,
      });
    });
    res.json({ anime: shows });
  } catch (error) {
    res.status(400).json({ error: "Oops. Something went wrong!" });
  }
};

module.exports = scrapeSearch;

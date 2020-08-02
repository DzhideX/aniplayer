const express = require("express");
const spawn = require("child_process").spawn;

const app = express();

app.get("/", (req, res) => {
  const pythonProcess = spawn("python", [
    "./server/animeWebsiteScraper.py",
    1,
    2,
  ]);
  pythonProcess.stdout.on("data", (data) => {
    res.send(data.toString());
  });
});

app.listen(4000, () => console.log("listening"));

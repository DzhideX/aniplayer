const express = require("express");
const cors = require("cors");
const appRouter = require("./router");

const app = express();

app.use(cors());
app.use(appRouter);

app.listen(4000, () => console.log("listening"));

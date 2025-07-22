const express = require("express");
const path = require("path");
const indexRouter = require("./router/indexRouter");
const DataBase = require("./db/database");

const app = express();
const PORT = process.env.PORT || 8080;
const assetPath = path.join(__dirname, "..", "public");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetPath));
app.set("views", path.join(__dirname, "..", "src", "view"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

async function startServer() {
  await DataBase.initDb();
  app.listen(PORT, () => console.log("Server listening on port:" + PORT));
}
startServer();

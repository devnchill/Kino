const express = require("express");
const path = require("path");

const indexRouter = require("./router/indexRouter");
const DataBase = require("./db/database");
const genreRouter = require("./router/genreRouter");
const movieRouter = require("./router/movieRouter");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "..", "src", "view"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/genres", genreRouter);
app.use("/movies", movieRouter);

async function startServer() {
  await DataBase.initDb();
  if (process.env.NODE_ENV !== "production") await DataBase.seedDb();
  app.listen(PORT, () => console.log("Server listening on port:" + PORT));
}
startServer();

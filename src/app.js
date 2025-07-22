import express from "express";
import path from "path";
import indexRouter from "./router/indexRouter";

const app = express();
const PORT = process.env.PORT || 8080;
const assetPath = path.join(__dirname, "..", "public");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetPath));
app.set("views", path.join(__dirname, "..", "src", "view"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.listen(PORT, () => console.log("Server listening on port:" + PORT));

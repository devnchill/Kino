const { Router } = require("express");
const MovieController = require("../controller/movieController");

const movieRouter = Router();

movieRouter.get("/all", MovieController.movieGet);
movieRouter.delete("/delete/:mid", MovieController.movieDelete);

module.exports = movieRouter;

const { Router } = require("express");

const GenreController = require("../controller/genreController");

const genreRouter = Router();

genreRouter.get("/all", GenreController.genreGet);
genreRouter.delete("/delete/:gid", GenreController.genreDelete);

module.exports = genreRouter;

const { Router } = require("express");

const GenreController = require("../controller/genreController");

const genreRouter = Router();

genreRouter.get("/all", GenreController.genreGet);
genreRouter.get("/browse", GenreController.genreBrowse);
genreRouter.get("/:gid/movies", GenreController.moviesByGenre);
genreRouter.delete("/delete/:gid", GenreController.genreDelete);
genreRouter.post("/add", GenreController.genreAdd);

module.exports = genreRouter;

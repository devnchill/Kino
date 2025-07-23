const DataBase = require("../db/database");

class GenreController {
  static async genreGet(req, res) {
    const genreData = await DataBase.getAllGenres();
    res.render("allGenre", { genreData });
  }

  static async genreDelete(req, res) {
    console.log("Deleting genre with ID:", req.params.gid);
    try {
      await DataBase.deleteGenre(req.params.gid);
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async genreAdd(req, res) {
    const { genreVal } = req.body;
    if (!genreVal || !genreVal.trim()) {
      return res.status(400).send("Genre name cannot be empty.");
    }
    console.log("Adding genre with name:", genreVal);
    try {
      await DataBase.addGenre(genreVal);
      res.redirect("/");
    } catch (err) {
      res.status(500).send(err);
    }
  }

  static async genreBrowse(req, res) {
    const { genres } = await DataBase.getAllGenres();
    res.render("browseGenres", { genres });
  }

  static async moviesByGenre(req, res) {
    const gid = req.params.gid;
    const genre = await DataBase.getGenreByGid(gid);
    const movies = await DataBase.getMoviesByGenre(gid);
    res.render("moviesInGenre", { genre, movies });
  }
}

module.exports = GenreController;

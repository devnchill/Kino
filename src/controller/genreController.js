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
}

module.exports = GenreController;

const DataBase = require("../db/database");

class MovieController {
  static async movieGet(req, res) {
    const movieData = await DataBase.getAllMovies();
    res.render("allMovie", { movieData });
  }

  static async movieDelete(req, res) {
    console.log("Deleting movie with ID:", req.params.mid);
    try {
      await DataBase.deleteMovie(req.params.mid);
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = MovieController;

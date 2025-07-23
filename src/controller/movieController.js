const DataBase = require("../db/database");

class MovieController {
  static async movieGet(_, res) {
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

  static async movieAdd(req, res) {
    try {
      const { movieVal, gid } = req.body;
      await DataBase.addMovie(movieVal, gid);
      res.redirect("/");
    } catch (err) {
      console.error("Error adding movie:", err);
      res.status(500).send("Something went wrong while adding the movie.");
    }
  }
}

module.exports = MovieController;
